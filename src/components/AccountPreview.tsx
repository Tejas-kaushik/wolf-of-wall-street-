const savedStories = [
  'The first friend I made abroad was over a cup of chai.',
  'Why a familiar flavour can make a foreign city feel softer.',
  'How cafes quietly become second homes.',
];

const purchaseHistory = [
  {
    item: 'Milo Mocha',
    meta: 'Collected today · £4.80',
  },
  {
    item: 'Filled Croissant',
    meta: 'Last order · £4.20',
  },
  {
    item: 'Stramont Journal Tote',
    meta: 'Merch waitlist · Coming soon',
  },
];

const profileTags = ['Lagos → Glasgow', 'Student', 'Chai at 5 PM', 'Food as home'];

export function AccountPreview() {
  return (
    <section id="account" className="border-y border-[#15100c]/12 bg-[#fbf5ea] px-5 py-24 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-[1500px]">
        <div data-line className="mb-8 h-px w-full bg-[#15100c]" />

        <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
          <div data-reveal>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#5a3826]">
              Member Accounts
            </p>

            <h2 className="mt-4 font-display text-6xl leading-[0.86] tracking-[-0.05em] md:text-8xl">
              A profile for every story.
            </h2>

            <p className="mt-7 max-w-xl text-lg leading-8 text-[#15100c]/70">
              Each member can share where they are from, their background, what food feels like home,
              and keep track of saved articles, watched videos, orders, and purchases.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#subscribe"
                className="rounded-full bg-[#15100c] px-6 py-3 text-sm font-bold text-[#f4ead8] transition hover:bg-[#5a3826]"
              >
                Create Account
              </a>

              <a
                href="#subscribe"
                className="rounded-full border border-[#15100c]/20 px-6 py-3 text-sm font-bold text-[#15100c] transition hover:bg-[#15100c] hover:text-[#f4ead8]"
              >
                Sign In
              </a>
            </div>
          </div>

          <div className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
            <article data-reveal className="border border-[#15100c]/14 bg-[#f4ead8] p-6 shadow-editorial">
              <div className="flex items-start justify-between gap-5 border-b border-[#15100c]/12 pb-5">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#5a3826]">
                    Sample profile
                  </p>

                  <h3 className="mt-3 font-display text-5xl leading-none tracking-[-0.05em]">
                    Amara K.
                  </h3>
                </div>

                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#15100c] font-display text-3xl text-[#f4ead8]">
                  A
                </div>
              </div>

              <div className="mt-5 grid gap-4 text-sm">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#15100c]/45">
                    From
                  </p>
                  <p className="mt-1 font-display text-3xl leading-none">Lagos, Nigeria</p>
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#15100c]/45">
                    Now living in
                  </p>
                  <p className="mt-1 font-display text-3xl leading-none">Glasgow, Scotland</p>
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#15100c]/45">
                    Background
                  </p>
                  <p className="mt-1 leading-6 text-[#15100c]/70">
                    International student, weekend writer, and someone who looks for home in small food rituals.
                  </p>
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#15100c]/45">
                    Comfort food
                  </p>
                  <p className="mt-1 leading-6 text-[#15100c]/70">
                    Jollof rice, soft bread, chai, and anything warm after class.
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
                  Saved articles
                </p>

                <div className="mt-4 space-y-3">
                  {savedStories.map((story) => (
                    <div key={story} className="border-t border-[#15100c]/10 pt-3">
                      <p className="font-display text-3xl leading-[0.95] tracking-[-0.035em]">
                        {story}
                      </p>
                    </div>
                  ))}
                </div>
              </article>

              <article data-reveal className="border border-[#15100c]/14 bg-[#15100c] p-6 text-[#f4ead8] shadow-editorial">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#c7924a]">
                  Purchase history
                </p>

                <div className="mt-4 space-y-3">
                  {purchaseHistory.map((purchase) => (
                    <div key={purchase.item} className="flex items-start justify-between gap-4 border-t border-[#f4ead8]/12 pt-3">
                      <div>
                        <p className="font-display text-3xl leading-none">{purchase.item}</p>
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
  );
}