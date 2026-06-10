import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FloatingActions } from './components/FloatingActions';
import { ManualLoopVideo } from './components/ManualLoopVideo';
import { Navigation } from './components/Navigation';
import { ParticleTunnel } from './components/ParticleTunnel';

gsap.registerPlugin(ScrollTrigger);

const heroStats = [
  ['35', 'Glassford Street'],
  ['Global', 'Bakes & brews'],
  ['Slow', 'Coffee moments'],
];

const productCards = [
  {
    name: 'Milo Mocha',
    tag: 'Signature cup',
    description: 'Oat-based Milo, Belgian chocolate, espresso, cold brew, and a soft malt finish.',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1100&q=85',
  },
  {
    name: 'Iced Milo Mocha',
    tag: 'Cold favourite',
    description: 'A chilled malt-mocha pour made for city walks, catchups, and calm study sessions.',
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=1100&q=85',
  },
  {
    name: 'Matcha / Chai Mood',
    tag: 'Soft sips',
    description: 'Warm, mellow drinks for customers who want comfort without heavy coffee.',
    image: 'https://images.unsplash.com/photo-1515823662972-da6a2e4d3002?auto=format&fit=crop&w=1100&q=85',
  },
];

const bakeGallery = [
  {
    title: 'Filled Croissants',
    label: 'Buttery layers',
    image: 'https://images.unsplash.com/photo-1549903072-7e6e0bedb7fb?auto=format&fit=crop&w=1200&q=85',
  },
  {
    title: 'Sweet Treats',
    label: 'Global bakery case',
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=1200&q=85',
  },
  {
    title: 'Savoury Goods',
    label: 'Warm lunch bakes',
    image: 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&w=1200&q=85',
  },
  {
    title: 'City Coffee',
    label: 'Slow morning ritual',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=85',
  },
];

const menuGroups = [
  {
    label: 'Hot cups',
    items: ['Espresso', 'Americano', 'Mocha', 'Hot Chocolate', 'Matcha', 'Chai', 'Tea'],
  },
  {
    label: 'Cold cups',
    items: ['Iced Milo Mocha', 'Cold brew style pours', 'Iced mocha', 'Chilled seasonal drinks'],
  },
  {
    label: 'Sweet bakes',
    items: ['Filled croissants', 'Cake slices', 'Global sweet treats', 'Mango / chocolate bakery specials'],
  },
  {
    label: 'Savoury bakes',
    items: ['International savoury goods', 'Asian weekly specials', 'China highlights', 'Vietnam highlights', 'India highlights'],
  },
];

const floatingTags = ['Coffee', 'Croissants', 'Milo Mocha', 'Global Bakes', 'Merchant City'];

function App() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((element) => {
        gsap.fromTo(
          element,
          { opacity: 0, y: 34, filter: 'blur(10px)' },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 1.05,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: element,
              start: 'top 82%',
              toggleActions: 'play none none reverse',
            },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>('[data-float]').forEach((element, index) => {
        gsap.to(element, {
          y: index % 2 === 0 ? -18 : 18,
          rotation: index % 2 === 0 ? 1.5 : -1.5,
          duration: 3.6 + index * 0.4,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
        });
      });

      gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((element) => {
        gsap.to(element, {
          yPercent: -10,
          ease: 'none',
          scrollTrigger: {
            trigger: element,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.1,
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden bg-night text-cream">
      <ParticleTunnel />
      <ManualLoopVideo />

      <div className="pointer-events-none fixed inset-0 z-[1] bg-[radial-gradient(circle_at_50%_10%,rgba(214,169,107,0.18),transparent_34%),linear-gradient(180deg,rgba(16,9,5,0.55),rgba(16,9,5,0.92)_45%,rgba(10,6,4,1))]" />
      <div className="grain pointer-events-none fixed inset-0 z-[2]" />

      <Navigation />
      <FloatingActions />

      <section id="home" className="relative z-10 flex min-h-screen items-center px-5 pb-24 pt-36 sm:px-8 lg:px-12">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <div data-reveal className="mb-7 inline-flex items-center gap-3 rounded-full border border-honey/20 bg-cream/8 px-4 py-2 text-xs font-medium uppercase tracking-[0.26em] text-honey backdrop-blur-xl">
              Newly opened in Merchant City
            </div>

            <h1 data-reveal className="max-w-5xl font-display text-[clamp(4rem,10vw,10rem)] font-normal leading-[0.82] tracking-[-0.06em] text-cream">
              Coffee that feels like a quiet corner.
            </h1>

            <p data-reveal className="mt-8 max-w-2xl text-base leading-8 text-milk/72 sm:text-lg">
              A calm, cinematic cafe experience for The Stramont — global bakes, signature cups,
              soft lighting, and a Glasgow hideaway for students, creatives, families, and slow morning people.
            </p>

            <div data-reveal className="mt-10 flex flex-wrap items-center gap-3">
              <a href="#story" className="rounded-full bg-honey px-7 py-3 text-sm font-semibold text-night shadow-glow transition hover:scale-[1.03]">
                Explore the cups
              </a>
              <a href="#menu" className="rounded-full border border-cream/15 bg-cream/8 px-7 py-3 text-sm font-semibold text-cream backdrop-blur-xl transition hover:scale-[1.03] hover:bg-cream/12">
                See menu highlights
              </a>
            </div>

            <div data-reveal className="mt-12 grid max-w-2xl grid-cols-3 gap-3">
              {heroStats.map(([value, label]) => (
                <div key={label} className="rounded-3xl border border-cream/10 bg-cream/[0.07] p-4 backdrop-blur-2xl">
                  <div className="font-display text-3xl text-honey">{value}</div>
                  <div className="mt-1 text-xs uppercase tracking-[0.18em] text-milk/50">{label}</div>
                </div>
              ))}
            </div>
          </div>

          <div data-reveal className="relative min-h-[520px]">
            <div data-float className="absolute right-2 top-0 z-10 w-[72%] overflow-hidden rounded-[2.2rem] border border-cream/10 bg-cream/10 p-2 shadow-cafe backdrop-blur-2xl">
              <img
                src="https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=1200&q=85"
                alt="Realistic cafe coffee cup on a table"
                className="h-[390px] w-full rounded-[1.8rem] object-cover"
              />
              <div className="absolute bottom-6 left-6 rounded-full bg-night/60 px-4 py-2 text-sm text-cream backdrop-blur-xl">
                Fresh coffee / soft glow
              </div>
            </div>

            <div data-float className="absolute bottom-5 left-0 z-20 w-[58%] overflow-hidden rounded-[2rem] border border-cream/10 bg-cream/10 p-2 shadow-cafe backdrop-blur-2xl">
              <img
                src="https://images.unsplash.com/photo-1549903072-7e6e0bedb7fb?auto=format&fit=crop&w=1000&q=85"
                alt="Golden croissants in a warm bakery display"
                className="h-[260px] w-full rounded-[1.55rem] object-cover opacity-95"
                onError={(event) => {
                  event.currentTarget.src =
                    'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1000&q=85';
                }}
              />

              <div className="absolute bottom-5 left-5 rounded-full bg-honey px-4 py-2 text-sm font-semibold text-night">
                Warm croissants
              </div>
            </div>

            <div data-float className="absolute left-8 top-12 rounded-full border border-sage/30 bg-sage/15 px-5 py-3 text-sm text-sage backdrop-blur-xl">
              calm · cozy · global
            </div>
          </div>
        </div>
      </section>

      <section id="story" className="relative z-10 px-5 py-28 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div data-reveal className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.28em] text-honey">Signature cups</p>
            <h2 className="mt-4 font-display text-5xl leading-[0.92] tracking-[-0.04em] text-cream sm:text-7xl">
              Dark, smooth, not loud. Built for long conversations.
            </h2>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {productCards.map((card, index) => (
              <article
                key={card.name}
                data-reveal
                data-parallax
                className="group relative overflow-hidden rounded-[2rem] border border-cream/10 bg-cream/[0.07] p-3 shadow-cafe backdrop-blur-2xl"
              >
                <img
                  src={card.image}
                  alt={`${card.name} coffee product`}
                  className="h-[390px] w-full rounded-[1.55rem] object-cover opacity-90 transition duration-700 group-hover:scale-105 group-hover:opacity-100"
                />

                <div className="absolute inset-x-6 bottom-6 rounded-[1.4rem] border border-cream/10 bg-night/60 p-5 backdrop-blur-2xl">
                  <div className="mb-3 inline-flex rounded-full bg-honey/90 px-3 py-1 text-xs font-semibold text-night">
                    {card.tag}
                  </div>
                  <h3 className="font-display text-3xl text-cream">{card.name}</h3>
                  <p className="mt-2 text-sm leading-6 text-milk/70">{card.description}</p>
                  <a href="#visit" className="mt-4 inline-flex rounded-full border border-cream/15 px-4 py-2 text-sm text-cream transition hover:bg-cream hover:text-night">
                    Try this cup
                  </a>
                </div>

                <div className="absolute right-5 top-5 rounded-full bg-night/55 px-3 py-1 text-xs text-cream/80 backdrop-blur-xl">
                  0{index + 1}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="journal" className="relative z-10 px-5 py-28 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-end gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div data-reveal>
              <p className="text-sm uppercase tracking-[0.28em] text-sage">Bakery case</p>
              <h2 className="mt-4 font-display text-5xl leading-[0.92] tracking-[-0.04em] text-cream sm:text-7xl">
                Global bakes with a soft Merchant City mood.
              </h2>
            </div>

            <p data-reveal className="max-w-2xl text-base leading-8 text-milk/68 sm:ml-auto sm:text-lg">
              International sweet treats, savoury goods, and rotating global influences are shown as a calm bakery wall instead of a loud fast-food menu.
            </p>
          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {bakeGallery.map((item) => (
              <article key={item.title} data-reveal className="group relative min-h-[390px] overflow-hidden rounded-[2rem] border border-cream/10 bg-cream/[0.06] shadow-cafe">
                <img
                  src={item.image}
                  alt={item.title}
                  className="absolute inset-0 h-full w-full object-cover opacity-80 transition duration-700 group-hover:scale-110"
                  onError={(event) => {
                    event.currentTarget.src =
                      'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=85';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-night via-night/20 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5">
                  <span className="rounded-full bg-cream/12 px-3 py-1 text-xs uppercase tracking-[0.18em] text-milk backdrop-blur-xl">
                    {item.label}
                  </span>
                  <h3 className="mt-4 font-display text-4xl text-cream">{item.title}</h3>
                  <a href="#visit" className="mt-4 inline-flex rounded-full bg-cream px-4 py-2 text-sm font-semibold text-night transition hover:scale-105 hover:bg-honey">
                    Ask in store
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="menu" className="relative z-10 px-5 py-28 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl rounded-[2.5rem] border border-cream/10 bg-cream/[0.06] p-5 shadow-cafe backdrop-blur-2xl sm:p-8 lg:p-10">
          <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
            <div data-reveal>
              <p className="text-sm uppercase tracking-[0.28em] text-honey">Menu highlights</p>
              <h2 className="mt-4 font-display text-5xl leading-[0.92] tracking-[-0.04em] text-cream sm:text-7xl">
                Choose your mood.
              </h2>
              <p className="mt-6 text-base leading-8 text-milk/65">
                These cards are easy to update when the cafe posts the full official board. The design keeps it premium, readable, and calm.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {floatingTags.map((tag) => (
                  <a
                    key={tag}
                    href="#visit"
                    data-float
                    className="rounded-full border border-cream/12 bg-night/45 px-4 py-2 text-sm text-cream/80 backdrop-blur-xl transition hover:bg-cream hover:text-night"
                  >
                    {tag}
                  </a>
                ))}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {menuGroups.map((group) => (
                <div key={group.label} data-reveal className="rounded-[1.8rem] border border-cream/10 bg-night/40 p-5 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:bg-night/55">
                  <div className="mb-5 flex items-center justify-between gap-4">
                    <h3 className="font-display text-3xl text-cream">{group.label}</h3>
                    <a href="#visit" className="rounded-full bg-honey px-3 py-1 text-xs font-bold text-night">
                      Ask
                    </a>
                  </div>

                  <ul className="space-y-3">
                    {group.items.map((item) => (
                      <li key={item} className="flex items-start justify-between gap-4 border-t border-cream/8 pt-3 text-sm text-milk/72">
                        <span>{item}</span>
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-sage" />
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="visit" className="relative z-10 px-5 pb-40 pt-28 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div data-reveal className="overflow-hidden rounded-[2.5rem] border border-cream/10 bg-cream/[0.06] p-3 shadow-cafe backdrop-blur-2xl">
            <img
              src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1400&q=85"
              alt="Warm cafe interior with coffee cups"
              className="h-[560px] w-full rounded-[2rem] object-cover opacity-90"
            />
          </div>

          <div data-reveal className="rounded-[2.5rem] border border-cream/10 bg-night/55 p-8 shadow-cafe backdrop-blur-2xl sm:p-10">
            <p className="text-sm uppercase tracking-[0.28em] text-sage">Visit The Stramont</p>
            <h2 className="mt-4 font-display text-5xl leading-[0.92] tracking-[-0.04em] text-cream sm:text-7xl">
              Come for the cup. Stay for the calm.
            </h2>

            <p className="mt-6 text-base leading-8 text-milk/68">
              35 Glassford Street, Merchant City, Glasgow. Warm enough for older guests, cinematic enough for Gen Z, and calm enough for anyone who just wants a good cup.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <a
                href="https://share.google/03qqYQH0xdGgUjCgb"
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-cream px-6 py-3 text-center text-sm font-semibold text-night transition hover:scale-[1.03] hover:bg-honey"
              >
                Open Map
              </a>

              <a
                href="#menu"
                className="rounded-full border border-cream/15 px-6 py-3 text-center text-sm font-semibold text-cream transition hover:scale-[1.03] hover:bg-cream/10"
              >
                Browse Menu
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default App;