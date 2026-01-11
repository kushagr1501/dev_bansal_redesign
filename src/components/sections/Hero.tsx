import { memo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Sparkles, Code2, BrainCircuit } from "lucide-react";

// Animation variants for staggered text reveal
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

const charVariants = {
  hidden: {
    opacity: 0,
    y: 50,
    rotateX: -90,
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

// Animated text component - splits into characters
const AnimatedText = memo(
  ({ text, className = "" }: { text: string; className?: string }) => (
    <motion.span
      className={`block ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{ perspective: 500 }}
    >
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          variants={charVariants}
          className="inline-block"
          style={{
            display: char === " " ? "inline" : "inline-block",
            transformStyle: "preserve-3d",
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.span>
  )
);

AnimatedText.displayName = "AnimatedText";

// Floating decoration component
const FloatingElement = memo(
  ({
    children,
    delay = 0,
    className = "",
  }: {
    children: React.ReactNode;
    delay?: number;
    className?: string;
  }) => (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: 1,
        scale: 1,
        y: [0, -15, 0],
      }}
      transition={{
        opacity: { duration: 0.6, delay },
        scale: { duration: 0.6, delay },
        y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay },
      }}
    >
      {children}
    </motion.div>
  )
);

FloatingElement.displayName = "FloatingElement";

const Hero = memo(() => {
  // Parallax scroll effects
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 0.5], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden bg-void"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] bg-electric/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-1/4 w-[500px] h-[500px] bg-plasma/10 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold/5 rounded-full blur-[150px]" />

        <div className="absolute inset-0 grid-pattern opacity-30" />
      </div>

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 section-container pt-32 pb-20"
      >
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="order-2 lg:order-1">
            <h1 className="font-display text-display-xl mb-4">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.08 } },
                }}
              >
                <span className="block text-pearl overflow-hidden">
                  {"DEV".split("").map((char, i) => (
                    <motion.span
                      key={`dev-${i}`}
                      className="inline-block"
                      variants={{
                        hidden: { y: 100, opacity: 0 },
                        visible: {
                          y: 0,
                          opacity: 1,
                          transition: {
                            duration: 0.6,
                            ease: [0.16, 1, 0.3, 1],
                          },
                        },
                      }}
                    >
                      {char}
                    </motion.span>
                  ))}
                </span>

                <span className="block gradient-text-animated overflow-hidden">
                  {"BANSAL".split("").map((char, i) => (
                    <motion.span
                      key={`bansal-${i}`}
                      className="inline-block"
                      variants={{
                        hidden: { y: 100, opacity: 0 },
                        visible: {
                          y: 0,
                          opacity: 1,
                          transition: {
                            duration: 0.6,
                            ease: [0.16, 1, 0.3, 1],
                            delay: 0.3 + i * 0.05, // Start after DEV
                          },
                        },
                      }}
                    >
                      {char}
                    </motion.span>
                  ))}
                </span>
              </motion.div>
            </h1>

            <motion.div
              className="h-[2px] w-24 bg-electric mb-8"
              initial={{ scaleX: 0, originX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 1, ease: [0.16, 1, 0.3, 1] }}
            />

            <motion.p
              className="font-body text-lg md:text-xl text-silver leading-relaxed max-w-lg mb-10"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 1.2,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              A 19 year old{" "}
              <span className="text-electric">machine learning</span> and{" "}
              <span className="text-plasma">data science</span> enthusiast who
              is passionate about building practical AI systems and writing
              about model evaluation, safe deployment, and human-centered
              tooling.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 1.4,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <motion.a
                href="#projects"
                className="btn-primary group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>View Projects</span>
                <Sparkles className="ml-2 w-4 h-4 group-hover:rotate-12 transition-transform" />
              </motion.a>

              <motion.a
                href="#about"
                className="btn-secondary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Learn More
              </motion.a>
            </motion.div>
          </div>

          <div className="order-1 lg:order-2 relative">
            <motion.div
              className="relative aspect-square max-w-md mx-auto"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <motion.div
                className="absolute inset-0 rounded-full border border-electric/30"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />

              <motion.div
                className="absolute inset-4 rounded-full border border-plasma/20"
                animate={{ rotate: -360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              />

              <div className="absolute inset-8 rounded-full bg-gradient-to-br from-carbon to-graphite overflow-hidden border border-slate/30">
                <div className="absolute inset-0 flex items-center justify-center opacity-20">
                  <img
                    src="https://github-readme-activity-graph.vercel.app/graph?username=sharpeye08&theme=github-compact&hide_border=true&area=true"
                    alt="GitHub Activity"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent" />

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <BrainCircuit className="w-16 h-16 text-electric mx-auto mb-4" />
                    <span className="font-mono text-sm text-silver">
                      ML Engineer
                    </span>
                  </div>
                </div>
              </div>

              <FloatingElement delay={1} className="absolute -top-4 -left-4">
                <div className="glass p-4 rounded-xl">
                  <Code2 className="w-6 h-6 text-electric" />
                </div>
              </FloatingElement>

              <FloatingElement
                delay={1.3}
                className="absolute top-1/4 -right-6"
              >
                <div className="glass p-3 rounded-lg">
                  <span className="font-mono text-xs text-plasma">PyTorch</span>
                </div>
              </FloatingElement>

              <FloatingElement
                delay={1.6}
                className="absolute bottom-1/4 -left-8"
              >
                <div className="glass p-3 rounded-lg">
                  <span className="font-mono text-xs text-gold">
                    TensorFlow
                  </span>
                </div>
              </FloatingElement>

              <FloatingElement
                delay={1.9}
                className="absolute -bottom-4 right-1/4"
              >
                <div className="glass p-3 rounded-lg">
                  <span className="font-mono text-xs text-electric">
                    Python
                  </span>
                </div>
              </FloatingElement>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs font-mono text-steel tracking-widest uppercase">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="w-5 h-5 text-electric" />
        </motion.div>
      </motion.div>
    </section>
  );
});

Hero.displayName = "Hero";

export default Hero;
