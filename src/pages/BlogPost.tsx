
import { useParams, Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import { MessageSquare, ArrowRight } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";

const BlogPost = () => {
  const { id } = useParams();
  
  const blogPosts = [
    {
      id: 'getting-started-with-react',
      title: "Getting Started with React Development",
      description: "Learn the fundamentals of React and start building modern web applications.",
      content: `React has revolutionized how we build web applications. In this comprehensive guide, we'll explore the core concepts of React development and how to get started with your first React application.

      We'll cover:
      - Component-based architecture
      - State management
      - Props and data flow
      - Hooks and their use cases
      - Best practices for React development`,
      date: "2025-04-15",
      readTime: "5 min read",
      imageUrl: "/placeholder.svg"
    },
    {
      id: 'typescript-best-practices',
      title: "TypeScript Best Practices in 2025",
      description: "Discover the latest TypeScript patterns and practices for better code quality.",
      content: `TypeScript continues to evolve, bringing new features and patterns that help developers write more maintainable code. This article explores the latest best practices and patterns in TypeScript development.

      Key topics:
      - Advanced type systems
      - Utility types
      - Pattern matching
      - Error handling
      - Performance optimization`,
      date: "2025-04-10",
      readTime: "8 min read",
      imageUrl: "/placeholder.svg"
    },
    {
      id: 'tailwind-css-tricks',
      title: "Advanced Tailwind CSS Tricks",
      description: "Level up your styling game with these advanced Tailwind CSS techniques.",
      content: `Tailwind CSS has changed how we approach web styling. In this deep dive, we'll explore advanced techniques and tricks to make the most out of Tailwind CSS.

      We'll explore:
      - Custom configurations
      - Dynamic classes
      - Responsive design
      - Dark mode
      - Performance optimization`,
      date: "2025-04-05",
      readTime: "6 min read",
      imageUrl: "/placeholder.svg"
    }
  ];

  const post = blogPosts.find(p => p.id === id);

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="min-h-screen bg-[#1A1F2C]">
      <Navigation />
      
      <main className="max-w-4xl mx-auto px-4 pt-24 pb-16">
        <Link to="/blog" className="inline-flex items-center text-gray-400 hover:text-white mb-8">
          <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
          Back to Blog
        </Link>

        <Card className="bg-gray-800/50 border-gray-700 overflow-hidden">
          <CardContent className="p-6">
            <img 
              src={post.imageUrl} 
              alt={post.title}
              className="w-full rounded-lg object-cover aspect-video mb-8"
            />
            
            <div className="flex justify-between items-center text-sm text-gray-400 mb-6">
              <span>{new Date(post.date).toLocaleDateString()}</span>
              <span>{post.readTime}</span>
            </div>

            <h1 className="text-3xl font-bold text-green-400 mb-4">{post.title}</h1>
            <p className="text-gray-300 mb-6">{post.description}</p>
            
            <div className="prose prose-invert max-w-none">
              {post.content.split('\n').map((paragraph, index) => (
                <p key={index} className="text-gray-300 mb-4">
                  {paragraph.trim()}
                </p>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default BlogPost;
