/**
 * About - Bio and skills section with animated skill bars
 */

import { useRef, memo } from "react";
import { motion, useInView } from "framer-motion";
import {
  Terminal,
  Brain,
  Layers,
  Cpu,
  Database,
  LineChart,
  Sparkles,
  Code2,
  Zap,
  Target,
} from "lucide-react";

// Skills data
const skills = [
  { name: "Python", level: 95, icon: Terminal, color: "bg-electric" },
  { name: "PyTorch", level: 88, icon: Brain, color: "bg-plasma" },
  { name: "TensorFlow", level: 85, icon: Layers, color: "bg-gold" },
  { name: "Keras", level: 82, icon: Cpu, color: "bg-electric" },
  { name: "SQL", level: 78, icon: Database, color: "bg-azure" },
  { name: "Data Viz", level: 90, icon: LineChart, color: "bg-plasma" },
];

// Expertise areas
const expertise = [
  {
    title: "Machine Learning",
    desc: "Building practical ML models",
    icon: Brain,
  },
  {
    title: "Data Science",
    desc: "Extracting insights from data",
    icon: LineChart,
  },
  { title: "Model Evaluation", desc: "Rigorous testing methods", icon: Target },
  {
    title: "Safe Deployment",
    desc: "Responsible AI practices",
    icon: Sparkles,
  },
];

// Skill bar component
const SkillBar = memo(
  ({ skill, index }: { skill: (typeof skills)[0]; index: number }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    const Icon = skill.icon;

    return (
      <div ref={ref} className="group">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <Icon className="w-4 h-4 text-electric" />
            <span className="font-mono text-sm text-pearl">{skill.name}</span>
          </div>
          <span className="font-mono text-xs text-steel">{skill.level}%</span>
        </div>

        <div className="h-2 bg-slate/30 rounded-full overflow-hidden">
          <motion.div
            className={`h-full ${skill.color} rounded-full`}
            initial={{ width: 0 }}
            animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
            transition={{
              duration: 1,
              delay: index * 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
          />
        </div>
      </div>
    );
  }
);

SkillBar.displayName = "SkillBar";

const About = memo(() => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="about"
      className="section-padding bg-obsidian relative overflow-hidden"
    >
      <div className="absolute inset-0 dots-pattern opacity-20" />

      <div ref={ref} className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 text-xs font-mono text-electric uppercase tracking-widest mb-4">
            <span className="w-8 h-px bg-electric" />
            About Me
            <span className="w-8 h-px bg-electric" />
          </span>
          <h2 className="font-display text-display-md text-pearl">
            Turning Research Into
            <span className="gradient-text block">Shipped Features</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="prose prose-invert max-w-none">
              <p className="text-lg text-silver leading-relaxed mb-6">
                I enjoy turning research ideas into shipped features. I'm deeply
                passionate about{" "}
                <span className="text-electric">machine learning</span> and
                <span className="text-plasma"> data science</span>, constantly
                learning something new every day.
              </p>
              <p className="text-lg text-silver leading-relaxed mb-6">
                I also have a keen interest in{" "}
                <span className="text-gold">mathematics</span> and
                <span className="text-electric"> Deep Learning</span>, exploring
                how theoretical concepts translate into practical applications.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {expertise.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                    className="p-4 rounded-xl border border-slate/30 bg-carbon/50 hover:border-electric/30 transition-colors group"
                  >
                    <Icon className="w-5 h-5 text-electric mb-2 group-hover:scale-110 transition-transform" />
                    <h4 className="font-heading text-sm font-semibold text-pearl mb-1">
                      {item.title}
                    </h4>
                    <p className="text-xs text-steel">{item.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="p-6 rounded-2xl border border-slate/30 bg-carbon/50">
              <div className="flex items-center gap-3 mb-6">
                <Zap className="w-5 h-5 text-electric" />
                <h3 className="font-heading text-lg font-semibold text-pearl">
                  Technical Skills
                </h3>
              </div>

              <div className="space-y-5">
                {skills.map((skill, index) => (
                  <SkillBar key={skill.name} skill={skill} index={index} />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
});

About.displayName = "About";

export default About;
