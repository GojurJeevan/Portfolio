"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github } from "lucide-react";
import { cn } from "@/lib/utils";
import SectionTitle from "@/components/SectionTitle";

const projects = [
  {
    title: "Meal Finder",
    description:
      "A dynamic recipe search web application that integrates TheMealDB API to search, filter, and display meals with ingredients and preparation instructions.",
    image:
      "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    tags: ["JavaScript", "Tailwind CSS", "REST API"],
    liveUrl: "https://gojurjeevan.github.io/MealFinder/",
    githubUrl: "https://github.com/GojurJeevan/MealFinder",
    featured: true,
  },
  {
    title: "Adaptive UI Theme with Modern CSS",
    description:
      "A fully responsive UI that implements custom CSS variables, flexbox layouts, transitions, and dark/light theme support to enhance accessibility and readability.",
    image:
      "https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    tags: ["HTML", "CSS", "Responsive Design"],
    liveUrl: "https://gojurjeevan.github.io/RootCss/",
    githubUrl: "https://github.com/GojurJeevan/RootCss",
    featured: false,
  },
  {
    title: "Villa Finder Web Application",
    description:
      "A responsive real-estate web application that allows users to explore villas by location and price while maintaining faster performance and clean UI design.",
    image:
      "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    tags: ["HTML", "CSS", "Bootstrap"],
    liveUrl: "https://gojurjeevan.github.io/VillaFinder/",
    githubUrl: "https://github.com/GojurJeevan/Villa-Project",
    featured: false,
  },
];

export default function Projects() {
  return (
    <section id="projects" className="w-full py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <SectionTitle>My Projects</SectionTitle>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

interface ProjectCardProps {
  project: (typeof projects)[0];
  index: number;
}

function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-100px" }}
      whileHover={{ y: -5 }}
      className={cn(
        "rounded-lg overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-md hover:shadow-lg transition-all duration-300",
        project.featured && "md:col-span-2"
      )}
    >
      <div
        className={cn("grid grid-cols-1", project.featured && "md:grid-cols-2")}
      >
        <div className="relative h-60 md:h-full">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 hover:opacity-100 transition-opacity p-4 flex flex-col justify-end">
            <div className="flex gap-2">
              <Button size="sm" asChild className="gap-1.5">
                <Link
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="h-4 w-4" />
                  Live Demo
                </Link>
              </Button>
              <Button size="sm" variant="secondary" asChild className="gap-1.5">
                <Link
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="h-4 w-4" />
                  Code
                </Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="p-6 flex flex-col">
          <h3 className="text-xl font-bold mb-2">{project.title}</h3>
          <p className="text-muted-foreground mb-4">{project.description}</p>

          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag, tagIndex) => (
              <Badge
                key={tagIndex}
                variant="secondary"
                className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-purple-800/30"
              >
                {tag}
              </Badge>
            ))}
          </div>

          <div className="mt-auto flex gap-3">
            <Button asChild variant="outline" size="sm" className="gap-1.5">
              <Link
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="h-4 w-4" />
                Live Demo
              </Link>
            </Button>
            <Button asChild variant="outline" size="sm" className="gap-1.5">
              <Link
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-4 w-4" />
                Repository
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
