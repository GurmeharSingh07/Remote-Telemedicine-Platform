import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, ChevronDown, ChevronUp } from 'lucide-react';
import { fadeInUp } from '../../animations/variants';

const faqs = [
  { question: "How do I book an appointment?", answer: "Simply fill out the form above with your preferred date and time. Our team will confirm your appointment within 24 hours." },
  { question: "What information do I need for my first visit?", answer: "You'll need to provide your basic contact information, describe your symptoms or reason for visit, and have your insurance information ready if applicable." },
  { question: "How quickly can I get an appointment?", answer: "We offer same-day appointments for urgent matters. For regular consultations, you can typically book within 24-48 hours." }
];

export default function ContactContent() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", specialty: "", date: "", message: "" });
  const [openFaq, setOpenFaq] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="py-20 md:py-28">
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
            Contact Us
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-charcoal">
            Book Your Appointment
          </h1>
          <p className="font-body text-lg text-slate-text max-w-2xl mx-auto mt-4">
            Ready to take the first step towards better health? Fill out the form below and we'll be in touch.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <motion.div
            className="lg:col-span-2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            {submitted ? (
              <div className="bg-soft-sage rounded-2xl p-8 text-center">
                <div className="w-16 h-16 bg-deep-teal rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-display text-2xl font-semibold text-charcoal mb-2">Thank You!</h3>
                <p className="font-body text-slate-text">We've received your request and will contact you within 24 hours to confirm your appointment.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-soft-sage rounded-2xl p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block font-body text-sm font-medium text-charcoal mb-2">Full Name *</label>
                    <input required type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 border border-gray-200 rounded-xl font-body focus:outline-none focus:border-deep-teal" placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="block font-body text-sm font-medium text-charcoal mb-2">Email Address *</label>
                    <input required type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-3 border border-gray-200 rounded-xl font-body focus:outline-none focus:border-deep-teal" placeholder="john@example.com" />
                  </div>
                  <div>
                    <label className="block font-body text-sm font-medium text-charcoal mb-2">Phone Number *</label>
                    <input required type="tel" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full px-4 py-3 border border-gray-200 rounded-xl font-body focus:outline-none focus:border-deep-teal" placeholder="(555) 123-4567" />
                  </div>
                  <div>
                    <label className="block font-body text-sm font-medium text-charcoal mb-2">Preferred Specialty</label>
                    <select value={formData.specialty} onChange={(e) => setFormData({...formData, specialty: e.target.value})} className="w-full px-4 py-3 border border-gray-200 rounded-xl font-body focus:outline-none focus:border-deep-teal">
                      <option value="">Select a specialty</option>
                      <option value="General Practitioner">General Practitioner</option>
                      <option value="Cardiologist">Cardiologist</option>
                      <option value="Dermatologist">Dermatologist</option>
                      <option value="Mental Health">Mental Health</option>
                      <option value="Pediatrics">Pediatrics</option>
                      <option value="Women's Health">Women's Health</option>
                    </select>
                  </div>
                </div>
                <div className="mb-6">
                  <label className="block font-body text-sm font-medium text-charcoal mb-2">Preferred Date</label>
                  <input type="date" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} className="w-full px-4 py-3 border border-gray-200 rounded-xl font-body focus:outline-none focus:border-deep-teal" />
                </div>
                <div className="mb-6">
                  <label className="block font-body text-sm font-medium text-charcoal mb-2">Describe Your Symptoms</label>
                  <textarea value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} rows={4} className="w-full px-4 py-3 border border-gray-200 rounded-xl font-body focus:outline-none focus:border-deep-teal resize-none" placeholder="Please describe your symptoms or reason for visit..." />
                </div>
                <button type="submit" className="w-full px-8 py-4 bg-deep-teal text-white font-body font-semibold rounded-xl hover:bg-opacity-90 transition-all">
                  Submit Request
                </button>
              </form>
            )}
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="space-y-6"
          >
            <div className="bg-soft-sage rounded-2xl p-8">
              <h3 className="font-display text-xl font-semibold text-charcoal mb-6">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-deep-teal flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-body text-charcoal">123 Healthcare Avenue</p>
                    <p className="font-body text-sm text-slate-text">San Francisco, CA 94102</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Phone className="w-5 h-5 text-deep-teal flex-shrink-0" />
                  <p className="font-body text-charcoal">1-800-HEALNET</p>
                </div>
                <div className="flex items-center gap-4">
                  <Mail className="w-5 h-5 text-deep-teal flex-shrink-0" />
                  <p className="font-body text-charcoal">support@healnet.com</p>
                </div>
                <div className="flex items-center gap-4">
                  <Clock className="w-5 h-5 text-deep-teal flex-shrink-0" />
                  <p className="font-body text-charcoal">24/7 Support Available</p>
                </div>
              </div>
            </div>

            {/* FAQ */}
            <div className="bg-soft-sage rounded-2xl p-8">
              <h3 className="font-display text-xl font-semibold text-charcoal mb-6">FAQ</h3>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index} className="border-b border-gray-200 pb-4 last:border-0">
                    <button onClick={() => setOpenFaq(openFaq === index ? null : index)} className="w-full flex justify-between items-center font-body font-medium text-charcoal text-left">
                      {faq.question}
                      {openFaq === index ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </button>
                    {openFaq === index && <p className="font-body text-sm text-slate-text mt-2">{faq.answer}</p>}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
