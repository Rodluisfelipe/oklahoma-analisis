import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Términos y Condiciones',
  description:
    'Términos y condiciones de uso de TecnoPhone. Conoce las reglas de compra, envíos, garantía, devoluciones y uso de nuestra tienda en línea.',
};

export default function TerminosLayout({ children }: { children: React.ReactNode }) {
  return children;
}
