import { Link } from 'react-router-dom';
import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-charcoal text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-deep-teal rounded-xl flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <span className="font-display text-2xl font-semibold">Healnet</span>
            </Link>
            <p className="font-body text-slate-300 text-sm leading-relaxed mb-6">
              Making healthcare accessible, affordable, and convenient for everyone.
              Your health is our priority.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-deep-teal transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-deep-teal transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-deep-teal transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-deep-teal transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {['Home', 'Services', 'Doctors', 'About', 'Contact'].map((link) => (
                <li key={link}>
                  <Link
                    to={`/${link.toLowerCase()}`}
                    className="font-body text-slate-300 text-sm hover:text-deep-teal transition-colors"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-3">
              {['Primary Care', 'Dermatology', 'Mental Health', 'Pediatrics', 'Cardiology', 'Women's Health'].map((service) => (
                <li key={service}>
                  <Link
                    to="/services"
                    className="font-body text-slate-300 text-sm hover:text-deep-teal transition-colors"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-deep-teal flex-shrink-0 mt-0.5" />
                <span className="font-body text-slate-300 text-sm">
                  123 Healthcare Avenue<br />
                  San Francisco, CA 94102
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-deep-teal flex-shrink-0" />
                <span className="font-body text-slate-300 text-sm">1-800-HEALNET</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-deep-teal flex-shrink-0" />
                <span className="font-body text-slate-300 text-sm">support@healnet.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-body text-slate-400 text-sm">
            &copy; {currentYear} Healnet. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="font-body text-slate-400 text-sm hover:text-deep-teal transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="font-body text-slate-400 text-sm hover:text-deep-teal transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}