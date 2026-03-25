import { getProducts } from '@/lib/woocommerce';
import DolarClient from './DolarClient';

export const revalidate = 1800; // ISR: refresh every 30 min

async function fetchRate() {
  // Primary: Official Colombian TRM from datos.gov.co (Superintendencia Financiera)
  try {
    const trmRes = await fetch(
      'https://www.datos.gov.co/resource/mcec-87by.json?%24order=vigenciadesde%20DESC&%24limit=2',
      { next: { revalidate: 1800 } }
    );
    const trmData = await trmRes.json();
    const trm = parseFloat(trmData[0]?.valor);
    const prevTrm = trmData[1] ? parseFloat(trmData[1].valor) : trm;
    const trmDate = trmData[0]?.vigenciadesde?.split('T')[0] || new Date().toISOString().split('T')[0];

    // Secondary: fawazahmed0 for EUR, BRL, MXN rates
    const fxRes = await fetch(
      'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.min.json',
      { next: { revalidate: 3600 } }
    );
    const fxData = await fxRes.json();

    return {
      cop: trm,
      prevCop: prevTrm,
      eur: (fxData.usd?.eur as number) || 0,
      brl: (fxData.usd?.brl as number) || 0,
      mxn: (fxData.usd?.mxn as number) || 0,
      date: trmDate,
      source: 'Superintendencia Financiera de Colombia' as const,
    };
  } catch {
    // Fallback: exchangerate-api
    const res = await fetch('https://api.exchangerate-api.com/v4/latest/USD', {
      next: { revalidate: 1800 },
    });
    const data = await res.json();
    return {
      cop: data.rates.COP as number,
      prevCop: null as number | null,
      eur: data.rates.EUR as number,
      brl: data.rates.BRL as number,
      mxn: data.rates.MXN as number,
      date: data.date as string,
      source: 'exchangerate-api.com' as const,
    };
  }
}

export default async function DolarHoyPage() {
  const [rateData, productRes] = await Promise.all([
    fetchRate(),
    getProducts({ per_page: 8, orderby: 'date', order: 'desc' }),
  ]);

  const products = productRes.products.map((p) => ({
    name: p.name,
    slug: p.slug,
    price: p.price,
    regular_price: p.regular_price,
    images: p.images.map((img) => ({ src: img.src })),
    on_sale: p.on_sale,
  }));

  return <DolarClient initialRate={rateData} products={products} />;
}
