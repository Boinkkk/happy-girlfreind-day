import { useState, useEffect } from 'react';
import { LoadingScreen } from './components/LoadingScreen';
import { Hero } from './components/Hero';
import { Countdown } from './components/Countdown';
import { LoveNote } from './components/LoveNote';
import { Gallery } from './components/Gallery';
import { Reasons } from './components/Reasons';
import { InteractiveHeart } from './components/InteractiveHeart';
import { Footer } from './components/Footer';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Prevent scrolling while loading
    if (loading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [loading]);

  return (
    <div className="w-full min-h-screen bg-pastel-pink text-gray-800 font-inter">
      {loading ? (
        <LoadingScreen onComplete={() => setLoading(false)} />
      ) : (
        <main className="flex flex-col relative w-full overflow-hidden">
          <Hero />
          <Countdown />
          <LoveNote />
          <Gallery />
          <Reasons />
          <InteractiveHeart />
          <Footer />
        </main>
      )}
    </div>
  );
}

export default App;
