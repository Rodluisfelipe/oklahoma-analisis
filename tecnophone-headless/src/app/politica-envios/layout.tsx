import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Política de Envíos',
  description:
    'Política de envíos y entregas de TecnoPhone Colombia SAS. Tiempos de entrega, cobertura, condiciones y seguimiento de pedidos.',
};

export default function PoliticaEnviosLayout({ children }: { children: React.ReactNode }) {
  return children;
}
