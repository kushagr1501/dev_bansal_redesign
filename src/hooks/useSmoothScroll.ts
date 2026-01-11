/**
 * useSmoothScroll - Custom hook for smooth scrolling with Lenis
 * Provides buttery smooth scroll experience
 */

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
    // Default easing function - smooth and natural
    const defaultEasing = (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t));
    
    // Initialize Lenis
    lenisRef.current = new Lenis({
      duration: options.duration || 1.2,
      easing: options.easing || defaultEasing,
      orientation: options.orientation || 'vertical',
      gestureOrientation: options.gestureOrientation || 'vertical',
      smoothWheel: options.smoothWheel !== false,
      syncTouch: options.syncTouch || false,
      syncTouchLerp: options.syncTouchLerp || 0.075,
      touchMultiplier: options.touchMultiplier || 2,
      wheelMultiplier: options.wheelMultiplier || 1,
    });
    
    // Connect Lenis to GSAP ScrollTrigger
    lenisRef.current.on('scroll', ScrollTrigger.update);
    
    // GSAP ticker for smooth animation
    gsap.ticker.add((time) => {
      lenisRef.current?.raf(time * 1000);
    });
    
    // Disable GSAP's lagSmoothing for smoother experience
    gsap.ticker.lagSmoothing(0);
    
    // Cleanup
    return () => {
      lenisRef.current?.destroy();
      gsap.ticker.remove((time) => {
        lenisRef.current?.raf(time * 1000);
      });
    };
  }, [options]);
  
  // Scroll to specific target
  const scrollTo = useCallback((
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
  }, []);
  
  // Stop scrolling
  const stop = useCallback(() => {
    lenisRef.current?.stop();
  }, []);
  
  // Start scrolling
  const start = useCallback(() => {
    lenisRef.current?.start();
  }, []);
  
  // Get current scroll position
  const getScroll = useCallback(() => {
    return lenisRef.current?.scroll || 0;
  }, []);
  
  // Get scroll progress (0-1)
  const getProgress = useCallback(() => {
    return lenisRef.current?.progress || 0;
  }, []);
  
  return {
    lenis: lenisRef.current,
    scrollTo,
    stop,
    start,
    getScroll,
    getProgress
  };
}

export default useSmoothScroll;