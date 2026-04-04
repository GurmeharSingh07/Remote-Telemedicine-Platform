import { motion } from 'framer-motion';
import { UserPlus, Calendar, Video, CheckCircle } from 'lucide-react';
import { fadeInUp, drawLine } from '../../animations/variants';

const steps = [
  {
    icon: UserPlus,
    title: "Create Your Account",
    description: "Sign up in minutes with your basic information. Secure and private from the start."
  },
  {
    icon: Calendar,
    title: "Book an Appointment",
    description: "Choose your preferred doctor and schedule a time that works for you."
  },
  {
    icon: Video,
    title: "Video Consultation",
    description: "Connect with your doctor through a secure, high-quality video call."
  },
  {
    icon: CheckCircle,
    title: "Get Your Treatment",
    description: "Receive prescriptions, follow-up care, and ongoing support from your doctor."
  }
];

export default function HowItWorks() {
  return (
    <section className="py-20 md:py-28 bg-soft-sage">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <span className="inline-block font-body text-sm font-medium text-warm-coral uppercase tracking-wider mb-4">
            Simple Process
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-charcoal">
            How It Works
          </h2>
          <p className="font-body text-lg text-slate-text max-w-2xl mx-auto mt-4">
            Getting quality healthcare has never been easier. Follow these simple steps to start your journey.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* SVG Connecting Line */}
          <svg
            className="absolute top-1/2 left-0 w-full h-4 -translate-y-1/2 hidden lg:block"
            viewBox="0 0 1200 4"
            preserveAspectRatio="none"
          >
            <motion.path
              d="M0,2 L1200,2"
              stroke="#0D5C63"
              strokeWidth="2"
              fill="none"
              strokeDasharray="1200"
              variants={drawLine}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            />
          </svg>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                custom={index}
                className="relative text-center"
              >
                {/* Step Number Circle */}
                <motion.div
                  className="w-20 h-20 mx-auto mb-6 bg-white rounded-full flex items-center justify-center shadow-lg relative z-10"
                  whileInView={{ scale: [0, 1], opacity: [0, 1] }}
                  transition={{ delay: index * 0.2, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <step.icon className="w-9 h-9 text-deep-teal" />
                </motion.div>

                <motion.div
                  className="w-8 h-8 bg-warm-coral text-white font-body font-bold text-sm rounded-full flex items-center justify-center absolute top-0 right-1/2 lg:right-auto lg:left-1/2 lg:-translate-x-1/2 -translate-y-1/2 lg:top-auto lg:bottom-0 z-20"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: index * 0.2 + 0.3, duration: 0.3 }}
                  viewport={{ once: true }}
                >
                  {index + 1}
                </motion.div>

                <h3 className="font-display text-xl font-semibold text-charcoal mb-3">
                  {step.title}
                </h3>
                <p className="font-body text-slate-text">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          className="text-center mt-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-deep-teal text-white font-body font-semibold rounded-xl hover:bg-opacity-90 transition-all"
          >
            Get Started Today
          </a>
        </motion.div>
      </div>
    </section>
  );
}