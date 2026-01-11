import { useEffect, useRef, useCallback } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SmoothScrollOptions {
  duration?: number;
  easing?: (t: number) => number;
  orientation?: 'vertical' | 'horizontal';
  gestureOrientation?: 'vertical' | 'horizontal' | 'both';
  smoothWheel?: boolean;
  syncTouch?: boolean;
  syncTouchLerp?: number;
  touchMultiplier?: number;
  wheelMultiplier?: number;
}

export function useSmoothScroll(options: SmoothScrollOptions = {}) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const defaultEasing = (t: number) =>
      Math.min(1, 1.001 - Math.pow(2, -10 * t));

    const lenis = new Lenis({
      duration: options.duration ?? 1.2,
      easing: options.easing ?? defaultEasing,
      orientation: options.orientation ?? 'vertical',
      gestureOrientation: options.gestureOrientation ?? 'vertical',
      smoothWheel: options.smoothWheel ?? true,
      syncTouch: options.syncTouch ?? false,
      syncTouchLerp: options.syncTouchLerp ?? 0.075,
      touchMultiplier: options.touchMultiplier ?? 2,
      wheelMultiplier: options.wheelMultiplier ?? 1,
    });

    lenisRef.current = lenis;

    // Sync with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    const raf = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [options]);

  const scrollTo = useCallback(
    (
      target: string | number | HTMLElement,
      config?: {
        offset?: number;
        duration?: number;
        immediate?: boolean;
        lock?: boolean;
        onComplete?: () => void;
      }
    ) => {
      lenisRef.current?.scrollTo(target, config);
    },
    []
  );

  const stop = useCallback(() => {
    lenisRef.current?.stop();
  }, []);

  const start = useCallback(() => {
    lenisRef.current?.start();
  }, []);

  const getScroll = useCallback(() => {
    return lenisRef.current?.scroll ?? 0;
  }, []);

  const getProgress = useCallback(() => {
    return lenisRef.current?.progress ?? 0;
  }, []);

  return {
    lenis: lenisRef.current,
    scrollTo,
    stop,
    start,
    getScroll,
    getProgress,
  };
}

export default useSmoothScroll;
