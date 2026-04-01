import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { fadeInUp } from '../../animations/variants';

export default function CTASection() {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-br from-deep-teal to-charcoal relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-64 h-64 bg-warm-coral rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-soft-sage rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Healthcare Experience?
          </h2>
          <p className="font-body text-xl text-white/80 mb-10">
            Join thousands of patients who have discovered a better way to access quality healthcare.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-warm-coral text-white font-body font-semibold rounded-xl hover:bg-opacity-90 transition-all"
            >
              Book Your First Appointment
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 text-white font-body font-semibold rounded-xl border-2 border-white/20 hover:bg-white/20 transition-all"
            >
              Learn More About Us
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}