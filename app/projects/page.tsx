import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { ProjectsExplorer } from "@/components/projects/ProjectsExplorer";
import { getAllProjects } from "@/lib/content";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Engineering case studies covering cloud document migrations, high-throughput microservices, React UIs, and AWS infrastructure.",
  alternates: {
    canonical: "/projects",
  },
};

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <Section
      title="Projects"
      subtitle="Case studies detailing system architecture, implementation decisions, stack choices, and outcomes."
    >
      <ProjectsExplorer projects={projects} />
    </Section>
  );
}
