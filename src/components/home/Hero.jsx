import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Video, Shield, Clock, ArrowRight } from 'lucide-react';
import { wordAnimation, breathe, floating } from '../../animations/variants';

const headline = "Healthcare at Your Fingertips";
const words = headline.split(" ");

const trustBadges = [
  { icon: Shield, text: "Licensed Doctors" },
  { icon: Clock, text: "24/7 Support" },
  { icon: Video, text: "10,000+ Patients" },
];

export default function Hero() {
  return (
    <section className="min-h-screen relative overflow-hidden bg-gradient-to-br from-soft-sage via-white to-soft-sage pt-24">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-deep-teal/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-warm-coral/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-12 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            className="relative z-10"
            initial="hidden"
            animate="visible"
          >
            {/* Trust Badges */}
            <motion.div
              className="flex flex-wrap gap-4 mb-8"
              variants={fadeInUp}
            >
              {trustBadges.map((badge, index) => (
                <motion.div
                  key={badge.text}
                  variants={fadeInUpStagger}
                  custom={index}
                  className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm"
                >
                  <badge.icon className="w-4 h-4 text-deep-teal" />
                  <span className="font-body text-sm text-charcoal">{badge.text}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Headline */}
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-charcoal leading-tight mb-6">
              {words.map((word, index) => (
                <motion.span
                  key={index}
                  className="inline-block mr-3"
                  variants={wordAnimation(index)}
                >
                  {word}
                </motion.span>
              ))}
            </h1>

            {/* Subheadline */}
            <motion.p
              className="font-body text-lg md:text-xl text-slate-text max-w-lg mb-8"
              variants={fadeInUp}
            >
              Connect with board-certified doctors from the comfort of your home.
              Quality healthcare is just a click away — anytime, anywhere.
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex flex-wrap gap-4"
              variants={fadeInUp}
            >
              <motion.div variants={breathe} animate="animate">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-deep-teal text-white font-body font-semibold rounded-xl hover:bg-opacity-90 transition-all shadow-lg hover:shadow-xl"
                >
                  Book Appointment
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>
              <Link
                to="/services"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-deep-teal font-body font-semibold rounded-xl border-2 border-deep-teal/20 hover:border-deep-teal transition-all"
              >
                Explore Services
              </Link>
            </motion.div>
          </motion.div>

          {/* Right - App Mockup */}
          <motion.div
            className="relative"
            variants={floating}
            animate="animate"
          >
            <div className="relative">
              {/* Phone Frame */}
              <div className="mx-auto w-64 md:w-72 lg:w-80 aspect-[3/5] bg-charcoal rounded-[3rem] p-3 shadow-2xl">
                <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden relative">
                  {/* App Header */}
                  <div className="bg-deep-teal p-6 pt-12">
                    <p className="text-white/80 text-sm font-body">Welcome back</p>
                    <p className="text-white font-display text-xl font-semibold">Sarah Mitchell</p>
                  </div>

                  {/* App Content */}
                  <div className="p-4 space-y-4">
                    <div className="bg-soft-sage rounded-2xl p-4">
                      <p className="text-deep-teal font-body font-medium text-sm">Upcoming Appointment</p>
                      <p className="text-charcoal font-body text-xs mt-1">Dr. Emily Chen • Today, 2:00 PM</p>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-soft-sage/50 rounded-xl p-3 text-center">
                        <div className="w-8 h-8 bg-deep-teal/20 rounded-full mx-auto mb-2 flex items-center justify-center">
                          <Video className="w-4 h-4 text-deep-teal" />
                        </div>
                        <p className="text-charcoal font-body text-xs">Video Call</p>
                      </div>
                      <div className="bg-soft-sage/50 rounded-xl p-3 text-center">
                        <div className="w-8 h-8 bg-warm-coral/20 rounded-full mx-auto mb-2 flex items-center justify-center">
                          <Shield className="w-4 h-4 text-warm-coral" />
                        </div>
                        <p className="text-charcoal font-body text-xs">Prescription</p>
                      </div>
                    </div>

                    <div className="bg-deep-teal rounded-xl p-4">
                      <p className="text-white font-body font-medium text-sm">Your Health Score</p>
                      <div className="mt-2 h-2 bg-white/20 rounded-full overflow-hidden">
                        <div className="h-full bg-warm-coral w-4/5 rounded-full" />
                      </div>
                      <p className="text-white/80 text-xs mt-1">Excellent - 82/100</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <motion.div
                className="absolute -top-8 -right-8 w-24 h-24 bg-warm-coral/20 rounded-full blur-2xl"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <motion.div
                className="absolute -bottom-8 -left-8 w-32 h-32 bg-deep-teal/20 rounded-full blur-2xl"
                animate={{ scale: [1.2, 1, 1.2] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}