import { motion } from 'framer-motion';
import { pageTransition } from '../animations/variants';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import DoctorsContent from '../components/pages/DoctorsContent';

export default function Doctors() {
  return (
    <motion.div initial="initial" animate="animate" exit="exit" variants={pageTransition}>
      <Navbar />
      <div className="pt-24">
        <DoctorsContent />
      </div>
      <Footer />
    </motion.div>
  );
}
