import Link from 'next/link';
import {
  ShieldCheck,
  FileText,
  Truck,
  CreditCard,
  RotateCcw,
  AlertTriangle,
  Scale,
  Lock,
  UserCheck,
  MessageCircle,
  ChevronRight,
  ArrowLeft,
} from 'lucide-react';

export const revalidate = 86400;

const LAST_UPDATED = '25 de marzo de 2026';

const sections = [
  { id: 'generales', label: 'Condiciones Generales', icon: FileText },
  { id: 'productos', label: 'Productos y Precios', icon: ShieldCheck },
  { id: 'pagos', label: 'Métodos de Pago', icon: CreditCard },
  { id: 'envios', label: 'Envíos y Entregas', icon: Truck },
  { id: 'garantia', label: 'Garantía', icon: ShieldCheck },
  { id: 'devoluciones', label: 'Devoluciones y Retracto', icon: RotateCcw },
  { id: 'privacidad', label: 'Privacidad y Datos', icon: Lock },
  { id: 'propiedad', label: 'Propiedad Intelectual', icon: Scale },
  { id: 'responsabilidad', label: 'Limitación de Responsabilidad', icon: AlertTriangle },
  { id: 'modificaciones', label: 'Modificaciones', icon: FileText },
  { id: 'contacto', label: 'Contacto', icon: MessageCircle },
];

export default function TerminosCondicionesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-surface-50 to-white">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50" />
        <div className="relative container-custom py-12 lg:py-16">
          <div className="max-w-3xl mx-auto">
            <Link
              href="/"
              className="inline-flex items-center gap-1 text-sm text-surface-500 hover:text-primary-600 transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Volver al inicio
            </Link>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <Scale className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl lg:text-4xl font-extrabold text-gray-900 font-display">
                  Términos y Condiciones
                </h1>
                <p className="text-sm text-surface-500 mt-1">Última actualización: {LAST_UPDATED}</p>
              </div>
            </div>
            <p className="text-surface-600 text-lg leading-relaxed">
              Al utilizar el sitio web de <strong>TecnoPhone</strong> (tecnophone.co) y realizar compras,
              aceptas los siguientes términos y condiciones. Te invitamos a leerlos detenidamente.
            </p>
          </div>
        </div>
      </section>

      {/* Table of contents (mobile-friendly) */}
      <section className="border-y border-surface-200 bg-white">
        <div className="container-custom py-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-sm font-bold text-surface-500 uppercase tracking-widest mb-4">Contenido</h2>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
              {sections.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    className="flex items-center gap-2 text-sm text-surface-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg px-3 py-2 transition-colors"
                  >
                    <Icon className="w-4 h-4 text-surface-400 shrink-0" />
                    <span className="truncate">{s.label}</span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-10 lg:py-14">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto space-y-12">

            {/* 1. Condiciones Generales */}
            <div id="generales" className="scroll-mt-24">
              <SectionHeader icon={FileText} number="1" title="Condiciones Generales" />
              <div className="mt-4 space-y-3 text-surface-700 text-[15px] leading-relaxed">
                <p>
                  Estos términos y condiciones regulan el uso del sitio web <strong>tecnophone.co</strong> y las
                  transacciones comerciales realizadas a través del mismo. TecnoPhone es una tienda de comercio
                  electrónico registrada en Colombia, ubicada en Chía, Cundinamarca.
                </p>
                <p>
                  Al navegar, registrarse o realizar una compra en nuestro sitio, el usuario declara que ha leído,
                  entendido y aceptado la totalidad de estos términos. Si no está de acuerdo con alguna de estas
                  condiciones, le solicitamos abstenerse de utilizar el sitio.
                </p>
                <InfoCard>
                  Para realizar una compra, el usuario debe ser mayor de 18 años o contar con autorización de un
                  representante legal.
                </InfoCard>
              </div>
            </div>

            {/* 2. Productos y Precios */}
            <div id="productos" className="scroll-mt-24">
              <SectionHeader icon={ShieldCheck} number="2" title="Productos y Precios" />
              <div className="mt-4 space-y-3 text-surface-700 text-[15px] leading-relaxed">
                <p>
                  Todos los productos ofrecidos en TecnoPhone son <strong>100% originales y nuevos</strong>, con
                  empaque sellado de fábrica. Cada producto incluye factura electrónica validada por la DIAN
                  (Dirección de Impuestos y Aduanas Nacionales de Colombia).
                </p>
                <BulletList items={[
                  'Los precios publicados están expresados en Pesos Colombianos (COP) e incluyen IVA.',
                  'Los precios pueden cambiar sin previo aviso según disponibilidad y condiciones del mercado.',
                  'Las imágenes de los productos son referenciales. Las características técnicas prevalecen sobre las fotografías.',
                  'La disponibilidad de los productos está sujeta a stock al momento de confirmar el pedido.',
                  'En caso de agotamiento posterior a la compra, nos comunicaremos para ofrecer una alternativa o realizar el reembolso total.',
                ]} />
              </div>
            </div>

            {/* 3. Métodos de Pago */}
            <div id="pagos" className="scroll-mt-24">
              <SectionHeader icon={CreditCard} number="3" title="Métodos de Pago" />
              <div className="mt-4 space-y-3 text-surface-700 text-[15px] leading-relaxed">
                <p>
                  TecnoPhone acepta los siguientes métodos de pago, procesados de forma segura a través de
                  <strong> MercadoPago</strong> y transferencia bancaria directa:
                </p>
                <div className="grid grid-cols-2 gap-3 my-4">
                  {[
                    { name: 'Tarjeta de crédito', desc: 'Visa, Mastercard, Amex — hasta 12 cuotas' },
                    { name: 'Tarjeta débito', desc: 'Pago directo desde tu cuenta' },
                    { name: 'Nequi', desc: 'Vía MercadoPago, sin costo adicional' },
                    { name: 'PSE / Transferencia', desc: 'Bancolombia y otros bancos' },
                  ].map((m) => (
                    <div key={m.name} className="bg-surface-50 rounded-xl p-3 border border-surface-100">
                      <p className="font-bold text-sm text-gray-900">{m.name}</p>
                      <p className="text-xs text-surface-500 mt-0.5">{m.desc}</p>
                    </div>
                  ))}
                </div>
                <p>
                  Las transacciones con tarjeta de crédito y débito están protegidas por los protocolos de
                  seguridad de MercadoPago. TecnoPhone no almacena datos de tarjetas de crédito ni información
                  bancaria de los usuarios.
                </p>
                <InfoCard>
                  El pedido se procesa una vez confirmado el pago. En caso de transferencia bancaria, el
                  procesamiento inicia tras la verificación del depósito (máximo 24 horas hábiles).
                </InfoCard>
              </div>
            </div>

            {/* 4. Envíos y Entregas */}
            <div id="envios" className="scroll-mt-24">
              <SectionHeader icon={Truck} number="4" title="Envíos y Entregas" />
              <div className="mt-4 space-y-3 text-surface-700 text-[15px] leading-relaxed">
                <p>
                  Realizamos envíos a <strong>todo el territorio colombiano</strong> a través de transportadoras
                  certificadas. El envío es gratuito en todos los pedidos.
                </p>
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 my-4">
                  <h4 className="font-bold text-sm text-blue-900 mb-2">Tiempos de entrega estimados</h4>
                  <div className="space-y-1.5 text-sm text-blue-800">
                    <div className="flex justify-between">
                      <span>Ciudades principales (Bogotá, Medellín, Cali, etc.)</span>
                      <span className="font-bold">1-2 días hábiles</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Ciudades intermedias</span>
                      <span className="font-bold">2-3 días hábiles</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Municipios y zonas rurales</span>
                      <span className="font-bold">3-5 días hábiles</span>
                    </div>
                  </div>
                </div>
                <BulletList items={[
                  'Una vez despachado el pedido, el cliente recibe por correo electrónico y WhatsApp el número de guía para rastrear su envío.',
                  'Los tiempos de entrega son estimados y pueden variar por condiciones logísticas, climáticas o de fuerza mayor.',
                  'El cliente es responsable de proporcionar datos de entrega correctos (dirección, ciudad, teléfono). TecnoPhone no se hace responsable por errores en los datos suministrados.',
                  'En caso de ausencia del destinatario, la transportadora realizará hasta 2 intentos de entrega adicionales.',
                ]} />
              </div>
            </div>

            {/* 5. Garantía */}
            <div id="garantia" className="scroll-mt-24">
              <SectionHeader icon={ShieldCheck} number="5" title="Garantía" />
              <div className="mt-4 space-y-3 text-surface-700 text-[15px] leading-relaxed">
                <p>
                  Todos los productos vendidos por TecnoPhone cuentan con <strong>garantía oficial del
                  fabricante</strong>, de conformidad con lo establecido en el Estatuto del Consumidor
                  (Ley 1480 de 2011).
                </p>
                <BulletList items={[
                  'El tiempo de garantía varía según el producto y la marca (generalmente entre 6 meses y 2 años).',
                  'La garantía cubre defectos de fábrica y malfuncionamiento bajo uso normal.',
                  'No cubre daños por mal uso, caídas, contacto con líquidos, modificaciones no autorizadas o desgaste natural.',
                  'Para hacer efectiva la garantía, el cliente debe presentar la factura electrónica y contactarnos por WhatsApp.',
                  'TecnoPhone gestionará la garantía directamente con el fabricante o servicio técnico autorizado.',
                ]} />
                <InfoCard>
                  Conserva tu factura electrónica DIAN. Es el documento que respalda tu compra y es
                  indispensable para cualquier trámite de garantía.
                </InfoCard>
              </div>
            </div>

            {/* 6. Devoluciones y Derecho de Retracto */}
            <div id="devoluciones" className="scroll-mt-24">
              <SectionHeader icon={RotateCcw} number="6" title="Devoluciones y Derecho de Retracto" />
              <div className="mt-4 space-y-3 text-surface-700 text-[15px] leading-relaxed">
                <p>
                  De acuerdo con el <strong>Artículo 47 de la Ley 1480 de 2011</strong> (Estatuto del Consumidor),
                  el comprador tiene derecho al retracto dentro de los <strong>5 días hábiles</strong> siguientes
                  a la entrega del producto, sin necesidad de justificar su decisión.
                </p>

                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 my-4">
                  <h4 className="font-bold text-sm text-amber-900 mb-2 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    Condiciones para el retracto
                  </h4>
                  <ul className="space-y-1.5 text-sm text-amber-800">
                    <li className="flex items-start gap-2">
                      <ChevronRight className="w-3 h-3 mt-1 shrink-0" />
                      <span>El producto debe estar en su empaque original, sin uso y en perfecto estado.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="w-3 h-3 mt-1 shrink-0" />
                      <span>Deben incluirse todos los accesorios, manuales y elementos que venían con el producto.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="w-3 h-3 mt-1 shrink-0" />
                      <span>El costo del envío de devolución está a cargo del comprador.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="w-3 h-3 mt-1 shrink-0" />
                      <span>El reembolso se realiza dentro de los 30 días calendario siguientes a la recepción del producto devuelto.</span>
                    </li>
                  </ul>
                </div>

                <p>
                  Para ejercer el derecho de retracto, contacta a nuestro equipo por WhatsApp al
                  <strong> +57 313 229 4533</strong> o al correo <strong>ventas@tecnophone.co</strong> indicando
                  tu número de pedido y motivo de devolución.
                </p>

                <p>
                  <strong>Productos que no admiten retracto</strong> según la Ley 1480 de 2011: productos
                  perecederos, bienes confeccionados conforme a especificaciones del consumidor, productos de
                  audio o video desprecintados, y software descargado o activado.
                </p>
              </div>
            </div>

            {/* 7. Privacidad y Datos Personales */}
            <div id="privacidad" className="scroll-mt-24">
              <SectionHeader icon={Lock} number="7" title="Privacidad y Datos Personales" />
              <div className="mt-4 space-y-3 text-surface-700 text-[15px] leading-relaxed">
                <p>
                  TecnoPhone se compromete a proteger la información personal de sus usuarios de acuerdo con la
                  <strong> Ley 1581 de 2012</strong> (Ley de Protección de Datos Personales) y el
                  <strong> Decreto 1377 de 2013</strong>.
                </p>
                <BulletList items={[
                  'Los datos personales recopilados (nombre, correo, teléfono, dirección) se utilizan exclusivamente para procesar pedidos, envíos y comunicaciones relacionadas con la compra.',
                  'No compartimos ni vendemos información personal a terceros, excepto cuando sea necesario para la entrega (transportadoras) o el procesamiento del pago (MercadoPago).',
                  'El usuario puede solicitar la actualización, rectificación o eliminación de sus datos en cualquier momento escribiendo a ventas@tecnophone.co.',
                  'Utilizamos protocolos de seguridad SSL/TLS para proteger la transmisión de datos en nuestro sitio web.',
                ]} />
              </div>
            </div>

            {/* 8. Propiedad Intelectual */}
            <div id="propiedad" className="scroll-mt-24">
              <SectionHeader icon={Scale} number="8" title="Propiedad Intelectual" />
              <div className="mt-4 space-y-3 text-surface-700 text-[15px] leading-relaxed">
                <p>
                  Todo el contenido del sitio web tecnophone.co, incluyendo pero no limitado a textos, imágenes,
                  logotipos, diseño, código fuente y estructura, es propiedad de TecnoPhone o se utiliza bajo
                  licencia autorizada.
                </p>
                <p>
                  Queda prohibida la reproducción, distribución, modificación o uso comercial del contenido sin
                  autorización previa y por escrito de TecnoPhone. Las marcas de los productos (Xiaomi, Motorola,
                  Dell, HP, Lenovo, Samsung, Logitech, entre otras) pertenecen a sus respectivos titulares.
                </p>
              </div>
            </div>

            {/* 9. Limitación de Responsabilidad */}
            <div id="responsabilidad" className="scroll-mt-24">
              <SectionHeader icon={AlertTriangle} number="9" title="Limitación de Responsabilidad" />
              <div className="mt-4 space-y-3 text-surface-700 text-[15px] leading-relaxed">
                <BulletList items={[
                  'TecnoPhone no será responsable por daños indirectos, incidentales o consecuentes derivados del uso o la imposibilidad de uso del sitio web.',
                  'No garantizamos que el sitio esté disponible de forma ininterrumpida o libre de errores técnicos.',
                  'Las opiniones expresadas por usuarios o en secciones de blog no representan la posición oficial de TecnoPhone.',
                  'No somos responsables por demoras en la entrega causadas por la transportadora, condiciones climáticas, paros, desastres naturales u otros eventos de fuerza mayor.',
                  'La responsabilidad máxima de TecnoPhone en cualquier reclamación estará limitada al valor del producto adquirido.',
                ]} />
              </div>
            </div>

            {/* 10. Modificaciones */}
            <div id="modificaciones" className="scroll-mt-24">
              <SectionHeader icon={FileText} number="10" title="Modificaciones a estos Términos" />
              <div className="mt-4 space-y-3 text-surface-700 text-[15px] leading-relaxed">
                <p>
                  TecnoPhone se reserva el derecho de modificar estos términos y condiciones en cualquier momento.
                  Los cambios entrarán en vigencia desde su publicación en el sitio web. Es responsabilidad del
                  usuario consultar periódicamente esta página.
                </p>
                <p>
                  El uso continuado del sitio web después de publicados los cambios constituye la aceptación de
                  los nuevos términos.
                </p>
              </div>
            </div>

            {/* 11. Contacto */}
            <div id="contacto" className="scroll-mt-24">
              <SectionHeader icon={MessageCircle} number="11" title="Contacto" />
              <div className="mt-4 space-y-3 text-surface-700 text-[15px] leading-relaxed">
                <p>
                  Para cualquier consulta, queja o reclamación relacionada con estos términos y condiciones,
                  puedes comunicarte con nosotros:
                </p>
                <div className="bg-surface-50 rounded-xl border border-surface-200 p-5 my-4 space-y-3">
                  <div className="flex items-center gap-3">
                    <UserCheck className="w-5 h-5 text-primary-600 shrink-0" />
                    <div>
                      <p className="text-sm font-bold text-gray-900">TecnoPhone</p>
                      <p className="text-xs text-surface-500">Chía, Cundinamarca, Colombia</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MessageCircle className="w-5 h-5 text-green-600 shrink-0" />
                    <div>
                      <p className="text-sm font-bold text-gray-900">WhatsApp</p>
                      <a href="https://wa.me/573132294533" target="_blank" rel="noopener noreferrer" className="text-sm text-primary-600 hover:underline">+57 313 229 4533</a>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Lock className="w-5 h-5 text-blue-600 shrink-0" />
                    <div>
                      <p className="text-sm font-bold text-gray-900">Correo Electrónico</p>
                      <a href="mailto:ventas@tecnophone.co" className="text-sm text-primary-600 hover:underline">ventas@tecnophone.co</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Legislación aplicable */}
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 text-center">
              <Scale className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900 mb-2">Legislación Aplicable</h3>
              <p className="text-sm text-blue-800 max-w-lg mx-auto">
                Estos términos y condiciones se rigen por las leyes de la República de Colombia.
                Cualquier controversia será resuelta por los tribunales competentes de la ciudad de Bogotá D.C.,
                previo agotamiento de los mecanismos de resolución directa establecidos en la Ley 1480 de 2011.
              </p>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}

/* ------------- Sub-components ------------- */

function SectionHeader({ icon: Icon, number, title }: { icon: React.ElementType; number: string; title: string }) {
  return (
    <div className="flex items-center gap-3 pb-3 border-b border-surface-200">
      <div className="w-9 h-9 bg-primary-50 border border-primary-100 rounded-xl flex items-center justify-center shrink-0">
        <Icon className="w-4 h-4 text-primary-600" />
      </div>
      <h2 className="text-lg lg:text-xl font-extrabold text-gray-900">
        <span className="text-primary-600 mr-1">{number}.</span> {title}
      </h2>
    </div>
  );
}

function InfoCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-blue-50 border-l-4 border-blue-500 rounded-r-xl p-4 text-sm text-blue-800">
      {children}
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2 my-2">
      {items.map((item) => (
        <li key={item.slice(0, 40)} className="flex items-start gap-2.5">
          <ChevronRight className="w-4 h-4 text-primary-500 shrink-0 mt-0.5" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
