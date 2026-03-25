import Link from 'next/link';
import {
  Shield,
  Eye,
  Database,
  Cookie,
  ExternalLink,
  UserCheck,
  Lock,
  MessageCircle,
  ChevronRight,
  ArrowLeft,
  FileText,
  RefreshCw,
} from 'lucide-react';

export const revalidate = 86400;

const LAST_UPDATED = '25 de marzo de 2026';

const sections = [
  { id: 'informacion', label: 'Información Recogida', icon: Database },
  { id: 'uso', label: 'Uso de la Información', icon: Eye },
  { id: 'seguridad', label: 'Seguridad', icon: Lock },
  { id: 'cookies', label: 'Cookies', icon: Cookie },
  { id: 'enlaces', label: 'Enlaces a Terceros', icon: ExternalLink },
  { id: 'control', label: 'Control de Información', icon: UserCheck },
  { id: 'cambios', label: 'Cambios en la Política', icon: RefreshCw },
  { id: 'contacto', label: 'Contacto', icon: MessageCircle },
];

export default function PoliticaPrivacidadPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-surface-50 to-white">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-teal-50" />
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
              <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl lg:text-4xl font-extrabold text-gray-900 font-display">
                  Política de Privacidad
                </h1>
                <p className="text-sm text-surface-500 mt-1">Última actualización: {LAST_UPDATED}</p>
              </div>
            </div>
            <p className="text-surface-600 text-lg leading-relaxed">
              La presente Política de Privacidad establece los términos en que <strong>TECNOPHONE COLOMBIA SAS</strong> usa
              y protege la información que es proporcionada por sus usuarios al momento de utilizar su sitio web.
              Esta compañía está comprometida con la seguridad de los datos de sus usuarios.
            </p>
            <div className="mt-4 bg-emerald-50 border-l-4 border-emerald-500 rounded-r-xl p-4 text-sm text-emerald-800">
              Cuando le pedimos llenar los campos de información personal con la cual usted pueda ser identificado,
              lo hacemos asegurando que sólo se empleará de acuerdo con los términos de este documento.
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
                    className="flex items-center gap-2 text-sm text-surface-700 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg px-3 py-2 transition-colors"
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

            {/* 1. Información Recogida */}
            <div id="informacion" className="scroll-mt-24">
              <SectionHeader icon={Database} number="1" title="Información que es Recogida" />
              <div className="mt-4 space-y-3 text-surface-700 text-[15px] leading-relaxed">
                <p>
                  Nuestro sitio web podrá recoger información personal, por ejemplo:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4">
                  {[
                    { label: 'Nombre completo', desc: 'Para identificar al comprador' },
                    { label: 'Correo electrónico', desc: 'Para comunicaciones y facturas' },
                    { label: 'Teléfono', desc: 'Para coordinar entregas' },
                    { label: 'Dirección de entrega', desc: 'Para realizar envíos' },
                    { label: 'Documento de identidad', desc: 'Para facturación DIAN' },
                    { label: 'Información demográfica', desc: 'Ciudad y departamento' },
                  ].map((item) => (
                    <div key={item.label} className="bg-surface-50 rounded-xl p-3 border border-surface-100">
                      <p className="font-bold text-sm text-gray-900">{item.label}</p>
                      <p className="text-xs text-surface-500 mt-0.5">{item.desc}</p>
                    </div>
                  ))}
                </div>
                <p>
                  Así mismo, cuando sea necesario podrá ser requerida información específica para procesar algún
                  pedido o realizar una entrega o facturación.
                </p>
              </div>
            </div>

            {/* 2. Uso de la Información */}
            <div id="uso" className="scroll-mt-24">
              <SectionHeader icon={Eye} number="2" title="Uso de la Información Recogida" />
              <div className="mt-4 space-y-3 text-surface-700 text-[15px] leading-relaxed">
                <p>
                  Nuestro sitio web emplea la información con el fin de proporcionar el mejor servicio posible,
                  particularmente para:
                </p>
                <BulletList items={[
                  'Mantener un registro de usuarios y de pedidos.',
                  'Mejorar nuestros productos y servicios.',
                  'Procesar pedidos, envíos y facturación electrónica.',
                  'Enviar comunicaciones relevantes sobre ofertas, nuevos productos y otra información que pueda ser de su interés.',
                ]} />
                <InfoCard>
                  Los correos electrónicos promocionales serán enviados a la dirección que usted proporcione y
                  podrán ser cancelados en cualquier momento. Si desea dejar de recibir comunicaciones, puede
                  notificarnos por correo a ventas@tecnophone.co.
                </InfoCard>
              </div>
            </div>

            {/* 3. Seguridad */}
            <div id="seguridad" className="scroll-mt-24">
              <SectionHeader icon={Lock} number="3" title="Seguridad de la Información" />
              <div className="mt-4 space-y-3 text-surface-700 text-[15px] leading-relaxed">
                <p>
                  <strong>TECNOPHONE COLOMBIA SAS</strong> está altamente comprometido para cumplir con el
                  compromiso de mantener su información segura. Usamos los sistemas más avanzados y los
                  actualizamos constantemente para asegurarnos que no exista ningún acceso no autorizado.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4">
                  {[
                    { icon: Lock, label: 'Cifrado SSL/TLS', desc: 'Toda comunicación con nuestro sitio está cifrada' },
                    { icon: Shield, label: 'Pagos seguros', desc: 'Procesados por MercadoPago, no almacenamos datos de tarjetas' },
                    { icon: Database, label: 'Acceso restringido', desc: 'Solo personal autorizado accede a datos personales' },
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.label} className="bg-emerald-50 rounded-xl p-4 border border-emerald-100 text-center">
                        <Icon className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
                        <p className="font-bold text-sm text-gray-900">{item.label}</p>
                        <p className="text-xs text-surface-600 mt-1">{item.desc}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* 4. Cookies */}
            <div id="cookies" className="scroll-mt-24">
              <SectionHeader icon={Cookie} number="4" title="Cookies" />
              <div className="mt-4 space-y-3 text-surface-700 text-[15px] leading-relaxed">
                <p>
                  Una cookie se refiere a un fichero que es enviado con la finalidad de solicitar permiso para
                  almacenarse en su ordenador. Al aceptar dicho fichero se crea y la cookie sirve entonces para
                  tener información respecto al tráfico web, y también facilita las futuras visitas a una web
                  recurrente. Otra función que tienen las cookies es que con ellas las web pueden reconocerte
                  individualmente y por tanto brindarte el mejor servicio personalizado.
                </p>
                <p>
                  Nuestro sitio web emplea las cookies para poder identificar las páginas que son visitadas y su
                  frecuencia. Esta información es empleada únicamente para <strong>análisis estadístico</strong> y
                  después la información se elimina de forma permanente.
                </p>
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 my-4">
                  <h4 className="font-bold text-sm text-amber-900 mb-2">Importante sobre cookies</h4>
                  <ul className="space-y-1.5 text-sm text-amber-800">
                    <li className="flex items-start gap-2">
                      <ChevronRight className="w-3 h-3 mt-1 shrink-0" />
                      <span>Usted puede eliminar las cookies en cualquier momento desde su navegador.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="w-3 h-3 mt-1 shrink-0" />
                      <span>Las cookies no dan acceso a información de su ordenador ni de usted, a menos que usted la proporcione directamente.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="w-3 h-3 mt-1 shrink-0" />
                      <span>Usted puede aceptar o negar el uso de cookies. Si las declina, es posible que no pueda utilizar algunos de nuestros servicios.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 5. Enlaces a Terceros */}
            <div id="enlaces" className="scroll-mt-24">
              <SectionHeader icon={ExternalLink} number="5" title="Enlaces a Terceros" />
              <div className="mt-4 space-y-3 text-surface-700 text-[15px] leading-relaxed">
                <p>
                  Este sitio web pudiera contener enlaces a otros sitios que pudieran ser de su interés. Una vez
                  que usted haga clic en estos enlaces y abandone nuestra página, ya no tenemos control sobre el
                  sitio al que es redirigido y por lo tanto <strong>no somos responsables</strong> de los términos
                  o privacidad ni de la protección de sus datos en esos otros sitios terceros.
                </p>
                <p>
                  Dichos sitios están sujetos a sus propias políticas de privacidad por lo cual es recomendable
                  que los consulte para confirmar que usted está de acuerdo con estas.
                </p>
              </div>
            </div>

            {/* 6. Control de Información */}
            <div id="control" className="scroll-mt-24">
              <SectionHeader icon={UserCheck} number="6" title="Control de su Información Personal" />
              <div className="mt-4 space-y-3 text-surface-700 text-[15px] leading-relaxed">
                <p>
                  En cualquier momento usted puede restringir la recopilación o el uso de la información personal
                  que es proporcionada a nuestro sitio web:
                </p>
                <BulletList items={[
                  'Cada vez que se le solicite rellenar un formulario, puede marcar o desmarcar la opción de recibir información por correo electrónico.',
                  'En caso de que haya marcado la opción de recibir nuestro boletín o publicidad, usted puede cancelarla en cualquier momento.',
                  'Puede solicitar la actualización, rectificación o eliminación de sus datos personales en cualquier momento.',
                ]} />
                <InfoCard>
                  Esta compañía <strong>no venderá, cederá ni distribuirá</strong> la información personal que es
                  recopilada sin su consentimiento, salvo que sea requerido por un juez con una orden judicial.
                </InfoCard>
              </div>
            </div>

            {/* 7. Cambios */}
            <div id="cambios" className="scroll-mt-24">
              <SectionHeader icon={RefreshCw} number="7" title="Cambios en esta Política" />
              <div className="mt-4 space-y-3 text-surface-700 text-[15px] leading-relaxed">
                <p>
                  <strong>TECNOPHONE COLOMBIA SAS</strong> se reserva el derecho de cambiar los términos de la
                  presente Política de Privacidad en cualquier momento. Le recomendamos revisar continuamente
                  esta página para asegurarse que está de acuerdo con dichos cambios.
                </p>
              </div>
            </div>

            {/* 8. Contacto */}
            <div id="contacto" className="scroll-mt-24">
              <SectionHeader icon={MessageCircle} number="8" title="Contacto" />
              <div className="mt-4 space-y-3 text-surface-700 text-[15px] leading-relaxed">
                <p>
                  Si tiene preguntas sobre nuestra Política de Privacidad o desea ejercer sus derechos sobre sus
                  datos personales, contáctenos:
                </p>
                <div className="bg-surface-50 rounded-xl border border-surface-200 p-5 my-4 space-y-3">
                  <div className="flex items-center gap-3">
                    <UserCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                    <div>
                      <p className="text-sm font-bold text-gray-900">TECNOPHONE COLOMBIA SAS</p>
                      <p className="text-xs text-surface-500">Chía, Cundinamarca, Colombia</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MessageCircle className="w-5 h-5 text-green-600 shrink-0" />
                    <div>
                      <p className="text-sm font-bold text-gray-900">WhatsApp</p>
                      <a href="https://wa.me/573132294533" target="_blank" rel="noopener noreferrer" className="text-sm text-emerald-600 hover:underline">+57 313 229 4533</a>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Lock className="w-5 h-5 text-blue-600 shrink-0" />
                    <div>
                      <p className="text-sm font-bold text-gray-900">Correo Electrónico</p>
                      <a href="mailto:ventas@tecnophone.co" className="text-sm text-emerald-600 hover:underline">ventas@tecnophone.co</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Related Links */}
            <div className="bg-surface-50 rounded-xl border border-surface-200 p-6">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-surface-500" />
                Documentos Relacionados
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <Link href="/terminos-condiciones" className="flex items-center gap-2 text-sm text-surface-700 hover:text-emerald-600 bg-white rounded-lg px-4 py-3 border border-surface-200 hover:border-emerald-200 transition-colors">
                  <ChevronRight className="w-4 h-4 shrink-0" />
                  Términos y Condiciones
                </Link>
                <Link href="/politica-envios" className="flex items-center gap-2 text-sm text-surface-700 hover:text-emerald-600 bg-white rounded-lg px-4 py-3 border border-surface-200 hover:border-emerald-200 transition-colors">
                  <ChevronRight className="w-4 h-4 shrink-0" />
                  Política de Envíos
                </Link>
                <Link href="/derecho-retracto" className="flex items-center gap-2 text-sm text-surface-700 hover:text-emerald-600 bg-white rounded-lg px-4 py-3 border border-surface-200 hover:border-emerald-200 transition-colors">
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
      <div className="w-9 h-9 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center justify-center shrink-0">
        <Icon className="w-4 h-4 text-emerald-600" />
      </div>
      <h2 className="text-lg lg:text-xl font-extrabold text-gray-900">
        <span className="text-emerald-600 mr-1">{number}.</span> {title}
      </h2>
    </div>
  );
}

function InfoCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-emerald-50 border-l-4 border-emerald-500 rounded-r-xl p-4 text-sm text-emerald-800">
      {children}
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2 my-2">
      {items.map((item) => (
        <li key={item.slice(0, 40)} className="flex items-start gap-2.5">
          <ChevronRight className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
