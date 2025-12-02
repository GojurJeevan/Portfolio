"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import SectionTitle from "@/components/SectionTitle";

const techCategories = [
  {
    name: "Frontend",
    skills: [
      {
        name: "HTML",
        level: 90,
        logo: "https://raw.githubusercontent.com/github/explore/main/topics/html/html.png",
        topics: [
          "Interactive Form",
          "Responsive Navigation Bar",
          "Interactive Table",
        ],
        mastered: [
          "Text and Typography",
          "Links",
          "Images and Multimedia",
          "Tables",
          "Forms and Inputs",
          "Media and Embedding",
          "Semantic HTML",
        ],
      },
      {
        name: "Tailwind CSS",
        level: 90,
        logo: "https://raw.githubusercontent.com/github/explore/main/topics/tailwind/tailwind.png",
        topics: [
          "Responsive Design",
          "Custom Themes",
          "Animations",
          "Dark Mode",
        ],
        mastered: [
          "Custom Configuration",
          "Responsive Design Patterns",
          "Component Styling",
          "Dark Mode Implementation",
          "Animation and Transitions",
          "Custom Plugins",
          "Performance Optimization",
          "Design System Integration",
          "Grid Layouts",
          "Utility Pattern",
        ],
      },
      {
        name: "JavaScript",
        level: 85,
        logo: "https://raw.githubusercontent.com/github/explore/main/topics/javascript/javascript.png",
        topics: [
          "DOM Manipulation",
          "Event Handling",
          "ES6+ Features",
          "Timers",
        ],
        mastered: [
          "Functions",
          "DOM Manipulation",
          "Event Handling",
          "Asynchronous JavaScript",
          "Error Handling",
          "Browser Storage",
          "ES6+ Features",
        ],
      },
      {
        name: "React",
        level: 70,
        logo: "https://raw.githubusercontent.com/github/explore/main/topics/react/react.png",
        topics: [
          "Component Lifecycle",
          "Hooks",
          "Context API",
          "Performance Optimization",
        ],
        mastered: [
          "Advanced Hooks (useCallback, useMemo, useRef)",
          "Custom Hook Creation",
          "React Router and Navigation",
          "State Management (Redux, Context)",
          "Component Design Patterns",
          "Performance Optimization",
          "Error Boundaries",
          "Code Splitting",
        ],
      },
    ],
  },
  {
    name: "Backend",
    skills: [
      {
        name: "SQL",
        level: 85,
        logo: "https://cdn-icons-png.flaticon.com/512/919/919836.png",
        topics: [
          "Database Design",
          "Queries & Joins",
          "Indexes & Optimization",
          "Stored Procedures",
          "Functions",
        ],
        mastered: [
          "Writing CRUD Queries (SELECT, INSERT, UPDATE, DELETE)",
          "Implementing Joins (INNER, LEFT, RIGHT, FULL)",
          "Creating & Managing Tables, Views, and Schemas",
          "Using Aggregations and Subqueries",
          "Stored Procedures and Functions",
          "Normalization & Database Design",
          "Transaction Management (COMMIT & ROLLBACK)",
          "Indexing for Query Performance",
          "Constraints & Keys (PK, FK, Unique, Check)",
          "Backup & Restore Operations",
        ],
      },
      {
        name: "MySQL",
        level: 75,
        logo: "https://raw.githubusercontent.com/github/explore/main/topics/mysql/mysql.png",
        topics: [
          "SQL Queries",
          "Joins & Relationships",
          "Database Design",
          "Stored Procedures",
          "Triggers & Views",
        ],
        mastered: [
          "Creating and Managing Databases & Tables",
          "Writing CRUD Operations (SELECT, INSERT, UPDATE, DELETE)",
          "Joins (INNER, LEFT, RIGHT, FULL)",
          "Constraints (PK, FK, Unique, Check)",
          "Stored Procedures & Functions",
          "Triggers & Views",
          "Grouping, Aggregations & Subqueries",
          "Transactions (COMMIT / ROLLBACK)",
          "Database Normalization",
          "Backup & Restore",
        ],
      },
    ],
  },
  {
    name: "DevOps & Tools",
    skills: [
      {
        name: "Git",
        level: 85,
        logo: "https://raw.githubusercontent.com/github/explore/main/topics/git/git.png",
        topics: [
          "Version Control",
          "Staging & Commits",
          "Branching & Merging",
          "GitHub Collaboration",
          "Pull Requests",
        ],
        mastered: [
          "Initializing and Managing Repositories",
          "Staging and Committing Changes",
          "Creating and Switching Branches",
          "Merging Code and Resolving Merge Conflicts",
          "Working with Remote Repositories (push & pull)",
          "Pull Requests and Code Reviews",
          "Cloning & Forking Repositories",
          "Maintaining Clean Commit History",
          "Using .gitignore for File Management",
          "Collaborating with Teams on GitHub",
        ],
      },
    ],
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  hover: { scale: 1.02, transition: { duration: 0.2 } },
};

const progressVariants = {
  hidden: { width: 0 },
  visible: (level: number) => ({
    width: `${level}%`,
    transition: { duration: 0.8, ease: "easeOut" },
  }),
};

export default function TechStack() {
  return (
    <section
      id="tech-stack"
      className="w-full py-20 px-4 bg-slate-50/50 dark:bg-slate-900/20"
    >
      <div className="max-w-6xl mx-auto">
        <SectionTitle>Tech Stack</SectionTitle>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {techCategories.map((category, catIndex) => (
            <motion.div
              key={category.name}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1,
                    delayChildren: catIndex * 0.2,
                  },
                },
              }}
              className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-all border border-slate-200 dark:border-slate-700"
            >
              <h3 className="text-xl font-semibold mb-6">{category.name}</h3>

              <div className="space-y-5">
                {category.skills.map((skill) => (
                  <motion.div
                    key={skill.name}
                    variants={cardVariants}
                    whileHover="hover"
                    className="group"
                  >
                    <HoverCard>
                      <HoverCardTrigger asChild>
                        <div className="cursor-pointer">
                          <div className="flex items-center justify-between mb-1">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  variant="ghost"
                                  className="p-0 h-auto hover:bg-transparent"
                                >
                                  <div className="flex items-center gap-2">
                                    <img
                                      src={skill.logo}
                                      alt={skill.name}
                                      className="w-5 h-5 object-contain"
                                    />
                                    <span className="text-sm font-medium hover:text-purple-600 dark:hover:text-purple-400">
                                      {skill.name}
                                    </span>
                                  </div>
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-lg">
                                <DialogHeader>
                                  <DialogTitle className="flex items-center gap-2 text-xl">
                                    <img
                                      src={skill.logo}
                                      alt={skill.name}
                                      className="w-6 h-6 object-contain"
                                    />
                                    <span>{skill.name}</span>
                                    <span className="text-sm text-purple-600 dark:text-purple-400">
                                      Mastery Level: {skill.level}%
                                    </span>
                                  </DialogTitle>
                                </DialogHeader>
                                <div className="mt-4">
                                  <h4 className="font-medium mb-2">
                                    Mastered Concepts:
                                  </h4>
                                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                    {skill.mastered?.map((item, index) => (
                                      <li
                                        key={index}
                                        className="flex items-center gap-2"
                                      >
                                        <span className="text-purple-600 dark:text-purple-400">
                                          •
                                        </span>
                                        <span className="text-sm">{item}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </DialogContent>
                            </Dialog>
                            <span className="text-xs text-muted-foreground">
                              {skill.level}%
                            </span>
                          </div>

                          <div className="h-2 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                            <motion.div
                              className="h-full bg-gradient-to-r from-purple-500 to-violet-500 rounded-full"
                              variants={progressVariants}
                              custom={skill.level}
                            />
                          </div>
                        </div>
                      </HoverCardTrigger>
                      <HoverCardContent
                        className="w-64 bg-white dark:bg-slate-800 p-4 shadow-lg"
                        align="start"
                      >
                        <h4 className="font-medium mb-2">Key Topics:</h4>
                        <ul className="space-y-1">
                          {skill.topics?.map((topic, index) => (
                            <li
                              key={index}
                              className="text-sm flex items-center gap-2"
                            >
                              <span className="text-purple-600 dark:text-purple-400">
                                •
                              </span>
                              {topic}
                            </li>
                          ))}
                        </ul>
                      </HoverCardContent>
                    </HoverCard>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
