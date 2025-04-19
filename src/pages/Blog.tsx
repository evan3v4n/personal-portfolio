
import Navigation from '../components/Navigation';
import { MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface BlogPost {
  id: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  imageUrl: string;
}

const Blog = () => {
  const blogPosts: BlogPost[] = [
    {
      id: 'getting-started-with-react',
      title: "Getting Started with React Development",
      description: "Learn the fundamentals of React and start building modern web applications.",
      date: "2025-04-15",
      readTime: "5 min read",
      imageUrl: "/placeholder.svg"
    },
    {
      id: 'typescript-best-practices',
      title: "TypeScript Best Practices in 2025",
      description: "Discover the latest TypeScript patterns and practices for better code quality.",
      date: "2025-04-10",
      readTime: "8 min read",
      imageUrl: "/placeholder.svg"
    },
    {
      id: 'tailwind-css-tricks',
      title: "Advanced Tailwind CSS Tricks",
      description: "Level up your styling game with these advanced Tailwind CSS techniques.",
      date: "2025-04-05",
      readTime: "6 min read",
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
              <MessageSquare className="w-8 h-8" />
              <span className="text-green-400">&gt; Blog</span>
            </h1>
            
            <p className="text-lg mb-12 text-gray-300 max-w-2xl">
              Thoughts, tutorials, and insights about software development, 
              design, and technology.
            </p>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <Link key={post.id} to={`/blog/${post.id}`}>
              <Card className="bg-gray-800/50 border-gray-700 h-full hover:bg-gray-800/70 transition-colors">
                <div className="aspect-video">
                  <img 
                    src={post.imageUrl} 
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader className="p-6">
                  <CardTitle className="text-green-400 text-xl mb-2">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    {post.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>{new Date(post.date).toLocaleDateString()}</span>
                    <span>{post.readTime}</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </section>
      </main>
    </div>
  );
};

export default Blog;
