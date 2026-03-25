import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Salario Mínimo 2026 en Colombia — $1.750.905 SMLV Vigente | TecnoPhone',
  description:
    'Consulta el salario mínimo 2026 en Colombia: $1.750.905 COP (salario vital, +23%). Calculadora salarial, tabla histórica, auxilio de transporte $249.095 y deducciones. Total a recibir: $2.000.000.',
  keywords: [
    'salario mínimo 2026',
    'salario mínimo colombia',
    'salario vital 2026',
    'salario vital colombia',
    'smlv 2026',
    'salario mínimo colombia 2026',
    'auxilio de transporte 2026',
    'cuánto es el salario mínimo',
    'calculadora salario mínimo',
    'salario mínimo histórico colombia',
    'decreto 1469 de 2025',
  ],
  openGraph: {
    title: 'Salario Mínimo 2026 en Colombia — $1.750.905 (Salario Vital)',
    description:
      'Salario mínimo vital 2026: $1.750.905 + auxilio $249.095 = $2.000.000. Calculadora salarial y tecnología al alcance de tu bolsillo.',
    type: 'website',
  },
};

export default function SalarioMinimoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
