import { motion } from 'framer-motion';
import { Heart, Brain, Baby, Activity, Eye, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { fadeInUpStagger, staggerContainer } from '../../animations/variants';

const services = [
  {
    icon: Heart,
    title: "Primary Care",
    description: "Comprehensive healthcare for everyday needs, from preventive care to managing chronic conditions.",
    features: ["Annual checkups", "Health screenings", "Disease prevention"]
  },
  {
    icon: Brain,
    title: "Mental Health",
    description: "Professional support for anxiety, depression, stress management, and behavioral health.",
    features: ["Therapy sessions", "Medication management", "Crisis support"]
  },
  {
    icon: Baby,
    title: "Pediatrics",
    description: "Specialized care for infants, children, and adolescents, ensuring healthy development.",
    features: ["Well-child visits", "Immunizations", "Growth monitoring"]
  },
  {
    icon: Activity,
    title: "Cardiology",
    description: "Expert heart health care, from routine checkups to managing cardiovascular conditions.",
    features: ["Heart screenings", "ECG testing", "Treatment plans"]
  },
  {
    icon: Eye,
    title: "Dermatology",
    description: "Skin health services including acne treatment, skin cancer screening, and cosmetic dermatology.",
    features: ["Skin exams", "Acne treatment", "Anti-aging care"]
  },
  {
    icon: User,
    title: "Women's Health",
    description: "Comprehensive care for women at every stage of life, from reproductive health to menopause.",
    features: ["Annual exams", "Prenatal care", "Menopause management"]
  }
];

export default function ServicesContent() {
  return (
    <div className="py-20 md:py-28">
      {/* Header */}
      <motion.div
        className="text-center mb-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <motion.span variants={fadeInUpStagger} custom={0} className="inline-block font-body text-sm font-medium text-warm-coral uppercase tracking-wider mb-4">
          Our Services
        </motion.span>
        <motion.h1 variants={fadeInUpStagger} custom={1} className="font-display text-4xl md:text-5xl font-bold text-charcoal">
          Comprehensive Healthcare
        </motion.h1>
        <motion.p variants={fadeInUpStagger} custom={2} className="font-body text-lg text-slate-text max-w-2xl mx-auto mt-4">
          Access quality medical care from board-certified doctors across a wide range of specialties.
        </motion.p>
      </motion.div>

      {/* Services Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        {services.map((service, index) => (
          <motion.div
            key={service.title}
            variants={fadeInUpStagger}
            custom={index}
            whileHover={{ y: -8 }}
            className="bg-soft-sage rounded-2xl p-8 hover:shadow-xl transition-all"
          >
            <div className="w-14 h-14 bg-deep-teal rounded-xl flex items-center justify-center mb-6">
              <service.icon className="w-7 h-7 text-white" />
            </div>
            <h3 className="font-display text-xl font-semibold text-charcoal mb-3">
              {service.title}
            </h3>
            <p className="font-body text-slate-text mb-4">{service.description}</p>
            <ul className="space-y-2">
              {service.features.map((feature) => (
                <li key={feature} className="font-body text-sm text-slate-text flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-deep-teal rounded-full" />
                  {feature}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>

      {/* CTA */}
      <motion.div
        className="text-center mt-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUpStagger}
        custom={6}
      >
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 px-8 py-4 bg-deep-teal text-white font-body font-semibold rounded-xl hover:bg-opacity-90 transition-all"
        >
          Book a Consultation
        </Link>
      </motion.div>
    </div>
  );
}
