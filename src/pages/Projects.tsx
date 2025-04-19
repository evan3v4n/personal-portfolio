import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import { FolderOpen, Github, Link as LinkIcon } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Project } from '../types/project';

const Projects = () => {
  const projects: Project[] = [
    {
      title: "Project Alpha",
      description: "A full-stack web application built with React and Node.js",
      longDescription: "Project Alpha is a comprehensive web application that demonstrates modern full-stack development practices. It features real-time data synchronization, user authentication, and responsive design principles.",
      tech: ["React", "Node.js", "MongoDB", "WebSocket", "TypeScript"],
      status: "In Progress",
      githubUrl: "https://github.com/username/project-alpha",
      liveUrl: "https://project-alpha.com",
      startDate: "2024-01",
      imageUrl: "/placeholder.svg"
    },
    {
      title: "Photography Portfolio",
      description: "Personal portfolio website showcasing photography work",
      longDescription: "A modern photography portfolio built with performance and user experience in mind. Features include lazy loading images, advanced filtering, and responsive image galleries.",
      tech: ["React", "Tailwind CSS", "TypeScript", "Next.js"],
      status: "Live",
      liveUrl: "https://photography-portfolio.com",
      startDate: "2023-11",
      imageUrl: "/placeholder.svg"
    },
    {
      title: "ML Research Project",
      description: "Machine learning research on image classification",
      longDescription: "An experimental machine learning project focused on improving image classification accuracy using novel neural network architectures. Achieved 95% accuracy on test datasets.",
      tech: ["Python", "TensorFlow", "Jupyter", "scikit-learn"],
      status: "Completed",
      githubUrl: "https://github.com/username/ml-research",
      startDate: "2023-09",
      imageUrl: "/placeholder.svg"
    }
  ];

  return (
    <div className="min-h-screen bg-[#1A1F2C]">
      <Navigation />
      
      <main className="max-w-6xl mx-auto px-4 pt-24 pb-16">
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

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => {
            const projectUrl = `/project/${project.title.toLowerCase().replace(/\s+/g, '-')}`;
            
            return (
              <Link key={index} to={projectUrl}>
                <Card className="bg-gray-800/50 border-gray-700 h-full hover:bg-gray-800/70 transition-colors">
                  <div className="aspect-video">
                    <img 
                      src={project.imageUrl} 
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader className="p-6">
                    <div className="flex items-start justify-between mb-2">
                      <CardTitle className="text-green-400">{project.title}</CardTitle>
                      <span className={`text-xs px-2 py-1 rounded ${
                        project.status === 'Live' ? 'bg-green-500/20 text-green-400' :
                        project.status === 'In Progress' ? 'bg-blue-500/20 text-blue-400' :
                        'bg-gray-500/20 text-gray-400'
                      }`}>
                        {project.status}
                      </span>
                    </div>
                    <CardDescription className="text-gray-300">
                      {project.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 pt-0">
                    <div className="flex flex-wrap gap-2">
                      {project.tech.slice(0, 3).map((tech, i) => (
                        <span key={i} className="text-xs bg-gray-700/50 px-2 py-1 rounded">
                          {tech}
                        </span>
                      ))}
                      {project.tech.length > 3 && (
                        <span className="text-xs bg-gray-700/50 px-2 py-1 rounded">
                          +{project.tech.length - 3}
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </section>
      </main>
    </div>
  );
};

export default Projects;
