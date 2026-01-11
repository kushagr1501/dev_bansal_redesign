import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// LAYOUT COMPONENTS

import CustomCursor from "./components/layout/CustomCursor";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

// SECTION COMPONENTS 
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Projects from "./components/sections/Projects";
// import Papers from './components/sections/Papers';
import Socials from "./components/sections/Socials";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

function App() {
  // SMOOTH SCROLL INITIALIZATION
  // Lenis provides buttery smooth scrolling
  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential easing
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 2,
    });

    // Connecting  Lenis to GSAP's ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // Adding Lenis to GSAP's ticker for smooth animation
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // Disable GSAP's lag smoothing for better performance
    gsap.ticker.lagSmoothing(0);

    // Cleanup on unmount
    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000);
      });
    };
  }, []);

  // INITIAL PAGE LOAD ANIMATION
  useEffect(() => {
    document.body.classList.add("loaded");

    // Refresh ScrollTrigger after fonts load
    document.fonts.ready.then(() => {
      ScrollTrigger.refresh();
    });
  }, []);

  return (
    <>
      {/* 
          CUSTOM CURSOR
          - Only shows on desktop (hides on touch devices)
          - Follows mouse with smooth lerping
          - Scales on hover over interactive elements
         */}
      <CustomCursor />

      {/*
          NAVIGATION
          - Fixed position at top
          - Glass morphism effect on scroll
          - Hides on scroll down, shows on scroll up
          - Mobile hamburger menu
          */}
      <Navbar />

      {/* 
          MAIN CONTENT
          - Contains all page sections
          - Each section has an id for navigation
          */}
      <main className="relative">
        <Hero />

        {/* 
          ABOUT SECTION (id="about")
        */}
        <About />

        {/* 
          PROJECTS SECTION (id="projects")
         
        */}
        <Projects />

        {/* 
          PAPERS SECTION (id="papers")
          
        */}
        {/* <Papers /> */}

        {/* 
          SOCIALS SECTION (id="socials")
        
        */}
        <Socials />
      </main>

      {/* 
          FOOTER
           GitHub contribution chart */}
      <Footer />
    </>
  );
}

export default App;
