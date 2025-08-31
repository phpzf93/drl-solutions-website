import { motion } from 'framer-motion';
import { ReactNode } from 'react';

// Page transition variants
export const pageVariants = {
  initial: {
    opacity: 0,
    y: 20
  },
  in: {
    opacity: 1,
    y: 0
  },
  out: {
    opacity: 0,
    y: -20
  }
};

export const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.5
};

// Stagger container for multiple items
export const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Fade in up animation
export const fadeInUp = {
  initial: {
    opacity: 0,
    y: 60
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  }
};

// Scale in animation
export const scaleIn = {
  initial: {
    opacity: 0,
    scale: 0.8
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  }
};

// Slide in from left
export const slideInLeft = {
  initial: {
    opacity: 0,
    x: -60
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  }
};

// Slide in from right
export const slideInRight = {
  initial: {
    opacity: 0,
    x: 60
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  }
};

// Button hover animation
export const buttonHover = {
  scale: 1.05,
  transition: {
    duration: 0.2,
    ease: 'easeInOut'
  }
};

export const buttonTap = {
  scale: 0.95
};

// Card hover animation
export const cardHover = {
  y: -10,
  scale: 1.02,
  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
  transition: {
    duration: 0.3,
    ease: 'easeOut'
  }
};

// Loading spinner animation
export const spinnerVariants = {
  animate: {
    rotate: 360,
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: 'linear'
    }
  }
};

// Pulse animation
export const pulseVariants = {
  animate: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  }
};

// Success/Error message animation
export const messageVariants = {
  initial: {
    opacity: 0,
    y: -20,
    scale: 0.9
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.9,
    transition: {
      duration: 0.3
    }
  }
};

// Cart item animation
export const cartItemVariants = {
  initial: {
    opacity: 0,
    x: -20,
    scale: 0.9
  },
  animate: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: 'easeOut'
    }
  },
  exit: {
    opacity: 0,
    x: 20,
    scale: 0.9,
    transition: {
      duration: 0.2
    }
  }
};

// Floating animation
export const floatingVariants = {
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  }
};

// Animated Page Wrapper
interface AnimatedPageProps {
  children: ReactNode;
  className?: string;
}

export const AnimatedPage = ({ children, className = '' }: AnimatedPageProps) => (
  <motion.div
    initial="initial"
    animate="in"
    exit="out"
    variants={pageVariants}
    transition={pageTransition}
    className={className}
  >
    {children}
  </motion.div>
);

// Animated Button Component
interface AnimatedButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export const AnimatedButton = ({ 
  children, 
  onClick, 
  className = '', 
  disabled = false,
  type = 'button'
}: AnimatedButtonProps) => (
  <motion.button
    type={type}
    onClick={onClick}
    disabled={disabled}
    className={className}
    whileHover={disabled ? {} : buttonHover}
    whileTap={disabled ? {} : buttonTap}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    {children}
  </motion.button>
);

// Animated Card Component
interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export const AnimatedCard = ({ children, className = '', delay = 0 }: AnimatedCardProps) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay, ease: [0.6, -0.05, 0.01, 0.99] }}
    whileHover={cardHover}
  >
    {children}
  </motion.div>
);

// Animated Input Component
interface AnimatedInputProps {
  children: ReactNode;
  className?: string;
}

export const AnimatedInput = ({ children, className = '' }: AnimatedInputProps) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.4 }}
    whileFocus={{ scale: 1.02 }}
  >
    {children}
  </motion.div>
);

// Loading Spinner Component
export const LoadingSpinner = ({ size = 24, className = '' }: { size?: number; className?: string }) => (
  <motion.div
    className={`inline-block border-2 border-current border-r-transparent rounded-full ${className}`}
    style={{ width: size, height: size }}
    variants={spinnerVariants}
    animate="animate"
  />
);

// Animated Counter Component
interface AnimatedCounterProps {
  value: number;
  className?: string;
}

export const AnimatedCounter = ({ value, className = '' }: AnimatedCounterProps) => (
  <motion.span
    key={value}
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 20 }}
    transition={{ duration: 0.3 }}
    className={className}
  >
    {value}
  </motion.span>
);

// Parallax Container
interface ParallaxProps {
  children: ReactNode;
  offset?: number;
  className?: string;
}

export const ParallaxContainer = ({ children, offset = 50, className = '' }: ParallaxProps) => (
  <motion.div
    className={className}
    initial={{ y: offset }}
    whileInView={{ y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.8, ease: 'easeOut' }}
  >
    {children}
  </motion.div>
);