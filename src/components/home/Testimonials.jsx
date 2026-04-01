import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { fadeInUp } from '../../animations/variants';

const testimonials = [
  {
    quote: "Healnet made it so easy to see a doctor when I couldn't leave home. The video call was crystal clear and my prescription was sent to my pharmacy within minutes.",
    name: "Jennifer Adams",
    role: "Primary Care Patient",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face"
  },
  {
    quote: "As a busy professional, I don't have time for clinic visits. Healnet's mental health service has been a game-changer for managing my stress and anxiety.",
    name: "David Kim",
    role: "Mental Health Patient",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
  },
  {
    quote: "The dermatologist I saw through Healnet was incredible. She was thorough, patient, and helped me understand my skin condition better than any previous doctor.",
    name: "Maria Garcia",
    role: "Dermatology Patient",
    rating: 5,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
  }
];

export default function Testimonials() {
  return (
    <section className="py-20 md:py-28 bg-soft-sage overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <span className="inline-block font-body text-sm font-medium text-warm-coral uppercase tracking-wider mb-4">
            Testimonials
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-charcoal">
            What Our Patients Say
          </h2>
        </motion.div>

        {/* Testimonial Cards - Drag Scroll */}
        <motion.div
          className="flex gap-8 pb-8 cursor-grab active:cursor-grabbing"
          drag="x"
          dragConstraints={{ left: -500, right: 0 }}
          dragElastic={0.2}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="flex-shrink-0 w-80 md:w-96 bg-white rounded-2xl p-8 shadow-lg"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-warm-coral fill-warm-coral" />
                ))}
              </div>

              {/* Quote */}
              <p className="font-body text-slate-text leading-relaxed mb-6">
                "{testimonial.quote}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-body font-semibold text-charcoal">{testimonial.name}</p>
                  <p className="font-body text-sm text-slate-text">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}