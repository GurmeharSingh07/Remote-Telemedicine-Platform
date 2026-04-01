import { motion } from 'framer-motion';
import { Heart, Shield, Users } from 'lucide-react';
import { fadeInUpStagger, staggerContainer } from '../../animations/variants';

const values = [
  { icon: Heart, title: "Patient-Centered Care", description: "Every decision we make is guided by what's best for our patients." },
  { icon: Shield, title: "Trust & Security", description: "We maintain the highest standards of data protection and medical ethics." },
  { icon: Users, title: "Community First", description: "Building a healthier community is at the core of everything we do." }
];

const team = [
  { name: "Dr. Rachel Green", role: "CEO & Founder", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face" },
  { name: "Dr. Marcus Johnson", role: "Chief Medical Officer", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face" },
  { name: "Sarah Chen", role: "VP of Operations", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face" },
  { name: "Michael Brooks", role: "CTO", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face" }
];

export default function AboutContent() {
  return (
    <div className="py-20 md:py-28">
      {/* Mission Section */}
      <section className="mb-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.span variants={fadeInUpStagger} custom={0} className="inline-block font-body text-sm font-medium text-warm-coral uppercase tracking-wider mb-4">
                Our Mission
              </motion.span>
              <motion.h2 variants={fadeInUpStagger} custom={1} className="font-display text-4xl md:text-5xl font-bold text-charcoal mb-6">
                Making Healthcare Accessible to Everyone
              </motion.h2>
              <motion.p variants={fadeInUpStagger} custom={2} className="font-body text-lg text-slate-text mb-6">
                Founded in 2020, Healnet was born from a simple belief: quality healthcare should be accessible to everyone, regardless of location or circumstances.
              </motion.p>
              <motion.p variants={fadeInUpStagger} custom={3} className="font-body text-lg text-slate-text">
                We combine cutting-edge technology with compassionate care to create a healthcare experience that puts patients first. Our platform connects you with board-certified doctors in minutes, not days.
              </motion.p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=500&fit=crop"
                alt="Medical professionals"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-deep-teal text-white p-6 rounded-xl">
                <p className="font-display text-3xl font-bold">2020</p>
                <p className="font-body text-sm">Founded</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-soft-sage">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.span variants={fadeInUpStagger} custom={0} className="inline-block font-body text-sm font-medium text-warm-coral uppercase tracking-wider mb-4">
              Our Values
            </motion.span>
            <motion.h2 variants={fadeInUpStagger} custom={1} className="font-display text-4xl md:text-5xl font-bold text-charcoal">
              What Drives Us
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUpStagger}
                custom={index}
                className="bg-white rounded-2xl p-8 text-center hover:shadow-xl transition-shadow"
              >
                <div className="w-16 h-16 bg-deep-teal rounded-xl flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-display text-xl font-semibold text-charcoal mb-3">{value.title}</h3>
                <p className="font-body text-slate-text">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.span variants={fadeInUpStagger} custom={0} className="inline-block font-body text-sm font-medium text-warm-coral uppercase tracking-wider mb-4">
              Our Team
            </motion.span>
            <motion.h2 variants={fadeInUpStagger} custom={1} className="font-display text-4xl md:text-5xl font-bold text-charcoal">
              Leadership
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUpStagger}
                custom={index}
                className="text-center"
              >
                <div className="aspect-square rounded-2xl overflow-hidden mb-4">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="font-display text-lg font-semibold text-charcoal">{member.name}</h3>
                <p className="font-body text-slate-text text-sm">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
