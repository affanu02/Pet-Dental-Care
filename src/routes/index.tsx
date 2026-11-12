import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import normalXray from "@/assets/normal-radiograph.jpg";
import boneLossXray from "@/assets/bone-loss-radiograph.jpg";
import annotated from "@/assets/annotated-comparison.jpg";
import brushing from "@/assets/toothbrushing.jpg";
import warningSigns from "@/assets/warning-signs.jpg";
import tartarBuildup from "@/assets/tartar-buildup.jpg";
import healthyTeeth from "@/assets/healthy-teeth.jpg";
import catXray from "@/assets/cat-radiography.jpg";
import { IMAGE_CREDITS, IMAGE_REFERENCES, SOURCES, type Reference } from "@/lib/references";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Pet Dental Care — A guide for dog and cat owners" },
      {
        name: "description",
        content:
          "Why oral care matters for dogs and cats, warning signs to look for, how dental disease progresses, and how home care helps.",
      },
      { property: "og:title", content: "Pet Dental Care — A guide for dog and cat owners" },
      {
        property: "og:description",
        content: "Warning signs, stages of dental disease, what happens at the clinic, and home care for pets.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const NAV = [
  ["why", "Why it matters"],
  ["signs", "Warning signs"],
  ["stages", "Stages"],
  ["clinic", "At the clinic"],
  ["home", "Home care"],
  ["sources", "Sources"],
] as const;

function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) {
          el.classList.add("is-visible");
          io.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
}

function Section({ id, eyebrow, title, intro, children, tone = "" }: {
  id: string; eyebrow: string; title: string; intro?: ReactNode; children: ReactNode; tone?: string;
}) {
  return (
    <section id={id} className={`px-5 py-20 md:py-28 ${tone}`} aria-labelledby={`${id}-h`}>
      <div className="mx-auto max-w-6xl">
        <Reveal className="max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-widest text-accent">{eyebrow}</p>
          <h2 id={`${id}-h`} className="mt-2 text-3xl md:text-4xl">{title}</h2>
          {intro && <div className="mt-4 text-lg leading-relaxed text-muted-foreground">{intro}</div>}
        </Reveal>
        <div className="mt-12">{children}</div>
      </div>
    </section>
  );
}

function Citation({ reference }: { reference: Reference }) {
  const { author, date, title, siteName, journal, url } = reference;

  return (
    <>
      {author}{author.endsWith(".") ? "" : "."} ({date}).{" "}
      {journal ? (
        <>
          {title}. <em>{journal.name}, {journal.volume}</em>({journal.issue}), {journal.pages}.{" "}
        </>
      ) : (
        <>
          <cite>{title}</cite>. {siteName && `${siteName}. `}
        </>
      )}
      <a href={url} target="_blank" rel="noreferrer" className="underline underline-offset-2 hover:text-accent">{url}</a>
    </>
  );
}

function Figure({ src, alt, label, credit, children }: { src: string; alt: string; label?: string; credit: Reference; children?: ReactNode }) {
  return (
    <figure className="overflow-hidden rounded-2xl border bg-card shadow-soft">
      <div className="relative">
        <img src={src} alt={alt} loading="lazy" className="mx-auto block h-auto w-auto max-w-full" />
        {label && (
          <span className="absolute left-3 top-3 rounded-full bg-primary px-3 py-1 text-sm font-bold text-primary-foreground">
            {label}
          </span>
        )}
      </div>
      <figcaption className="space-y-2 p-4 text-sm">
        {children && <div className="leading-relaxed text-foreground">{children}</div>}
        <p className="break-words text-muted-foreground">
          Image source: <Citation reference={credit} />
        </p>
      </figcaption>
    </figure>
  );
}

const STAGES = [
  {
    n: 1, name: "Gingivitis", tag: "Reversible", short: "Inflammation of the gums — redness, swelling and possible bleeding.",
    more: "There is no attachment loss. This stage is reversible with proper professional dental cleaning and consistent oral home care."
  },
  {
    n: 2, name: "Early periodontitis", tag: "Irreversible damage begins", short: "Inflammation has progressed under the gumline.",
    more: "Less than 25% attachment loss. Early periodontal pockets are formed and mild bone loss may happen. Treatment includes scaling, polishing and subgingival scaling or locally applied antimicrobials."
  },
  {
    n: 3, name: "Established periodontitis", tag: "Irreversible", short: "Significant damage to the supporting structures of the teeth.",
    more: "25–50% attachment loss. There are deeper periodontal pockets, gingival recession, bone loss and possible tooth mobility."
  },
  {
    n: 4, name: "Advanced periodontitis", tag: "Irreversible", short: "Severe destruction of the supporting tissues.",
    more: "Greater than 50% periodontal attachment loss. Teeth may become extremely loose, and issues like infections and extensive bone loss may occur."
  },
];

function StageCard({ s }: { s: (typeof STAGES)[number] }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const reversible = s.n === 1;
  return (
    <div className="flex flex-col rounded-2xl border bg-card p-6 shadow-soft transition-transform hover:-translate-y-1">
      <span className={`self-start rounded-full px-3 py-1 text-xs font-bold ${reversible ? "bg-sage text-foreground" : "bg-rose text-foreground"}`}>{s.tag}</span>
      <p className="mt-4 text-sm font-bold text-accent">Stage {s.n}</p>
      <h3 className="text-xl">{s.name}</h3>
      <p className="mt-2 leading-relaxed text-muted-foreground">{s.short}</p>
      <button type="button" aria-expanded={open} aria-controls={id} onClick={() => setOpen(!open)}
        className="mt-auto pt-4 text-left font-semibold text-primary underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-ring">
        {open ? "Show less −" : "Learn more +"}
      </button>
      <div id={id} hidden={!open} className="mt-3 border-t pt-3 text-sm leading-relaxed">{s.more}</div>
    </div>
  );
}

const STEPS = [
  ["Awake oral exam", "The vet examines the mouth while your pet is awake for visible abnormalities — teeth, gums, tongue, lips and bite. This is only a preliminary assessment: some problems cannot be fully evaluated without general anesthesia, periodontal probing and dental radiographs."],
  ["Dental radiographs under general anesthesia", "Full-mouth X-rays evaluate the tooth roots, supporting bone and abnormalities under the gumline that can't be seen during a visual exam. Anesthesia allows accurate positioning, prevents movement, and keeps your pet comfortable and the team safe."],
  ["Cleaning above and below the gumline", "Plaque and calculus are removed from the teeth above and below the gumline using hand instruments and ultrasonic scalers."],
  ["Polishing", "Polishing smooths the enamel surface and reduces scratches that encourage plaque buildup."],
  ["Assessment and treatment", "Each tooth is probed to assess pocket depths and attachment loss. Based on the findings, the vet discusses a treatment plan with you — such as periodontal therapy or extractions — before treatment begins."],
  ["Recovery", "Your pet is monitored as they recover from anesthesia after the procedure."],
  ["Home-care instructions", "You receive instructions on maintaining your pet's oral health with regular toothbrushing, dental products, or preventative care."],
];

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-primary focus:p-2 focus:text-primary-foreground">Skip to content</a>
      <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur">
        <nav aria-label="Main" className="mx-auto flex max-w-6xl items-center gap-6 overflow-x-auto px-5 py-3">
          <a href="#top" className="shrink-0 font-display text-lg font-semibold text-primary">Pet Dental Care</a>
          <ul className="ml-auto flex shrink-0 gap-5 text-sm font-semibold">
            {NAV.map(([id, label]) => (
              <li key={id}><a href={`#${id}`} className="whitespace-nowrap text-muted-foreground transition-colors hover:text-accent">{label}</a></li>
            ))}
          </ul>
        </nav>
      </header>

      <main id="main">
        <section id="top" className="relative overflow-hidden px-5 pb-20 pt-16 md:pt-24">
          <div aria-hidden className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-secondary opacity-60 blur-3xl" />
          <div aria-hidden className="absolute -bottom-40 -left-20 h-80 w-80 rounded-full bg-sage opacity-40 blur-3xl" />
          <div className="relative mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
            <Reveal>
              <p className="text-sm font-bold uppercase tracking-widest text-accent">A guide for dog & cat owners</p>
              <h1 className="mt-3 text-5xl leading-tight md:text-6xl">Pet Dental Care</h1>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">
                Dental disease can cause pain, infections, and long-term damage to your pet's teeth. Regular veterinary exams and daily home care help keep your pet comfortable, healthy, and happy.
              </p>
              <a href="#signs" className="mt-8 inline-flex rounded-full bg-primary px-7 py-3 font-bold text-primary-foreground shadow-soft transition hover:-translate-y-0.5 hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring">
                See the warning signs ↓
              </a>
            </Reveal>
            <Reveal>
              <img src={brushing} alt="A veterinary team member gently brushing a golden dog's teeth with a small toothbrush" className="mx-auto block h-auto w-auto max-w-full rounded-3xl shadow-soft" />
              <p className="mt-2 break-words text-xs text-muted-foreground">Image source: <Citation reference={IMAGE_CREDITS.brushing} /></p>
            </Reveal>
          </div>
        </section>

        <Section id="why" eyebrow="Why it matters" title="Why is oral care so important for your pet?" tone="bg-muted">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Plaque", "Poor oral hygiene allows bacterial plaque buildup on the teeth and along the gumline. Not regularly removing it can lead to gum inflammation."],
              ["Periodontal disease", "One of the most common dental conditions in pets. Left untreated, it can cause gum recession, bone destruction, tooth mobility, and eventually tooth loss."],
              ["Pain", "Many animals can still continue to eat despite experiencing discomfort, making it challenging for owners to recognize dental problems without a thorough oral examination."],
              ["Quality of life", "Poor oral health can cause issues with chewing, decreased appetite, excessive drooling, bad breath, and behavioural changes related to oral pain."],
            ].map(([t, d]) => (
              <Reveal key={t} className="h-full">
                <div className="h-full rounded-2xl border bg-card p-6 shadow-soft transition-transform hover:-translate-y-1">
                  <div className="h-1.5 w-10 rounded-full bg-rose" />
                  <h3 className="mt-4 text-xl">{t}</h3>
                  <p className="mt-2 leading-relaxed text-muted-foreground">{d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>

        <Section id="signs" eyebrow="What to look for" title="Normal or a warning sign?"
          intro={<p>If you notice any of these signs, bring your pet to the vet. Remember: many problems sit below the gumline, so clean-looking teeth don't always mean a healthy mouth.</p>}>
          <div className="grid gap-8 md:grid-cols-2">
            <Reveal>
              <Figure src={healthyTeeth} label="Healthy-looking teeth and gums" credit={IMAGE_CREDITS.teeth}
                alt="Close-up of a dog's mouth after a professional dental cleaning, with clean scaled teeth and healthy pink gums">
                The same mouth after a professional cleaning — clean teeth and healthy gums.
              </Figure>
            </Reveal>
            <Reveal>
              <Figure src={tartarBuildup} label="Warning signs" credit={IMAGE_CREDITS.teeth}
                alt="Close-up of a dog's mouth showing thick yellow-brown tartar on the teeth and red, inflamed gums">
                Tartar buildup and red, inflamed gums.
              </Figure>
            </Reveal>
          </div>
          <Reveal className="mt-8">
            <Figure src={warningSigns} credit={IMAGE_CREDITS.warningSigns}
              alt="Infographic of 7 key signs of dental disease: reluctance to chew or dropping food, red swollen or bleeding gums, persistent bad breath, pawing at the mouth, yellow or brown tartar, excessive drooling or blood, and loose or missing teeth">
              7 key signs: reluctance to chew or dropping food, red swollen or bleeding gums, persistent bad breath, pawing at the mouth, yellow or brown tartar, excessive drooling or blood, and loose or missing teeth.
            </Figure>
          </Reveal>

          <Reveal className="mt-20 max-w-2xl">
            <h3 className="text-2xl md:text-3xl">What an X-ray can show</h3>
            <p className="mt-3 leading-relaxed text-muted-foreground">These radiographs are from two different patients — not a before and after.</p>
          </Reveal>
          <div className="mt-8 grid gap-8 md:grid-cols-2">
            <Reveal>
              <Figure src={normalXray} label="Normal radiograph" credit={IMAGE_CREDITS.normalXray}
                alt="Normal canine dental radiograph of the lower jaw with numbered teeth and bone surrounding the roots" />
            </Reveal>
            <Reveal>
              <Figure src={boneLossXray} label="Bone loss" credit={IMAGE_CREDITS.boneLossXray}
                alt="Dental radiograph showing a furcation defect and vertical bone loss around a lower premolar in a dog">
                A furcation defect and vertical bone loss next to the left lower 4th premolar in a dog.
              </Figure>
            </Reveal>
          </div>

          <section className="mt-20" aria-labelledby="comparison-heading">
            <Reveal className="mx-auto max-w-2xl text-center">
              <h3 id="comparison-heading" className="text-2xl md:text-3xl">
                What you see vs. what an X-ray reveals
              </h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                Same dog, same teeth. Serious disease can hide below the gumline.
              </p>
            </Reveal>

            <Reveal className="mx-auto mt-8 w-full">
              <Figure src={annotated} credit={IMAGE_CREDITS.annotated}
                alt="Side-by-side photo and X-ray of one dog, with red arrows marking teeth that needed extraction and lines showing where bone should be versus where it actually is">
                Beautiful on the outside, severely diseased on the inside. Blue line = where the bone should be; red line = the actual bone level. Red arrows mark teeth that needed extraction.
              </Figure>
            </Reveal>
          </section>
        </Section>

        <Section id="stages" eyebrow="How it progresses" title="The 4 stages of dental disease" tone="bg-muted"
          intro={<p>Disease starts with gingivitis, caused by plaque along the gumline. <strong className="text-foreground">Gingivitis is reversible</strong> with proper treatment and consistent oral hygiene. Once it becomes periodontitis, the damage is <strong className="text-foreground">irreversible</strong> — but treatment can help control it.</p>}>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {STAGES.map((s) => <Reveal key={s.n} className="h-full"><StageCard s={s} /></Reveal>)}
          </div>
        </Section>

        <Section id="clinic" eyebrow="At the clinic" title="What happens during a dental visit?"
          intro={<p>An awake exam is a helpful first step, but it's only preliminary. Dental radiographs reveal problems below the gumline — in one study, 28% of normal-looking dogs and 42% of cats had important abnormalities visible only on X-rays.</p>}>
          <div className="grid gap-10 lg:grid-cols-[3fr_2fr]">
            <ol className="space-y-4">
              {STEPS.map(([t, d], i) => (
                <Reveal key={t}>
                  <li className="flex gap-4 rounded-2xl border bg-card p-5 transition-shadow hover:shadow-soft">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary font-display font-semibold text-secondary-foreground">{i + 1}</span>
                    <div>
                      <h3 className="text-lg">{t}</h3>
                      <p className="mt-1 leading-relaxed text-muted-foreground">{d}</p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ol>
            <Reveal className="lg:sticky lg:top-24 lg:self-start">
              <Figure src={catXray} credit={IMAGE_CREDITS.catXray}
                alt="A calico cat under general anesthesia with a breathing tube, positioned for dental radiographs">
                Dental radiographs are taken under general anesthesia.
              </Figure>
            </Reveal>
          </div>
        </Section>

        <Section id="home" eyebrow="Home care" title="Caring for teeth at home" tone="bg-muted"
          intro={<p>Professional cleanings should ideally happen at least once a year, while home care should be practiced daily to help prevent or slow dental disease and extend the benefits of professional treatment.</p>}>
          <div className="grid gap-6 md:grid-cols-2">
            <Reveal className="h-full">
              <div className="h-full rounded-2xl border bg-card p-8 shadow-soft">
                <span className="rounded-full bg-accent px-3 py-1 text-xs font-bold text-accent-foreground">Active care</span>
                <h3 className="mt-4 text-2xl">Toothbrushing</h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">The owner directly cares for the pet's oral health. Toothbrushing mechanically removes plaque from the teeth before it mineralizes and becomes hardened dental calculus.</p>
              </div>
            </Reveal>
            <Reveal className="h-full">
              <div className="h-full rounded-2xl border bg-card p-8 shadow-soft">
                <span className="rounded-full bg-sage px-3 py-1 text-xs font-bold text-foreground">Passive care</span>
                <h3 className="mt-4 text-2xl">Diets, chews & water additives</h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">The pet contributes to its own oral health through chewing, eating, and drinking — useful when a pet doesn't tolerate brushing. Examples include specialized oral health diets, dental chews, chew toys, and water additives.</p>
              </div>
            </Reveal>
          </div>
          <Reveal className="mt-8">
            <div className="grid items-center gap-6 rounded-2xl border bg-card p-8 shadow-soft md:grid-cols-[200px_1fr]">
              <div role="img" aria-label="Image placeholder: VOHC Seal of Acceptance" className="flex aspect-square flex-col items-center justify-center rounded-full border-2 border-dashed border-sage bg-muted p-4 text-center text-xs">
                <span className="font-bold">Image placeholder</span>
                <span className="mt-1 font-display text-base">VOHC Seal of Acceptance</span>
              </div>
              <div>
                <h3 className="text-2xl">Look for the VOHC seal</h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">The Veterinary Oral Health Council (VOHC) is made up of veterinary dental specialists who evaluate oral health products based on scientific evidence. Products that meet its requirements receive a seal of acceptance, and VOHC provides an online list of approved products. Home care works alongside — not instead of — professional dental care.</p>
                <a href="https://vohc.org/" target="_blank" rel="noreferrer" className="mt-4 inline-block font-semibold text-primary underline underline-offset-4 hover:text-accent">Visit vohc.org</a>
              </div>
            </div>
          </Reveal>
        </Section>

        <Section id="sources" eyebrow="References" title="Sources and image credits">
          <div className="grid gap-10 md:grid-cols-2">
            <div>
              <h3 className="text-xl">Sources</h3>
              <ul className="mt-4 space-y-4 text-sm leading-relaxed">
                {SOURCES.map((reference) => (
                  <li key={reference.url} className="break-words pl-8 -indent-8"><Citation reference={reference} /></li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xl">Image credits</h3>
              <ul className="mt-4 space-y-4 text-sm leading-relaxed">
                {IMAGE_REFERENCES.map((reference) => (
                  <li key={reference.url} className="break-words pl-8 -indent-8"><Citation reference={reference} /></li>
                ))}
              </ul>
            </div>
          </div>
        </Section>
      </main>
      <footer className="border-t px-5 py-8 text-center text-sm text-muted-foreground">
        This guide is for education only. Talk to your veterinarian about your pet's dental health.
      </footer>
    </div>
  );
}
