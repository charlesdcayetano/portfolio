import React, { useState, FormEvent } from 'react';
import { Mail, MapPin, Copy, Send, CheckCircle2, Clock, Check, Terminal, CornerDownLeft } from 'lucide-react';
import { profile } from '../data/profile';
import { sound } from '../utils/sound';

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  const copyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    sound.play('success');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('sending');
    sound.play('press');

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: '4dfdc8c4-104a-436f-83b5-ed868f214d13',
          ...data,
        }),
      });
      setFormStatus('sent');
      sound.play('chime');
      form.reset();
    } catch {
      setFormStatus('idle');
      sound.play('droplet');
    }
  };

  return (
    <section id="contact" className="py-12 border-t border-g200 select-none">
      {/* Editorial System Header */}
      <div className="mb-8 flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-g400">
        <div className="flex items-center gap-2">
          <Terminal className="h-3 w-3 text-g400" />
          <span>06 / Transmission Terminal</span>
        </div>
        <span className="flex items-center gap-1.5 text-emerald-600 font-semibold">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Accepting Inquiries
        </span>
      </div>

      {/* Hero Callout */}
      <div className="mb-8 border-b border-g200 pb-6">
        <h3 className="font-pixel text-2xl sm:text-3xl text-ink tracking-tight">
          Initialize Collaboration.
        </h3>
        <p className="mt-2 font-sans text-sm text-g600 max-w-xl leading-relaxed">
          Available for technical engineering contracts, full-stack product development, and full-time engineering appointments.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
        {/* Terminal Form Window */}
        <form
          onSubmit={handleSubmit}
          className="md:col-span-7 flex flex-col justify-between rounded-xl border border-g200 bg-bg overflow-hidden"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between border-b border-g200 bg-g50 px-4 py-2.5 font-mono text-[11px] text-g500">
            <span className="uppercase tracking-wider">Console Input Buffer</span>
            <span className="text-[10px] text-g400">[ Mode: Direct ]</span>
          </div>

          <div className="p-5 space-y-4 font-mono">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="name" className="block text-[10px] uppercase text-g400 mb-1">
                  &gt; Sender Name
                </label>
                <input
                  id="name"
                  name="name"
                  required
                  placeholder="Alex Morgan"
                  className="w-full rounded-md border border-g200 bg-g50/60 px-3 py-2 font-mono text-[12px] text-ink placeholder:text-g400 outline-none focus:border-ink focus:bg-bg transition-colors"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-[10px] uppercase text-g400 mb-1">
                  &gt; Sender Email
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  required
                  placeholder="alex@company.com"
                  className="w-full rounded-md border border-g200 bg-g50/60 px-3 py-2 font-mono text-[12px] text-ink placeholder:text-g400 outline-none focus:border-ink focus:bg-bg transition-colors"
                />
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-[10px] uppercase text-g400 mb-1">
                &gt; Payload Specification
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                placeholder="Outline project parameters, timeline, or open role specification..."
                className="w-full rounded-md border border-g200 bg-g50/60 px-3 py-2 font-mono text-[12px] text-ink placeholder:text-g400 outline-none focus:border-ink focus:bg-bg transition-colors resize-none"
              />
            </div>
          </div>

          {/* Action Trigger Footer */}
          <div className="p-4 border-t border-g200 bg-g50/30">
            <button
              type="submit"
              disabled={formStatus !== 'idle'}
              className="w-full flex items-center justify-center gap-2 rounded-lg bg-ink py-2.5 font-mono text-[12px] text-bg hover:opacity-90 disabled:opacity-50 transition-opacity"
            >
              {formStatus === 'idle' && (
                <>
                  <span>Transmit Payload</span>
                  <CornerDownLeft className="h-3.5 w-3.5" />
                </>
              )}
              {formStatus === 'sending' && <span>Dispatching...</span>}
              {formStatus === 'sent' && <span>Transmitted Successfully ✓</span>}
            </button>
          </div>
        </form>

        {/* Ledger Metadata Card */}
        <div className="md:col-span-5 rounded-xl border border-g200 bg-bg p-5 flex flex-col justify-between gap-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-g200 pb-2.5 font-mono text-[10px] uppercase tracking-wider text-g400">
              <span>Direct Node</span>
              <span>[ Ref: Mail ]</span>
            </div>

            <div className="space-y-3 font-mono text-[11px]">
              <div>
                <span className="text-[9.5px] uppercase text-g400 block mb-1">
                  Email Endpoint
                </span>
                <div className="flex items-center justify-between gap-2 p-2 rounded-md border border-g200 bg-g50">
                  <a
                    href={`mailto:${profile.email}`}
                    onClick={() => sound.play('press')}
                    className="truncate text-ink font-medium hover:underline"
                  >
                    {profile.email}
                  </a>
                  <button
                    type="button"
                    onClick={copyEmail}
                    className="p-1 rounded text-g400 hover:text-ink transition-colors shrink-0"
                    title="Copy Address"
                  >
                    {copied ? (
                      <Check className="h-3.5 w-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" />
                    )}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <div className="p-2 rounded-md border border-g200 bg-bg">
                  <span className="text-[9px] uppercase text-g400 block">Location</span>
                  <span className="text-ink font-medium text-[11px] mt-0.5 block truncate">
                    {profile.location}
                  </span>
                </div>

                <div className="p-2 rounded-md border border-g200 bg-bg">
                  <span className="text-[9px] uppercase text-g400 block">Response</span>
                  <span className="text-ink font-medium text-[11px] mt-0.5 block truncate">
                    24–48 Hours
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Capabilities List */}
          <div className="pt-4 border-t border-g200 space-y-2">
            <span className="font-mono text-[9.5px] uppercase tracking-wider text-g400 block">
              Engagement Terms
            </span>
            <ul className="space-y-1.5 font-mono text-[11px] text-g600">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                <span>Full-Stack Engineering Positions</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                <span>Custom Software Architecture</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                <span>Remote & Worldwide Teams</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};