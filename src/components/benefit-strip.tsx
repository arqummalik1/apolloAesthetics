import { benefitCards } from "@/data/product";

export function BenefitStrip() {
  return (
    <section className="grid gap-4 lg:grid-cols-4">
      {benefitCards.map((card) => (
        <article className="panel h-full" key={card.title}>
          <p className="eyebrow">Why It Works</p>
          <h3 className="mt-3 text-2xl font-semibold text-[color:var(--ink-900)]">{card.title}</h3>
          <p className="mt-4 text-base leading-7 text-[color:var(--ink-600)]">{card.body}</p>
        </article>
      ))}
    </section>
  );
}
