import { motion } from 'framer-motion';
import { Video, FileText, FolderHeart, Headphones, MessageSquare, CreditCard, Shield, Calendar } from 'lucide-react';
import { fadeInUpStagger, staggerContainer } from '../../animations/variants';

const features = [
  {
    icon: Video,
    title: "Video Consultations",
    description: "Face-to-face appointments with doctors through high-quality video calls from anywhere."
  },
  {
    icon: FileText,
    title: "Digital Prescriptions",
    description: "Receive prescriptions electronically, sent directly to your preferred pharmacy."
  },
  {
    icon: FolderHeart,
    title: "Health Records",
    description: "Access your complete medical history, test results, and prescriptions in one place."
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Our medical team is available around the clock for urgent consultations and advice."
  },
  {
    icon: MessageSquare,
    title: "Secure Messaging",
    description: "Communicate privately with your healthcare providers through encrypted messaging."
  },
  {
    icon: CreditCard,
    title: "Insurance Integration",
    description: "Seamlessly process insurance claims and verify coverage for your visits."
  }
];

export default function Features() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.span
            variants={fadeInUpStagger}
            custom={0}
            className="inline-block font-body text-sm font-medium text-warm-coral uppercase tracking-wider mb-4"
          >
            Why Choose Healnet
          </motion.span>
          <motion.h2
            variants={fadeInUpStagger}
            custom={1}
            className="font-display text-4xl md:text-5xl font-bold text-charcoal"
          >
            Healthcare Reimagined
          </motion.h2>
          <motion.p
            variants={fadeInUpStagger}
            custom={2}
            className="font-body text-lg text-slate-text max-w-2xl mx-auto mt-4"
          >
            Experience the future of healthcare with features designed to make your journey to wellness seamless and stress-free.
          </motion.p>
        </motion.div>

        {/* Feature Cards Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={fadeInUpStagger}
              custom={index}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="bg-soft-sage rounded-2xl p-8 hover:shadow-xl transition-shadow"
            >
              <div className="w-14 h-14 bg-deep-teal rounded-xl flex items-center justify-center mb-6">
                <feature.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-display text-xl font-semibold text-charcoal mb-3">
                {feature.title}
              </h3>
              <p className="font-body text-slate-text leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}