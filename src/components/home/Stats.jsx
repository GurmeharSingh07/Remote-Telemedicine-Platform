import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { Users, Stethoscope, Heart, ThumbsUp } from 'lucide-react';

const stats = [
  { icon: Users, value: 10000, suffix: "+", label: "Patients Served" },
  { icon: Stethoscope, value: 200, suffix: "+", label: "Licensed Doctors" },
  { icon: Heart, value: 50000, suffix: "+", label: "Consultations" },
  { icon: ThumbsUp, value: 98, suffix: "%", label: "Satisfaction Rate" }
];

function Counter({ value, suffix, inView }) {
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: 2000 });

  useEffect(() => {
    if (inView) {
      motionValue.set(value);
    }
  }, [inView, value, motionValue]);

  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.5 }}
    >
      {springValue.setUp ? '' : ''}
      {Math.round(value).toLocaleString()}{suffix}
    </motion.span>
  );
}

export default function Stats() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-20 md:py-28 bg-deep-teal">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-white/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-8 h-8 text-white" />
              </div>
              <div className="font-display text-4xl md:text-5xl font-bold text-white mb-2">
                <Counter value={stat.value} suffix={stat.suffix} inView={inView} />
              </div>
              <p className="font-body text-white/80">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}