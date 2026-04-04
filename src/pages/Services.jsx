import { motion } from 'framer-motion';
import { pageTransition } from '../animations/variants';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ServicesContent from '../components/pages/ServicesContent';

export default function Services() {
  return (
    <motion.div initial="initial" animate="animate" exit="exit" variants={pageTransition}>
      <Navbar />
      <div className="pt-24">
        <ServicesContent />
      </div>
      <Footer />
    </motion.div>
  );
}
