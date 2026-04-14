import { motion } from 'framer-motion';
import { pageTransition } from '../animations/variants';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import AboutContent from '../components/pages/AboutContent';

export default function About() {
  return (
    <motion.div initial="initial" animate="animate" exit="exit" variants={pageTransition}>
      <Navbar />
      <div className="pt-24">
        <AboutContent />
      </div>
      <Footer />
    </motion.div>
  );
}
