import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  Laptop,
  Smartphone,
  Monitor,
  Headphones,
  Gamepad2,
  Plug,
  Tag,
  ArrowRight,
} from 'lucide-react';
import { getProducts, getBanners } from '@/lib/woocommerce';

export const revalidate = 600;

export const metadata: Metadata = {
  title: 'Categorías - TecnoPhone',
  description:
    'Explora todas las categorías de tecnología: portátiles, celulares, monitores, auriculares, gaming, accesorios y ofertas.',
  alternates: { canonical: '/categorias' },
};

const categories = [
  { slug: 'portatiles-2', name: 'Portátiles', icon: Laptop },
  { slug: 'celulares', name: 'Celulares', icon: Smartphone },
  { slug: 'monitores', name: 'Monitores', icon: Monitor },
  { slug: 'auriculares', name: 'Auriculares', icon: Headphones },
  { slug: 'gaming', name: 'Gaming', icon: Gamepad2 },
  { slug: 'accesorios-tecnologicos-en-colombia', name: 'Accesorios', icon: Plug },
  { slug: 'ofertas', name: 'Ofertas', icon: Tag },
];

export default async function CategoriasPage() {
  const [results, banners] = await Promise.all([
    Promise.all(
      categories.map((cat) =>
        getProducts({ category_slug: cat.slug, per_page: 1 }).catch(() => ({
          products: [],
          total: 0,
          totalPages: 0,
        }))
      )
    ),
    getBanners().catch(() => []),
  ]);

  const categoryData = categories.map((cat, i) => ({
    ...cat,
    image: results[i].products[0]?.images?.[0]?.src || null,
    count: results[i].total,
  }));

  // Get the second SBANNER (index 1)
  const sbanner = banners
    .filter((b) => b.title.startsWith('SBANNER') && b.isActive && b.productImage)
    .sort((a, b) => a.sortOrder - b.sortOrder)[1];

  return (
    <div className="min-h-screen bg-surface-50 pb-24 lg:pb-10">
      {/* Banner */}
      {sbanner && (
        <Link
          href={sbanner.ctaLink || '/productos'}
          className="block"
        >
          <Image
            src={sbanner.productImage}
            alt={sbanner.title.replace(/SBANNER\d*/g, '').trim() || 'Banner'}
            width={1800}
            height={500}
            className="w-full h-auto object-cover"
            sizes="100vw"
            priority
          />
        </Link>
      )}

      {/* Header */}
      <div className="bg-white border-b border-surface-200">
        <div className="px-4 sm:px-6 lg:px-8 max-w-[1550px] mx-auto py-2.5 lg:py-8">
          <h1 className="text-base lg:text-3xl font-extrabold text-gray-900">Categorías</h1>
          <p className="text-surface-500 text-[11px] lg:text-sm">
            Encuentra lo que necesitas
          </p>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="px-4 sm:px-6 lg:px-8 max-w-[1550px] mx-auto py-3 lg:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 lg:gap-4">
          {categoryData.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.slug}
                href={`/categoria/${cat.slug}`}
                className="group flex lg:flex-col bg-white rounded-2xl border border-surface-200 overflow-hidden hover:border-primary-300 hover:shadow-lg hover:shadow-primary-500/10 transition-all duration-300"
              >
                {/* Image: square on desktop, fixed size on mobile */}
                <div className="relative bg-surface-50 w-24 h-24 lg:w-auto lg:h-auto lg:aspect-square flex-shrink-0 flex items-center justify-center">
                  {cat.image ? (
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      fill
                      className="object-contain p-3 lg:p-8 group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 1024px) 96px, 33vw"
                    />
                  ) : (
                    <Icon className="w-10 h-10 lg:w-16 lg:h-16 text-surface-300" />
                  )}
                </div>
                {/* Info: side on mobile, bottom on desktop */}
                <div className="flex items-center gap-2.5 px-3 py-3 lg:px-5 lg:py-4 lg:border-t border-surface-100 flex-1 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 text-primary-600" />
                  </div>
                  <div className="min-w-0">
                    <h2 className="text-sm lg:text-base font-bold text-gray-900 truncate">{cat.name}</h2>
                    <p className="text-[10px] lg:text-xs text-surface-500 font-medium">
                      {cat.count} producto{cat.count !== 1 ? 's' : ''}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-surface-400 group-hover:text-primary-600 group-hover:translate-x-0.5 transition-all ml-auto flex-shrink-0" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
