import { useEffect, useRef } from 'react';

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_083109_283f3553-e28f-428b-a723-d639c617eb2b.mp4';

export function ManualLoopVideo() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const restartTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    const FADE_SECONDS = 0.5;
    const MAX_OPACITY = 0.26;

    video.loop = false;
    video.style.opacity = '0';

    const setOpacity = (value: number) => {
      const nextValue = Math.max(0, Math.min(MAX_OPACITY, value));
      video.style.opacity = nextValue.toFixed(3);
    };

    const tick = () => {
      const { currentTime, duration } = video;

      if (Number.isFinite(duration) && duration > 0) {
        const remaining = duration - currentTime;

        if (currentTime <= FADE_SECONDS) {
          setOpacity((currentTime / FADE_SECONDS) * MAX_OPACITY);
        } else if (remaining <= FADE_SECONDS) {
          setOpacity((remaining / FADE_SECONDS) * MAX_OPACITY);
        } else {
          setOpacity(MAX_OPACITY);
        }
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    const playFromStart = async () => {
      try {
        await video.play();
      } catch {
        // Browser autoplay rules can block playback until the user interacts.
      }
    };

    const handleEnded = () => {
      setOpacity(0);

      if (restartTimerRef.current) {
        window.clearTimeout(restartTimerRef.current);
      }

      restartTimerRef.current = window.setTimeout(() => {
        video.currentTime = 0;
        void playFromStart();
      }, 100);
    };

    video.addEventListener('ended', handleEnded);
    rafRef.current = requestAnimationFrame(tick);
    void playFromStart();

    return () => {
      video.removeEventListener('ended', handleEnded);

      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      if (restartTimerRef.current) {
        window.clearTimeout(restartTimerRef.current);
      }
    };
  }, []);

  return (
    <div className="fixed inset-x-0 bottom-0 top-[300px] z-0 overflow-hidden bg-night">
      <video
        ref={videoRef}
        className="h-full w-full object-cover transition-opacity duration-100 ease-linear motion-safe-transform"
        src={VIDEO_URL}
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
      />

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-night via-transparent to-night" />

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(16,9,6,0.88)_0%,rgba(16,9,6,0.24)_48%,rgba(16,9,6,0.9)_100%)]" />

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_32%,rgba(215,168,95,0.06)_0%,rgba(16,9,6,0.48)_56%,#100906_100%)]" />

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_22%_18%,rgba(142,160,122,0.14),transparent_34%),radial-gradient(circle_at_82%_76%,rgba(168,97,69,0.16),transparent_38%)]" />
    </div>
  );
}