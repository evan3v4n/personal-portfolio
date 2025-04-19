import { useParams, Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import { FolderOpen, Github, Link as LinkIcon, ArrowRight } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Project } from '../types/project';

const ProjectDetails = () => {
  const { id } = useParams();
  
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

  const project = projects.find(p => p.title.toLowerCase().replace(/\s+/g, '-') === id);

  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <div className="min-h-screen bg-[#1A1F2C]">
      <Navigation />
      
      <main className="max-w-6xl mx-auto px-4 pt-24 pb-16">
        <Link to="/projects" className="inline-flex items-center text-gray-400 hover:text-white mb-8">
          <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
          Back to Projects
        </Link>

        <Card className="bg-gray-800/50 border-gray-700 overflow-hidden">
          <CardContent className="p-6">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <img 
                  src={project.imageUrl} 
                  alt={project.title}
                  className="w-full rounded-lg object-cover aspect-video"
                />
              </div>
              <div>
                <div className="mb-4">
                  <h1 className="text-3xl font-bold text-green-400 mb-2">{project.title}</h1>
                  <p className="text-gray-300">{project.description}</p>
                </div>

                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-white mb-2">About</h2>
                  <p className="text-gray-300">{project.longDescription}</p>
                </div>

                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-white mb-2">Technologies</h2>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, i) => (
                      <span key={i} className="text-sm bg-gray-700/50 px-3 py-1 rounded-full">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4">
                  {project.githubUrl && (
                    <Button variant="outline" size="sm" className="gap-2" asChild>
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4" />
                        Source Code
                      </a>
                    </Button>
                  )}
                  {project.liveUrl && (
                    <Button variant="outline" size="sm" className="gap-2" asChild>
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        <LinkIcon className="w-4 h-4" />
                        Live Demo
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default ProjectDetails;
