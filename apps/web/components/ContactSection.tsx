"use client";

import { useState } from "react";

const SERVICE_TYPES = [
  "Visiting Cards",
  "Wedding Cards",
  "Brochures & Flyers",
  "Business Cards",
  "Book Printing",
  "Custom Printing",
  "Other",
];

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-white/15 pb-3">
      <label className="block text-xs font-semibold uppercase tracking-wide text-white/50">
        {label}
      </label>
      {children}
    </div>
  );
}

const inputClass =
  "mt-2 w-full bg-transparent py-1 text-white placeholder:text-white/30 focus:outline-none";

type SectionSlug = "printing" | "mementoes" | "corporate-gifts";

const EXTRA_FIELD: Record<SectionSlug, { key: "paperSpec" | "eventDate" | "brandingRequirements"; label: string; placeholder: string }> = {
  printing: { key: "paperSpec", label: "Paper / Finish Spec", placeholder: "e.g., 300gsm matte" },
  mementoes: { key: "eventDate", label: "Event Date", placeholder: "e.g., 2026-12-01" },
  "corporate-gifts": {
    key: "brandingRequirements",
    label: "Branding Requirements",
    placeholder: "e.g., logo colors, placement",
  },
};

const EMPTY = {
  name: "",
  email: "",
  phone: "",
  serviceType: "",
  quantity: "",
  details: "",
  paperSpec: "",
  eventDate: "",
  brandingRequirements: "",
};

export default function ContactSection({ sectionSlug }: { sectionSlug: SectionSlug }) {
  const [values, setValues] = useState(EMPTY);
  const extra = EXTRA_FIELD[sectionSlug];
  const [status, setStatus] = useState<"idle" | "saving" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  function set<K extends keyof typeof values>(key: K, value: string) {
    setValues((v) => ({ ...v, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("saving");
    setError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, sectionSlug }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to submit");
      setValues(EMPTY);
      setStatus("success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit");
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="relative overflow-hidden bg-ink py-16 sm:py-24">
      <div className="halftone-bg pointer-events-none absolute inset-0 opacity-[0.15]" />

      <div className="relative mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10">
        <h2 className="text-center font-sans text-3xl font-semibold tracking-tight text-white sm:text-5xl lg:text-7xl">
          Let&apos;s work together.
        </h2>

        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-[380px_1fr] lg:gap-16">
          <div className="relative">
            <div className="space-y-4">
            <div className="border border-white/10 bg-white/5 p-6">
              <p className="text-xs font-semibold uppercase tracking-wide text-white/50">
                Email
              </p>
              <p className="mt-3 text-xl font-semibold text-white">
                hello@arjunprintingpress.com
              </p>
            </div>

            <img
              src="https://picsum.photos/seed/contact-photo-1/560/280"
              alt=""
              className="aspect-[2/1] w-full object-cover"
            />

            <div className="border border-white/10 bg-white/5 p-6">
              <p className="text-xs font-semibold uppercase tracking-wide text-white/50">
                Phone
              </p>
              <p className="mt-3 text-xl font-semibold text-white">+91 98765 43210</p>
            </div>

            <img
              src="https://picsum.photos/seed/contact-photo-2/560/280"
              alt=""
              className="aspect-[2/1] w-full object-cover"
            />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="max-w-xl space-y-8">
            <Field label="Name">
              <input
                type="text"
                placeholder="Your name"
                value={values.name}
                onChange={(e) => set("name", e.target.value)}
                required
                className={inputClass}
              />
            </Field>

            <Field label="Email">
              <input
                type="email"
                placeholder="you@email.com"
                value={values.email}
                onChange={(e) => set("email", e.target.value)}
                required
                className={inputClass}
              />
            </Field>

            <Field label="Phone Number">
              <input
                type="tel"
                placeholder="Your phone number"
                value={values.phone}
                onChange={(e) => set("phone", e.target.value)}
                required
                className={inputClass}
              />
            </Field>

            <Field label="Service Type">
              <select
                value={values.serviceType}
                onChange={(e) => set("serviceType", e.target.value)}
                required
                className={`${inputClass} appearance-none`}
              >
                <option value="" disabled className="bg-ink">
                  Select...
                </option>
                {SERVICE_TYPES.map((type) => (
                  <option key={type} value={type} className="bg-ink">
                    {type}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Quantity">
              <input
                type="text"
                placeholder="e.g., 1000 pieces"
                value={values.quantity}
                onChange={(e) => set("quantity", e.target.value)}
                required
                className={inputClass}
              />
            </Field>

            <Field label={extra.label}>
              <input
                type="text"
                placeholder={extra.placeholder}
                value={values[extra.key]}
                onChange={(e) => set(extra.key, e.target.value)}
                className={inputClass}
              />
            </Field>

            <Field label="Project Details & Specifications">
              <textarea
                placeholder="Tell us about your project"
                rows={3}
                value={values.details}
                onChange={(e) => set("details", e.target.value)}
                required
                className={`${inputClass} resize-y`}
              />
            </Field>

            <div className="flex items-center gap-4">
              <button
                type="submit"
                disabled={status === "saving"}
                className="bg-white px-8 py-3 text-sm font-semibold uppercase tracking-wide text-ink transition hover:bg-white/90 disabled:opacity-50"
              >
                {status === "saving" ? "Sending…" : "Submit"}
              </button>
              {status === "success" && (
                <p className="text-sm text-white/70">Thanks — we&apos;ll be in touch.</p>
              )}
              {status === "error" && <p className="text-sm text-accent-pink">{error}</p>}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
