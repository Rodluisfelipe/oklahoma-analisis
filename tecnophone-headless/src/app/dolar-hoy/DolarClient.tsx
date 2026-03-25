'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  TrendingUp,
  TrendingDown,
  RefreshCw,
  DollarSign,
  ArrowRight,
  ShoppingCart,
  Clock,
  Info,
  Shield,
  Building2,
  Smartphone,
} from 'lucide-react';

interface RateData {
  cop: number;
  prevCop: number | null;
  eur: number;
  brl: number;
  mxn: number;
  date: string;
  source: string;
}

interface Product {
  name: string;
  slug: string;
  price: string;
  regular_price: string;
  images: { src: string }[];
  on_sale: boolean;
}

interface DolarClientProps {
  initialRate: RateData;
  products: Product[];
}

function formatCOP(value: number) {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

function formatPrice(price: string) {
  const num = parseFloat(price);
  if (isNaN(num)) return price;
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(num);
}

function formatPriceUSD(priceCOP: string, rate: number) {
  const num = parseFloat(priceCOP);
  if (isNaN(num) || rate === 0) return '';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(num / rate);
}

export default function DolarClient({ initialRate, products }: DolarClientProps) {
  const [rate, setRate] = useState<RateData>(initialRate);
  const [loading, setLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [calcUSD, setCalcUSD] = useState('');
  const [calcCOP, setCalcCOP] = useState('');
  const [calcDirection, setCalcDirection] = useState<'usd-cop' | 'cop-usd'>('usd-cop');

  const fetchRate = async () => {
    setLoading(true);
    try {
      // Fetch official TRM from datos.gov.co
      const trmRes = await fetch(
        'https://www.datos.gov.co/resource/mcec-87by.json?%24order=vigenciadesde%20DESC&%24limit=2',
        { cache: 'no-store' }
      );
      const trmData = await trmRes.json();
      const trm = parseFloat(trmData[0]?.valor);
      const prevTrm = trmData[1] ? parseFloat(trmData[1].valor) : trm;
      const trmDate = trmData[0]?.vigenciadesde?.split('T')[0] || rate.date;

      setRate((prev) => ({
        ...prev,
        cop: trm,
        prevCop: prevTrm,
        date: trmDate,
        source: 'Superintendencia Financiera de Colombia',
      }));
      setLastUpdate(new Date());
    } catch {
      // silently fail, keep current rate
    }
    setLoading(false);
  };

  // Auto-refresh every 5 minutes
  useEffect(() => {
    const interval = setInterval(fetchRate, 5 * 60 * 1000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const change = rate.prevCop !== null ? rate.cop - rate.prevCop : 0;
  const isUp = change > 0;

  const handleCalc = (value: string, direction: 'usd-cop' | 'cop-usd') => {
    const num = parseFloat(value.replace(/,/g, ''));
    if (direction === 'usd-cop') {
      setCalcUSD(value);
      setCalcCOP(isNaN(num) ? '' : (num * rate.cop).toFixed(0));
    } else {
      setCalcCOP(value);
      setCalcUSD(isNaN(num) ? '' : (num / rate.cop).toFixed(2));
    }
    setCalcDirection(direction);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-surface-50 to-white">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-white to-emerald-50" />
        <div className="relative container-custom py-10 lg:py-16">
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-2 bg-green-100 text-green-700 text-sm font-bold px-4 py-1.5 rounded-full mb-4">
              <Clock className="w-4 h-4" />
              Actualización en vivo
            </span>
            <h1 className="text-3xl lg:text-5xl font-extrabold text-gray-900 font-display mb-3">
              Dólar Hoy en Colombia
            </h1>
            <p className="text-surface-600 text-lg max-w-2xl mx-auto">
              TRM oficial de la Superintendencia Financiera — Tasa Representativa del Mercado (USD/COP).
            </p>
          </div>

          {/* 3-column layout: promo | rate card | empresa */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-6 items-center max-w-6xl mx-auto">
            {/* Left: Gánale al dólar */}
            <Link href="/productos" className="hidden lg:flex flex-col items-center text-center bg-white/80 backdrop-blur rounded-2xl border border-surface-200 hover:border-primary-300 hover:shadow-lg p-8 transition-all group">
              <div className="w-16 h-16 bg-primary-50 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-primary-100 transition-colors">
                <Smartphone className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-lg font-extrabold text-gray-900 mb-2">Gánale al dólar</h3>
              <p className="text-sm text-surface-600 mb-4 leading-relaxed">
                Compra tecnología en <span className="font-bold text-primary-600">pesos colombianos</span> al mejor precio. Sin sorpresas por la tasa de cambio.
              </p>
              <div className="flex items-center gap-1 text-sm font-bold text-primary-600 group-hover:gap-2 transition-all">
                <ShoppingCart className="w-4 h-4" />
                Ver productos
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>

            {/* Center: Main rate card */}
            <div className="w-full lg:w-[420px]">
              <div className="bg-white rounded-2xl shadow-xl border border-surface-200 overflow-hidden">
                <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-5 text-white text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <DollarSign className="w-6 h-6" />
                  <span className="text-sm font-bold uppercase tracking-wider opacity-90">1 Dólar Estadounidense</span>
                </div>
                <div className="text-4xl lg:text-5xl font-extrabold tracking-tight">
                  {formatCOP(rate.cop)}
                </div>
                <div className="text-sm opacity-80 mt-1">COP — Pesos Colombianos</div>
              </div>

              <div className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    {change !== 0 ? (
                      isUp ? (
                        <span className="inline-flex items-center gap-1 text-red-600 bg-red-50 px-2.5 py-1 rounded-full text-sm font-bold">
                          <TrendingUp className="w-4 h-4" /> +{change.toFixed(2)}
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-green-600 bg-green-50 px-2.5 py-1 rounded-full text-sm font-bold">
                          <TrendingDown className="w-4 h-4" /> {change.toFixed(2)}
                        </span>
                      )
                    ) : (
                      <span className="inline-flex items-center gap-1 text-surface-500 bg-surface-100 px-2.5 py-1 rounded-full text-sm font-bold">
                        <Info className="w-4 h-4" /> Sin cambio
                      </span>
                    )}
                  </div>
                  <button
                    onClick={fetchRate}
                    disabled={loading}
                    className="flex items-center gap-1.5 text-sm font-semibold text-primary-600 hover:text-primary-700 disabled:opacity-50 transition-colors"
                  >
                    <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                    Actualizar
                  </button>
                </div>

                <div className="text-xs text-surface-500 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  TRM vigente: {rate.date}
                </div>
                <div className="text-[10px] text-surface-400 mt-1">
                  Fuente: {rate.source} — Actualizado: {lastUpdate.toLocaleTimeString('es-CO')}
                </div>
              </div>
              </div>
            </div>

            {/* Right: ¿Eres empresa? */}
            <Link href="/empresas" className="hidden lg:flex flex-col items-center text-center bg-white/80 backdrop-blur rounded-2xl border border-surface-200 hover:border-emerald-300 hover:shadow-lg p-8 transition-all group">
              <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-emerald-100 transition-colors">
                <Building2 className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-lg font-extrabold text-gray-900 mb-2">¿Eres empresa?</h3>
              <p className="text-sm text-surface-600 mb-4 leading-relaxed">
                Gánale al dólar con <span className="font-bold text-emerald-600">precios corporativos</span>. Descuentos por volumen y factura electrónica.
              </p>
              <div className="flex items-center gap-1 text-sm font-bold text-emerald-600 group-hover:gap-2 transition-all">
                <Shield className="w-4 h-4" />
                Cotizar ahora
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>

            {/* Mobile: compact CTAs below rate card */}
            <div className="grid grid-cols-2 gap-3 lg:hidden col-span-full">
              <Link href="/productos" className="flex items-center gap-2 bg-primary-50 hover:bg-primary-100 rounded-xl p-3.5 transition-colors">
                <Smartphone className="w-5 h-5 text-primary-600 shrink-0" />
                <div>
                  <p className="text-xs font-extrabold text-gray-900">Gánale al dólar</p>
                  <p className="text-[10px] text-surface-500">Compra en pesos</p>
                </div>
              </Link>
              <Link href="/empresas" className="flex items-center gap-2 bg-emerald-50 hover:bg-emerald-100 rounded-xl p-3.5 transition-colors">
                <Building2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <div>
                  <p className="text-xs font-extrabold text-gray-900">¿Eres empresa?</p>
                  <p className="text-[10px] text-surface-500">Precios corporativos</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Converter */}
      <section className="py-10 lg:py-14 bg-white border-y border-surface-200">
        <div className="container-custom max-w-2xl mx-auto">
          <h2 className="text-xl lg:text-2xl font-extrabold text-gray-900 text-center mb-6">
            Convertidor USD ↔ COP
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5">Dólares (USD)</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-400" />
                <input
                  type="text"
                  inputMode="decimal"
                  placeholder="100"
                  value={calcDirection === 'usd-cop' ? calcUSD : calcUSD}
                  onChange={(e) => handleCalc(e.target.value, 'usd-cop')}
                  className="w-full pl-10 pr-4 py-3 border border-surface-300 rounded-xl text-lg font-semibold focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5">Pesos (COP)</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400 font-bold text-sm">$</span>
                <input
                  type="text"
                  inputMode="decimal"
                  placeholder={rate.cop.toFixed(0)}
                  value={calcDirection === 'cop-usd' ? calcCOP : calcCOP}
                  onChange={(e) => handleCalc(e.target.value, 'cop-usd')}
                  className="w-full pl-10 pr-4 py-3 border border-surface-300 rounded-xl text-lg font-semibold focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                />
              </div>
            </div>
          </div>
          <p className="text-center text-xs text-surface-500 mt-3">
            Tasa utilizada: 1 USD = {formatCOP(rate.cop)}
          </p>
        </div>
      </section>

      {/* Other currencies */}
      <section className="py-10 lg:py-14 bg-surface-50">
        <div className="container-custom max-w-4xl mx-auto">
          <h2 className="text-xl lg:text-2xl font-extrabold text-gray-900 text-center mb-8">
            Dólar frente a otras monedas
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { flag: '🇨🇴', code: 'COP', name: 'Peso Colombiano', value: rate.cop },
              { flag: '🇪🇺', code: 'EUR', name: 'Euro', value: rate.eur },
              { flag: '🇧🇷', code: 'BRL', name: 'Real Brasileño', value: rate.brl },
              { flag: '🇲🇽', code: 'MXN', name: 'Peso Mexicano', value: rate.mxn },
            ].map((c) => (
              <div key={c.code} className="bg-white rounded-xl border border-surface-200 p-4 text-center hover:shadow-md transition-shadow">
                <div className="text-2xl mb-1">{c.flag}</div>
                <div className="text-xs font-bold text-surface-500 uppercase tracking-wider mb-1">{c.code}</div>
                <div className="text-lg font-extrabold text-gray-900">
                  {c.value > 100 ? c.value.toFixed(2) : c.value.toFixed(4)}
                </div>
                <div className="text-[11px] text-surface-500 mt-0.5">{c.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products promo */}
      {products.length > 0 && (
        <section className="py-12 lg:py-16 bg-white border-t border-surface-200">
          <div className="container-custom">
            <div className="text-center mb-10">
              <span className="inline-block bg-primary-50 text-primary-600 text-sm font-bold px-4 py-1.5 rounded-full mb-3">
                Aprovecha la tasa
              </span>
              <h2 className="text-2xl lg:text-3xl font-extrabold text-gray-900 font-display mb-3">
                Tecnología a precio justo en pesos colombianos
              </h2>
              <p className="text-surface-600 max-w-xl mx-auto">
                Compra tu tecnología con la tranquilidad de pagar en COP. El mejor precio garantizado sin importar la fluctuación del dólar.
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {products.map((product) => (
                <Link
                  key={product.slug}
                  href={`/producto/${product.slug}`}
                  className="group bg-white rounded-xl border border-surface-200 overflow-hidden hover:shadow-lg hover:border-primary-200 transition-all duration-300"
                >
                  <div className="relative aspect-square bg-surface-50 p-3">
                    {product.images?.[0]?.src && (
                      <Image
                        src={product.images[0].src}
                        alt={product.name}
                        fill
                        className="object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                    )}
                    {product.on_sale && (
                      <span className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                        OFERTA
                      </span>
                    )}
                  </div>
                  <div className="p-3">
                    <h3 className="text-sm font-bold text-gray-900 line-clamp-2 mb-2 group-hover:text-primary-600 transition-colors">
                      {product.name}
                    </h3>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-base font-extrabold text-primary-600">{formatPrice(product.price)}</span>
                      {rate.cop > 0 && (
                        <span className="text-xs text-surface-500">
                          ≈ {formatPriceUSD(product.price, rate.cop)} USD
                        </span>
                      )}
                      {product.on_sale && product.regular_price && (
                        <span className="text-xs text-surface-400 line-through">{formatPrice(product.regular_price)}</span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center mt-8">
              <Link
                href="/productos"
                className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-bold px-6 py-3 rounded-xl transition-colors shadow-md hover:shadow-lg"
              >
                <ShoppingCart className="w-5 h-5" />
                Ver todos los productos
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* SEO content */}
      <section className="py-10 lg:py-14 bg-surface-50 border-t border-surface-200">
        <div className="container-custom max-w-3xl mx-auto">
          <h2 className="text-xl font-extrabold text-gray-900 mb-4">¿Qué es el precio del dólar hoy en Colombia?</h2>
          <div className="prose prose-sm text-surface-700 max-w-none space-y-3">
            <p>
              El precio del dólar hoy en Colombia se refiere a la Tasa Representativa del Mercado (TRM), que es el valor oficial al que se negocia el dólar estadounidense frente al peso colombiano. Esta tasa fluctúa diariamente según la oferta y demanda en el mercado cambiario.
            </p>
            <p>
              En TecnoPhone mantenemos nuestros precios actualizados y competitivos, absorbiendo las fluctuaciones del dólar para ofrecer la mejor relación calidad-precio en tecnología. Todos nuestros productos incluyen IVA y factura electrónica DIAN.
            </p>
            <h3 className="text-lg font-bold text-gray-900 mt-6">¿Cómo afecta el dólar al precio de los celulares y portátiles?</h3>
            <p>
              Colombia importa la mayoría de sus equipos tecnológicos, por lo que el precio del dólar impacta directamente en el costo de celulares, portátiles, monitores y accesorios. Cuando el dólar sube, los precios de importación aumentan. En TecnoPhone trabajamos directamente con distribuidores autorizados para minimizar ese impacto.
            </p>
            <h3 className="text-lg font-bold text-gray-900 mt-6">¿Cuál es la mejor hora para comprar dólares?</h3>
            <p>
              La TRM se calcula con base en las operaciones del día anterior. Los movimientos más significativos suelen ocurrir entre las 8:00 AM y las 12:00 PM cuando los mercados están más activos. Sin embargo, para comprar tecnología, lo mejor es aprovechar las ofertas actuales ya que los precios pueden ajustarse con cada cambio en la tasa.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
