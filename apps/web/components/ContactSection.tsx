"use client";

const TOPICS = [
  "General Inquiry",
  "Printing Services",
  "Mementoes Services",
  "Corporate Gifts",
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

export default function ContactSection() {
  return (
    <section id="contact" className="bg-ink py-24">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-16 px-6 lg:grid-cols-[380px_1fr]">
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

        <div>
          <h2 className="font-sans text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl">
            Let&apos;s work together.
          </h2>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="mt-14 max-w-xl space-y-8"
          >
            <Field label="Name">
              <input
                type="text"
                placeholder="Your name"
                className={inputClass}
              />
            </Field>

            <Field label="Email">
              <input
                type="email"
                placeholder="you@email.com"
                className={inputClass}
              />
            </Field>

            <Field label="Topic">
              <select defaultValue="" className={`${inputClass} appearance-none`}>
                <option value="" disabled className="bg-ink">
                  Select...
                </option>
                {TOPICS.map((topic) => (
                  <option key={topic} value={topic} className="bg-ink">
                    {topic}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Message">
              <textarea
                placeholder="Enter your message"
                rows={3}
                className={`${inputClass} resize-y`}
              />
            </Field>

            <button
              type="submit"
              className="bg-white px-8 py-3 text-sm font-semibold uppercase tracking-wide text-ink transition hover:bg-white/90"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
