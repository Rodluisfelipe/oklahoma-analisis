'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  TrendingUp,
  ArrowRight,
  ShoppingCart,
  Calculator,
  Building2,
  Shield,
  Smartphone,
  DollarSign,
  Briefcase,
  Clock,
} from 'lucide-react';

// ===== Official minimum wage data (Decreto del Gobierno Nacional — changes every Jan 1) =====
const SALARIO_DATA = [
  { year: 2026, salario: 1750905, auxTransporte: 249095, decreto: '1469 y 1470 de 2025' },
  { year: 2025, salario: 1423500, auxTransporte: 200000, decreto: '2292 de 2024' },
  { year: 2024, salario: 1300000, auxTransporte: 162000, decreto: '2292 de 2023' },
  { year: 2023, salario: 1160000, auxTransporte: 140606, decreto: '2613 de 2022' },
  { year: 2022, salario: 1000000, auxTransporte: 117172, decreto: '1724 de 2021' },
  { year: 2021, salario: 908526, auxTransporte: 106454, decreto: '1785 de 2020' },
  { year: 2020, salario: 877803, auxTransporte: 102854, decreto: '2360 de 2019' },
  { year: 2019, salario: 828116, auxTransporte: 97032, decreto: '2451 de 2018' },
  { year: 2018, salario: 781242, auxTransporte: 88211, decreto: '2269 de 2017' },
  { year: 2017, salario: 737717, auxTransporte: 83140, decreto: '2209 de 2016' },
  { year: 2016, salario: 689455, auxTransporte: 77700, decreto: '2552 de 2015' },
];

const CURRENT = SALARIO_DATA[0];
const PREVIOUS = SALARIO_DATA[1];
const INCREMENT = PREVIOUS.salario > 0 
  ? ((CURRENT.salario - PREVIOUS.salario) / PREVIOUS.salario * 100) 
  : 0;

// Deductions: employee pays 4% health + 4% pension = 8%
const DEDUCTION_RATE = 0.08;

interface Product {
  name: string;
  slug: string;
  price: string;
  regular_price: string;
  images: { src: string }[];
  on_sale: boolean;
}

interface SalarioClientProps {
  products: Product[];
}

function formatCOP(value: number) {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

function formatPrice(price: string) {
  const num = parseFloat(price);
  if (isNaN(num)) return price;
  return formatCOP(num);
}

export default function SalarioClient({ products }: SalarioClientProps) {
  const [userSalary, setUserSalary] = useState('');
  const [showResults, setShowResults] = useState(false);

  const totalIngreso = CURRENT.salario + CURRENT.auxTransporte;
  const deduccion = Math.round(CURRENT.salario * DEDUCTION_RATE);
  const neto = totalIngreso - deduccion;
  const porDia = Math.round(CURRENT.salario / 30);
  const porHora = Math.round(CURRENT.salario / 240);

  // Calculator
  const userNum = parseFloat(userSalary.replace(/[.,]/g, ''));
  const salarioMinimos = !isNaN(userNum) ? userNum / CURRENT.salario : 0;
  const userDeduccion = !isNaN(userNum) ? Math.round(userNum * DEDUCTION_RATE) : 0;
  const userNeto = !isNaN(userNum) ? userNum - userDeduccion : 0;
  const userPorDia = !isNaN(userNum) ? Math.round(userNum / 30) : 0;
  const userPorHora = !isNaN(userNum) ? Math.round(userNum / 240) : 0;

  // Products by salary range
  const under1Salary = products.filter(p => parseFloat(p.price) <= CURRENT.salario);
  const under2Salary = products.filter(p => {
    const price = parseFloat(p.price);
    return price > CURRENT.salario && price <= CURRENT.salario * 2;
  });
  const allAffordable = products.filter(p => parseFloat(p.price) <= CURRENT.salario * 2);

  return (
    <div className="min-h-screen bg-gradient-to-b from-surface-50 to-white">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50" />
        <div className="relative container-custom py-10 lg:py-16">
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 text-sm font-bold px-4 py-1.5 rounded-full mb-4">
              <Briefcase className="w-4 h-4" />
              Dato oficial {CURRENT.year}
            </span>
            <h1 className="text-3xl lg:text-5xl font-extrabold text-gray-900 font-display mb-3">
              Salario Mínimo {CURRENT.year} en Colombia
            </h1>
            <p className="text-surface-600 text-lg max-w-2xl mx-auto">
              Salario Vital según Decretos {CURRENT.decreto} del Gobierno Nacional. Total mensual: <strong className="text-gray-900">{formatCOP(totalIngreso)}</strong>.
            </p>
          </div>

          {/* 3-column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-6 items-center max-w-6xl mx-auto">
            {/* Left: Equípate */}
            <Link href="/productos" className="hidden lg:flex flex-col items-center text-center bg-white/80 backdrop-blur rounded-2xl border border-surface-200 hover:border-primary-300 hover:shadow-lg p-8 transition-all group">
              <div className="w-16 h-16 bg-primary-50 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-primary-100 transition-colors">
                <Smartphone className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-lg font-extrabold text-gray-900 mb-2">Equípate con tu salario</h3>
              <p className="text-sm text-surface-600 mb-4 leading-relaxed">
                Tecnología desde <span className="font-bold text-primary-600">menos de 1 SMLV</span>. Portátiles, celulares y más al mejor precio.
              </p>
              <div className="flex items-center gap-1 text-sm font-bold text-primary-600 group-hover:gap-2 transition-all">
                <ShoppingCart className="w-4 h-4" />
                Ver productos
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>

            {/* Center: Main card */}
            <div className="w-full lg:w-[440px]">
              <div className="bg-white rounded-2xl shadow-xl border border-surface-200 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-5 text-white text-center">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <DollarSign className="w-6 h-6" />
                    <span className="text-sm font-bold uppercase tracking-wider opacity-90">Salario Mínimo Mensual</span>
                  </div>
                  <div className="text-4xl lg:text-5xl font-extrabold tracking-tight">
                    {formatCOP(CURRENT.salario)}
                  </div>
                  <div className="text-sm opacity-80 mt-1">SMLV {CURRENT.year}</div>
                </div>

                <div className="p-5 space-y-3">
                  {/* Increment badge */}
                  {INCREMENT > 0 && (
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-1 text-green-600 bg-green-50 px-2.5 py-1 rounded-full text-sm font-bold">
                        <TrendingUp className="w-4 h-4" /> +{INCREMENT.toFixed(1)}% vs {PREVIOUS.year}
                      </span>
                      <span className="text-xs text-surface-500">+{formatCOP(CURRENT.salario - PREVIOUS.salario)}</span>
                    </div>
                  )}

                  {/* Breakdown */}
                  <div className="bg-surface-50 rounded-xl p-4 space-y-2.5">
                    <div className="flex justify-between text-sm">
                      <span className="text-surface-600">Salario base</span>
                      <span className="font-bold text-gray-900">{formatCOP(CURRENT.salario)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-surface-600">Auxilio de transporte</span>
                      <span className="font-bold text-gray-900">+{formatCOP(CURRENT.auxTransporte)}</span>
                    </div>
                    <div className="border-t border-surface-200 pt-2 flex justify-between text-sm">
                      <span className="font-bold text-gray-900">Total devengado</span>
                      <span className="font-extrabold text-blue-600">{formatCOP(totalIngreso)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-red-500">Deducciones (salud + pensión 8%)</span>
                      <span className="font-bold text-red-500">-{formatCOP(deduccion)}</span>
                    </div>
                    <div className="border-t border-surface-200 pt-2 flex justify-between text-sm">
                      <span className="font-bold text-gray-900">Neto a recibir</span>
                      <span className="font-extrabold text-green-600">{formatCOP(neto)}</span>
                    </div>
                  </div>

                  {/* Per day/hour */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-blue-50 rounded-lg p-2.5 text-center">
                      <div className="text-xs text-blue-600 font-bold">Por día</div>
                      <div className="text-lg font-extrabold text-gray-900">{formatCOP(porDia)}</div>
                    </div>
                    <div className="bg-indigo-50 rounded-lg p-2.5 text-center">
                      <div className="text-xs text-indigo-600 font-bold">Por hora</div>
                      <div className="text-lg font-extrabold text-gray-900">{formatCOP(porHora)}</div>
                    </div>
                  </div>

                  <div className="text-[10px] text-surface-400 mt-1">
                    Decreto {CURRENT.decreto} — Gobierno de Colombia
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
                Equipa a tus empleados con <span className="font-bold text-emerald-600">precios corporativos</span>. Descuentos por volumen y factura DIAN.
              </p>
              <div className="flex items-center gap-1 text-sm font-bold text-emerald-600 group-hover:gap-2 transition-all">
                <Shield className="w-4 h-4" />
                Cotizar ahora
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>

            {/* Mobile CTAs */}
            <div className="grid grid-cols-2 gap-3 lg:hidden col-span-full">
              <Link href="/productos" className="flex items-center gap-2 bg-primary-50 hover:bg-primary-100 rounded-xl p-3.5 transition-colors">
                <Smartphone className="w-5 h-5 text-primary-600 shrink-0" />
                <div>
                  <p className="text-xs font-extrabold text-gray-900">Equípate</p>
                  <p className="text-[10px] text-surface-500">Desde &lt;1 SMLV</p>
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

      {/* Calculator */}
      <section className="py-10 lg:py-14 bg-white border-y border-surface-200">
        <div className="container-custom max-w-2xl mx-auto">
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-700 text-sm font-bold px-4 py-1.5 rounded-full mb-3">
              <Calculator className="w-4 h-4" />
              Calculadora
            </div>
            <h2 className="text-xl lg:text-2xl font-extrabold text-gray-900">
              ¿Cuántos salarios mínimos ganas?
            </h2>
          </div>

          <div className="max-w-md mx-auto">
            <label className="block text-sm font-bold text-gray-700 mb-1.5">Tu salario mensual (COP)</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400 font-bold text-sm">$</span>
              <input
                type="text"
                inputMode="numeric"
                placeholder="2.500.000"
                value={userSalary}
                onChange={(e) => {
                  setUserSalary(e.target.value);
                  setShowResults(e.target.value.length > 0);
                }}
                className="w-full pl-8 pr-4 py-3 border border-surface-300 rounded-xl text-lg font-semibold focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>

            {showResults && salarioMinimos > 0 && (
              <div className="mt-4 bg-blue-50 rounded-xl p-5 space-y-3 animate-in fade-in">
                <div className="text-center">
                  <div className="text-3xl font-extrabold text-blue-600">{salarioMinimos.toFixed(1)}x</div>
                  <div className="text-sm text-surface-600">salarios mínimos</div>
                </div>
                <div className="grid grid-cols-2 gap-3 text-center">
                  <div className="bg-white rounded-lg p-2.5">
                    <div className="text-xs text-surface-500">Por día</div>
                    <div className="font-bold text-gray-900">{formatCOP(userPorDia)}</div>
                  </div>
                  <div className="bg-white rounded-lg p-2.5">
                    <div className="text-xs text-surface-500">Por hora</div>
                    <div className="font-bold text-gray-900">{formatCOP(userPorHora)}</div>
                  </div>
                </div>
                <div className="flex justify-between text-sm border-t border-blue-100 pt-2">
                  <span className="text-surface-600">Deducciones (8%)</span>
                  <span className="font-bold text-red-500">-{formatCOP(userDeduccion)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="font-bold text-gray-900">Neto estimado</span>
                  <span className="font-extrabold text-green-600">{formatCOP(userNeto)}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Historical table */}
      <section className="py-10 lg:py-14 bg-surface-50">
        <div className="container-custom max-w-3xl mx-auto">
          <h2 className="text-xl lg:text-2xl font-extrabold text-gray-900 text-center mb-8">
            Salario Mínimo — Histórico Colombia
          </h2>
          <div className="bg-white rounded-2xl border border-surface-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-surface-50 border-b border-surface-200">
                    <th className="text-left font-bold text-gray-900 px-4 py-3">Año</th>
                    <th className="text-right font-bold text-gray-900 px-4 py-3">SMLV</th>
                    <th className="text-right font-bold text-gray-900 px-4 py-3">Aux. Transporte</th>
                    <th className="text-right font-bold text-gray-900 px-4 py-3">Total</th>
                    <th className="text-right font-bold text-gray-900 px-4 py-3">Incremento</th>
                  </tr>
                </thead>
                <tbody>
                  {SALARIO_DATA.map((row, i) => {
                    const prev = SALARIO_DATA[i + 1];
                    const inc = prev ? ((row.salario - prev.salario) / prev.salario * 100) : 0;
                    return (
                      <tr key={row.year} className={`border-b border-surface-100 ${i === 0 ? 'bg-blue-50/50 font-bold' : 'hover:bg-surface-50'}`}>
                        <td className="px-4 py-2.5 font-bold text-gray-900">
                          {row.year}
                          {i === 0 && <span className="ml-1.5 text-[10px] bg-blue-600 text-white px-1.5 py-0.5 rounded-full">Vigente</span>}
                        </td>
                        <td className="px-4 py-2.5 text-right text-gray-900">{formatCOP(row.salario)}</td>
                        <td className="px-4 py-2.5 text-right text-surface-600">{formatCOP(row.auxTransporte)}</td>
                        <td className="px-4 py-2.5 text-right font-bold text-gray-900">{formatCOP(row.salario + row.auxTransporte)}</td>
                        <td className="px-4 py-2.5 text-right">
                          {inc > 0 && (
                            <span className="inline-flex items-center gap-0.5 text-green-600 font-bold text-xs">
                              <TrendingUp className="w-3 h-3" /> +{inc.toFixed(1)}%
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Products by salary range */}
      {allAffordable.length > 0 && (
        <section className="py-12 lg:py-16 bg-white border-t border-surface-200">
          <div className="container-custom">
            <div className="text-center mb-10">
              <span className="inline-block bg-primary-50 text-primary-600 text-sm font-bold px-4 py-1.5 rounded-full mb-3">
                Poder adquisitivo
              </span>
              <h2 className="text-2xl lg:text-3xl font-extrabold text-gray-900 font-display mb-3">
                ¿Qué tecnología puedes comprar con tu salario?
              </h2>
              <p className="text-surface-600 max-w-xl mx-auto">
                Productos disponibles por rango de salario mínimo. Todos con factura electrónica DIAN y garantía oficial.
              </p>
            </div>

            {/* Under 1 SMLV */}
            {under1Salary.length > 0 && (
              <div className="mb-10">
                <h3 className="text-lg font-extrabold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full">Menos de 1 SMLV</span>
                  Hasta {formatCOP(CURRENT.salario)}
                </h3>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {under1Salary.slice(0, 4).map((product) => (
                    <Link
                      key={product.slug}
                      href={`/producto/${product.slug}`}
                      className="group bg-white rounded-xl border border-surface-200 overflow-hidden hover:shadow-lg hover:border-primary-200 transition-all duration-300"
                    >
                      <div className="relative aspect-square bg-surface-50 p-3">
                        {product.images?.[0]?.src && (
                          <Image src={product.images[0].src} alt={product.name} fill className="object-contain p-2 group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 50vw, 25vw" />
                        )}
                        {product.on_sale && <span className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">OFERTA</span>}
                      </div>
                      <div className="p-3">
                        <h4 className="text-sm font-bold text-gray-900 line-clamp-2 mb-2 group-hover:text-primary-600 transition-colors">{product.name}</h4>
                        <span className="text-base font-extrabold text-primary-600">{formatPrice(product.price)}</span>
                        <div className="text-xs text-surface-500">= {(parseFloat(product.price) / CURRENT.salario).toFixed(1)} SMLV</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* 1-2 SMLV */}
            {under2Salary.length > 0 && (
              <div className="mb-10">
                <h3 className="text-lg font-extrabold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full">1 a 2 SMLV</span>
                  {formatCOP(CURRENT.salario)} — {formatCOP(CURRENT.salario * 2)}
                </h3>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {under2Salary.slice(0, 4).map((product) => (
                    <Link
                      key={product.slug}
                      href={`/producto/${product.slug}`}
                      className="group bg-white rounded-xl border border-surface-200 overflow-hidden hover:shadow-lg hover:border-primary-200 transition-all duration-300"
                    >
                      <div className="relative aspect-square bg-surface-50 p-3">
                        {product.images?.[0]?.src && (
                          <Image src={product.images[0].src} alt={product.name} fill className="object-contain p-2 group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 50vw, 25vw" />
                        )}
                        {product.on_sale && <span className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">OFERTA</span>}
                      </div>
                      <div className="p-3">
                        <h4 className="text-sm font-bold text-gray-900 line-clamp-2 mb-2 group-hover:text-primary-600 transition-colors">{product.name}</h4>
                        <span className="text-base font-extrabold text-primary-600">{formatPrice(product.price)}</span>
                        <div className="text-xs text-surface-500">= {(parseFloat(product.price) / CURRENT.salario).toFixed(1)} SMLV</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <div className="text-center">
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
          <h2 className="text-xl font-extrabold text-gray-900 mb-4">¿Cuánto es el salario mínimo en Colombia en {CURRENT.year}?</h2>
          <div className="prose prose-sm text-surface-700 max-w-none space-y-3">
            <p>
              El salario mínimo en Colombia para {CURRENT.year} es de <strong>{formatCOP(CURRENT.salario)}</strong> pesos mensuales, 
              según el Decreto {CURRENT.decreto} del Gobierno Nacional. Sumando el auxilio de transporte 
              de {formatCOP(CURRENT.auxTransporte)}, el ingreso total para un trabajador que devenga el mínimo 
              es de <strong>{formatCOP(totalIngreso)}</strong> mensuales.
            </p>
            <h3 className="text-lg font-bold text-gray-900 mt-6">¿Qué descuentos se aplican al salario mínimo?</h3>
            <p>
              Todo trabajador en Colombia debe aportar un 4% de su salario básico a salud y un 4% a pensión, 
              para un total de 8% en descuentos. Esto significa que de un salario mínimo de {formatCOP(CURRENT.salario)}, 
              se descuentan {formatCOP(deduccion)}, quedando un neto aproximado de <strong>{formatCOP(neto)}</strong>.
            </p>
            <h3 className="text-lg font-bold text-gray-900 mt-6">¿Cuándo aumenta el salario mínimo?</h3>
            <p>
              El salario mínimo en Colombia se negocia entre el Gobierno, los sindicatos y los empresarios durante 
              noviembre y diciembre de cada año. Si no hay acuerdo, el Gobierno lo fija por decreto antes del 30 de diciembre. 
              El nuevo salario entra en vigencia el 1 de enero del año siguiente.
            </p>
            <h3 className="text-lg font-bold text-gray-900 mt-6">¿Cómo aprovechar tu salario en tecnología?</h3>
            <p>
              En TecnoPhone ofrecemos equipos tecnológicos desde menos de un salario mínimo. Todos nuestros productos 
              incluyen factura electrónica DIAN (válida para deducción de impuestos), garantía oficial del fabricante 
              y envío a toda Colombia. Compara precios y aprovecha las ofertas disponibles.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
