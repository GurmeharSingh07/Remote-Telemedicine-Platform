import { motion } from 'framer-motion';
import { pageTransition } from '../animations/variants';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ContactContent from '../components/pages/ContactContent';

export default function Contact() {
  return (
    <motion.div initial="initial" animate="animate" exit="exit" variants={pageTransition}>
      <Navbar />
      <div className="pt-24">
        <ContactContent />
      </div>
      <Footer />
    </motion.div>
  );
}
