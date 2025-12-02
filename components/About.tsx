"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Trophy, Award, Heart, Calendar } from "lucide-react";
import SectionTitle from "@/components/SectionTitle";

const aboutData = {
  intro:
    "Entry-level Software Developer skilled in Java, JavaScript, SQL, and front-end technologies. Strong understanding of OOP , DSA, and REST API concepts with hands-on experience in building responsive web applications. Familiar with Git-based collaboration and Agile methodology. Eager to contribute to full-stack roles while quickly learning modern tech stacks.",
  attributes: [
    { label: "Problem Solver", icon: Trophy },
    { label: "Clean Code Advocate", icon: Award },
    // { label: "User Experience Focused", icon: Heart },
    { label: "Fast Learner", icon: Calendar },
  ],
  goals: [
    "Eager to build modern and user-focused web applications",
    "Actively exploring and contributing to open-source projects to gain real-world experience",
    "Always curious to explore new technologies and enhance my skill set",
  ],
};

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function About() {
  return (
    <section id="about" className="w-full py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <SectionTitle>About Me</SectionTitle>

        <motion.div
          className="grid md:grid-cols-2 gap-10 mt-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          transition={{ staggerChildren: 0.2 }}
        >
          <motion.div variants={fadeInUp} className="space-y-6">
            <h3 className="text-2xl font-bold">Who I Am</h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {aboutData.intro}
            </p>

            <div className="flex flex-wrap gap-2 mt-4">
              {aboutData.attributes.map((attr, index) => {
                const Icon = attr.icon;
                return (
                  <Badge
                    key={index}
                    variant="outline"
                    className="px-3 py-1.5 text-sm border-purple-200 dark:border-purple-900"
                  >
                    <Icon className="h-3.5 w-3.5 mr-1.5 text-purple-500" />
                    {attr.label}
                  </Badge>
                );
              })}
            </div>
          </motion.div>

          <motion.div variants={fadeInUp} className="space-y-6">
            <h3 className="text-2xl font-bold">My Goals</h3>
            <ul className="space-y-4">
              {aboutData.goals.map((goal, index) => (
                <motion.li
                  key={index}
                  variants={fadeInUp}
                  className="flex items-start gap-3"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
                    {index + 1}
                  </span>
                  <span className="text-muted-foreground">{goal}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
