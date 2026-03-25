import Link from 'next/link';
import {
  RotateCcw,
  Clock,
  Package,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  MessageCircle,
  Phone,
  ChevronRight,
  ArrowLeft,
  FileText,
  Shield,
  Banknote,
  Truck,
  ClipboardCheck,
  Mail,
} from 'lucide-react';

export const revalidate = 86400;

const LAST_UPDATED = '25 de marzo de 2026';

const sections = [
  { id: 'derecho', label: 'Derecho de Retracto', icon: RotateCcw },
  { id: 'solicitud', label: 'Cómo Solicitar', icon: ClipboardCheck },
  { id: 'requisitos', label: 'Requisitos', icon: CheckCircle2 },
  { id: 'proceso', label: 'Proceso de Devolución', icon: Package },
  { id: 'reembolso', label: 'Reembolso', icon: Banknote },
  { id: 'no-aplica', label: 'Casos que No Aplican', icon: XCircle },
  { id: 'contacto', label: 'Contacto', icon: MessageCircle },
];

export default function DerechoRetractoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-surface-50 to-white">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-white to-orange-50" />
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
              <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center shadow-lg">
                <RotateCcw className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl lg:text-4xl font-extrabold text-gray-900 font-display">
                  Derecho de Retracto y Devoluciones
                </h1>
                <p className="text-sm text-surface-500 mt-1">Última actualización: {LAST_UPDATED}</p>
              </div>
            </div>
            <p className="text-surface-600 text-lg leading-relaxed">
              En <strong>TECNOPHONE COLOMBIA SAS</strong> respetamos tu derecho como consumidor.
              Conoce aquí las condiciones para devoluciones, cambios y reembolsos amparados por la
              Ley 1480 de 2011 (Estatuto del Consumidor).
            </p>

            {/* Key highlight */}
            <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-5 flex items-start gap-4">
              <div className="w-14 h-14 bg-amber-500 rounded-xl flex items-center justify-center shrink-0">
                <span className="text-2xl font-extrabold text-white">5</span>
              </div>
              <div>
                <p className="font-extrabold text-gray-900 text-lg">Días hábiles</p>
                <p className="text-sm text-amber-800 mt-0.5">
                  Tienes 5 días hábiles desde la recepción del producto para ejercer tu derecho de retracto,
                  sin necesidad de justificar tu decisión. <strong>Artículo 47, Ley 1480 de 2011.</strong>
                </p>
              </div>
            </div>
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
                    className="flex items-center gap-2 text-sm text-surface-700 hover:text-amber-600 hover:bg-amber-50 rounded-lg px-3 py-2 transition-colors"
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

            {/* 1. Derecho de Retracto */}
            <div id="derecho" className="scroll-mt-24">
              <SectionHeader icon={RotateCcw} number="1" title="Derecho de Retracto" />
              <div className="mt-4 space-y-3 text-surface-700 text-[15px] leading-relaxed">
                <p>
                  Para las compras realizadas en nuestro sitio web <strong>www.tecnophone.co</strong>, el cliente
                  puede solicitar:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4">
                  {[
                    { icon: RotateCcw, label: 'Cambio del producto', desc: 'Por otro de igual o mayor valor' },
                    { icon: Shield, label: 'Saldo a favor', desc: 'Para futuras compras en la tienda' },
                    { icon: Banknote, label: 'Devolución del dinero', desc: 'Reembolso total del valor pagado' },
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.label} className="bg-amber-50 border border-amber-100 rounded-xl p-4 text-center">
                        <Icon className="w-6 h-6 text-amber-600 mx-auto mb-2" />
                        <p className="font-bold text-sm text-gray-900">{item.label}</p>
                        <p className="text-xs text-surface-600 mt-1">{item.desc}</p>
                      </div>
                    );
                  })}
                </div>
                <p>
                  Esto aplica dentro de los <strong>5 días hábiles siguientes</strong> a la entrega del producto,
                  todo amparado por el Derecho de Retracto (Artículo 47, Ley 1480 de 2011).
                </p>
                <InfoCard>
                  No se aceptan cambios o devoluciones en las tiendas físicas de TecnoPhone para productos
                  adquiridos por compra en nuestro sitio web www.tecnophone.co.
                </InfoCard>
              </div>
            </div>

            {/* 2. Cómo Solicitar */}
            <div id="solicitud" className="scroll-mt-24">
              <SectionHeader icon={ClipboardCheck} number="2" title="Cómo Solicitar una Devolución" />
              <div className="mt-4 space-y-3 text-surface-700 text-[15px] leading-relaxed">
                <p>
                  Para hacer una solicitud de devolución por compras realizadas desde nuestro sitio web, es
                  necesario que el cliente:
                </p>
                <div className="space-y-3 my-4">
                  <Step number="1" icon={Phone} title="Comunícate con Servicio al Cliente" desc="Llama o escribe por WhatsApp al 313 229 4533" />
                  <Step number="2" icon={Mail} title="Escribe al correo electrónico" desc="Envía tu solicitud a ventas@tecnophone.co informando tu número de pedido y el motivo" />
                  <Step number="3" icon={Clock} title="Plazo de 5 días hábiles" desc="La solicitud debe enviarse dentro de los 5 días hábiles siguientes a la recepción de la mercancía" />
                </div>
                <p>
                  El Asistente de Servicio al Cliente es el encargado de validar cada solicitud de devolución,
                  verificando el cumplimiento de los requisitos para su aprobación, y posteriormente de aprobar
                  o rechazar las solicitudes.
                </p>
                <InfoCard>
                  La respuesta al cliente sobre una solicitud de devolución se dará dentro de los <strong>3 días
                  hábiles</strong> siguientes a la fecha de recibido de la solicitud.
                </InfoCard>
              </div>
            </div>

            {/* 3. Requisitos */}
            <div id="requisitos" className="scroll-mt-24">
              <SectionHeader icon={CheckCircle2} number="3" title="Requisitos para la Devolución" />
              <div className="mt-4 space-y-3 text-surface-700 text-[15px] leading-relaxed">
                <p>
                  Para que una devolución sea aprobada, debe cumplir con <strong>todas</strong> las siguientes condiciones:
                </p>
                <div className="bg-surface-50 rounded-xl border border-surface-200 p-5 my-4">
                  <ul className="space-y-3">
                    {[
                      'Solicitud realizada dentro de los 5 días hábiles siguientes a la compra y recepción de la mercancía.',
                      'La mercancía devuelta debe venir en la caja original y sellada.',
                      'Los sellos de seguridad no deben evidenciar manipulación.',
                      'La mercancía debe estar en buen estado, sin indicios de uso, golpes o rayones.',
                      'Debe incluir todos los accesorios y estar en su empaque original.',
                      'Se debe anexar la copia de la factura de venta.',
                    ].map((item) => (
                      <li key={item.slice(0, 40)} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                        <span className="text-[15px] text-surface-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-red-50 border-l-4 border-red-500 rounded-r-xl p-4">
                  <p className="text-sm text-red-800">
                    <strong>Importante:</strong> Si al momento de recibir la mercancía devuelta existe alguna
                    alteración en el estado de ésta o de sus empaques, el área logística debe registrar la
                    novedad en la guía del agente transportador y <strong>no se aceptará la devolución</strong>.
                  </p>
                </div>
              </div>
            </div>

            {/* 4. Proceso de Devolución */}
            <div id="proceso" className="scroll-mt-24">
              <SectionHeader icon={Package} number="4" title="Proceso de Devolución" />
              <div className="mt-4 space-y-3 text-surface-700 text-[15px] leading-relaxed">
                <p>
                  Una vez aprobada tu solicitud de devolución:
                </p>
                <div className="space-y-3 my-4">
                  <Step number="1" icon={Mail} title="Recibirás aprobación por correo" desc="Te notificaremos la aprobación de la devolución por correo electrónico" />
                  <Step number="2" icon={Truck} title="Envía la mercancía (3 días hábiles)" desc="Tienes 3 días hábiles para enviar la mercancía a las bodegas de TECNOPHONE COLOMBIA SAS" />
                  <Step number="3" icon={ClipboardCheck} title="Soporte documentado" desc="Cada devolución debe tener como soporte el correo de solicitud y el formato de devolución" />
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 my-4">
                  <h4 className="font-bold text-sm text-amber-900 mb-2 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    Nota importante sobre el envío de devolución
                  </h4>
                  <ul className="space-y-1.5 text-sm text-amber-800">
                    <li className="flex items-start gap-2">
                      <ChevronRight className="w-3 h-3 mt-1 shrink-0" />
                      <span><strong>No se realiza recogida de productos</strong> por devolución bajo ningún concepto.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="w-3 h-3 mt-1 shrink-0" />
                      <span>El cliente es responsable de hacer llegar los productos a las bodegas de TECNOPHONE COLOMBIA SAS, por medio de un agente transportador de confianza o puede traerlos personalmente.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 5. Reembolso */}
            <div id="reembolso" className="scroll-mt-24">
              <SectionHeader icon={Banknote} number="5" title="Reembolso del Dinero" />
              <div className="mt-4 space-y-3 text-surface-700 text-[15px] leading-relaxed">
                <p>
                  Cuando el cliente cumpla con todas las condiciones anteriores y aplique devolución de dinero:
                </p>
                <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-5 my-4">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-emerald-500 rounded-xl flex items-center justify-center shrink-0">
                      <span className="text-xl font-extrabold text-white">30</span>
                    </div>
                    <div>
                      <p className="font-extrabold text-gray-900 text-lg">Días calendario</p>
                      <p className="text-sm text-emerald-800 mt-1">
                        TECNOPHONE COLOMBIA SAS efectuará el pago dentro de los <strong>treinta (30) días
                        calendario</strong> siguientes a la recepción de la mercancía devuelta por el cliente.
                      </p>
                    </div>
                  </div>
                </div>
                <InfoCard>
                  TECNOPHONE COLOMBIA SAS deberá devolverle al cliente <strong>todas las sumas pagadas</strong> por
                  el valor del producto, sin que proceda a hacer descuentos o retenciones por concepto alguno.
                </InfoCard>
              </div>
            </div>

            {/* 6. Casos que no aplican */}
            <div id="no-aplica" className="scroll-mt-24">
              <SectionHeader icon={XCircle} number="6" title="Casos en que No Aplica la Devolución" />
              <div className="mt-4 space-y-3 text-surface-700 text-[15px] leading-relaxed">
                <p>
                  Según la Ley 1480 de 2011, el derecho de retracto <strong>no aplica</strong> en los siguientes casos:
                </p>
                <div className="bg-red-50 rounded-xl border border-red-100 p-5 my-4">
                  <ul className="space-y-3">
                    {[
                      'Productos con sellos de seguridad rotos o manipulados.',
                      'Productos que evidencien uso, golpes, rayones o alteraciones.',
                      'Productos sin empaque original o con accesorios faltantes.',
                      'Sin copia de la factura de venta.',
                      'Solicitudes fuera del plazo de 5 días hábiles.',
                      'Productos perecederos o de rápida caducidad.',
                      'Bienes confeccionados conforme a especificaciones del consumidor.',
                      'Productos de audio o video desprecintados.',
                      'Software descargado o activado.',
                    ].map((item) => (
                      <li key={item.slice(0, 40)} className="flex items-start gap-3">
                        <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                        <span className="text-[15px] text-red-800">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* 7. Contacto */}
            <div id="contacto" className="scroll-mt-24">
              <SectionHeader icon={MessageCircle} number="7" title="Contacto para Devoluciones" />
              <div className="mt-4 space-y-3 text-surface-700 text-[15px] leading-relaxed">
                <p>
                  Nuestro equipo de Servicio al Cliente está disponible para atender tu solicitud:
                </p>
                <div className="bg-surface-50 rounded-xl border border-surface-200 p-5 my-4 space-y-3">
                  <div className="flex items-center gap-3">
                    <MessageCircle className="w-5 h-5 text-green-600 shrink-0" />
                    <div>
                      <p className="text-sm font-bold text-gray-900">WhatsApp / Teléfono</p>
                      <a href="https://wa.me/573132294533" target="_blank" rel="noopener noreferrer" className="text-sm text-amber-600 hover:underline">+57 313 229 4533</a>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-blue-600 shrink-0" />
                    <div>
                      <p className="text-sm font-bold text-gray-900">Correo Electrónico</p>
                      <a href="mailto:ventas@tecnophone.co" className="text-sm text-amber-600 hover:underline">ventas@tecnophone.co</a>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-surface-500">
                  Horario de atención: Lunes a Sábado de 9:00 AM a 7:00 PM
                </p>
              </div>
            </div>

            {/* Related */}
            <div className="bg-surface-50 rounded-xl border border-surface-200 p-6">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-surface-500" />
                Documentos Relacionados
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <Link href="/terminos-condiciones" className="flex items-center gap-2 text-sm text-surface-700 hover:text-amber-600 bg-white rounded-lg px-4 py-3 border border-surface-200 hover:border-amber-200 transition-colors">
                  <ChevronRight className="w-4 h-4 shrink-0" />
                  Términos y Condiciones
                </Link>
                <Link href="/politica-privacidad" className="flex items-center gap-2 text-sm text-surface-700 hover:text-amber-600 bg-white rounded-lg px-4 py-3 border border-surface-200 hover:border-amber-200 transition-colors">
                  <ChevronRight className="w-4 h-4 shrink-0" />
                  Política de Privacidad
                </Link>
                <Link href="/politica-envios" className="flex items-center gap-2 text-sm text-surface-700 hover:text-amber-600 bg-white rounded-lg px-4 py-3 border border-surface-200 hover:border-amber-200 transition-colors">
                  <ChevronRight className="w-4 h-4 shrink-0" />
                  Política de Envíos
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
      <div className="w-9 h-9 bg-amber-50 border border-amber-100 rounded-xl flex items-center justify-center shrink-0">
        <Icon className="w-4 h-4 text-amber-600" />
      </div>
      <h2 className="text-lg lg:text-xl font-extrabold text-gray-900">
        <span className="text-amber-600 mr-1">{number}.</span> {title}
      </h2>
    </div>
  );
}

function InfoCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-amber-50 border-l-4 border-amber-500 rounded-r-xl p-4 text-sm text-amber-800">
      {children}
    </div>
  );
}

function Step({ number, icon: Icon, title, desc }: { number: string; icon: React.ElementType; title: string; desc: string }) {
  return (
    <div className="flex items-start gap-3 bg-surface-50 rounded-xl p-4 border border-surface-200">
      <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center shrink-0">
        <span className="text-sm font-extrabold text-amber-600">{number}</span>
      </div>
      <div>
        <p className="font-bold text-sm text-gray-900">{title}</p>
        <p className="text-xs text-surface-600 mt-0.5">{desc}</p>
      </div>
    </div>
  );
}
