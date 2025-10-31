'use client'
export const dynamic = 'force-dynamic'
export const revalidate = 0

import { useEffect, useState } from 'react'
import { createBooking, getExperience, validatePromo } from '../../lib/api'
import { useSearchParams, useRouter } from 'next/navigation'

export default function Checkout() {
  const params = useSearchParams();
  const router = useRouter();
  const expId = params.get('exp')!;
  const date = params.get('date')!;
  const time = params.get('time')!;
  const [exp, setExp] = useState<any>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [agree, setAgree] = useState(false);
  const [promo, setPromo] = useState('');
  const [summary, setSummary] = useState({ subtotal: 0, taxes: 59, total: 0, discount: 0 });
  const [slotId, setSlotId] = useState<string>('');

  useEffect(() => {
    (async () => {
      const e = await getExperience(expId);
      setExp(e);
      const all = Object.entries(e.slotsByDate).flatMap(([d, arr]: any) =>
        (arr as any[]).map((s: any) => ({ ...s, date: d }))
      );
      const found = all.find((s: any) => s.date === date && s.time === time);
      setSlotId(found?._id || '');
      const subtotal = e.price;
      setSummary((s) => ({ ...s, subtotal, total: subtotal + s.taxes - 0 }));
    })();
  }, [expId, date, time]);

  const applyPromo = async () => {
    if (!promo) return;
    const res = await validatePromo(promo, summary.subtotal);
    setSummary((s) => ({ ...s, discount: res.discount || 0, total: res.total + s.taxes }));
  };

  const pay = async () => {
    if (!agree || !name || !/^[^@]+@[^@]+\\.[^@]+$/.test(email)) return;
    const payload = {
      experienceId: expId,
      slotId,
      name,
      email,
      qty: 1,
      subtotal: summary.subtotal,
      total: summary.total,
    };
    const res = await createBooking(payload);
    if (res?.ref) router.push('/result?ref=' + res.ref);
    else alert(res?.error || 'Booking failed');
  };

  if (!exp) return <div />;

  return (
    <div className="flex gap-[24px]">
      <div className="flex-1 rounded-card border border-brand-border p-[16px]">
        <div className="grid grid-cols-2 gap-[16px]">
          <div>
            <div className="text-[12px] mb-[6px]">Full name</div>
            <input
              className="w-full h-[40px] rounded-btn border border-brand-border px-[12px]"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <div className="text-[12px] mb-[6px]">Email</div>
            <input
              className="w-full h-[40px] rounded-btn border border-brand-border px-[12px]"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div className="mt-[12px] flex gap-[12px] items-center">
          <input
            className="w-full h-[40px] rounded-btn border border-brand-border px-[12px]"
            placeholder="Promo code"
            value={promo}
            onChange={(e) => setPromo(e.target.value)}
          />
          <button
            onClick={applyPromo}
            className="h-[40px] px-[16px] rounded-btn bg-black text-white"
          >
            Apply
          </button>
        </div>
        <label className="mt-[12px] flex items-center gap-[8px]">
          <input
            type="checkbox"
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)}
          />
          <span className="text-[12px] text-brand-gray">
            I agree to the terms and safety policy
          </span>
        </label>
      </div>

      <aside className="w-[360px]">
        <div className="rounded-card bg-[#F7F7F7] p-[16px]">
          <div className="flex justify-between py-[6px]">
            <span>Experience</span>
            <span>{exp.title}</span>
          </div>
          <div className="flex justify-between py-[6px]">
            <span>Date</span>
            <span>{new Date(date).toLocaleDateString()}</span>
          </div>
          <div className="flex justify-between py-[6px]">
            <span>Time</span>
            <span>{time}</span>
          </div>
          <div className="flex justify-between py-[6px]">
            <span>Qty</span>
            <span>1</span>
          </div>
          <div className="flex justify-between py-[6px]">
            <span>Subtotal</span>
            <span>₹{summary.subtotal}</span>
          </div>
          <div className="flex justify-between py-[6px]">
            <span>Taxes</span>
            <span>₹{summary.taxes}</span>
          </div>
          <hr className="my-[10px] border-brand-border" />
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>₹{summary.total}</span>
          </div>
          <button
            onClick={pay}
            className="mt-[12px] w-full h-[40px] rounded-btn bg-brand-yellow font-medium"
          >
            Pay and Confirm
          </button>
        </div>
      </aside>
    </div>
  );
}
