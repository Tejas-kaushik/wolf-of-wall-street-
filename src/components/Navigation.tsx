import { useState } from 'react';

const links = [
  { label: 'Home', id: 'home' },
  { label: 'Story', id: 'story' },
  { label: 'Menu', id: 'menu' },
  { label: 'Journal', id: 'journal' },
  { label: 'Visit Us', id: 'visit' },
];

export function Navigation() {
  const [open, setOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);

    if (!section) {
      console.warn(`Section with id "${id}" was not found.`);
      return;
    }

    section.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });

    setOpen(false);
  };

  return (
    <header className="fixed left-0 right-0 top-0 z-50 px-3 py-3 sm:px-6">
      <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-cream/10 bg-cream/55 px-5 py-4 shadow-cafe backdrop-blur-2xl">
        <button
          type="button"
          onClick={() => scrollToSection('home')}
          className="font-display text-3xl tracking-tight text-espresso transition hover:scale-[1.02]"
        >
          The Stramont
          <sup className="ml-1 align-super text-[0.42em] leading-none text-coffee">®</sup>
        </button>

        <div className="hidden items-center gap-9 md:flex">
          {links.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => scrollToSection(link.id)}
              className="text-sm font-medium text-coffee/60 transition duration-300 hover:-translate-y-0.5 hover:text-espresso"
            >
              {link.label}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => scrollToSection('visit')}
          className="rounded-full bg-coffee px-7 py-3 text-sm font-semibold text-cream shadow-glow transition duration-300 hover:scale-[1.03] hover:bg-espresso"
        >
          Visit
        </button>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="ml-3 flex h-11 w-11 items-center justify-center rounded-full border border-coffee/10 bg-cream/60 text-coffee md:hidden"
          aria-label="Open menu"
        >
          ☰
        </button>
      </nav>

      {open && (
        <div className="mx-auto mt-3 max-w-7xl rounded-[2rem] border border-cream/10 bg-espresso/90 p-4 shadow-cafe backdrop-blur-2xl md:hidden">
          <div className="grid gap-2">
            {links.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => scrollToSection(link.id)}
                className="rounded-full px-5 py-3 text-left text-sm font-medium text-cream/80 transition hover:bg-cream/10 hover:text-cream"
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}