import { motion } from 'framer-motion';
import { fadeInUp } from '../../animations/variants';

export default function Section({
  children,
  className = '',
  id = '',
  variants = fadeInUp,
  viewport = { once: true }
}) {
  return (
    <motion.section
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={variants}
      className={`py-20 md:py-28 ${className}`}
    >
      <div className="max-w-7xl mx-auto px-6">
        {children}
      </div>
    </motion.section>
  );
}