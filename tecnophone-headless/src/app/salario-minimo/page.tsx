import { getProducts } from '@/lib/woocommerce';
import SalarioClient from './SalarioClient';

export const revalidate = 86400; // ISR: refresh daily

export default async function SalarioMinimoPage() {
  const productRes = await getProducts({ per_page: 20, orderby: 'price', order: 'asc' });

  const products = productRes.products.map((p) => ({
    name: p.name,
    slug: p.slug,
    price: p.price,
    regular_price: p.regular_price,
    images: p.images.map((img) => ({ src: img.src })),
    on_sale: p.on_sale,
  }));

  return <SalarioClient products={products} />;
}
