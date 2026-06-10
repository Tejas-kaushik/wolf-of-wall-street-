import { useCallback, useEffect, useRef, useState } from 'react';
import { ManualLoopVideo } from './components/ManualLoopVideo';
import { Navigation } from './components/Navigation';
import { ScrollRail } from './components/ScrollRail';

const MAP_URL = 'https://share.google/03qqYQH0xdGgUjCgb';

const sections = [
  { id: 'home', label: 'Arrival' },
  { id: 'story', label: 'Story' },
  { id: 'menu', label: 'Menu' },
  { id: 'visit', label: 'Visit' },
];

function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRefs = useRef<Array<HTMLElement | null>>([]);

  const goToSection = useCallback((index: number) => {
    const section = sectionRefs.current[index];
    section?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  useEffect(() => {
    const revealItems = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.16, rootMargin: '0px 0px -8% 0px' },
    );

    revealItems.forEach((item) => revealObserver.observe(item));

    return () => revealObserver.disconnect();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const index = Number((entry.target as HTMLElement).dataset.sectionIndex ?? 0);
          setActiveIndex(index);
        });
      },
      { threshold: 0.48 },
    );

    sectionRefs.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let rafId = 0;

    const updateScrollProgress = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
      document.documentElement.style.setProperty('--scroll-progress', progress.toFixed(4));
      rafId = requestAnimationFrame(updateScrollProgress);
    };

    rafId = requestAnimationFrame(updateScrollProgress);

    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-background text-ink">
      <ManualLoopVideo />

      <div className="pointer-events-none fixed inset-0 z-[1] bg-[linear-gradient(180deg,rgba(255,248,236,0.96)_0%,rgba(255,248,236,0.52)_30%,rgba(245,226,202,0.58)_70%,rgba(244,233,215,0.96)_100%)]" />
      <div className="pointer-events-none fixed left-[-12rem] top-20 z-[1] h-[32rem] w-[32rem] rounded-full bg-sage/20 blur-3xl" />
      <div className="pointer-events-none fixed bottom-[-10rem] right-[-10rem] z-[1] h-[34rem] w-[34rem] rounded-full bg-terracotta/20 blur-3xl" />
      <div className="pointer-events-none fixed left-1/2 top-[45%] z-[1] h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-cream/35 blur-3xl" />

      <Navigation activeIndex={activeIndex} onNavigate={goToSection} />
      <ScrollRail activeIndex={activeIndex} count={sections.length} labels={sections.map((section) => section.label)} onNavigate={goToSection} />

      <main className="relative z-10">
        <HeroSection
          refCallback={(node) => {
            sectionRefs.current[0] = node;
          }}
          onNavigate={goToSection}
        />
        <StorySection
          refCallback={(node) => {
            sectionRefs.current[1] = node;
          }}
        />
        <MenuSection
          refCallback={(node) => {
            sectionRefs.current[2] = node;
          }}
        />
        <VisitSection
          refCallback={(node) => {
            sectionRefs.current[3] = node;
          }}
        />
      </main>
    </div>
  );
}

type SectionRefProps = {
  refCallback: (node: HTMLElement | null) => void;
};

type HeroSectionProps = SectionRefProps & {
  onNavigate: (index: number) => void;
};

function HeroSection({ refCallback, onNavigate }: HeroSectionProps) {
  return (
    <section
      ref={refCallback}
      id="home"
      data-section-index="0"
      className="relative flex min-h-screen scroll-mt-0 flex-col items-center justify-center px-6 pb-28 text-center sm:pb-36"
      style={{ paddingTop: 'calc(8rem - 75px)' }}
      aria-label="The Stramont hero"
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center">
        <p data-reveal className="reveal mb-6 rounded-full border border-coffee/10 bg-cream/68 px-4 py-2 text-xs uppercase tracking-[0.28em] text-muted shadow-float backdrop-blur-xl">
          Newly opened cafe · Merchant City, Glasgow
        </p>

        <h1 data-reveal className="reveal reveal-delay-1 max-w-7xl font-display text-5xl font-normal leading-[0.95] tracking-[-2.46px] text-ink sm:text-7xl md:text-8xl">
          Warm coffee, soft bakes, <em className="font-display italic text-muted">quiet little rituals.</em>
        </h1>

        <p data-reveal className="reveal reveal-delay-2 mt-8 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
          The Stramont is a cozy international bakery and coffee shop shaped for slow mornings,
          golden pastries, thoughtful pours, and a little nature-soft calm in the middle of the city.
        </p>

        <div data-reveal className="reveal reveal-delay-3 mt-12 flex flex-col items-center gap-4 sm:flex-row">
          <button
            type="button"
            onClick={() => onNavigate(2)}
            className="rounded-full bg-coffee px-12 py-4 text-base text-cream shadow-warm transition-transform duration-300 ease-out hover:scale-[1.03] focus:outline-none focus:ring-2 focus:ring-coffee/20 focus:ring-offset-2 sm:px-14 sm:py-5"
          >
            View the Menu Mood
          </button>
          <button
            type="button"
            onClick={() => onNavigate(3)}
            className="rounded-full border border-coffee/15 bg-cream/65 px-8 py-4 text-base text-coffee shadow-float backdrop-blur-xl transition-transform duration-300 ease-out hover:scale-[1.03] focus:outline-none focus:ring-2 focus:ring-coffee/20 focus:ring-offset-2 sm:px-10 sm:py-5"
          >
            Visit Us
          </button>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-8 left-1/2 hidden -translate-x-1/2 items-center gap-3 text-xs text-muted md:flex">
        <span className="h-px w-10 bg-coffee/20" />
        <span>Scroll softly</span>
        <span className="h-px w-10 bg-coffee/20" />
      </div>
    </section>
  );
}

function StorySection({ refCallback }: SectionRefProps) {
  const notes = [
    ['Morning warmth', 'Cream walls, coffee tones, soft shadows, and a calm first impression.'],
    ['Nature, not wilderness', 'Sage details, leafy curves, and earthy balance without turning it into a forest site.'],
    ['Cafe-first feeling', 'Pastry, espresso, counters, trays, mugs, tables, and cozy city energy.'],
  ];

  return (
    <section
      ref={refCallback}
      id="story"
      data-section-index="1"
      className="relative scroll-mt-24 px-6 py-24 sm:py-32"
      aria-label="The Stramont story"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div data-reveal className="reveal sticky-copy lg:sticky lg:top-32">
          <p className="mb-5 text-sm uppercase tracking-[0.32em] text-muted">Cafe Atmosphere</p>
          <h2 className="font-display text-5xl font-normal leading-[0.92] tracking-[-1.8px] text-ink sm:text-6xl md:text-7xl">
            Cozy, earthy, <em className="italic text-muted">and made for coffee.</em>
          </h2>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            The design now feels like a warm cafe brand: soft cream backgrounds, roasted coffee
            contrast, sage-green nature accents, and floating glass cards that drift in as you scroll.
          </p>
        </div>

        <div className="grid gap-5">
          {notes.map(([title, body], index) => (
            <article
              key={title}
              data-reveal
              className="reveal floating-card rounded-[2rem] border border-coffee/10 bg-cream/62 p-7 shadow-float backdrop-blur-2xl transition-transform duration-500 hover:-translate-y-1"
              style={{ transitionDelay: `${index * 90}ms` }}
            >
              <div className="flex items-start gap-5">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-sage/18 font-display text-2xl text-coffee">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="font-display text-4xl leading-none text-ink">{title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">{body}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function MenuSection({ refCallback }: SectionRefProps) {
  const cards = [
    ['Fresh pastries', 'Golden, soft, filled, flaky, and arranged like a proper bakery counter.'],
    ['Coffee rituals', 'Espresso, lattes, iced pours, and slow-sip drinks with a warm modern finish.'],
    ['Global bites', 'Sweet and savoury ideas inspired by international bakery traditions.'],
  ];

  return (
    <section
      ref={refCallback}
      id="menu"
      data-section-index="2"
      className="relative scroll-mt-24 px-6 py-24 sm:py-32"
      aria-label="The Stramont menu"
    >
      <div className="mx-auto max-w-7xl">
        <div data-reveal className="reveal mx-auto max-w-3xl text-center">
          <p className="mb-5 text-sm uppercase tracking-[0.32em] text-muted">Bakes & Brews</p>
          <h2 className="font-display text-5xl font-normal leading-[0.92] tracking-[-1.8px] text-ink sm:text-6xl md:text-7xl">
            A counter full of <em className="italic text-muted">warm little choices.</em>
          </h2>
          <p className="mt-8 text-base leading-relaxed text-muted sm:text-lg">
            Instead of hard page-switching, every card now appears gradually, like you are walking
            through the cafe and noticing each detail on the counter.
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {cards.map(([title, body], index) => (
            <article
              key={title}
              data-reveal
              className="reveal group min-h-[18rem] rounded-[2.25rem] border border-coffee/10 bg-cream/62 p-7 shadow-float backdrop-blur-2xl transition-all duration-500 hover:-translate-y-1 hover:bg-cream/78"
              style={{ transitionDelay: `${index * 110}ms` }}
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-5xl text-coffee">{String(index + 1).padStart(2, '0')}</span>
                <span className="h-12 w-12 rounded-full border border-coffee/10 bg-[radial-gradient(circle_at_35%_35%,#fff8ec_0%,#d7b58a_45%,#68412b_100%)] shadow-soft transition-transform duration-500 group-hover:scale-110" />
              </div>
              <h3 className="mt-12 font-display text-4xl leading-none text-ink">{title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">{body}</p>
            </article>
          ))}
        </div>

        <div data-reveal className="reveal reveal-delay-2 mx-auto mt-10 flex max-w-4xl flex-wrap justify-center gap-3 text-sm text-muted">
          {['croissants', 'espresso', 'cakes', 'savoury bakes', 'iced coffee', 'quiet tables'].map((item) => (
            <span key={item} className="rounded-full border border-coffee/10 bg-cream/58 px-4 py-2 shadow-soft backdrop-blur-xl">
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function VisitSection({ refCallback }: SectionRefProps) {
  return (
    <section
      ref={refCallback}
      id="visit"
      data-section-index="3"
      className="relative scroll-mt-24 px-6 py-24 sm:py-32"
      aria-label="Visit The Stramont"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div data-reveal className="reveal rounded-[2.5rem] border border-coffee/10 bg-cream/68 p-8 shadow-float backdrop-blur-2xl sm:p-10 md:p-12">
          <p className="mb-5 text-sm uppercase tracking-[0.32em] text-muted">Visit</p>
          <h2 className="font-display text-5xl font-normal leading-[0.92] tracking-[-1.8px] text-ink sm:text-6xl md:text-7xl">
            Find your table in <em className="italic text-muted">Merchant City.</em>
          </h2>
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            Built for a cafe, not a wilderness brand: the final section keeps the nature tone subtle
            with sage, cream, coffee brown, pastry gold, and warm terracotta edges.
          </p>

          <div className="mt-10 flex flex-col gap-3 text-sm text-muted sm:flex-row sm:items-center sm:gap-6">
            <span>35 Glassford Street, Glasgow</span>
            <span className="hidden h-px w-10 bg-coffee/20 sm:block" />
            <span>International bakery & coffee shop</span>
          </div>

          <a
            href={MAP_URL}
            target="_blank"
            rel="noreferrer"
            className="mt-10 inline-flex rounded-full bg-coffee px-12 py-4 text-base text-cream shadow-warm transition-transform duration-300 ease-out hover:scale-[1.03] focus:outline-none focus:ring-2 focus:ring-coffee/20 focus:ring-offset-2 sm:px-14 sm:py-5"
          >
            Open Map
          </a>
        </div>

        <div className="grid gap-4">
          <div data-reveal className="reveal reveal-delay-1 rounded-[2rem] border border-coffee/10 bg-cream/60 p-7 shadow-float backdrop-blur-2xl">
            <p className="text-sm uppercase tracking-[0.28em] text-muted">Scroll feel</p>
            <p className="mt-5 font-display text-4xl leading-none text-ink">No hard panels. Just smooth reveal.</p>
          </div>
          <div data-reveal className="reveal reveal-delay-2 rounded-[2rem] border border-coffee/10 bg-cream/60 p-7 shadow-float backdrop-blur-2xl">
            <p className="text-sm uppercase tracking-[0.28em] text-muted">Visual direction</p>
            <p className="mt-5 text-sm leading-relaxed text-muted sm:text-base">
              Floating cards, warm coffee tones, gentle nature accents, and soft fade-rise motion
              make the experience feel cozy and premium instead of rigid.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default App;
