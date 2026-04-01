import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Star, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { fadeInUp } from '../../animations/variants';

const doctors = [
  { id: 1, name: "Dr. Emily Chen", specialty: "General Practitioner", rating: 4.9, reviews: 127, image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face", available: true },
  { id: 2, name: "Dr. Michael Roberts", specialty: "Cardiologist", rating: 4.8, reviews: 89, image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face", available: true },
  { id: 3, name: "Dr. Sarah Williams", specialty: "Dermatologist", rating: 4.9, reviews: 156, image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop&crop=face", available: true },
  { id: 4, name: "Dr. James Thompson", specialty: "Mental Health", rating: 4.7, reviews: 203, image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&h=400&fit=crop&crop=face", available: true },
  { id: 5, name: "Dr. Lisa Park", specialty: "Pediatrics", rating: 4.9, reviews: 178, image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&h=400&fit=crop&crop=face", available: true },
  { id: 6, name: "Dr. Robert Martinez", specialty: "Women's Health", rating: 4.8, reviews: 142, image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop&crop=face", available: false },
  { id: 7, name: "Dr. Amanda Wilson", specialty: "General Practitioner", rating: 4.6, reviews: 98, image: "https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?w=400&h=400&fit=crop&crop=face", available: true },
  { id: 8, name: "Dr. David Lee", specialty: "Cardiologist", rating: 4.9, reviews: 211, image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop&crop=face", available: true }
];

const specialties = ["All Specialties", "General Practitioner", "Cardiologist", "Dermatologist", "Mental Health", "Pediatrics", "Women's Health"];

export default function DoctorsContent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("All Specialties");

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = selectedSpecialty === "All Specialties" || doctor.specialty === selectedSpecialty;
    return matchesSearch && matchesSpecialty;
  });

  return (
    <div className="py-20 md:py-28">
      {/* Header */}
      <motion.div
        className="text-center mb-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <span className="inline-block font-body text-sm font-medium text-warm-coral uppercase tracking-wider mb-4">
          Our Doctors
        </span>
        <h1 className="font-display text-4xl md:text-5xl font-bold text-charcoal">
          Meet Our Specialists
        </h1>
        <p className="font-body text-lg text-slate-text max-w-2xl mx-auto mt-4">
          Find the right doctor for your needs. All our physicians are board-certified.
        </p>
      </motion.div>

      {/* Search and Filter */}
      <motion.div
        className="max-w-4xl mx-auto px-6 mb-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-text" />
            <input
              type="text"
              placeholder="Search doctors by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl font-body text-charcoal focus:outline-none focus:border-deep-teal"
            />
          </div>
          <select
            value={selectedSpecialty}
            onChange={(e) => setSelectedSpecialty(e.target.value)}
            className="px-4 py-3 border border-gray-200 rounded-xl font-body text-charcoal focus:outline-none focus:border-deep-teal"
          >
            {specialties.map(specialty => (
              <option key={specialty} value={specialty}>{specialty}</option>
            ))}
          </select>
        </div>
      </motion.div>

      {/* Doctors Grid */}
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {filteredDoctors.map((doctor, index) => (
            <motion.div
              key={doctor.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className="bg-soft-sage rounded-2xl overflow-hidden hover:shadow-xl transition-all"
            >
              <div className="aspect-square overflow-hidden">
                <img src={doctor.image} alt={doctor.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-6">
                <h3 className="font-display text-lg font-semibold text-charcoal">{doctor.name}</h3>
                <p className="font-body text-slate-text text-sm mt-1">{doctor.specialty}</p>
                <div className="flex items-center gap-2 mt-3">
                  <Star className="w-4 h-4 text-warm-coral fill-warm-coral" />
                  <span className="font-body text-sm font-medium text-charcoal">{doctor.rating}</span>
                  <span className="font-body text-sm text-slate-text">({doctor.reviews})</span>
                </div>
                {doctor.available ? (
                  <Link
                    to="/contact"
                    className="mt-4 w-full inline-flex items-center justify-center gap-2 px-4 py-2 bg-deep-teal text-white font-body text-sm font-medium rounded-lg hover:bg-opacity-90 transition-all"
                  >
                    <Calendar className="w-4 h-4" /> Book Now
                  </Link>
                ) : (
                  <button className="mt-4 w-full px-4 py-2 bg-gray-200 text-gray-500 font-body text-sm font-medium rounded-lg cursor-not-allowed">
                    Unavailable
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
