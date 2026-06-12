
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

const savedStories = [
  'The first friend I made abroad was over a cup of chai.',
  'Why a familiar flavour can make a foreign city feel softer.',
  'How cafes quietly become second homes.',
];

const purchaseHistory = [
  {
    item: 'Milo Mocha',
    meta: 'Example order · Future feature',
  },
  {
    item: 'Filled Croissant',
    meta: 'Example order · Future feature',
  },
  {
    item: 'Stramont Journal Tote',
    meta: 'Example merch record · Future feature',
  },
];

const profileTags = ['Country of origin', 'Background', 'Comfort food', 'Saved stories'];

const pitchCards = [
  {
    title: 'More reasons to return',
    text: 'Articles, videos, accounts, and saved content give customers a reason to come back even when they are not in the cafe.',
  },
  {
    title: 'More ways to sell',
    text: 'Online orders, merch, subscriptions, future memberships, and event drops turn the website into a revenue channel.',
  },
  {
    title: 'A stronger brand story',
    text: 'The Stramont becomes more than a cafe. It becomes a home for internationals, locals, stories, food, and community.',
  },
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

      <section id="home" className="relative min-h-screen border-b border-[#15100c]/12 pt-24 md:pt-36">
        <div className="grid min-h-[calc(100vh-6rem)] grid-cols-1 md:min-h-[calc(100vh-9rem)] md:grid-cols-2">
          <div className="relative flex items-center justify-center px-5 py-16 sm:px-8 md:border-r md:px-12 md:py-20">
            <div className="max-w-xl text-center">
              <p data-reveal className="mb-5 text-[10px] font-bold uppercase tracking-[0.24em] text-[#5a3826] sm:text-xs sm:tracking-[0.28em]">
                Articles · Videos · Store · Member accounts
              </p>

              <h1
                data-reveal
                className="mx-auto max-w-[1050px] font-display text-[clamp(3.2rem,13vw,8.4rem)] leading-[0.92] tracking-[-0.035em] sm:leading-[0.88] sm:tracking-[-0.04em] md:leading-[0.84]"
              >
                Food, friendship, and the feeling of home abroad.
              </h1>

              <p data-reveal className="mx-auto mt-7 max-w-lg font-display text-xl leading-7 text-[#15100c]/74 sm:text-2xl sm:leading-8">
                Articles, video stories, online orders, store drops, and future member accounts — all in one clean home.
              </p>

              <div data-reveal className="mt-8 flex flex-wrap justify-center gap-3">
                <a
                  href="#stories"
                  className="rounded-full border border-[#15100c] bg-[#15100c] px-5 py-3 text-sm font-semibold text-[#f4ead8] transition hover:bg-[#5a3826] sm:px-6"
                >
                  Articles
                </a>

                <a
                  href="#video"
                  className="rounded-full border border-[#15100c]/20 px-5 py-3 text-sm font-semibold transition hover:bg-[#15100c] hover:text-[#f4ead8] sm:px-6"
                >
                  Videos
                </a>

                <a
                  href="#order"
                  className="rounded-full border border-[#5a3826] bg-[#5a3826] px-5 py-3 text-sm font-semibold text-[#f4ead8] transition hover:bg-[#15100c] sm:px-6"
                >
                  Store
                </a>
              </div>
            </div>
          </div>

          <div className="relative hidden min-h-[620px] overflow-hidden bg-[#e9dfce] md:block">
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

      <section id="stories" className="px-5 py-16 sm:px-8 sm:py-24 lg:px-12">
        <div className="mx-auto max-w-[1500px]">
          <div data-line className="mb-8 h-px w-full bg-[#15100c]" />

          <div className="grid gap-6 md:grid-cols-[0.8fr_1.2fr]">
            <div data-reveal>
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#5a3826]">
                Articles
              </p>

              <h2 className="mt-4 font-display text-5xl leading-[0.86] tracking-[-0.05em] sm:text-6xl md:text-8xl">
                Articles on belonging.
              </h2>
            </div>

            <p data-reveal className="max-w-2xl font-display text-2xl leading-8 text-[#15100c]/72 sm:text-3xl sm:leading-9 md:ml-auto">
              A living journal about international life, friendship, loneliness, food rituals,
              and the small places that help people feel less far from home.
            </p>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-3">
            {stories.map((story) => (
              <article key={story.title} data-reveal className="group border-t border-[#15100c] pt-5">
                <div className="overflow-hidden bg-[#e5dac8]">
                  {story.animated ? (
                    <CoffeePourVisual />
                  ) : (
                    <img
                      src={story.image ?? ''}
                      alt={story.title}
                      className="h-[270px] w-full object-cover transition duration-700 group-hover:scale-105 sm:h-[360px]"
                    />
                  )}
                </div>

                <p className="mt-5 text-xs font-bold uppercase tracking-[0.2em] text-[#5a3826]">
                  {story.kicker}
                </p>

                <h3 className="story-link mt-3 inline font-display text-3xl leading-[0.94] tracking-[-0.035em] sm:text-4xl">
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

      <section id="food" className="border-y border-[#15100c]/12 bg-[#fbf5ea] px-5 py-16 sm:px-8 sm:py-24 lg:px-12">
        <div className="mx-auto grid max-w-[1500px] gap-10 lg:grid-cols-[1fr_1.1fr]">
          <div data-reveal className="flex flex-col justify-center">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#5a3826]">
              Food as home
            </p>

            <h2 className="mt-4 font-display text-5xl leading-[0.86] tracking-[-0.05em] sm:text-6xl md:text-8xl">
              Some people miss a place. Some miss a taste.
            </h2>

            <p className="mt-7 max-w-xl text-base leading-7 text-[#15100c]/70 sm:text-lg sm:leading-8">
              The Stramont connects the cafe to something bigger than the menu:
              mango, chai, mocha, bread, spice, tea, and the familiar comfort people search for when they move abroad.
            </p>
          </div>

          <div className="relative min-h-[420px] sm:min-h-[560px]">
            <div data-float className="absolute left-0 top-8 z-10 w-[72%] border border-[#15100c]/15 bg-[#f4ead8] p-3 shadow-editorial">
              <img
                src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=85"
                alt="Coffee being served in a cozy cafe"
                className="h-[240px] w-full object-cover sm:h-[330px]"
              />

              <p className="mt-3 px-1 text-xs font-bold uppercase tracking-[0.18em] text-[#5a3826]">
                Coffee as ritual
              </p>
            </div>

            <div data-float className="absolute bottom-0 right-0 z-20 w-[62%] border border-[#15100c]/15 bg-[#f4ead8] p-3 shadow-editorial">
              <img
                src="https://images.unsplash.com/photo-1549903072-7e6e0bedb7fb?auto=format&fit=crop&w=1200&q=85"
                alt="Golden croissants in a bakery"
                className="h-[190px] w-full object-cover sm:h-[280px]"
                onError={(event) => {
                  event.currentTarget.src =
                    'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=85';
                }}
              />

              <p className="mt-3 px-1 text-xs font-bold uppercase tracking-[0.18em] text-[#5a3826]">
                Bakes that travel
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="menu" className="px-5 py-16 sm:px-8 sm:py-24 lg:px-12">
        <div className="mx-auto max-w-[1500px]">
          <div data-line className="mb-8 h-px w-full bg-[#15100c]" />

          <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr]">
            <div data-reveal>
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#5a3826]">
                Menu Board
              </p>

              <h2 className="mt-4 font-display text-5xl leading-[0.86] tracking-[-0.05em] sm:text-6xl md:text-8xl">
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

      <section id="account" className="border-y border-[#15100c]/12 bg-[#fbf5ea] px-5 py-16 sm:px-8 sm:py-24 lg:px-12">
        <div className="mx-auto max-w-[1500px]">
          <div data-line className="mb-8 h-px w-full bg-[#15100c]" />

          <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
            <div data-reveal>
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#5a3826]">
                Future Member Accounts
              </p>

              <h2 className="mt-4 font-display text-5xl leading-[0.86] tracking-[-0.05em] sm:text-6xl md:text-8xl">
                A profile system built for phase two.
              </h2>

              <p className="mt-7 max-w-xl text-base leading-7 text-[#15100c]/70 sm:text-lg sm:leading-8">
                This is a concept preview, not fake live data. The next phase would connect real sign-in,
                customer profiles, saved articles, watched videos, order history, and purchase records.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#owner-pitch"
                  className="rounded-full bg-[#15100c] px-6 py-3 text-sm font-bold text-[#f4ead8] transition hover:bg-[#5a3826]"
                >
                  See Business Value
                </a>

                <a
                  href="#subscribe"
                  className="rounded-full border border-[#15100c]/20 px-6 py-3 text-sm font-bold text-[#15100c] transition hover:bg-[#15100c] hover:text-[#f4ead8]"
                >
                  Join Newsletter
                </a>
              </div>
            </div>

            <div className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
              <article data-reveal className="border border-[#15100c]/14 bg-[#f4ead8] p-6 shadow-editorial">
                <div className="flex items-start justify-between gap-5 border-b border-[#15100c]/12 pb-5">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#5a3826]">
                      Prototype profile
                    </p>

                    <h3 className="mt-3 font-display text-5xl leading-none tracking-[-0.05em]">
                      Member story
                    </h3>
                  </div>

                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#15100c] font-display text-3xl text-[#f4ead8]">
                    S
                  </div>
                </div>

                <div className="mt-5 grid gap-4 text-sm">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#15100c]/45">
                      From / Background
                    </p>
                    <p className="mt-1 font-display text-3xl leading-none">
                      Shared by the user
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#15100c]/45">
                      Comfort food
                    </p>
                    <p className="mt-1 leading-6 text-[#15100c]/70">
                      A future field where members can share the food, drink, or ritual that reminds them of home.
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  {profileTags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-[#15100c]/12 px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-[#5a3826]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>

              <div className="grid gap-5">
                <article data-reveal className="border border-[#15100c]/14 bg-[#f4ead8] p-6 shadow-paper">
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#5a3826]">
                    Future saved content
                  </p>

                  <div className="mt-4 space-y-3">
                    {savedStories.slice(0, 2).map((story) => (
                      <div key={story} className="border-t border-[#15100c]/10 pt-3">
                        <p className="font-display text-2xl leading-[0.95] tracking-[-0.035em] sm:text-3xl">
                          {story}
                        </p>
                      </div>
                    ))}
                  </div>
                </article>

                <article data-reveal className="border border-[#15100c]/14 bg-[#15100c] p-6 text-[#f4ead8] shadow-editorial">
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#c7924a]">
                    Future purchase history
                  </p>

                  <div className="mt-4 space-y-3">
                    {purchaseHistory.map((purchase) => (
                      <div key={purchase.item} className="flex items-start justify-between gap-4 border-t border-[#f4ead8]/12 pt-3">
                        <div>
                          <p className="font-display text-2xl leading-none sm:text-3xl">{purchase.item}</p>
                          <p className="mt-1 text-xs uppercase tracking-[0.14em] text-[#f4ead8]/50">
                            {purchase.meta}
                          </p>
                        </div>

                        <span className="mt-2 h-2 w-2 rounded-full bg-[#c7924a]" />
                      </div>
                    ))}
                  </div>
                </article>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="video" className="bg-[#15100c] px-5 py-16 text-[#f4ead8] sm:px-8 sm:py-24 lg:px-12">
        <div className="mx-auto grid max-w-[1500px] gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div data-reveal className="relative overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1500&q=85"
              alt="People socialising in a cozy cafe"
              className="h-[360px] w-full object-cover opacity-[0.82] sm:h-[620px]"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#15100c] via-transparent to-transparent" />

            <button className="absolute left-5 top-5 rounded-full border border-[#f4ead8]/30 bg-[#f4ead8]/10 px-5 py-3 text-sm font-semibold backdrop-blur transition hover:bg-[#f4ead8] hover:text-[#15100c] sm:left-8 sm:top-8">
              Watch Story
            </button>
          </div>

          <div data-reveal className="flex flex-col justify-center">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#c7924a]">
              Video Stories
            </p>

            <h2 className="mt-4 font-display text-5xl leading-[0.86] tracking-[-0.05em] sm:text-6xl md:text-8xl">
              How did you make your first friend abroad?
            </h2>

            <p className="mt-7 text-base leading-7 text-[#f4ead8]/72 sm:text-lg sm:leading-8">
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

      <section id="merch" className="px-5 py-16 sm:px-8 sm:py-24 lg:px-12">
        <div className="mx-auto max-w-[1500px]">
          <div data-line className="mb-8 h-px w-full bg-[#15100c]" />

          <div data-reveal className="max-w-4xl">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#5a3826]">
              Store
            </p>

            <h2 className="mt-4 font-display text-5xl leading-[0.86] tracking-[-0.05em] sm:text-6xl md:text-8xl">
              Merch for people building a home away from home.
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {merch.map((item) => (
              <article key={item.name} data-reveal className="group border border-[#15100c]/14 bg-[#fbf5ea] p-3 shadow-paper">
                <div className="overflow-hidden bg-[#e9dfce]">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-[280px] w-full object-cover transition duration-700 group-hover:scale-105 sm:h-[390px]"
                  />
                </div>

                <div className="p-4">
                  <h3 className="font-display text-3xl leading-none sm:text-4xl">{item.name}</h3>

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

      <section id="owner-pitch" className="border-y border-[#15100c]/12 bg-[#15100c] px-5 py-16 text-[#f4ead8] sm:px-8 sm:py-24 lg:px-12">
        <div className="mx-auto max-w-[1500px]">
          <div data-reveal className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#c7924a]">
                Built for The Stramont
              </p>

              <h2 className="mt-4 font-display text-5xl leading-[0.86] tracking-[-0.05em] sm:text-6xl md:text-8xl">
                Not just a website. A growth platform.
              </h2>
            </div>

            <p className="max-w-2xl font-display text-2xl leading-8 text-[#f4ead8]/72 sm:text-3xl sm:leading-9 lg:ml-auto">
              This concept positions The Stramont as a cafe, journal, video platform, store,
              and community brand — ready to launch small, then grow into accounts, orders, and memberships.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {pitchCards.map((card) => (
              <article key={card.title} data-reveal className="border border-[#f4ead8]/14 bg-[#f4ead8]/5 p-6">
                <h3 className="font-display text-4xl leading-none">{card.title}</h3>

                <p className="mt-5 text-sm leading-7 text-[#f4ead8]/65">
                  {card.text}
                </p>
              </article>
            ))}
          </div>

          <div data-reveal className="mt-10 grid gap-5 border border-[#f4ead8]/14 bg-[#f4ead8]/5 p-6 md:grid-cols-2">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#c7924a]">
                Launch phase
              </p>

              <p className="mt-3 font-display text-4xl leading-none">
                Articles, videos, store preview, newsletter, and cafe information.
              </p>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#c7924a]">
                Next phase
              </p>

              <p className="mt-3 font-display text-4xl leading-none">
                Real accounts, purchase history, payments, CMS, and member-only content.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="subscribe" className="border-y border-[#15100c]/12 bg-[#fbf5ea] px-5 py-16 sm:px-8 sm:py-24 lg:px-12">
        <div data-reveal className="mx-auto max-w-4xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#5a3826]">
            The Stramont Letter
          </p>

          <h2 className="mt-4 font-display text-5xl leading-[0.86] tracking-[-0.05em] sm:text-6xl md:text-8xl">
            Stories, city notes, and new bakes every week.
          </h2>

          <p className="mx-auto mt-7 max-w-2xl text-base leading-7 text-[#15100c]/68 sm:text-lg sm:leading-8">
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

      <section id="visit" className="px-5 py-16 sm:px-8 sm:py-24 lg:px-12">
        <div className="mx-auto grid max-w-[1500px] gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div data-reveal>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#5a3826]">
              Visit
            </p>

            <h2 className="mt-4 font-display text-5xl leading-[0.86] tracking-[-0.05em] sm:text-6xl md:text-8xl">
              35 Glassford Street, Merchant City.
            </h2>

            <p className="mt-7 max-w-xl text-base leading-7 text-[#15100c]/68 sm:text-lg sm:leading-8">
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
              className="h-[360px] w-full object-cover sm:h-[560px]"
            />
          </div>
        </div>
      </section>
    </main>
  );
}

export default App;