
import Navigation from '../components/Navigation';
import { FolderOpen } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const Projects = () => {
  const projects = [
    {
      title: "Project Alpha",
      description: "A full-stack web application built with React and Node.js",
      tech: ["React", "Node.js", "MongoDB"],
      status: "In Progress"
    },
    {
      title: "Photography Portfolio",
      description: "Personal portfolio website showcasing photography work",
      tech: ["React", "Tailwind CSS", "Typescript"],
      status: "Live"
    },
    {
      title: "ML Research Project",
      description: "Machine learning research on image classification",
      tech: ["Python", "TensorFlow", "Jupyter"],
      status: "Completed"
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="max-w-5xl mx-auto px-4 pt-24">
        <section className="mb-16">
          <div className="terminal-text">
            <h1 className="text-4xl font-bold mb-8 flex items-center gap-4">
              <FolderOpen className="w-8 h-8" />
              <span className="text-green-400">&gt; Projects</span>
            </h1>
            
            <p className="text-lg mb-12 text-gray-300 max-w-2xl">
              A collection of my recent work and ongoing projects. Each project 
              represents a unique challenge and learning opportunity.
            </p>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <Card key={index} className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-green-400">{project.title}</CardTitle>
                <CardDescription className="text-gray-300">
                  {project.description}
                </CardDescription>
                <div className="flex flex-wrap gap-2 mt-4">
                  {project.tech.map((tech, i) => (
                    <span key={i} className="text-xs bg-gray-700 px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
                <span className="text-xs text-gray-400 mt-4 block">
                  Status: {project.status}
                </span>
              </CardHeader>
            </Card>
          ))}
        </section>
      </main>
    </div>
  );
};

export default Projects;
