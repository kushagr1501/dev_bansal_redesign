/**
 * CustomCursor - Animated cursor with magnetic effects
 * Follows mouse with smooth lerping and scales on hover states
 */

import { useEffect, useRef, useState, memo } from 'react';
import gsap from 'gsap';

interface CursorState {
  isHovering: boolean;
  isClicking: boolean;
  label?: string;
}

const CustomCursor = memo(() => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const [cursorState, setCursorState] = useState<CursorState>({
    isHovering: false,
    isClicking: false
  });
  
  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;
    if (!cursor || !cursorDot) return;
    
    // Track mouse position
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let dotX = 0;
    let dotY = 0;
    
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    
    // Smooth animation loop
    const animate = () => {
      // Outer cursor - slower follow
      const diffX = mouseX - cursorX;
      const diffY = mouseY - cursorY;
      cursorX += diffX * 0.15;
      cursorY += diffY * 0.15;
      
      // Inner dot - faster follow
      const dotDiffX = mouseX - dotX;
      const dotDiffY = mouseY - dotY;
      dotX += dotDiffX * 0.35;
      dotY += dotDiffY * 0.35;
      
      cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
      cursorDot.style.transform = `translate3d(${dotX}px, ${dotY}px, 0)`;
      
      requestAnimationFrame(animate);
    };
    
    // Handle hover states
    const handleMouseEnter = () => {
      setCursorState(prev => ({ ...prev, isHovering: true }));
    };
    
    const handleMouseLeave = () => {
      setCursorState(prev => ({ ...prev, isHovering: false }));
    };
    
    const handleMouseDown = () => {
      setCursorState(prev => ({ ...prev, isClicking: true }));
    };
    
    const handleMouseUp = () => {
      setCursorState(prev => ({ ...prev, isClicking: false }));
    };
    
    // Add event listeners
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    
    // Add hover detection for interactive elements
    const interactiveElements = document.querySelectorAll(
      'a, button, [data-cursor-hover], input, textarea, [role="button"]'
    );
    
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });
    
    // Start animation
    animate();
    
    // Show cursor after initialization
    gsap.to([cursor, cursorDot], {
      opacity: 1,
      duration: 0.5,
      delay: 0.5
    });
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);
  
  // Don't show on touch devices
  if (typeof window !== 'undefined' && 'ontouchstart' in window) {
    return null;
  }
  
  return (
    <>
      {/* Outer ring cursor */}
      <div
        ref={cursorRef}
        className={`
          fixed top-0 left-0 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2
          mix-blend-difference opacity-0
        `}
        style={{ willChange: 'transform' }}
      >
        <div
          className={`
            w-10 h-10 rounded-full border-2 border-white
            transition-all duration-300 ease-expo-out
            ${cursorState.isHovering ? 'scale-150 bg-white/10' : 'scale-100'}
            ${cursorState.isClicking ? 'scale-75' : ''}
          `}
        />
      </div>
      
      {/* Inner dot cursor */}
      <div
        ref={cursorDotRef}
        className={`
          fixed top-0 left-0 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2
          mix-blend-difference opacity-0
        `}
        style={{ willChange: 'transform' }}
      >
        <div
          className={`
            w-2 h-2 rounded-full bg-white
            transition-all duration-200 ease-expo-out
            ${cursorState.isHovering ? 'scale-0' : 'scale-100'}
            ${cursorState.isClicking ? 'scale-150' : ''}
          `}
        />
      </div>
    </>
  );
});

CustomCursor.displayName = 'CustomCursor';

export default CustomCursor;
