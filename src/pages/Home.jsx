import { motion } from 'framer-motion';
import { pageTransition } from '../animations/variants';
import Hero from '../components/home/Hero';
import Features from '../components/home/Features';
import HowItWorks from '../components/home/HowItWorks';
import Stats from '../components/home/Stats';
import Specialists from '../components/home/Specialists';
import Testimonials from '../components/home/Testimonials';
import CTASection from '../components/home/CTASection';
import Chatbot from '../components/shared/Chatbot';

export default function Home() {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageTransition}
    >
      <Hero />
      <Features />
      <HowItWorks />
      <Stats />
      <Specialists />
      <Testimonials />
      <CTASection />
      <Chatbot />
    </motion.div>
  );
}
