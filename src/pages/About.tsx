
import Navigation from '../components/Navigation';
import { User } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="max-w-5xl mx-auto px-4 pt-24">
        <section className="mb-16">
          <div className="terminal-text">
            <h1 className="text-4xl font-bold mb-8 flex items-center gap-4">
              <User className="w-8 h-8" />
              <span className="text-green-400">&gt; About</span>
            </h1>
          </div>

          <div className="space-y-8 text-gray-300">
            <p className="text-lg">
              Computer Science student at Toronto Metropolitan University with a 
              passion for both technology and visual arts. I believe in the power 
              of combining technical precision with creative expression.
            </p>

            <div>
              <h2 className="text-xl font-bold mb-4 text-green-400">&gt; Technical Skills</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <h3 className="font-bold">Languages</h3>
                  <ul className="list-disc list-inside text-sm space-y-1">
                    <li>JavaScript/TypeScript</li>
                    <li>Python</li>
                    <li>Java</li>
                    <li>C++</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h3 className="font-bold">Web Technologies</h3>
                  <ul className="list-disc list-inside text-sm space-y-1">
                    <li>React</li>
                    <li>Node.js</li>
                    <li>Tailwind CSS</li>
                    <li>GraphQL</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h3 className="font-bold">Tools</h3>
                  <ul className="list-disc list-inside text-sm space-y-1">
                    <li>Git</li>
                    <li>Docker</li>
                    <li>VS Code</li>
                    <li>Figma</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-4 text-green-400">&gt; Education</h2>
              <p className="mb-2">Toronto Metropolitan University</p>
              <p className="text-sm">Bachelor of Science in Computer Science</p>
              <p className="text-sm text-gray-400">Expected Graduation: 2025</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default About;
