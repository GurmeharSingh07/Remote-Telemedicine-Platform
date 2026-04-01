import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Suspense, lazy } from 'react';

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'));
const Services = lazy(() => import('./pages/Services'));
const Doctors = lazy(() => import('./pages/Doctors'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));

// Layout components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ScrollProgress from './components/layout/ScrollProgress';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </AnimatePresence>
  );
}

function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-soft-sage">
      <div className="w-16 h-16 border-4 border-deep-teal border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <ScrollProgress />
      <Navbar />
      <Suspense fallback={<Loading />}>
        <AnimatedRoutes />
      </Suspense>
      <Footer />
    </Router>
  );
}