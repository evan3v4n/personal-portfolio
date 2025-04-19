
export interface Project {
  title: string;
  description: string;
  tech: string[];
  status: "In Progress" | "Live" | "Completed";
  longDescription: string;
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
  startDate: string;
}
