
import { Github, Linkedin } from 'lucide-react';
import Navigation from '../components/Navigation';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="max-w-5xl mx-auto px-4 pt-24">
        <section className="mb-16">
          <div className="terminal-text">
            <h1 className="text-4xl md:text-5xl font-bold mb-8">
              Hello, my name is<br />
              <span className="text-green-400">Student</span> and this<br />
              is my playground.
            </h1>
            
            <p className="text-lg mb-6 text-gray-300 max-w-2xl">
              I am a Computer Science student at Toronto Metropolitan University with a
              passion for photography and technology. I believe in the intersection of
              art and code.
            </p>

            <div className="flex space-x-4 mb-12">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" 
                 className="hover:text-green-400 transition-colors">
                <Github className="w-6 h-6" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                 className="hover:text-green-400 transition-colors">
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 terminal-text">
            <span className="text-green-400">&gt;</span> Recent Photography
          </h2>
          <div className="photo-grid">
            {/* Placeholder for photography grid - we'll add actual images later */}
            {[1, 2, 3].map((i) => (
              <div key={i} className="aspect-square bg-gray-800 rounded-lg hover:opacity-75 transition-opacity">
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
