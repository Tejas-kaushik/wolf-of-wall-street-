const MAP_URL = 'https://share.google/03qqYQH0xdGgUjCgb';

export function FloatingActions() {
  return (
    <div className="fixed bottom-5 left-1/2 z-40 flex -translate-x-1/2 items-center gap-2 rounded-full border border-cream/10 bg-espresso/55 p-2 shadow-cafe backdrop-blur-2xl sm:bottom-7">
      <a
        href="#menu"
        className="rounded-full bg-cream px-4 py-2 text-xs font-semibold text-espresso transition hover:scale-105 sm:px-5 sm:text-sm"
      >
        View Menu
      </a>

      <a
        href={MAP_URL}
        target="_blank"
        rel="noreferrer"
        className="rounded-full border border-cream/15 px-4 py-2 text-xs font-semibold text-cream transition hover:scale-105 hover:bg-cream/10 sm:px-5 sm:text-sm"
      >
        Directions
      </a>
    </div>
  );
}