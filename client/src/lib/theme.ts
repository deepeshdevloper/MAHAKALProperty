import { Variants, cubicBezier } from "framer-motion";

export const theme = {
  colors: {
    black: "#0F0F0F",
    saffron: "#FF9933",
    white: "#FFFFFF",
    gold: "#E2B552",
  },
  motion: {
    fast: 0.12,
    normal: 0.24,
    slow: 0.42,
    easing: cubicBezier(0.22, 0.9, 0.33, 1),
    uiEasing: cubicBezier(0.4, 0, 0.2, 1),
    stagger: 0.06,
  },
};

// Motion Variants
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: theme.motion.normal, 
      ease: theme.motion.easing 
    }
  },
};

export const staggerList: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: theme.motion.stagger,
      delayChildren: 0.1,
    },
  },
};

export const cardHover: Variants = {
  rest: { scale: 1, y: 0 },
  hover: { 
    scale: 1.03, 
    y: -5,
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.5)",
    transition: { 
      duration: theme.motion.normal, 
      ease: theme.motion.uiEasing 
    }
  },
};

export const pageTransition: Variants = {
  initial: { opacity: 0, y: 16 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: theme.motion.slow, 
      ease: theme.motion.easing 
    }
  },
  exit: { 
    opacity: 0, 
    y: -16,
    transition: { 
      duration: theme.motion.normal 
    }
  },
};

export const mapPin: Variants = {
  initial: { scale: 0, opacity: 0 },
  animate: { 
    scale: 1, 
    opacity: 1,
    transition: { 
      type: "spring",
      damping: 12,
      stiffness: 200
    }
  },
  hover: { scale: 1.2 }
};
