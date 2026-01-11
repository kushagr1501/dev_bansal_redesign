/**
 * useGsap - Custom hook for GSAP animations with React
 * Handles setup, cleanup, and scroll-triggered animations
 */

import { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// ============================================
// TYPES
// ============================================
interface ScrollTriggerConfig {
  trigger: string | Element;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  pin?: boolean | string | Element;
  markers?: boolean;
  toggleActions?: string;
  onEnter?: () => void;
  onLeave?: () => void;
  onEnterBack?: () => void;
  onLeaveBack?: () => void;
}

interface AnimationConfig {
  duration?: number;
  ease?: string;
  delay?: number;
  stagger?: number | object;
  scrollTrigger?: ScrollTriggerConfig;
}

// ============================================
// MAIN HOOK
// ============================================
export function useGsap() {
  const ctx = useRef<gsap.Context | null>(null);
  const timeline = useRef<gsap.core.Timeline | null>(null);
  
  // Initialize GSAP context for cleanup
  useEffect(() => {
    ctx.current = gsap.context(() => {});
    
    return () => {
      ctx.current?.revert();
    };
  }, []);
  
  // ============================================
  // ANIMATION PRESETS
  // ============================================
  
  /**
   * Fade and slide up animation
   */
  const fadeUp = useCallback((
    target: string | Element | Element[],
    config: AnimationConfig = {}
  ) => {
    const {
      duration = 1,
      ease = 'expo.out',
      delay = 0,
      stagger = 0.1,
      scrollTrigger
    } = config;
    
    return gsap.from(target, {
      y: 60,
      opacity: 0,
      duration,
      ease,
      delay,
      stagger,
      scrollTrigger: scrollTrigger ? {
        trigger: scrollTrigger.trigger,
        start: scrollTrigger.start || 'top 80%',
        end: scrollTrigger.end || 'bottom 20%',
        toggleActions: scrollTrigger.toggleActions || 'play none none reverse',
        ...scrollTrigger
      } : undefined
    });
  }, []);
  
  /**
   * Fade and slide from left
   */
  const fadeLeft = useCallback((
    target: string | Element | Element[],
    config: AnimationConfig = {}
  ) => {
    const {
      duration = 1,
      ease = 'expo.out',
      delay = 0,
      stagger = 0.1,
      scrollTrigger
    } = config;
    
    return gsap.from(target, {
      x: -60,
      opacity: 0,
      duration,
      ease,
      delay,
      stagger,
      scrollTrigger: scrollTrigger ? {
        trigger: scrollTrigger.trigger,
        start: scrollTrigger.start || 'top 80%',
        toggleActions: scrollTrigger.toggleActions || 'play none none reverse',
        ...scrollTrigger
      } : undefined
    });
  }, []);
  
  /**
   * Fade and slide from right
   */
  const fadeRight = useCallback((
    target: string | Element | Element[],
    config: AnimationConfig = {}
  ) => {
    const {
      duration = 1,
      ease = 'expo.out',
      delay = 0,
      stagger = 0.1,
      scrollTrigger
    } = config;
    
    return gsap.from(target, {
      x: 60,
      opacity: 0,
      duration,
      ease,
      delay,
      stagger,
      scrollTrigger: scrollTrigger ? {
        trigger: scrollTrigger.trigger,
        start: scrollTrigger.start || 'top 80%',
        toggleActions: scrollTrigger.toggleActions || 'play none none reverse',
        ...scrollTrigger
      } : undefined
    });
  }, []);
  
  /**
   * Scale in animation
   */
  const scaleIn = useCallback((
    target: string | Element | Element[],
    config: AnimationConfig = {}
  ) => {
    const {
      duration = 0.8,
      ease = 'expo.out',
      delay = 0,
      stagger = 0.1,
      scrollTrigger
    } = config;
    
    return gsap.from(target, {
      scale: 0.9,
      opacity: 0,
      duration,
      ease,
      delay,
      stagger,
      scrollTrigger: scrollTrigger ? {
        trigger: scrollTrigger.trigger,
        start: scrollTrigger.start || 'top 80%',
        toggleActions: scrollTrigger.toggleActions || 'play none none reverse',
        ...scrollTrigger
      } : undefined
    });
  }, []);
  
  /**
   * Reveal animation with clip-path
   */
  const reveal = useCallback((
    target: string | Element | Element[],
    config: AnimationConfig = {}
  ) => {
    const {
      duration = 1.2,
      ease = 'expo.inOut',
      delay = 0,
      stagger = 0.1,
      scrollTrigger
    } = config;
    
    return gsap.fromTo(target, {
      clipPath: 'polygon(0 0, 0 0, 0 100%, 0% 100%)',
    }, {
      clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
      duration,
      ease,
      delay,
      stagger,
      scrollTrigger: scrollTrigger ? {
        trigger: scrollTrigger.trigger,
        start: scrollTrigger.start || 'top 80%',
        toggleActions: scrollTrigger.toggleActions || 'play none none reverse',
        ...scrollTrigger
      } : undefined
    });
  }, []);
  
  /**
   * Character-by-character text animation
   */
  const splitText = useCallback((
    target: string | Element,
    config: AnimationConfig = {}
  ) => {
    const {
      duration = 0.8,
      ease = 'expo.out',
      delay = 0,
      stagger = 0.02,
      scrollTrigger
    } = config;
    
    const element = typeof target === 'string' ? document.querySelector(target) : target;
    if (!element) return;
    
    const text = element.textContent || '';
    element.innerHTML = text.split('').map(char => 
      char === ' ' ? ' ' : `<span class="split-char">${char}</span>`
    ).join('');
    
    const chars = element.querySelectorAll('.split-char');
    
    return gsap.from(chars, {
      y: 40,
      opacity: 0,
      duration,
      ease,
      delay,
      stagger,
      scrollTrigger: scrollTrigger ? {
        trigger: scrollTrigger.trigger,
        start: scrollTrigger.start || 'top 80%',
        toggleActions: scrollTrigger.toggleActions || 'play none none reverse',
        ...scrollTrigger
      } : undefined
    });
  }, []);
  
  /**
   * Parallax scroll effect
   */
  const parallax = useCallback((
    target: string | Element,
    speed: number = 0.5,
    direction: 'y' | 'x' = 'y'
  ) => {
    return gsap.to(target, {
      [direction]: () => {
        const element = typeof target === 'string' ? document.querySelector(target) : target;
        if (!element) return 0;
        return ScrollTrigger.maxScroll(window) * speed * -1;
      },
      ease: 'none',
      scrollTrigger: {
        trigger: target,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
        invalidateOnRefresh: true
      }
    });
  }, []);
  
  /**
   * Magnetic hover effect
   */
  const magnetic = useCallback((
    target: string | Element,
    strength: number = 0.3
  ) => {
    const element = typeof target === 'string' ? document.querySelector(target) : target;
    if (!element) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = (element as HTMLElement).getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      gsap.to(element, {
        x: x * strength,
        y: y * strength,
        duration: 0.3,
        ease: 'power2.out'
      });
    };
    
    const handleMouseLeave = () => {
      gsap.to(element, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.5)'
      });
    };
    
    element.addEventListener('mousemove', handleMouseMove as EventListener);
    element.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      element.removeEventListener('mousemove', handleMouseMove as EventListener);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);
  
  /**
   * Create a timeline
   */
  const createTimeline = useCallback((config?: gsap.TimelineVars) => {
    timeline.current = gsap.timeline(config);
    return timeline.current;
  }, []);
  
  /**
   * Refresh ScrollTrigger (call after layout changes)
   */
  const refresh = useCallback(() => {
    ScrollTrigger.refresh();
  }, []);
  
  return {
    gsap,
    ScrollTrigger,
    ctx,
    timeline,
    fadeUp,
    fadeLeft,
    fadeRight,
    scaleIn,
    reveal,
    splitText,
    parallax,
    magnetic,
    createTimeline,
    refresh
  };
}

export default useGsap;
