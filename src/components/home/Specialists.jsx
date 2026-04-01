import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Star, ArrowRight } from 'lucide-react';
import { fadeInUpStagger, staggerContainer } from '../../animations/variants';

const specialists = [
  {
    name: "Dr. Emily Chen",
    specialty: "General Practitioner",
    rating: 4.9,
    reviews: 127,
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face"
  },
  {
    name: "Dr. Michael Roberts",
    specialty: "Cardiologist",
    rating: 4.8,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face"
  },
  {
    name: "Dr. Sarah Williams",
    specialty: "Dermatologist",
    rating: 4.9,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop&crop=face"
  },
  {
    name: "Dr. James Thompson",
    specialty: "Mental Health",
    rating: 4.7,
    reviews: 203,
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&h=400&fit=crop&crop=face"
  }
];

export default function Specialists() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.span variants={fadeInUpStagger} custom={0} className="inline-block font-body text-sm font-medium text-warm-coral uppercase tracking-wider mb-4">
            Meet Our Team
          </motion.span>
          <motion.h2 variants={fadeInUpStagger} custom={1} className="font-display text-4xl md:text-5xl font-bold text-charcoal">
            Expert Specialists
          </motion.h2>
          <motion.p variants={fadeInUpStagger} custom={2} className="font-body text-lg text-slate-text max-w-2xl mx-auto mt-4">
            Our network of board-certified doctors are ready to provide you with exceptional care.
          </motion.p>
        </motion.div>

        {/* Specialist Cards */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          {specialists.map((specialist, index) => (
            <motion.div
              key={specialist.name}
              variants={fadeInUpStagger}
              custom={index}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="bg-soft-sage rounded-2xl overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={specialist.image}
                  alt={specialist.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="font-display text-lg font-semibold text-charcoal">{specialist.name}</h3>
                <p className="font-body text-slate-text text-sm mt-1">{specialist.specialty}</p>
                <div className="flex items-center gap-2 mt-3">
                  <Star className="w-4 h-4 text-warm-coral fill-warm-coral" />
                  <span className="font-body text-sm font-medium text-charcoal">{specialist.rating}</span>
                  <span className="font-body text-sm text-slate-text">({specialist.reviews} reviews)</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Link */}
        <motion.div
          className="text-center mt-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUpStagger}
          custom={4}
        >
          <Link
            to="/doctors"
            className="inline-flex items-center gap-2 font-body font-medium text-deep-teal hover:text-warm-coral transition-colors"
          >
            View All Doctors <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}