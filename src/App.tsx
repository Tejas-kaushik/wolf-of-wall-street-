import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Navigation } from './components/Navigation';
import { CoffeePourVisual } from './components/CoffeePourVisual';
import { OnlineOrdering } from './components/OnlineOrdering';

gsap.registerPlugin(ScrollTrigger);

type Story = {
  kicker: string;
  title: string;
  excerpt: string;
  author: string;
  image?: string;
  animated?: boolean;
};

const stories: Story[] = [
  {
    kicker: 'Letter from Glasgow',
    title: 'The first friend I made abroad was over a cup of chai.',
    excerpt:
      'For many internationals, friendship starts with a small invitation: sit down, drink something warm, and tell me where home is.',
    author: 'The Stramont Journal',
    image: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=1200&q=85',
  },
  {
    kicker: 'Food & Belonging',
    title: 'Why a familiar flavour can make a foreign city feel softer.',
    excerpt:
      'Mango, mocha, bread, spice, tea — the small tastes people search for when they are far away from family.',
    author: 'Merchant City Notes',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=85',
  },
  {
    kicker: 'Cafe Society',
    title: 'How cafes quietly become second homes.',
    excerpt:
      'Students, workers, travellers, and older regulars all come for different reasons. They stay for the same one: ease.',
    author: 'City Desk',
    animated: true,
  },
];

const menuColumns = [
  {
    title: 'Coffee',
    items: ['Espresso', 'Americano', 'Mocha', 'Milo Mocha', 'Iced Milo Mocha'],
  },
  {
    title: 'Soft Cups',
    items: ['Hot Chocolate', 'Matcha', 'Chai', 'Tea', 'Seasonal cold drinks'],
  },
  {
    title: 'Bakery',
    items: ['Filled croissants', 'Sweet treats', 'Cake slices', 'Global bakes', 'Savoury goods'],
  },
  {
    title: 'Global Notes',
    items: ['Asian weekly specials', 'China highlights', 'Vietnam highlights', 'India highlights'],
  },
];

const merch = [
  {
    name: 'Home Away From Home Mug',
    price: 'Coming soon',
    image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=1000&q=85',
  },
  {
    name: 'The Stramont Journal Tote',
    price: 'Coming soon',
    image: 'https://images.unsplash.com/photo-1597484661643-2f5fef640dd1?auto=format&fit=crop&w=1000&q=85',
  },
  {
    name: 'Merchant City Coffee Club Cap',
    price: 'Coming soon',
    image: 'https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&w=1000&q=85',
  },
];

const floatingNotes = [
  'Home Away From Home',
  'First Friend Abroad',
  'Chai at 5 PM',
  'Merchant City',
  'Food & Belonging',
];

function App() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((element) => {
        gsap.fromTo(
          element,
          { opacity: 0, y: 32, filter: 'blur(8px)' },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: element,
              start: 'top 84%',
              toggleActions: 'play none none reverse',
            },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>('[data-line]').forEach((line) => {
        gsap.fromTo(
          line,
          { scaleX: 0, transformOrigin: 'left center' },
          {
            scaleX: 1,
            duration: 1.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: line,
              start: 'top 88%',
            },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>('[data-float]').forEach((element, index) => {
        gsap.to(element, {
          y: index % 2 === 0 ? -16 : 16,
          rotate: index % 2 === 0 ? 1.2 : -1.2,
          duration: 3.8 + index * 0.35,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
        });
      });

      gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((element) => {
        gsap.to(element, {
          yPercent: -8,
          ease: 'none',
          scrollTrigger: {
            trigger: element,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <main className="min-h-screen bg-[#f4ead8] text-[#15100c]">
      <div className="editorial-grain" />

      <Navigation />

      <a
        href="#order"
        className="group fixed bottom-5 left-5 z-50 hidden items-center gap-3 rounded-full border border-[#15100c]/15 bg-[#15100c] px-4 py-3 text-xs font-bold uppercase tracking-[0.12em] text-[#f4ead8] shadow-paper transition hover:-translate-y-1 hover:bg-[#5a3826] sm:flex"
        aria-label="Order coffee for collection"
      >
        <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-[#f4ead8] text-xl shadow-paper">
          <span className="absolute inset-0 animate-ping rounded-full bg-[#f4ead8]/45" />
          <span className="relative z-10 animate-bounce">☕</span>
        </span>

        <span className="flex flex-col leading-none">
          <span className="text-[10px] text-[#c7924a]">Click me</span>
          <span>Order Here</span>
        </span>

        <span className="transition group-hover:translate-x-1">→</span>
      </a>

      <section id="home" className="relative min-h-screen border-b border-[#15100c]/12 pt-28 md:pt-36">
        <div className="grid min-h-[calc(100vh-9rem)] grid-cols-1 md:grid-cols-2">
          <div className="relative flex items-center justify-center border-b border-[#15100c]/12 px-6 py-20 md:border-b-0 md:border-r md:px-12">
            <div className="max-w-xl text-center">
              <p data-reveal className="mb-6 text-xs font-bold uppercase tracking-[0.28em] text-[#5a3826]">
                Coffee · Bakery · Stories from abroad
              </p>

              <h1 data-reveal className="font-display text-[clamp(4rem,9vw,9.5rem)] leading-[0.78] tracking-[-0.065em]">
                Food, friendship, and the feeling of home abroad.
              </h1>

              <p data-reveal className="mx-auto mt-8 max-w-lg font-display text-2xl leading-8 text-[#15100c]/74">
                Stories from internationals in Glasgow — how people meet, settle, socialise,
                and find comfort through coffee, bakes, and familiar flavours.
              </p>

              <div data-reveal className="mt-9 flex flex-wrap justify-center gap-3">
                <a
                  href="#stories"
                  className="rounded-full border border-[#15100c] bg-[#15100c] px-6 py-3 text-sm font-semibold text-[#f4ead8] transition hover:bg-[#5a3826]"
                >
                  Read the Feature
                </a>

                <a
                  href="#order"
                  className="group inline-flex items-center gap-2 rounded-full border border-[#5a3826] bg-[#5a3826] px-6 py-3 text-sm font-semibold text-[#f4ead8] transition hover:bg-[#15100c]"
                >
                  <span className="relative inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#f4ead8] text-base">
                    <span className="absolute inset-0 animate-ping rounded-full bg-[#f4ead8]/45" />
                    <span className="relative z-10 animate-bounce">☕</span>
                  </span>
                  Order Here
                  <span className="transition group-hover:translate-x-1">→</span>
                </a>

                <a
                  href="#menu"
                  className="rounded-full border border-[#15100c]/20 px-6 py-3 text-sm font-semibold transition hover:bg-[#15100c] hover:text-[#f4ead8]"
                >
                  View Menu
                </a>
              </div>
            </div>

            <div data-float className="absolute left-6 top-32 hidden rounded-sm border border-[#15100c]/20 bg-[#fbf5ea] px-4 py-3 text-xs font-bold uppercase tracking-[0.12em] shadow-paper lg:block">
              First Friend Abroad
            </div>

            <div data-float className="absolute bottom-24 right-8 hidden max-w-[180px] rounded-sm border border-[#15100c]/20 bg-[#fbf5ea] p-4 font-display text-2xl leading-6 shadow-paper lg:block">
              “A cafe can become a map back to yourself.”
            </div>
          </div>

          <div className="relative min-h-[620px] overflow-hidden bg-[#e9dfce]">
            <img
              data-parallax
              src="https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=1600&q=85"
              alt="Warm cafe table with coffee and people gathering"
              className="h-[115%] w-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#15100c]/18 via-transparent to-transparent" />

            <div data-float className="absolute bottom-10 left-10 max-w-[260px] border border-[#15100c]/15 bg-[#f4ead8]/92 p-5 shadow-editorial backdrop-blur">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#5a3826]">
                Today’s note
              </p>

              <p className="mt-3 font-display text-3xl leading-8">
                Come for coffee. Stay for stories.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="stories" className="px-5 py-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-[1500px]">
          <div data-line className="mb-8 h-px w-full bg-[#15100c]" />

          <div className="grid gap-6 md:grid-cols-[0.8fr_1.2fr]">
            <div data-reveal>
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#5a3826]">
                The Latest
              </p>

              <h2 className="mt-4 font-display text-6xl leading-[0.86] tracking-[-0.05em] md:text-8xl">
                Notes on belonging.
              </h2>
            </div>

            <p data-reveal className="max-w-2xl font-display text-3xl leading-9 text-[#15100c]/72 md:ml-auto">
              A living journal about international life, friendship, loneliness, food rituals,
              and the small places that help people feel less far from home.
            </p>
          </div>

          <div className="mt-14 grid gap-8 lg:grid-cols-3">
            {stories.map((story) => (
              <article key={story.title} data-reveal className="group border-t border-[#15100c] pt-5">
                <div className="overflow-hidden bg-[#e5dac8]">
                  {story.animated ? (
                    <CoffeePourVisual />
                  ) : (
                    <img
                      src={story.image ?? ''}
                      alt={story.title}
                      className="h-[360px] w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                  )}
                </div>

                <p className="mt-5 text-xs font-bold uppercase tracking-[0.2em] text-[#5a3826]">
                  {story.kicker}
                </p>

                <h3 className="story-link mt-3 inline font-display text-4xl leading-[0.94] tracking-[-0.035em]">
                  {story.title}
                </h3>

                <p className="mt-4 text-base leading-7 text-[#15100c]/68">
                  {story.excerpt}
                </p>

                <p className="mt-5 text-xs font-bold uppercase tracking-[0.16em] text-[#15100c]/55">
                  By {story.author}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="food" className="border-y border-[#15100c]/12 bg-[#fbf5ea] px-5 py-24 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-[1500px] gap-10 lg:grid-cols-[1fr_1.1fr]">
          <div data-reveal className="flex flex-col justify-center">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#5a3826]">
              Food as home
            </p>

            <h2 className="mt-4 font-display text-6xl leading-[0.86] tracking-[-0.05em] md:text-8xl">
              Some people miss a place. Some miss a taste.
            </h2>

            <p className="mt-7 max-w-xl text-lg leading-8 text-[#15100c]/70">
              The Stramont connects the cafe to something bigger than the menu:
              mango, chai, mocha, bread, spice, tea, and the familiar comfort people search for when they move abroad.
            </p>
          </div>

          <div className="relative min-h-[560px]">
            <div data-float className="absolute left-0 top-8 z-10 w-[68%] border border-[#15100c]/15 bg-[#f4ead8] p-3 shadow-editorial">
              <img
                src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=85"
                alt="Coffee being served in a cozy cafe"
                className="h-[330px] w-full object-cover"
              />

              <p className="mt-3 px-1 text-xs font-bold uppercase tracking-[0.18em] text-[#5a3826]">
                Coffee as ritual
              </p>
            </div>

            <div data-float className="absolute bottom-0 right-0 z-20 w-[60%] border border-[#15100c]/15 bg-[#f4ead8] p-3 shadow-editorial">
              <img
                src="https://images.unsplash.com/photo-1549903072-7e6e0bedb7fb?auto=format&fit=crop&w=1200&q=85"
                alt="Golden croissants in a bakery"
                className="h-[280px] w-full object-cover"
                onError={(event) => {
                  event.currentTarget.src =
                    'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=85';
                }}
              />

              <p className="mt-3 px-1 text-xs font-bold uppercase tracking-[0.18em] text-[#5a3826]">
                Bakes that travel
              </p>
            </div>

            <div data-float className="absolute right-8 top-2 z-30 border border-[#15100c]/15 bg-[#15100c] px-5 py-4 font-display text-2xl leading-6 text-[#f4ead8] shadow-editorial">
              Chai at 5 PM
            </div>
          </div>
        </div>
      </section>

      <section id="menu" className="px-5 py-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-[1500px]">
          <div data-line className="mb-8 h-px w-full bg-[#15100c]" />

          <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr]">
            <div data-reveal>
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#5a3826]">
                Menu Board
              </p>

              <h2 className="mt-4 font-display text-6xl leading-[0.86] tracking-[-0.05em] md:text-8xl">
                Read it like a column.
              </h2>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {menuColumns.map((column) => (
                <div key={column.title} data-reveal className="border border-[#15100c]/14 bg-[#fbf5ea] p-6 shadow-paper">
                  <h3 className="font-display text-4xl">{column.title}</h3>

                  <ul className="mt-6 space-y-4">
                    {column.items.map((item) => (
                      <li key={item} className="flex items-center justify-between border-t border-[#15100c]/12 pt-3 text-sm">
                        <span>{item}</span>
                        <span className="h-1.5 w-1.5 rounded-full bg-[#5a3826]" />
                      </li>
                    ))}
                  </ul>

                  <a
                    href="#visit"
                    className="mt-6 inline-flex rounded-full border border-[#15100c]/25 px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] transition hover:bg-[#15100c] hover:text-[#f4ead8]"
                  >
                    Ask in store
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <OnlineOrdering />

      <section id="video" className="bg-[#15100c] px-5 py-24 text-[#f4ead8] sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-[1500px] gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div data-reveal className="relative overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1500&q=85"
              alt="People socialising in a cozy cafe"
              className="h-[620px] w-full object-cover opacity-82"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#15100c] via-transparent to-transparent" />

            <button className="absolute left-8 top-8 rounded-full border border-[#f4ead8]/30 bg-[#f4ead8]/10 px-5 py-3 text-sm font-semibold backdrop-blur transition hover:bg-[#f4ead8] hover:text-[#15100c]">
              Watch Story
            </button>
          </div>

          <div data-reveal className="flex flex-col justify-center">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#c7924a]">
              Video Stories
            </p>

            <h2 className="mt-4 font-display text-6xl leading-[0.86] tracking-[-0.05em] md:text-8xl">
              How did you make your first friend abroad?
            </h2>

            <p className="mt-7 text-lg leading-8 text-[#f4ead8]/72">
              A future home for short interviews, cafe table conversations, international student stories,
              and videos about food, memory, and social life in a new city.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {floatingNotes.map((note) => (
                <span
                  key={note}
                  data-float
                  className="rounded-full border border-[#f4ead8]/20 px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-[#f4ead8]/75"
                >
                  {note}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="merch" className="px-5 py-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-[1500px]">
          <div data-line className="mb-8 h-px w-full bg-[#15100c]" />

          <div data-reveal className="max-w-4xl">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#5a3826]">
              Shop
            </p>

            <h2 className="mt-4 font-display text-6xl leading-[0.86] tracking-[-0.05em] md:text-8xl">
              Merch for people building a home away from home.
            </h2>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {merch.map((item) => (
              <article key={item.name} data-reveal className="group border border-[#15100c]/14 bg-[#fbf5ea] p-3 shadow-paper">
                <div className="overflow-hidden bg-[#e9dfce]">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-[390px] w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                </div>

                <div className="p-4">
                  <h3 className="font-display text-4xl leading-none">{item.name}</h3>

                  <p className="mt-3 text-sm font-semibold uppercase tracking-[0.12em] text-[#5a3826]">
                    {item.price}
                  </p>

                  <button className="mt-5 rounded-full border border-[#15100c]/25 px-5 py-2.5 text-xs font-bold uppercase tracking-[0.12em] transition hover:bg-[#15100c] hover:text-[#f4ead8]">
                    Notify me
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="subscribe" className="border-y border-[#15100c]/12 bg-[#fbf5ea] px-5 py-24 sm:px-8 lg:px-12">
        <div data-reveal className="mx-auto max-w-4xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#5a3826]">
            The Stramont Letter
          </p>

          <h2 className="mt-4 font-display text-6xl leading-[0.86] tracking-[-0.05em] md:text-8xl">
            Stories, city notes, and new bakes every week.
          </h2>

          <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-[#15100c]/68">
            Start free with the newsletter. Later, this can become a paid subscription for long-form articles,
            videos, member events, and digital magazine issues.
          </p>

          <form className="mx-auto mt-9 flex max-w-xl flex-col gap-3 sm:flex-row">
            <input
              type="email"
              placeholder="Email address"
              className="min-h-12 flex-1 border border-[#15100c]/20 bg-[#f4ead8] px-4 text-sm outline-none transition focus:border-[#15100c]"
            />

            <button
              type="button"
              className="min-h-12 bg-[#15100c] px-6 text-sm font-bold uppercase tracking-[0.12em] text-[#f4ead8] transition hover:bg-[#5a3826]"
            >
              Join
            </button>
          </form>
        </div>
      </section>

      <section id="visit" className="px-5 py-24 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-[1500px] gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div data-reveal>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#5a3826]">
              Visit
            </p>

            <h2 className="mt-4 font-display text-6xl leading-[0.86] tracking-[-0.05em] md:text-8xl">
              35 Glassford Street, Merchant City.
            </h2>

            <p className="mt-7 max-w-xl text-lg leading-8 text-[#15100c]/68">
              A cafe, bakery, journal, and gathering point for internationals, locals,
              students, families, creatives, and anyone who needs a calm place to feel human again.
            </p>

            <a
              href="https://share.google/03qqYQH0xdGgUjCgb"
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex rounded-full bg-[#15100c] px-7 py-3 text-sm font-semibold text-[#f4ead8] transition hover:bg-[#5a3826]"
            >
              Open Map
            </a>
          </div>

          <div data-reveal className="border border-[#15100c]/14 bg-[#fbf5ea] p-3 shadow-editorial">
            <img
              src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1500&q=85"
              alt="Cozy cafe counter"
              className="h-[560px] w-full object-cover"
            />
          </div>
        </div>
      </section>
    </main>
  );
}

export default App;