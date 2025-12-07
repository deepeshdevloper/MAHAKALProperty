import { Variants, cubicBezier } from "framer-motion";

export const theme = {
  colors: {
    black: "#0F0F0F",
    saffron: "#FF9933",
    white: "#FFFFFF",
    gold: "#E2B552",
  },
  motion: {
    fast: 0.15,
    normal: 0.3,
    slow: 0.5,
    easing: cubicBezier(0.16, 1, 0.3, 1),
    uiEasing: cubicBezier(0.4, 0, 0.2, 1),
    smoothEasing: cubicBezier(0.25, 0.46, 0.45, 0.94),
    bounceEasing: cubicBezier(0.68, -0.55, 0.265, 1.55),
    stagger: 0.08,
  },
};

// Motion Variants
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6, 
      ease: [0.22, 1, 0.36, 1]
    }
  },
};

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { 
      duration: 0.6, 
      ease: [0.22, 1, 0.36, 1]
    }
  },
};

export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { 
      duration: 0.6, 
      ease: [0.22, 1, 0.36, 1]
    }
  },
};

export const scaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      duration: 0.5, 
      ease: [0.22, 1, 0.36, 1]
    }
  },
};

export const staggerList: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const cardHover: Variants = {
  rest: { scale: 1, y: 0 },
  hover: { 
    scale: 1.02, 
    y: -8,
    boxShadow: "0 20px 30px -10px rgba(0, 0, 0, 0.15)",
    transition: { 
      duration: 0.3, 
      ease: "easeOut" 
    }
  },
};

export const buttonHover: Variants = {
  rest: { scale: 1 },
  hover: { 
    scale: 1.05,
    transition: { 
      type: "spring",
      stiffness: 400,
      damping: 10
    }
  },
  tap: { scale: 0.95 }
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

export const floatAnimation: Variants = {
  initial: { y: 0 },
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

export const shimmer: Variants = {
  initial: { x: "-100%" },
  animate: {
    x: "100%",
    transition: {
      repeat: Infinity,
      duration: 2,
      ease: "linear"
    }
  }
};

export const pulseGlow: Variants = {
  initial: { opacity: 0.5, scale: 1 },
  animate: {
    opacity: [0.5, 1, 0.5],
    scale: [1, 1.05, 1],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

export const slideInFromBottom: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.8, 
      ease: [0.16, 1, 0.3, 1]
    }
  },
};

export const rotateIn: Variants = {
  hidden: { opacity: 0, rotate: -10, scale: 0.9 },
  visible: { 
    opacity: 1, 
    rotate: 0,
    scale: 1,
    transition: { 
      duration: 0.6, 
      ease: [0.16, 1, 0.3, 1]
    }
  },
};

export const blurIn: Variants = {
  hidden: { opacity: 0, filter: "blur(10px)" },
  visible: { 
    opacity: 1, 
    filter: "blur(0px)",
    transition: { 
      duration: 0.6, 
      ease: "easeOut"
    }
  },
};

export const magneticHover = {
  rest: { scale: 1 },
  hover: { 
    scale: 1.02,
    transition: { 
      type: "spring",
      stiffness: 300,
      damping: 20
    }
  }
};

export const glowPulse: Variants = {
  initial: { 
    boxShadow: "0 0 0 0 rgba(255, 153, 51, 0)" 
  },
  animate: {
    boxShadow: [
      "0 0 0 0 rgba(255, 153, 51, 0)",
      "0 0 30px 10px rgba(255, 153, 51, 0.3)",
      "0 0 0 0 rgba(255, 153, 51, 0)"
    ],
    transition: {
      duration: 2.5,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

export const textReveal: Variants = {
  hidden: { 
    opacity: 0,
    y: 20,
    clipPath: "inset(100% 0% 0% 0%)"
  },
  visible: { 
    opacity: 1,
    y: 0,
    clipPath: "inset(0% 0% 0% 0%)",
    transition: { 
      duration: 0.8, 
      ease: [0.16, 1, 0.3, 1]
    }
  },
};

export const imageReveal: Variants = {
  hidden: { 
    clipPath: "inset(0% 100% 0% 0%)",
    opacity: 0
  },
  visible: { 
    clipPath: "inset(0% 0% 0% 0%)",
    opacity: 1,
    transition: { 
      duration: 1, 
      ease: [0.16, 1, 0.3, 1]
    }
  },
};
