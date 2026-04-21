import { kojicBenefitCards, kojicRoutineNotes } from "@/data/product";

export function KojicBenefitsSection() {
  return (
    <section className="grid gap-6 lg:grid-cols-[1.02fr_0.98fr] lg:gap-8">
      <div className="panel space-y-5">
        <div className="space-y-3">
          <p className="eyebrow">Why Kojic Acid In 2026</p>
          <h2 className="font-[family:var(--font-display)] text-3xl text-[color:var(--ink-900)] sm:text-4xl">
            The ingredient story customers already understand, in a serum format they can use every day.
          </h2>
          <p className="text-base leading-7 text-[color:var(--ink-600)]">
            This section positions Dermato Care Kojic Acid 2% as a focused choice for shoppers who care about visible dark
            spots, uneven-looking tone, and cleaner everyday routines.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {kojicBenefitCards.map((item) => (
            <article className="rounded-[1.5rem] border border-[color:var(--border-soft)] bg-white/75 p-5" key={item.title}>
              <h3 className="text-xl font-semibold text-[color:var(--ink-900)]">{item.title}</h3>
              <p className="mt-3 text-base leading-7 text-[color:var(--ink-600)]">{item.body}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="panel space-y-5">
        <div className="rounded-[1.6rem] bg-[linear-gradient(180deg,rgba(23,39,63,0.08),rgba(35,58,90,0.04))] border border-[color:var(--border-soft)] p-6">
          <p className="text-sm uppercase tracking-[0.22em] text-[color:var(--navy-500)]">What Customers Want</p>
          <h3 className="mt-3 text-2xl font-semibold text-[color:var(--ink-900)] sm:text-3xl">A serum that feels targeted, modern, and easy to trust.</h3>
          <p className="mt-4 text-base leading-7 text-[color:var(--ink-600)]">
            In a 2026 skincare journey, customers are drawn to routines that look intentional: one hero serum, one clear
            concern, and one simple promise around visible tone support.
          </p>
        </div>

        <div className="space-y-3">
          {kojicRoutineNotes.map((note) => (
            <div
              className="rounded-[1.4rem] bg-[color:var(--shell-100)] px-4 py-4 text-[color:var(--ink-700)]"
              key={note}
            >
              {note}
            </div>
          ))}
        </div>

        <div className="rounded-[1.4rem] border border-[color:var(--border-soft)] bg-white/70 p-4 text-sm leading-6 text-[color:var(--ink-600)]">
          Best framed as support for the appearance of pigmentation-prone skin, not as an overnight transformation claim.
        </div>
      </div>
    </section>
  );
}
