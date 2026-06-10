type NavigationProps = {
  activeIndex: number;
  onNavigate: (index: number) => void;
};

const items = [
  { label: 'Home', index: 0 },
  { label: 'Story', index: 1 },
  { label: 'Menu', index: 2 },
  { label: 'Journal', index: 2 },
  { label: 'Visit Us', index: 3 },
];

export function Navigation({ activeIndex, onNavigate }: NavigationProps) {
  return (
    <header className="fixed left-0 right-0 top-0 z-20 px-5 py-5 sm:px-8 sm:py-6">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-full border border-coffee/10 bg-cream/55 px-4 py-3 shadow-soft backdrop-blur-2xl sm:px-5">
        <button
          type="button"
          onClick={() => onNavigate(0)}
          className="font-display text-2xl tracking-tight text-ink transition-transform duration-300 hover:scale-[1.015] sm:text-3xl"
          aria-label="The Stramont home"
        >
          The Stramont
          <sup className="ml-0.5 align-super text-[0.42em] leading-none">®</sup>
        </button>

        <div className="hidden items-center gap-7 md:flex">
          {items.map((item) => {
            const isActive = activeIndex === item.index || (item.label === 'Home' && activeIndex === 0);

            return (
              <button
                key={`${item.label}-${item.index}`}
                type="button"
                onClick={() => onNavigate(item.index)}
                className="text-sm transition-colors duration-300 hover:text-coffee"
                style={{ color: isActive ? '#4B2E1F' : '#7A665A' }}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => onNavigate(3)}
          className="rounded-full bg-coffee px-5 py-2.5 text-sm text-cream shadow-soft transition-transform duration-300 ease-out hover:scale-[1.03] focus:outline-none focus:ring-2 focus:ring-coffee/20 focus:ring-offset-2 sm:px-6"
        >
          Visit
        </button>
      </nav>
    </header>
  );
}
