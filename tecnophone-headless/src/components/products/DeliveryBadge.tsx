'use client';

import { useState, useEffect } from 'react';
import { Truck } from 'lucide-react';
import { WCCategory } from '@/types/woocommerce';

interface DeliveryBadgeProps {
  categories: WCCategory[];
  variant?: 'card' | 'detail';
}

/** Returns current date/time in Bogotá (UTC-5) */
function getBogotaTime(): Date {
  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60_000;
  return new Date(utc - 5 * 60 * 60_000);
}

/** Compute delivery text and deadline hour based on Bogotá time */
function getDeliveryInfo(bogota: Date): { text: string; deadline: string } {
  const hhmm = bogota.toTimeString().slice(0, 5); // "HH:MM"
  const dow = bogota.getDay(); // 0=Sun, 1=Mon … 6=Sat

  // Mon–Fri (1–5)
  if (dow >= 1 && dow <= 5) {
    if (hhmm < '10:30') {
      return { text: 'Llega hoy gratis', deadline: '10:30' };
    }
    if (hhmm < '16:00') {
      return {
        text: dow === 5 ? 'Llega el lunes gratis' : 'Llega mañana gratis',
        deadline: '16:00',
      };
    }
    return {
      text: dow === 5 ? 'Llega el lunes gratis' : 'Llega mañana gratis',
      deadline: '23:59',
    };
  }

  // Sat–Sun
  return { text: 'Llega el lunes gratis', deadline: '23:59' };
}

/** Remaining ms until deadline on the same Bogotá day */
function msUntilDeadline(deadline: string): number {
  const bogota = getBogotaTime();
  const [dh, dm] = deadline.split(':').map(Number);
  const target = new Date(bogota);
  target.setHours(dh, dm, 0, 0);
  if (target <= bogota) target.setHours(23, 59, 59, 999);
  return Math.max(0, target.getTime() - bogota.getTime());
}

function formatCountdown(ms: number): string {
  if (ms <= 0) return '';
  const h = Math.floor(ms / 3_600_000);
  const m = Math.floor((ms % 3_600_000) / 60_000);
  const hTxt = h > 0 ? `${h} h ` : '';
  return `Comprando dentro de las próximas ${hTxt}${m} min`;
}

export default function DeliveryBadge({ categories, variant = 'card' }: DeliveryBadgeProps) {
  const isFull = categories.some((c) => c.slug === 'full');
  const [countdown, setCountdown] = useState('');
  const [deliveryText, setDeliveryText] = useState('');

  useEffect(() => {
    if (!isFull) return;

    function tick() {
      const bogota = getBogotaTime();
      const { text, deadline } = getDeliveryInfo(bogota);
      setDeliveryText(text);
      setCountdown(formatCountdown(msUntilDeadline(deadline)));
    }

    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, [isFull]);

  if (!isFull || !deliveryText) return null;

  /* ---- Compact card variant ---- */
  if (variant === 'card') {
    return (
      <div className="space-y-0.5">
        <div className="flex items-center gap-1 text-emerald-600">
          <Truck className="w-3 h-3" />
          <span className="text-[11px] font-bold">{deliveryText}</span>
        </div>
        {countdown && (
          <p className="text-[10px] text-emerald-600/70 font-medium pl-4">{countdown}</p>
        )}
      </div>
    );
  }

  /* ---- Full detail variant ---- */
  return (
    <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 flex items-start gap-3">
      <Truck className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
      <div>
        <p className="text-sm font-bold text-emerald-600">{deliveryText}</p>
        {countdown && (
          <p className="text-xs text-emerald-500/80 mt-0.5">{countdown}</p>
        )}
      </div>
    </div>
  );
}
