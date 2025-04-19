
import Navigation from '../components/Navigation';
import { Camera } from 'lucide-react';

const Photography = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="max-w-5xl mx-auto px-4 pt-24">
        <section className="mb-16">
          <div className="terminal-text">
            <h1 className="text-4xl font-bold mb-8 flex items-center gap-4">
              <Camera className="w-8 h-8" />
              <span className="text-green-400">&gt; Photography</span>
            </h1>
            
            <p className="text-lg mb-12 text-gray-300 max-w-2xl">
              Selected works from my photography portfolio. Each image represents 
              a moment captured through my lens, where technology meets art.
            </p>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div 
              key={i}
              className="group relative aspect-square bg-gray-800 rounded-lg overflow-hidden hover:opacity-75 transition-all cursor-pointer"
            >
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <p className="text-sm text-white font-mono">
                  photo_{i}.jpg
                </p>
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
};

export default Photography;
