/**
 * Projects - Premium portfolio showcase with image thumbnails
 * Features: Large cards with previews, tech stack, hover animations
 */

import { useRef, memo } from "react";
import { motion, useInView } from "framer-motion";
import {
  ExternalLink,
  Github,
  ArrowUpRight,
  Sparkles,
  Database,
  Eye,
  Star,
  GitFork,
} from "lucide-react";

// Project data with thumbnails
const projects = [
  {
    id: 1,
    title: "Sharpner",
    subtitle: "AutoML Platform",
    description:
      "A no-code AutoML tool that lets you train datasets on ML models in your browser and visualize results with a single click. Built for accessibility and ease of use.",
    tags: ["Python", "Streamlit", "Machine Learning", "AutoML", "Data Viz"],
    liveUrl: "https://sharpner.streamlit.app/",
    githubUrl: "https://github.com/sharpeye08/Sharpner",
    // icon: Sparkles,
    thumbnailGradient: "from-electric/20 via-plasma/10 to-gold/20",
    stats: { stars: 12, forks: 3 },
    featured: true,
  },
  {
    id: 2,
    title: "Credit Card Fraud Detection",
    subtitle: "ML Classification Model",
    description:
      "A fraud detection system using logistic regression to classify transactions. Achieves high accuracy in identifying fraudulent vs legitimate transactions.",
    tags: ["Python", "Scikit-learn", "Logistic Regression", "Data Analysis"],
    githubUrl: "https://github.com/sharpeye08/Credit-Card-Fraud-Detection",
    // icon: Database,
    thumbnailGradient: "from-gold/20 via-ember/10 to-plasma/20",
    stats: { stars: 8, forks: 2 },
    featured: true,
  },
];

const ProjectCard = memo(
  ({ project, index }: { project: (typeof projects)[0]; index: number }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    // const Icon = project.icon;

    return (
      <motion.article
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{
          duration: 0.8,
          delay: index * 0.15,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="group"
      >
        <div className="h-full rounded-3xl overflow-hidden border border-slate/30 bg-carbon hover:border-electric/40 transition-all duration-500 hover:shadow-glow">
          <div
            className={`relative aspect-[16/8] bg-gradient-to-br ${project.thumbnailGradient} overflow-hidden`}
          >
            <div className="absolute inset-0 grid-pattern opacity-30" />

            <motion.div
              className="absolute top-1/4 left-1/4 w-32 h-32 bg-electric/20 rounded-full blur-[60px]"
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <motion.div
              className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-plasma/20 rounded-full blur-[40px]"
              animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 4, repeat: Infinity, delay: 1 }}
            />

            {project.featured && (
              <div className="absolute top-4 left-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-electric/20 backdrop-blur-sm border border-electric/30 text-electric text-xs font-mono">
                  <Star className="w-3 h-3 fill-current" />
                  Featured
                </span>
              </div>
            )}

            <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <motion.a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-void/80 backdrop-blur-sm border border-white/10 text-pearl hover:bg-pearl hover:text-void transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                title="View Code"
              >
                <Github className="w-4 h-4" />
              </motion.a>
              {project.liveUrl && (
                <motion.a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-electric text-void"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  title="Live Demo"
                >
                  <ExternalLink className="w-4 h-4" />
                </motion.a>
              )}
            </div>

            <motion.div className="absolute inset-0 bg-void/70 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
              <motion.a
                href={project.liveUrl || project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-electric text-void font-heading text-sm font-semibold"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Eye className="w-4 h-4" />
                {project.liveUrl ? "Live Preview" : "View Project"}
              </motion.a>
            </motion.div>
          </div>

          <div className="p-4 lg:p-5">
            <div className="mb-3">
              <span className="text-xs font-mono text-electric uppercase tracking-wider">
                {project.subtitle}
              </span>
              <h3 className="font-display text-xl text-pearl mt-1 group-hover:text-electric transition-colors">
                {project.title}
              </h3>
            </div>

            <p className="text-silver text-sm leading-relaxed mb-4">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs font-mono bg-slate/30 text-silver rounded-lg border border-slate/50 hover:border-electric/30 hover:text-electric transition-colors cursor-default"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate/20">
              <div className="flex items-center gap-4 text-steel text-sm">
                <span className="flex items-center gap-1.5 hover:text-pearl transition-colors">
                  <Star className="w-4 h-4" />
                  {project.stats.stars}
                </span>
                <span className="flex items-center gap-1.5 hover:text-pearl transition-colors">
                  <GitFork className="w-4 h-4" />
                  {project.stats.forks}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <motion.a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-full border border-slate/50 text-silver text-sm hover:border-pearl hover:text-pearl hover:bg-pearl/5 transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Github className="w-4 h-4" />
                  Code
                </motion.a>
                {project.liveUrl && (
                  <motion.a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-electric text-void text-sm font-semibold hover:shadow-glow transition-shadow"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <ExternalLink className="w-4 h-4" />
                    Demo
                  </motion.a>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.article>
    );
  }
);

ProjectCard.displayName = "ProjectCard";

const Projects = memo(() => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="projects"
      className="pb-12 md:pb-16 lg:pb-20 bg-void relative overflow-hidden"
    >
      <div className="absolute inset-0 grid-pattern opacity-10" />
      <div className="absolute top-1/3 -right-1/4 w-[600px] h-[600px] bg-plasma/10 rounded-full blur-[150px]" />
      <div className="absolute bottom-1/3 -left-1/4 w-[400px] h-[400px] bg-electric/10 rounded-full blur-[120px]" />

      <div ref={ref} className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-2 text-xs font-mono text-electric uppercase tracking-widest mb-4">
              <span className="w-8 h-px bg-electric" />
              Portfolio
            </span>
            <h2 className="font-display text-display-md text-pearl">
              Featured
              <span className="gradient-text block">Projects</span>
            </h2>
            <p className="mt-3 text-silver max-w-lg mx-auto">
              A showcase of my work in machine learning, data science, and
              building practical AI tools.
            </p>
          </div>

          <div className="flex justify-center">
            <motion.a
              href="https://github.com/sharpeye08"
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-flex items-center gap-3 px-6 py-4 rounded-2xl border-2 border-slate/30 bg-carbon/50 text-pearl hover:border-electric hover:bg-electric/10 transition-all group overflow-hidden"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.span
                className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-electric rounded-tl-2xl"
                animate={{
                  opacity: [0.3, 1, 0.3],
                  scale: [0.8, 1, 0.8],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.span
                className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-electric rounded-tr-2xl"
                animate={{
                  opacity: [0.3, 1, 0.3],
                  scale: [0.8, 1, 0.8],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
              />
              <motion.span
                className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-electric rounded-bl-2xl"
                animate={{
                  opacity: [0.3, 1, 0.3],
                  scale: [0.8, 1, 0.8],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
              />
              <motion.span
                className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-electric rounded-br-2xl"
                animate={{
                  opacity: [0.3, 1, 0.3],
                  scale: [0.8, 1, 0.8],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1.5,
                }}
              />

              <div className="p-2 rounded-xl bg-slate/30 group-hover:bg-electric/20 transition-colors relative z-10">
                <Github className="w-5 h-5" />
              </div>
              <div className="text-left relative z-10">
                <span className="block font-heading text-sm font-semibold">
                  View All Projects
                </span>
                <span className="block text-xs text-steel group-hover:text-silver transition-colors">
                  @sharpeye08
                </span>
              </div>
              <ArrowUpRight className="w-5 h-5 text-electric group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform relative z-10" />
            </motion.a>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
});

Projects.displayName = "Projects";

export default Projects;
