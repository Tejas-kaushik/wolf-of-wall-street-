import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function CoffeePourVisual() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const pourRef = useRef<HTMLDivElement | null>(null);
  const labelRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(pourRef.current, {
        opacity: 0,
        scaleY: 0,
        transformOrigin: 'top center',
      });

      gsap.set(labelRef.current, {
        opacity: 0,
        y: 18,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });

      tl.fromTo(
        imageRef.current,
        { scale: 1.08, filter: 'brightness(0.84) contrast(1.08)' },
        { scale: 1, filter: 'brightness(0.96) contrast(1.04)', duration: 1.25, ease: 'power3.out' },
      )
        .to(
          pourRef.current,
          {
            opacity: 1,
            scaleY: 1,
            duration: 0.55,
            ease: 'power2.out',
          },
          0.25,
        )
        .to(
          pourRef.current,
          {
            opacity: 0,
            duration: 0.45,
            ease: 'power2.inOut',
          },
          1.15,
        )
        .to(
          labelRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            ease: 'power3.out',
          },
          0.75,
        );

      gsap.to(rootRef.current, {
        y: -12,
        duration: 4,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="relative h-[360px] overflow-hidden bg-[#e5dac8]">
      <img
        ref={imageRef}
        src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1400&q=90"
        alt="Realistic pour-over coffee being brewed in a cafe"
        className="h-full w-full object-cover"
        onError={(event) => {
          event.currentTarget.src =
            'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1400&q=90';
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-[#15100c]/58 via-[#15100c]/8 to-transparent" />

      <div
        ref={pourRef}
        className="absolute left-[53%] top-[22%] h-[145px] w-[3px] rounded-full bg-[#f4ead8]/80 shadow-[0_0_18px_rgba(244,234,216,0.7)]"
      />

      <div
        ref={labelRef}
        className="absolute bottom-5 left-5 max-w-[250px] border border-[#f4ead8]/25 bg-[#15100c]/62 p-5 text-[#f4ead8] shadow-editorial backdrop-blur-md"
      >
        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#c7924a]">
          Pour-over ritual
        </p>

        <p className="mt-2 font-display text-3xl leading-7">
          Slow comfort,
          <br />
          one cup at a time.
        </p>
      </div>
    </div>
  );
}