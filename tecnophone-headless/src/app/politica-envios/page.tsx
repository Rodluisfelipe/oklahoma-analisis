import Link from 'next/link';
import {
  Truck,
  MapPin,
  Clock,
  Package,
  AlertTriangle,
  UserCheck,
  Phone,
  MessageCircle,
  ChevronRight,
  ArrowLeft,
  FileText,
  ShieldCheck,
  Ban,
  ClipboardCheck,
} from 'lucide-react';

export const revalidate = 86400;

const LAST_UPDATED = '25 de marzo de 2026';

const sections = [
  { id: 'cobertura', label: 'Cobertura de Envíos', icon: MapPin },
  { id: 'restricciones', label: 'Restricciones', icon: Ban },
  { id: 'tiempos', label: 'Tiempos de Entrega', icon: Clock },
  { id: 'entrega', label: 'Entrega de Productos', icon: Package },
  { id: 'recepcion', label: 'Recepción del Pedido', icon: ClipboardCheck },
  { id: 'averias', label: 'Averías en el Envío', icon: AlertTriangle },
  { id: 'contacto', label: 'Contacto', icon: MessageCircle },
];

export default function PoliticaEnviosPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-surface-50 to-white">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-cyan-50" />
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
                <Truck className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl lg:text-4xl font-extrabold text-gray-900 font-display">
                  Política de Envíos
                </h1>
                <p className="text-sm text-surface-500 mt-1">Última actualización: {LAST_UPDATED}</p>
              </div>
            </div>
            <p className="text-surface-600 text-lg leading-relaxed">
              <strong>TECNOPHONE COLOMBIA SAS</strong> se compromete a hacer la entrega de los productos adquiridos
              mediante su sitio web, realizando el cobro de los fletes que apliquen. Conoce aquí nuestras condiciones de envío y entrega.
            </p>
          </div>
        </div>
      </section>

      {/* Table of contents */}
      <section className="border-y border-surface-200 bg-white">
        <div className="container-custom py-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-sm font-bold text-surface-500 uppercase tracking-widest mb-4">Contenido</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
              {sections.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    className="flex items-center gap-2 text-sm text-surface-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg px-3 py-2 transition-colors"
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

            {/* 1. Cobertura */}
            <div id="cobertura" className="scroll-mt-24">
              <SectionHeader icon={MapPin} number="1" title="Cobertura de Envíos" />
              <div className="mt-4 space-y-3 text-surface-700 text-[15px] leading-relaxed">
                <p>
                  El envío solo se realiza dentro del <strong>territorio colombiano</strong>, en ciudades
                  seleccionadas que pueden ser verificadas al momento de registrarse como usuario en la
                  casilla de Ciudad.
                </p>
                <InfoCard>
                  Realizamos envíos a todas las principales ciudades de Colombia: Bogotá, Medellín, Cali,
                  Barranquilla, Bucaramanga, Cartagena, Pereira, Manizales, Ibagué, Villavicencio, Neiva,
                  Pasto, Cúcuta, Santa Marta, y muchas más.
                </InfoCard>
              </div>
            </div>

            {/* 2. Restricciones */}
            <div id="restricciones" className="scroll-mt-24">
              <SectionHeader icon={Ban} number="2" title="Restricciones de Envío" />
              <div className="mt-4 space-y-3 text-surface-700 text-[15px] leading-relaxed">
                <p>
                  <strong>No se realizan envíos</strong> a los siguientes destinos o tipos de dirección:
                </p>
                <div className="bg-red-50 border border-red-100 rounded-xl p-4 my-4">
                  <ul className="space-y-2 text-sm text-red-800">
                    {[
                      'Apartados aéreos',
                      'Casilleros postales',
                      'Parqueaderos',
                      'Centros comerciales (sin local específico)',
                      'Oficinas de empresas de transporte',
                      'Lugares públicos',
                      'Direcciones sin nomenclatura oficial o clara',
                      'Puntos de entrega dentro de Zonas Francas o Zonas Especiales',
                      'Destinos con exenciones de impuestos como San Andrés, Providencia y Santa Catalina',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <Ban className="w-3 h-3 mt-1 shrink-0 text-red-500" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* 3. Tiempos de Entrega */}
            <div id="tiempos" className="scroll-mt-24">
              <SectionHeader icon={Clock} number="3" title="Tiempos de Entrega" />
              <div className="mt-4 space-y-3 text-surface-700 text-[15px] leading-relaxed">
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 my-4">
                  <h4 className="font-bold text-blue-900 mb-3">Tiempos estimados de entrega</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between bg-white rounded-lg px-4 py-3 border border-blue-100">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Truck className="w-4 h-4 text-blue-600" />
                        </div>
                        <span className="text-sm font-medium text-gray-900">Territorio urbano</span>
                      </div>
                      <span className="text-sm font-extrabold text-blue-600">2-3 días hábiles</span>
                    </div>
                    <div className="flex items-center justify-between bg-white rounded-lg px-4 py-3 border border-blue-100">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                          <MapPin className="w-4 h-4 text-blue-600" />
                        </div>
                        <span className="text-sm font-medium text-gray-900">Territorio nacional</span>
                      </div>
                      <span className="text-sm font-extrabold text-blue-600">4-5 días hábiles</span>
                    </div>
                  </div>
                </div>
                <p>
                  Nuestra intención siempre será que el pedido llegue en el menor plazo posible a su lugar de
                  destino. Sin embargo, debemos ser conscientes que los tiempos de entrega se encuentran fuera
                  de nuestro control y dependen del lugar de destino, de la empresa transportadora y de las
                  condiciones específicas del transporte.
                </p>
                <InfoCard>
                  La fecha y hora de entrega de los pedidos está sujeta a la capacidad logística de la empresa transportadora.
                </InfoCard>
              </div>
            </div>

            {/* 4. Entrega de Productos */}
            <div id="entrega" className="scroll-mt-24">
              <SectionHeader icon={Package} number="4" title="Entrega de Productos" />
              <div className="mt-4 space-y-3 text-surface-700 text-[15px] leading-relaxed">
                <p>
                  El lugar de entrega será la <strong>dirección de domicilio</strong> colocada en el formulario
                  de registro de nuestro sitio web. En caso de una unidad residencial o comercial, se tomará
                  como lugar de entrega la entrada principal con acceso a la vía pública.
                </p>
                <BulletList items={[
                  'El servicio de entrega no incluye la subida por escaleras, ascensores o andamios.',
                  'La empresa transportadora no está autorizada para realizar tareas como ensamble o instalación de productos.',
                ]} />
              </div>
            </div>

            {/* 5. Recepción del Pedido */}
            <div id="recepcion" className="scroll-mt-24">
              <SectionHeader icon={ClipboardCheck} number="5" title="Recepción del Pedido" />
              <div className="mt-4 space-y-3 text-surface-700 text-[15px] leading-relaxed">
                <p>
                  Al momento de recibir su pedido, tenga en cuenta las siguientes condiciones:
                </p>
                <BulletList items={[
                  'El transportador podrá solicitar la presentación del documento de identidad (cédula del comprador) para la persona encargada de recibir la mercancía, junto a su firma personal.',
                  'La persona autorizada para recibir la mercancía despachada debe ser mayor de edad.',
                  'Al momento de recibir la mercancía, debe diligenciar el documento de transporte en constancia de recibido a satisfacción con nombre claro, firma y número de documento de identidad.',
                ]} />
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 my-4">
                  <h4 className="font-bold text-sm text-amber-900 mb-2 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    Importante
                  </h4>
                  <p className="text-sm text-amber-800">
                    Al firmar el documento de recibido, usted certifica que recibió la mercancía en buen estado.
                    Por favor, revise el estado del empaque antes de firmar.
                  </p>
                </div>
              </div>
            </div>

            {/* 6. Averías */}
            <div id="averias" className="scroll-mt-24">
              <SectionHeader icon={AlertTriangle} number="6" title="Averías en el Envío" />
              <div className="mt-4 space-y-3 text-surface-700 text-[15px] leading-relaxed">
                <div className="bg-red-50 border-l-4 border-red-500 rounded-r-xl p-4 my-4">
                  <p className="text-sm text-red-800 font-medium">
                    En caso que el producto llegue con una avería externa, golpeado, rayado, pelado o con piezas
                    faltantes, <strong>NO debe ser recibido</strong> por la persona autorizada.
                  </p>
                </div>
                <p>
                  En estos casos, el cliente debe:
                </p>
                <div className="space-y-3 my-4">
                  <div className="flex items-start gap-3 bg-surface-50 rounded-xl p-4 border border-surface-200">
                    <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center shrink-0">
                      <span className="text-sm font-extrabold text-red-600">1</span>
                    </div>
                    <div>
                      <p className="font-bold text-sm text-gray-900">No recibir el producto</p>
                      <p className="text-xs text-surface-600 mt-0.5">Rechazar la entrega con la transportadora</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 bg-surface-50 rounded-xl p-4 border border-surface-200">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                      <span className="text-sm font-extrabold text-blue-600">2</span>
                    </div>
                    <div>
                      <p className="font-bold text-sm text-gray-900">Llamar a Servicio al Cliente</p>
                      <p className="text-xs text-surface-600 mt-0.5">Comunicarse inmediatamente al <strong>313 229 4533</strong></p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 bg-surface-50 rounded-xl p-4 border border-surface-200">
                    <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center shrink-0">
                      <span className="text-sm font-extrabold text-emerald-600">3</span>
                    </div>
                    <div>
                      <p className="font-bold text-sm text-gray-900">Escribir al correo</p>
                      <p className="text-xs text-surface-600 mt-0.5">Enviar correo a <strong>ventas@tecnophone.co</strong> informando la novedad</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 7. Contacto */}
            <div id="contacto" className="scroll-mt-24">
              <SectionHeader icon={MessageCircle} number="7" title="Contacto" />
              <div className="mt-4 space-y-3 text-surface-700 text-[15px] leading-relaxed">
                <p>
                  Para dudas sobre tu envío o rastrear tu pedido:
                </p>
                <div className="bg-surface-50 rounded-xl border border-surface-200 p-5 my-4 space-y-3">
                  <div className="flex items-center gap-3">
                    <MessageCircle className="w-5 h-5 text-green-600 shrink-0" />
                    <div>
                      <p className="text-sm font-bold text-gray-900">WhatsApp</p>
                      <a href="https://wa.me/573132294533" target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">+57 313 229 4533</a>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-blue-600 shrink-0" />
                    <div>
                      <p className="text-sm font-bold text-gray-900">Correo</p>
                      <a href="mailto:ventas@tecnophone.co" className="text-sm text-blue-600 hover:underline">ventas@tecnophone.co</a>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Truck className="w-5 h-5 text-primary-600 shrink-0" />
                    <div>
                      <p className="text-sm font-bold text-gray-900">Rastrear tu envío</p>
                      <Link href="/rastrear-envio" className="text-sm text-blue-600 hover:underline">tecnophone.co/rastrear-envio</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Related */}
            <div className="bg-surface-50 rounded-xl border border-surface-200 p-6">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-surface-500" />
                Documentos Relacionados
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <Link href="/terminos-condiciones" className="flex items-center gap-2 text-sm text-surface-700 hover:text-blue-600 bg-white rounded-lg px-4 py-3 border border-surface-200 hover:border-blue-200 transition-colors">
                  <ChevronRight className="w-4 h-4 shrink-0" />
                  Términos y Condiciones
                </Link>
                <Link href="/politica-privacidad" className="flex items-center gap-2 text-sm text-surface-700 hover:text-blue-600 bg-white rounded-lg px-4 py-3 border border-surface-200 hover:border-blue-200 transition-colors">
                  <ChevronRight className="w-4 h-4 shrink-0" />
                  Política de Privacidad
                </Link>
                <Link href="/derecho-retracto" className="flex items-center gap-2 text-sm text-surface-700 hover:text-blue-600 bg-white rounded-lg px-4 py-3 border border-surface-200 hover:border-blue-200 transition-colors">
                  <ChevronRight className="w-4 h-4 shrink-0" />
                  Derecho de Retracto
                </Link>
              </div>
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
      <div className="w-9 h-9 bg-blue-50 border border-blue-100 rounded-xl flex items-center justify-center shrink-0">
        <Icon className="w-4 h-4 text-blue-600" />
      </div>
      <h2 className="text-lg lg:text-xl font-extrabold text-gray-900">
        <span className="text-blue-600 mr-1">{number}.</span> {title}
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
          <ChevronRight className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
