import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Derecho de Retracto y Devoluciones',
  description:
    'Política de devoluciones y derecho de retracto de TecnoPhone Colombia SAS. Artículo 47, Ley 1480 de 2011. Cambios, reembolsos y condiciones.',
};

export default function DerechoRetractoLayout({ children }: { children: React.ReactNode }) {
  return children;
}
