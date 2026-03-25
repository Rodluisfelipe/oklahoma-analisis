import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Política de Privacidad',
  description:
    'Política de privacidad de TecnoPhone Colombia SAS. Conoce cómo protegemos y utilizamos tu información personal.',
};

export default function PoliticaPrivacidadLayout({ children }: { children: React.ReactNode }) {
  return children;
}
