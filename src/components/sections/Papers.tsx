/**
 * Papers - Research papers with modern card design
 * Features: Visual cards, reading status, better hierarchy
 */

import { useRef, memo } from "react";
import { motion, useInView } from "framer-motion";
import {
  BookOpen,
  ExternalLink,
  FileText,
  ArrowUpRight,
  Bookmark,
  Clock,
  CheckCircle2,
} from "lucide-react";

// Research papers data
const papers = [
  {
    id: 1,
    title: "Tidy Data",
    author: "Hadley Wickham",
    year: "2014",
    description:
      "A foundational paper on data organization principles that make analysis easier and more intuitive. Essential reading for anyone working with data.",
    url: "https://vita.had.co.nz/papers/tidy-data.pdf",
    tags: ["Data Science", "R", "Best Practices"],
    readingTime: "15 min",
    status: "completed", // completed, reading, saved
    gradient: "from-electric/20 to-azure/20",
  },
  {
    id: 2,
    title: "Attention Is All You Need",
    author: "Vaswani et al.",
    year: "2017",
    description:
      "The groundbreaking paper introducing the Transformer architecture that revolutionized NLP and became the foundation for models like GPT and BERT.",
    url: "https://arxiv.org/abs/1706.03762",
    tags: ["Deep Learning", "NLP", "Transformers"],
    readingTime: "25 min",
    status: "completed",
    gradient: "from-plasma/20 to-gold/20",
  },
];

// Status badge component
const StatusBadge = memo(({ status }: { status: string }) => {
  const configs = {
    completed: {
      icon: CheckCircle2,
      text: "Read",
      className: "bg-electric/20 text-electric border-electric/30",
    },
    reading: {
      icon: BookOpen,
      text: "Reading",
      className: "bg-plasma/20 text-plasma border-plasma/30",
    },
    saved: {
      icon: Bookmark,
      text: "Saved",
      className: "bg-gold/20 text-gold border-gold/30",
    },
  };

  const config = configs[status as keyof typeof configs] || configs.saved;
  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono border ${config.className}`}
    >
      <Icon className="w-3 h-3" />
      {config.text}
    </span>
  );
});

StatusBadge.displayName = "StatusBadge";

// Paper card component
const PaperCard = memo(
  ({ paper, index }: { paper: (typeof papers)[0]; index: number }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    return (
      <motion.a
        ref={ref}
        href={paper.url}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{
          duration: 0.7,
          delay: index * 0.15,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="group block"
      >
        <article className="h-full rounded-2xl overflow-hidden border border-slate/30 bg-carbon hover:border-electric/40 transition-all duration-500 hover:shadow-glow">
          <div className={`relative p-5 bg-gradient-to-br ${paper.gradient}`}>
            <div className="absolute inset-0 dots-pattern opacity-30" />

            <div className="relative flex items-start justify-between">
              <div className="flex items-center gap-3">
                {/* Icon */}
                <div className="p-2.5 rounded-xl bg-void/40 backdrop-blur-sm border border-white/10">
                  <FileText className="w-5 h-5 text-electric" />
                </div>

                <div>
                  <div className="flex items-center gap-3 mt-2 text-xs text-silver">
                    <span>{paper.year}</span>
                    <span className="w-1 h-1 rounded-full bg-silver/50" />
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {paper.readingTime}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-2 rounded-xl bg-void/30 text-pearl opacity-0 group-hover:opacity-100 transition-opacity">
                <ExternalLink className="w-4 h-4" />
              </div>
            </div>
          </div>

          <div className="p-5">
            <h3 className="font-display text-lg text-pearl mb-1 group-hover:text-electric transition-colors">
              {paper.title}
            </h3>
            <p className="text-sm text-electric mb-3">by {paper.author}</p>

            <p className="text-silver text-sm leading-relaxed mb-4">
              {paper.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
              {paper.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 text-xs font-mono bg-slate/30 text-steel rounded-lg border border-slate/50 hover:border-electric/30 hover:text-electric transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-2 text-sm text-electric font-medium group-hover:gap-3 transition-all">
              <FileText className="w-4 h-4" />
              <span>Read Paper</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </div>
        </article>
      </motion.a>
    );
  }
);

PaperCard.displayName = "PaperCard";

const Papers = memo(() => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="papers"
      className="pb-12 md:pb-16 lg:pb-20 bg-void relative overflow-hidden"
    >
      <div className="absolute inset-0 dots-pattern opacity-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-electric/5 rounded-full blur-[150px]" />

      <div ref={ref} className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 text-xs font-mono text-electric uppercase tracking-widest mb-4">
            <span className="w-8 h-px bg-electric" />
            Research
            <span className="w-8 h-px bg-electric" />
          </span>
          <h2 className="font-display text-display-md text-pearl">
            Papers &<span className="gradient-text block">Readings</span>
          </h2>
          <p className="mt-3 text-silver max-w-lg mx-auto">
            Key papers that have shaped my understanding of machine learning and
            data science.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {papers.map((paper, index) => (
            <PaperCard key={paper.id} paper={paper} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
});

Papers.displayName = "Papers";

export default Papers;