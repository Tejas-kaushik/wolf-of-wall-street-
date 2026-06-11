import { useEffect, useState } from 'react';

const links = [
  { label: 'Home', href: '#home' },
  { label: 'The Latest', href: '#stories' },
  { label: 'Food & Home', href: '#food' },
  { label: 'Menu', href: '#menu' },
  { label: 'Order', href: '#order' },
  { label: 'Videos', href: '#video' },
  { label: 'Merch', href: '#merch' },
  { label: 'Visit', href: '#visit' },
];

const quickSearch = [
  { label: 'Read international stories', href: '#stories' },
  { label: 'Explore food as home', href: '#food' },
  { label: 'View the cafe menu', href: '#menu' },
  { label: 'Order for collection', href: '#order' },
  { label: 'Watch video stories', href: '#video' },
  { label: 'Shop merch', href: '#merch' },
  { label: 'Find the cafe', href: '#visit' },
];

function EspressoIcon({ small = false }: { small?: boolean }) {
  return (
    <span
      className={`relative inline-flex items-center justify-center rounded-full bg-[#f4ead8] ${
        small ? 'h-7 w-7' : 'h-9 w-9'
      }`}
    >
      <span className="absolute inset-0 animate-ping rounded-full bg-[#f4ead8]/35" />

      <span className={`relative animate-pulse ${small ? 'h-4 w-5' : 'h-5 w-6'}`}>
        <span
          className={`absolute bottom-0 left-0 rounded-b-[9px] rounded-t-[3px] border-[#5a3826] bg-[#15100c] ${
            small ? 'h-3 w-4 border-[1.5px]' : 'h-4 w-5 border-2'
          }`}
        />

        <span
          className={`absolute rounded-r-full border-l-0 border-[#5a3826] ${
            small
              ? 'bottom-[2px] right-0 h-2 w-1.5 border-[1.5px]'
              : 'bottom-[3px] right-0 h-2.5 w-2 border-2'
          }`}
        />

        <span className="absolute left-[4px] top-0 h-2 w-[2px] rounded-full bg-[#5a3826]/70" />
        <span className="absolute left-[10px] -top-1 h-3 w-[2px] rounded-full bg-[#5a3826]/55" />
        <span className="absolute left-[16px] top-0 h-2 w-[2px] rounded-full bg-[#5a3826]/70" />
      </span>
    </span>
  );
}

export function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showHomeButton, setShowHomeButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const pageHeight = document.documentElement.scrollHeight - window.innerHeight;
      const nextProgress = pageHeight > 0 ? (scrollTop / pageHeight) * 100 : 0;

      setProgress(Math.min(100, Math.max(0, nextProgress)));
      setShowHomeButton(scrollTop > 520);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSearchOpen(false);
        setMobileOpen(false);
      }
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const closeMenus = () => {
    setMobileOpen(false);
    setSearchOpen(false);
  };

  return (
    <>
      <header className="fixed left-0 right-0 top-0 z-50 border-b border-[#15100c]/10 bg-[#f4ead8]/92 backdrop-blur-xl">
        <div className="relative mx-auto flex h-[92px] max-w-[1500px] items-center justify-between px-4 sm:px-8">
          <div className="flex min-w-[210px] items-center gap-2">
            <a
              href="#order"
              onClick={closeMenus}
              className="group inline-flex min-h-10 items-center gap-2 rounded-sm bg-[#5a3826] px-3 py-2 text-[10px] font-bold uppercase leading-none tracking-[0.08em] text-[#f4ead8] transition hover:bg-[#15100c] sm:text-xs"
            >
              <span className="hidden sm:inline-flex">
                <EspressoIcon small />
              </span>

              <span className="hidden sm:inline">Order Here</span>
              <span className="sm:hidden">Order</span>
            </a>

            <a
              href="#home"
              onClick={closeMenus}
              className="hidden text-xs font-semibold uppercase tracking-[0.08em] text-[#5a3826] transition hover:text-[#15100c] lg:inline-flex"
            >
              Home
            </a>

            <a
              href="#subscribe"
              onClick={closeMenus}
              className="hidden text-xs font-semibold uppercase tracking-[0.08em] text-[#5a3826] transition hover:text-[#15100c] xl:inline-flex"
            >
              Newsletter
            </a>
          </div>

          <a
            href="#home"
            onClick={closeMenus}
            className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-center font-display text-[2.1rem] leading-none tracking-[-0.06em] text-[#15100c] sm:text-[2.65rem]"
          >
            The Stramont
            <sup className="ml-1 align-super text-[0.35em] tracking-normal">®</sup>
          </a>

          <div className="ml-auto flex min-w-[210px] items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => setSearchOpen((value) => !value)}
              className="hidden rounded-full border border-[#15100c]/15 px-3 py-2 text-xs font-bold uppercase tracking-[0.08em] text-[#15100c] transition hover:bg-[#15100c] hover:text-[#f4ead8] xl:inline-flex"
            >
              Search
            </button>

            <a
              href="#subscribe"
              onClick={closeMenus}
              className="hidden min-h-10 items-center rounded-sm bg-[#15100c] px-4 py-2 text-xs font-bold uppercase tracking-[0.08em] text-[#f4ead8] transition hover:bg-[#5a3826] sm:inline-flex"
            >
              Subscribe
            </a>

            <button
              type="button"
              onClick={() => setMobileOpen((value) => !value)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#15100c]/15 text-sm font-bold xl:hidden"
              aria-label="Open navigation menu"
            >
              {mobileOpen ? '×' : '☰'}
            </button>
          </div>
        </div>

        <nav className="hidden border-t border-[#15100c]/10 bg-[#fbf5ea]/82 xl:block">
          <div className="mx-auto flex max-w-[1500px] items-center justify-center gap-7 px-8 py-2.5">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={closeMenus}
                className="text-xs font-semibold uppercase tracking-[0.08em] text-[#15100c]/72 transition hover:text-[#15100c]"
              >
                {link.label}
              </a>
            ))}
          </div>
        </nav>

        <div
          className="absolute bottom-0 left-0 h-[2px] bg-[#5a3826] transition-[width] duration-150"
          style={{ width: `${progress}%` }}
        />

        {mobileOpen && (
          <div className="border-t border-[#15100c]/10 bg-[#fbf5ea] px-4 py-4 xl:hidden">
            <div className="grid gap-2">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={closeMenus}
                  className="border-b border-[#15100c]/10 px-1 py-3 text-sm font-bold uppercase tracking-[0.08em] text-[#15100c]"
                >
                  {link.label}
                </a>
              ))}

              <a
                href="#order"
                onClick={closeMenus}
                className="mt-2 flex items-center justify-center gap-2 rounded-full bg-[#15100c] px-4 py-3 text-center text-sm font-bold uppercase tracking-[0.08em] text-[#f4ead8]"
              >
                <EspressoIcon small />
                Order Here
              </a>

              <a
                href="#subscribe"
                onClick={closeMenus}
                className="flex items-center justify-center rounded-full border border-[#15100c]/20 px-4 py-3 text-sm font-bold uppercase tracking-[0.08em] text-[#15100c]"
              >
                Subscribe
              </a>

              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className="rounded-full border border-[#15100c]/20 px-4 py-3 text-left text-sm font-bold uppercase tracking-[0.08em]"
              >
                Search / Explore
              </button>
            </div>
          </div>
        )}
      </header>

      {searchOpen && (
        <div
          className="fixed inset-0 z-[60] bg-[#15100c]/35 px-4 py-20 backdrop-blur-sm"
          onClick={closeMenus}
        >
          <div
            className="mx-auto max-w-2xl border border-[#15100c]/15 bg-[#f4ead8] p-6 shadow-editorial sm:p-8"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-5 border-b border-[#15100c]/15 pb-5">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#5a3826]">
                  Explore The Journal
                </p>

                <h2 className="mt-2 font-display text-5xl leading-none tracking-[-0.045em] text-[#15100c]">
                  Where would you like to go?
                </h2>
              </div>

              <button
                type="button"
                onClick={closeMenus}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#15100c]/20 text-xl"
                aria-label="Close search"
              >
                ×
              </button>
            </div>

            <div className="mt-6 grid gap-3">
              {quickSearch.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={closeMenus}
                  className="group flex items-center justify-between border-b border-[#15100c]/10 py-4 font-display text-3xl leading-none tracking-[-0.03em] transition hover:text-[#5a3826]"
                >
                  {item.label}
                  <span className="text-base transition group-hover:translate-x-1">→</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      {showHomeButton && (
        <a
          href="#home"
          className="fixed bottom-5 right-5 z-50 rounded-full border border-[#15100c]/15 bg-[#f4ead8]/90 px-5 py-3 text-xs font-bold uppercase tracking-[0.12em] text-[#15100c] shadow-paper backdrop-blur-xl transition hover:-translate-y-1 hover:bg-[#15100c] hover:text-[#f4ead8]"
        >
          Home ↑
        </a>
      )}
    </>
  );
}