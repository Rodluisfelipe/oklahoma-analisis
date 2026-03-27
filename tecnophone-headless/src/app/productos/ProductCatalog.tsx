'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { SlidersHorizontal, Grid3X3, LayoutList, ChevronDown, X, Filter, DollarSign, Tag, Cpu } from 'lucide-react';
import ProductCard from '@/components/products/ProductCard';
import { WCProduct } from '@/types/woocommerce';
import { cn } from '@/lib/utils';

const sortOptions = [
  { value: 'date-desc', label: 'Más recientes' },
  { value: 'price-asc', label: 'Menor precio' },
  { value: 'price-desc', label: 'Mayor precio' },
  { value: 'title-asc', label: 'A - Z' },
  { value: 'popularity-desc', label: 'Populares' },
  { value: 'rating-desc', label: 'Mejor valorados' },
];

const priceRanges = [
  { label: 'Todos', min: '', max: '' },
  { label: 'Hasta $500.000', min: '', max: '500000' },
  { label: '$500.000 - $1.000.000', min: '500000', max: '1000000' },
  { label: '$1.000.000 - $2.000.000', min: '1000000', max: '2000000' },
  { label: '$2.000.000 - $5.000.000', min: '2000000', max: '5000000' },
  { label: 'Más de $5.000.000', min: '5000000', max: '' },
];

/** Human-friendly labels for attribute facets */
const ATTR_LABELS: Record<string, string> = {
  attr_ram: 'RAM',
  attr_almacenamiento: 'Almacenamiento',
  attr_pantalla: 'Pantalla',
  attr_procesador: 'Procesador',
  attr_tipo: 'Tipo',
  attr_marca: 'Marca',
  'attr_memoria-ram': 'Memoria RAM',
  'attr_color': 'Color',
  'attr_tamano': 'Tamaño',
};

interface ProductCatalogProps {
  initialProducts: WCProduct[];
  initialTotal: number;
  initialTotalPages: number;
}

export default function ProductCatalog({
  initialProducts,
  initialTotal,
  initialTotalPages,
}: ProductCatalogProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [products, setProducts] = useState<WCProduct[]>(initialProducts);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(initialTotalPages);
  const [total, setTotal] = useState(initialTotal);
  const [gridCols, setGridCols] = useState<2 | 3 | 4>(4);
  const [filtersOpen, setFiltersOpen] = useState(false);
  // Facet values returned by Algolia { attr_ram: { "8GB": 5, "12GB": 3 }, ... }
  const [facets, setFacets] = useState<Record<string, Record<string, number>>>({});

  const page = parseInt(searchParams.get('page') || '1');
  const sort = searchParams.get('sort') || 'date-desc';
  const onSale = searchParams.get('on_sale') === 'true';
  const minPrice = searchParams.get('min_price') || '';
  const maxPrice = searchParams.get('max_price') || '';

  // Collect active attribute filters from URL
  const activeAttrs = useMemo(() => {
    const map: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      if (key.startsWith('attr_') && value) map[key] = value;
    });
    return map;
  }, [searchParams]);

  const hasAttrFilters = Object.keys(activeAttrs).length > 0;

  // When attribute filters are active, use Algolia browse API; otherwise use WC API
  const useAlgolia = hasAttrFilters;

  // Track if user has changed from the initial SSR state
  const isInitialState = page === 1 && sort === 'date-desc' && !onSale && !minPrice && !maxPrice && !hasAttrFilters;

  const fetchProducts = useCallback(async () => {
    // Skip fetch if showing initial SSR data (and load facets in background)
    if (isInitialState) {
      setProducts(initialProducts);
      setTotal(initialTotal);
      setTotalPages(initialTotalPages);
      // Still fetch facets from Algolia for filter dropdowns
      try {
        const res = await fetch('/api/products/browse?per_page=0');
        const data = await res.json();
        if (data.facets) setFacets(data.facets);
      } catch { /* non-critical */ }
      return;
    }

    setLoading(true);

    if (useAlgolia) {
      // Use Algolia browse API with facets
      const params = new URLSearchParams();
      params.set('page', String(Math.max(0, page - 1))); // Algolia is 0-based
      params.set('per_page', '24');
      if (onSale) params.set('on_sale', 'true');
      if (minPrice) params.set('min_price', minPrice);
      if (maxPrice) params.set('max_price', maxPrice);
      for (const [key, value] of Object.entries(activeAttrs)) {
        params.set(key, value);
      }
      try {
        const res = await fetch(`/api/products/browse?${params.toString()}`);
        const data = await res.json();
        setProducts(data.products || []);
        setTotalPages(data.totalPages || 0);
        setTotal(data.total || 0);
        if (data.facets) setFacets(data.facets);
      } catch {
        setProducts([]);
      }
    } else {
      // Use WooCommerce API
      const [orderby, order] = sort.split('-');
      const params = new URLSearchParams();
      params.set('page', String(page));
      params.set('per_page', '12');
      params.set('orderby', orderby);
      params.set('order', order);
      if (onSale) params.set('on_sale', 'true');
      if (minPrice) params.set('min_price', minPrice);
      if (maxPrice) params.set('max_price', maxPrice);

      try {
        const res = await fetch(`/api/products?${params.toString()}`);
        const data = await res.json();
        setProducts(data.products);
        setTotalPages(data.totalPages);
        setTotal(data.total);
      } catch {
        setProducts([]);
      }

      // Also fetch facets from Algolia for filter dropdowns
      try {
        const fRes = await fetch('/api/products/browse?per_page=0');
        const fData = await fRes.json();
        if (fData.facets) setFacets(fData.facets);
      } catch { /* non-critical */ }
    }

    setLoading(false);
  }, [page, sort, onSale, minPrice, maxPrice, isInitialState, initialProducts, initialTotal, initialTotalPages, useAlgolia, activeAttrs]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    if (key !== 'page') params.set('page', '1');
    router.push(`${pathname}?${params.toString()}`);
  };

  const activeFiltersCount = (onSale ? 1 : 0) + (minPrice || maxPrice ? 1 : 0) + Object.keys(activeAttrs).length;

  const clearAllFilters = () => {
    const params = new URLSearchParams();
    params.set('page', '1');
    if (sort !== 'date-desc') params.set('sort', sort);
    router.push(`${pathname}?${params.toString()}`);
  };

  /** Available attribute facets (only those with values) */
  const attrFacets = useMemo(() => {
    return Object.entries(facets)
      .filter(([key, values]) => key.startsWith('attr_') && Object.keys(values).length > 0)
      .map(([key, values]) => ({
        key,
        label: ATTR_LABELS[key] || key.replace('attr_', '').replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
        options: Object.entries(values).sort(([a], [b]) => a.localeCompare(b, 'es', { numeric: true })),
      }));
  }, [facets]);

  return (
    <div className="container-custom py-8 lg:py-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
            {onSale ? '🔥 Ofertas Especiales' : 'Todos los Productos'}
          </h1>
          <p className="text-surface-700 mt-1">
            {total} producto{total !== 1 ? 's' : ''} encontrado{total !== 1 ? 's' : ''}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Filter toggle button */}
          <button
            onClick={() => setFiltersOpen(!filtersOpen)}
            className={cn(
              'flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors border',
              filtersOpen || activeFiltersCount > 0
                ? 'bg-primary-50 border-primary-500/30 text-primary-600'
                : 'bg-white border-surface-300 text-gray-500 hover:text-gray-900'
            )}
          >
            <Filter className="w-4 h-4" />
            Filtros
            {activeFiltersCount > 0 && (
              <span className="bg-primary-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {activeFiltersCount}
              </span>
            )}
          </button>

          {/* Sort */}
          <div className="relative">
            <select
              value={sort}
              onChange={(e) => updateParam('sort', e.target.value)}
              className="appearance-none bg-white border border-surface-300 rounded-lg pl-4 pr-10 py-2.5 text-sm text-gray-700 focus:border-primary-500 focus:outline-none cursor-pointer"
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-600 pointer-events-none" />
          </div>

          {/* Grid toggle (desktop) */}
          <div className="hidden lg:flex items-center border border-surface-300 rounded-lg overflow-hidden">
            {[3, 4].map((cols) => (
              <button
                key={cols}
                onClick={() => setGridCols(cols as 3 | 4)}
                className={cn(
                  'p-2.5 transition-colors',
                  gridCols === cols ? 'bg-primary-500 text-white' : 'text-gray-400 hover:text-gray-700'
                )}
              >
                {cols === 3 ? <LayoutList className="w-4 h-4" /> : <Grid3X3 className="w-4 h-4" />}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Filter Panel */}
      {filtersOpen && (
        <div className="mb-6 p-5 bg-white rounded-2xl border border-surface-200 animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-primary-600" />
              Filtrar por
            </h3>
            {activeFiltersCount > 0 && (
              <button
                onClick={clearAllFilters}
                className="text-xs text-red-500 hover:text-red-400 font-medium"
              >
                Limpiar filtros
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-6">
            {/* Price range */}
            <div>
              <p className="text-xs font-semibold text-surface-700 mb-2 flex items-center gap-1">
                <DollarSign className="w-3 h-3" /> Rango de precio
              </p>
              <div className="flex flex-wrap gap-2">
                {priceRanges.map((range) => {
                  const isActive = minPrice === range.min && maxPrice === range.max;
                  return (
                    <button
                      key={range.label}
                      onClick={() => {
                        const params = new URLSearchParams(searchParams.toString());
                        if (range.min) params.set('min_price', range.min); else params.delete('min_price');
                        if (range.max) params.set('max_price', range.max); else params.delete('max_price');
                        params.set('page', '1');
                        router.push(`${pathname}?${params.toString()}`);
                      }}
                      className={cn(
                        'px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border',
                        isActive
                          ? 'bg-primary-500 text-white border-primary-500'
                          : 'bg-surface-50 text-gray-500 border-surface-300 hover:border-primary-500/30 hover:text-gray-900'
                      )}
                    >
                      {range.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* On sale toggle */}
            <div>
              <p className="text-xs font-semibold text-surface-700 mb-2 flex items-center gap-1">
                <Tag className="w-3 h-3" /> Ofertas
              </p>
              <button
                onClick={() => updateParam('on_sale', onSale ? '' : 'true')}
                className={cn(
                  'px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border',
                  onSale
                    ? 'bg-red-500/10 text-red-500 border-red-500/30'
                    : 'bg-surface-50 text-gray-500 border-surface-300 hover:border-red-500/30 hover:text-gray-900'
                )}
              >
                🔥 Solo ofertas
              </button>
            </div>

            {/* Attribute facet dropdowns */}
            {attrFacets.map((facet) => (
              <div key={facet.key}>
                <p className="text-xs font-semibold text-surface-700 mb-2 flex items-center gap-1">
                  <Cpu className="w-3 h-3" /> {facet.label}
                </p>
                <div className="relative">
                  <select
                    value={activeAttrs[facet.key] || ''}
                    onChange={(e) => updateParam(facet.key, e.target.value)}
                    className="appearance-none bg-white border border-surface-300 rounded-lg pl-3 pr-8 py-1.5 text-xs text-gray-700 focus:border-primary-500 focus:outline-none cursor-pointer min-w-[130px]"
                  >
                    <option value="">Todos</option>
                    {facet.options.map(([value, count]) => (
                      <option key={value} value={value}>
                        {value} ({count})
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-surface-600 pointer-events-none" />
                </div>
              </div>
            ))}
          </div>

          {/* Active filter chips */}
          {activeFiltersCount > 0 && (
            <div className="flex flex-wrap gap-2 mt-4 pt-3 border-t border-surface-200">
              {onSale && (
                <span className="flex items-center gap-1.5 bg-red-500/10 text-red-500 px-3 py-1.5 rounded-lg text-xs font-medium">
                  Ofertas
                  <button onClick={() => updateParam('on_sale', '')}><X className="w-3 h-3" /></button>
                </span>
              )}
              {(minPrice || maxPrice) && (
                <span className="flex items-center gap-1.5 bg-primary-500/10 text-primary-600 px-3 py-1.5 rounded-lg text-xs font-medium">
                  {priceRanges.find(r => r.min === minPrice && r.max === maxPrice)?.label || `$${minPrice || '0'} - $${maxPrice || '∞'}`}
                  <button onClick={() => {
                    const params = new URLSearchParams(searchParams.toString());
                    params.delete('min_price');
                    params.delete('max_price');
                    params.set('page', '1');
                    router.push(`${pathname}?${params.toString()}`);
                  }}><X className="w-3 h-3" /></button>
                </span>
              )}
              {Object.entries(activeAttrs).map(([key, value]) => (
                <span key={key} className="flex items-center gap-1.5 bg-indigo-500/10 text-indigo-600 px-3 py-1.5 rounded-lg text-xs font-medium">
                  {ATTR_LABELS[key] || key.replace('attr_', '')}: {value}
                  <button onClick={() => updateParam(key, '')}><X className="w-3 h-3" /></button>
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Products Grid */}
      {loading ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="bg-surface-100 animate-pulse rounded-2xl h-80 border border-surface-200" />
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-20">
          <SlidersHorizontal className="w-16 h-16 text-surface-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No se encontraron productos</h3>
          <p className="text-surface-700">Intenta ajustar los filtros de búsqueda</p>
        </div>
      ) : (
        <div
          className={cn(
            'grid gap-4 lg:gap-6',
            gridCols === 3
              ? 'grid-cols-2 lg:grid-cols-3'
              : 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4'
          )}
        >
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-10">
          {(() => {
            const pages: (number | 'ellipsis')[] = [];
            if (totalPages <= 7) {
              for (let i = 1; i <= totalPages; i++) pages.push(i);
            } else {
              pages.push(1);
              if (page > 3) pages.push('ellipsis');
              for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) pages.push(i);
              if (page < totalPages - 2) pages.push('ellipsis');
              pages.push(totalPages);
            }
            return pages.map((p, idx) =>
              p === 'ellipsis' ? (
                <span key={`e${idx}`} className="w-10 h-10 flex items-center justify-center text-surface-500">…</span>
              ) : (
                <button
                  key={p}
                  onClick={() => updateParam('page', String(p))}
                  className={cn(
                    'w-10 h-10 rounded-lg text-sm font-medium transition-colors',
                    p === page
                      ? 'bg-primary-500 text-white'
                      : 'bg-surface-100 border border-surface-300 text-surface-700 hover:border-primary-500/30'
                  )}
                >
                  {p}
                </button>
              )
            );
          })()}
        </div>
      )}
    </div>
  );
}
