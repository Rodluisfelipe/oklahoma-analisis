import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dólar Hoy en Colombia — Precio en Tiempo Real | TecnoPhone',
  description:
    'Consulta el precio del dólar hoy en Colombia (USD/COP) en tiempo real. Convertidor de divisas, tasa actualizada y tecnología al mejor precio en pesos colombianos.',
  keywords: [
    'dólar hoy',
    'dólar hoy colombia',
    'precio dólar colombia',
    'trm hoy',
    'tasa de cambio',
    'usd cop',
    'dólar en pesos colombianos',
    'convertidor dólar a pesos',
  ],
  openGraph: {
    title: 'Dólar Hoy en Colombia — Precio en Tiempo Real',
    description:
      'Precio del dólar actualizado en tiempo real y tecnología al mejor precio en Colombia.',
    type: 'website',
  },
};

export default function DolarHoyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
