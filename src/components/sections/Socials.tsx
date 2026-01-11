/**
 * Socials - Contact section with social media cards
 */

import { useRef, memo } from "react";
import { motion, useInView } from "framer-motion";
import {
  Linkedin,
  Twitter,
  Github,
  Mail,
  ArrowUpRight,
  MessageCircle,
  Send,
} from "lucide-react";

const socials = [
  {
    id: "linkedin",
    name: "LinkedIn",
    description: "Connect with me professionally",
    url: "https://www.linkedin.com/in/devbansal08/",
    icon: Linkedin,
    color: "hover:border-[#0077B5] hover:bg-[#0077B5]/10",
    iconColor: "group-hover:text-[#0077B5]",
  },
  {
    id: "twitter",
    name: "Twitter",
    description: "Follow my thoughts and updates",
    url: "https://x.com/sharpeye_wnl",
    icon: Twitter,
    color: "hover:border-[#1DA1F2] hover:bg-[#1DA1F2]/10",
    iconColor: "group-hover:text-[#1DA1F2]",
  },
  {
    id: "github",
    name: "GitHub",
    description: "Check out my code and projects",
    url: "https://github.com/sharpeye08",
    icon: Github,
    color: "hover:border-pearl hover:bg-pearl/10",
    iconColor: "group-hover:text-pearl",
  },
];

const SocialCard = memo(
  ({ social, index }: { social: (typeof socials)[0]; index: number }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    const Icon = social.icon;

    return (
      <motion.a
        ref={ref}
        href={social.url}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{
          duration: 0.8,
          delay: index * 0.1,
          ease: [0.16, 1, 0.3, 1],
        }}
        className={`group block card p-5 ${social.color} transition-all duration-300`}
      >
        <div className="flex items-start justify-between mb-3">
          <div
            className={`p-2.5 rounded-xl bg-slate/30 transition-colors ${social.iconColor}`}
          >
            <Icon className="w-5 h-5 text-silver transition-colors" />
          </div>
          <ArrowUpRight className="w-4 h-4 text-steel group-hover:text-pearl group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
        </div>

        <h3 className="font-heading text-base font-semibold text-pearl mb-1">
          {social.name}
        </h3>
        <p className="text-sm text-steel">{social.description}</p>
      </motion.a>
    );
  }
);

SocialCard.displayName = "SocialCard";

const Socials = memo(() => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="socials"
      className="pb-8 md:pb-12 lg:pb-16 bg-void relative overflow-hidden"
    >
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-electric/5 rounded-full blur-[150px]" />

      <div ref={ref} className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <span className="section-label justify-center mb-4">
            <MessageCircle className="w-4 h-4" />
            Contact
          </span>
          <h2 className="font-display text-display-md text-pearl mb-2">
            Let's <span className="gradient-text">Connect</span>
          </h2>
          <p className="mt-3 text-silver max-w-lg mx-auto">
            I'm always open to discussing new opportunities, interesting
            projects, or just having a chat about ML and AI.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex justify-center mb-8"
        >
          <motion.a
            href="mailto:devbansal08@gmail.com"
            className="btn-primary text-base px-8 py-4 group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Mail className="w-5 h-5 mr-2" />
            <span>Get In Touch</span>
            <Send className="w-4 h-4 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </motion.a>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5 max-w-4xl mx-auto">
          {socials.map((social, index) => (
            <SocialCard key={social.id} social={social} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
});

Socials.displayName = "Socials";

export default Socials;
