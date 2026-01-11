/**
 * useMousePosition - Track mouse position for magnetic effects and custom cursors
 */

import { useState, useEffect, useCallback, useRef } from 'react';

interface MousePosition {
  x: number;
  y: number;
  normalizedX: number;  // -1 to 1 (left to right)
  normalizedY: number;  // -1 to 1 (top to bottom)
}

interface UseMousePositionOptions {
  /** Enable tracking */
  enabled?: boolean;
  /** Lerp factor for smooth movement (0-1, lower = smoother) */
  lerp?: number;
  /** Track relative to an element instead of window */
  containerRef?: React.RefObject<HTMLElement>;
}

export function useMousePosition(options: UseMousePositionOptions = {}) {
  const { enabled = true, lerp = 0.1, containerRef } = options;
  
  const [position, setPosition] = useState<MousePosition>({
    x: 0,
    y: 0,
    normalizedX: 0,
    normalizedY: 0
  });
  
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);
  
  // Animation loop for smooth lerping
  const animate = useCallback(() => {
    currentRef.current.x += (targetRef.current.x - currentRef.current.x) * lerp;
    currentRef.current.y += (targetRef.current.y - currentRef.current.y) * lerp;
    
    const container = containerRef?.current || document.documentElement;
    const width = container.clientWidth;
    const height = container.clientHeight;
    
    setPosition({
      x: currentRef.current.x,
      y: currentRef.current.y,
      normalizedX: (currentRef.current.x / width) * 2 - 1,
      normalizedY: (currentRef.current.y / height) * 2 - 1
    });
    
    rafRef.current = requestAnimationFrame(animate);
  }, [lerp, containerRef]);
  
  useEffect(() => {
    if (!enabled) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef?.current) {
        const rect = containerRef.current.getBoundingClientRect();
        targetRef.current.x = e.clientX - rect.left;
        targetRef.current.y = e.clientY - rect.top;
      } else {
        targetRef.current.x = e.clientX;
        targetRef.current.y = e.clientY;
      }
    };
    
    // Start animation loop
    rafRef.current = requestAnimationFrame(animate);
    
    // Add event listener
    const target = containerRef?.current || window;
    target.addEventListener('mousemove', handleMouseMove as EventListener);
    
    return () => {
      target.removeEventListener('mousemove', handleMouseMove as EventListener);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [enabled, animate, containerRef]);
  
  return position;
}

/**
 * useHover - Simple hover state hook
 */
export function useHover<T extends HTMLElement>() {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<T>(null);
  
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    
    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);
    
    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);
  
  return { ref, isHovered };
}

export default useMousePosition;
