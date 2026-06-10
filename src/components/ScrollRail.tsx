type ScrollRailProps = {
  activeIndex: number;
  count: number;
  labels: string[];
  onNavigate: (index: number) => void;
};

export function ScrollRail({ activeIndex, count, labels, onNavigate }: ScrollRailProps) {
  return (
    <aside className="fixed right-5 top-1/2 z-20 hidden -translate-y-1/2 flex-col items-center gap-4 md:flex">
      <div className="relative h-44 w-px overflow-hidden rounded-full bg-coffee/12">
        <div
          className="absolute left-0 top-0 w-px rounded-full bg-coffee transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{ height: `${100 / count}%`, transform: `translateY(${activeIndex * 100}%)` }}
        />
      </div>

      <div className="flex flex-col gap-2 rounded-full border border-coffee/10 bg-cream/50 p-2 shadow-soft backdrop-blur-xl">
        {Array.from({ length: count }).map((_, index) => (
          <button
            key={labels[index] ?? index}
            type="button"
            onClick={() => onNavigate(index)}
            className="group flex h-6 w-6 items-center justify-center"
            aria-label={`Go to ${labels[index] ?? `section ${index + 1}`}`}
          >
            <span
              className="block rounded-full transition-all duration-300"
              style={{
                width: activeIndex === index ? 9 : 5,
                height: activeIndex === index ? 9 : 5,
                backgroundColor: activeIndex === index ? '#4B2E1F' : 'rgba(75,46,31,0.28)',
              }}
            />
          </button>
        ))}
      </div>
    </aside>
  );
}
