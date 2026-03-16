'use client';

import { Suspense, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle, ShoppingBag, XCircle, Clock, Loader2, Banknote, Copy, Mail, MessageCircle } from 'lucide-react';
import { useCartStore } from '@/store/cart';
import { initMercadoPago, StatusScreen } from '@mercadopago/sdk-react';

let mpInitialized = false;

function ThankYouContent() {
  const clearCart = useCartStore((s) => s.clearCart);
  const searchParams = useSearchParams();
  const paymentId = searchParams.get('payment_id');
  const status = searchParams.get('status');
  const orderId = searchParams.get('order_id');
  const method = searchParams.get('method');
  const isBacs = method === 'bacs';

  useEffect(() => {
    // Initialize MP SDK for StatusScreen Brick
    if (!isBacs) {
      const publicKey = process.env.NEXT_PUBLIC_MP_PUBLIC_KEY;
      if (publicKey && !mpInitialized) {
        initMercadoPago(publicKey, { locale: 'es-CO' });
        mpInitialized = true;
      }
    }
  }, [isBacs]);

  useEffect(() => {
    // Clear cart on any successful arrival to this page
    if (paymentId || isBacs || sessionStorage.getItem('pending_order')) {
      clearCart();
      sessionStorage.removeItem('pending_order');
    }
  }, [clearCart, paymentId, isBacs]);

  const isApproved = status === 'approved';
  const isPending = status === 'pending' || status === 'in_process';

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  // BACS thank you page
  if (isBacs) {
    return (
      <div className="container-custom py-16">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="w-20 h-20 rounded-3xl bg-emerald-500/10 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-emerald-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">¡Pedido Confirmado!</h1>
            <p className="text-surface-700">
              Realiza tu pago directamente en nuestra cuenta bancaria. Por favor, usa el número del pedido como referencia de pago.
            </p>
            {orderId && (
              <p className="text-sm font-semibold text-primary-600 mt-2">Pedido #{orderId}</p>
            )}
          </div>

          {/* Bank details */}
          <div className="bg-surface-100 rounded-2xl border border-surface-200 p-6 mb-6">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-5">
              <Banknote className="w-5 h-5 text-emerald-600" />
              Detalles de la Cuenta
            </h2>

            {/* Davivienda */}
            <div className="mb-5">
              <div className="flex items-center gap-3 mb-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/icons/davivienda-logo.webp" alt="Davivienda" width={504} height={64} className="h-7 w-auto object-contain" />
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="bg-white rounded-xl p-3 border border-surface-200">
                  <p className="text-[10px] font-bold text-surface-500 uppercase tracking-wider mb-0.5">Tipo de cuenta</p>
                  <p className="text-sm font-bold text-gray-900">Ahorros</p>
                </div>
                <div className="bg-white rounded-xl p-3 border border-surface-200 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-bold text-surface-500 uppercase tracking-wider mb-0.5">Número de cuenta</p>
                    <p className="text-sm font-bold text-gray-900">451700082733</p>
                  </div>
                  <button
                    onClick={() => copyToClipboard('451700082733')}
                    className="p-1.5 rounded-lg hover:bg-surface-100 transition-colors text-surface-500 hover:text-primary-600"
                    title="Copiar"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Bancolombia */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/icons/bancolombia-logo.webp" alt="Bancolombia" width={498} height={64} className="h-7 w-auto object-contain" />
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="bg-white rounded-xl p-3 border border-surface-200">
                  <p className="text-[10px] font-bold text-surface-500 uppercase tracking-wider mb-0.5">Tipo de cuenta</p>
                  <p className="text-sm font-bold text-gray-900">Ahorros</p>
                </div>
                <div className="bg-white rounded-xl p-3 border border-surface-200 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-bold text-surface-500 uppercase tracking-wider mb-0.5">Número de cuenta</p>
                    <p className="text-sm font-bold text-gray-900">68200000666</p>
                  </div>
                  <button
                    onClick={() => copyToClipboard('68200000666')}
                    className="p-1.5 rounded-lg hover:bg-surface-100 transition-colors text-surface-500 hover:text-primary-600"
                    title="Copiar"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-6">
            <p className="text-sm text-amber-800 font-semibold mb-2">Instrucciones:</p>
            <p className="text-sm text-amber-700 leading-relaxed">
              Realice el pago en cualquiera de nuestras cuentas bancarias y luego comuníquese con nuestro equipo
              comercial enviando el soporte de pago. Usa el número de pedido <strong>#{orderId}</strong> como
              referencia. Tu pedido no se procesará hasta que se haya recibido el importe en nuestra cuenta.
            </p>
          </div>

          {/* Contact buttons */}
          <div className="grid sm:grid-cols-2 gap-3 mb-8">
            <a
              href="mailto:ventas@tecnophone.co?subject=Soporte%20de%20pago%20-%20Pedido%20%23${orderId}&body=Adjunto%20soporte%20de%20pago%20para%20el%20pedido%20%23${orderId}"
              className="flex items-center justify-center gap-2 bg-primary-600 text-white px-5 py-3.5 rounded-xl font-bold text-sm shadow-lg shadow-primary-600/20 hover:bg-primary-700 hover:-translate-y-0.5 transition-all"
            >
              <Mail className="w-4 h-4" />
              Enviar soporte por correo
            </a>
            <a
              href={`https://wa.me/573132294533?text=${encodeURIComponent(`Hola, adjunto soporte de pago para el pedido #${orderId}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-[#25D366] text-white px-5 py-3.5 rounded-xl font-bold text-sm shadow-lg shadow-[#25D366]/20 hover:bg-[#20BD5A] hover:-translate-y-0.5 transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              Enviar soporte por WhatsApp
            </a>
          </div>

          <div className="text-center">
            <Link
              href="/productos"
              className="inline-flex items-center gap-2 bg-surface-100 text-surface-800 px-6 py-3 rounded-xl font-bold hover:bg-surface-200 transition-colors border border-surface-200"
            >
              <ShoppingBag className="w-4 h-4" />
              Seguir Comprando
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // MercadoPago thank you page (original)
  return (
    <div className="container-custom py-16">
      <div className="max-w-2xl mx-auto text-center">
        {/* Status icon */}
        <div className={`w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 ${
          isApproved ? 'bg-emerald-500/10' : isPending ? 'bg-yellow-500/10' : 'bg-red-500/10'
        }`}>
          {isApproved ? (
            <CheckCircle className="w-10 h-10 text-emerald-600" />
          ) : isPending ? (
            <Clock className="w-10 h-10 text-yellow-500" />
          ) : (
            <XCircle className="w-10 h-10 text-red-500" />
          )}
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {isApproved
            ? '¡Gracias por tu compra!'
            : isPending
              ? 'Pago en proceso'
              : 'Pago no aprobado'}
        </h1>
        <p className="text-surface-700 mb-2">
          {isApproved
            ? 'Tu pedido ha sido procesado exitosamente. Recibirás un correo con los detalles.'
            : isPending
              ? 'Tu pago está siendo procesado. Te notificaremos cuando se confirme.'
              : 'Hubo un problema con tu pago. Puedes intentar de nuevo.'}
        </p>

        {orderId && (
          <p className="text-sm text-surface-600 mb-6">Pedido #{orderId}</p>
        )}

        {/* MercadoPago StatusScreen Brick */}
        {paymentId && (
          <div className="my-8 text-left">
            <StatusScreen
              initialization={{ paymentId }}
              locale="es-CO"
            />
          </div>
        )}

        <Link
          href="/productos"
          className="inline-flex items-center gap-2 bg-primary-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-primary-600 transition-colors"
        >
          <ShoppingBag className="w-4 h-4" />
          Seguir Comprando
        </Link>
      </div>
    </div>
  );
}

export default function ThankYouPage() {
  return (
    <Suspense fallback={
      <div className="container-custom py-16 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-primary-500 animate-spin" />
      </div>
    }>
      <ThankYouContent />
    </Suspense>
  );
}
