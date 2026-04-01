import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function Button({
  children,
  variant = 'primary',
  arrow = false,
  className = '',
  ...props
}) {
  const baseStyles = "inline-flex items-center justify-center gap-2 px-6 py-3 font-body font-medium text-base rounded-lg transition-all";

  const variants = {
    primary: "bg-deep-teal text-white hover:bg-opacity-90",
    secondary: "bg-soft-sage text-deep-teal hover:bg-opacity-80",
    outline: "border-2 border-deep-teal text-deep-teal hover:bg-deep-teal hover:text-white"
  };

  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
      {arrow && <ArrowRight className="w-5 h-5" />}
    </motion.button>
  );
}