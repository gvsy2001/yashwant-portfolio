import type { Metadata } from "next";
import { Award, Briefcase, FileDown, GraduationCap } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import type {
  CertificationEntry,
  EducationEntry,
  ExperienceEntry,
} from "@/types";

export const metadata: Metadata = {
  title: "About",
  description:
    "Background, Software Engineer experience at Cognizant, technical skills, certifications, education, and downloadable resume.",
  alternates: {
    canonical: "/about",
  },
};

const EXPERIENCE_TIMELINE: ExperienceEntry[] = [
  {
    role: "Software Engineer",
    organization: "Cognizant",
    location: "Hyderabad, India",
    period: "Sept 2023 – Present",
    summary:
      "Full-stack engineering across React.js, Redux, TypeScript, JavaScript, Node.js, Express.js, Java, MongoDB, and AWS cloud services for large-scale enterprise and high-traffic platforms.",
    highlights: [
      "Architected and maintained web applications and operational dashboards using React.js, Redux, TypeScript, and JavaScript.",
      "Built backend services and RESTful microservices in Node.js, Express.js, and Java handling high-volume concurrent workloads and complex data migrations.",
      "Integrated AWS services including S3, Lambda, SNS, SQS, RDS, and EC2 alongside MongoDB for scalable storage and event-driven processing.",
      "Improved system efficiency by 25%, boosted application stability by 10%, and cut issue resolution time by 15% using Datadog, Splunk, Kibana, and OpenSearch Dashboards.",
      "Wrote unit tests with Jest and JUnit, practiced peer code reviews, and collaborated in Agile/Scrum workflows with Jira and CI/CD pipelines.",
    ],
  },
  {
    role: "Software Engineer Intern",
    organization: "Cognizant",
    location: "Hyderabad, India",
    period: "Mar 2023 – Aug 2023",
    summary:
      "Trained and delivered full-stack web applications using the MERN stack with clean modular architecture and API testing.",
    highlights: [
      "Built component-driven user interfaces in React.js and RESTful backend APIs with Node.js and Express.js.",
      "Designed MongoDB schemas, CRUD operations, validation logic, and real-time data updates.",
      "Verified API behavior and performance using Postman and managed source code in Git.",
    ],
  },
];

const SKILL_GROUPS: Array<{ category: string; items: string[] }> = [
  {
    category: "Frontend",
    items: ["React.js", "Redux", "TypeScript", "JavaScript (ES6+)", "HTML5", "CSS3"],
  },
  {
    category: "Backend & Databases",
    items: [
      "Node.js",
      "Express.js",
      "RESTful APIs",
      "Microservices",
      "Java",
      "MongoDB",
      "Mongoose",
    ],
  },
  {
    category: "Cloud & Observability",
    items: [
      "AWS (EC2, S3, Lambda, RDS, SNS, SQS)",
      "CloudForge",
      "Datadog",
      "Splunk",
      "Kibana",
      "OpenSearch Dashboards",
    ],
  },
  {
    category: "Testing, DevOps & Workflow",
    items: [
      "Jest",
      "JUnit",
      "Unit Testing",
      "Debugging",
      "Production Support",
      "Git",
      "GitHub",
      "GitHub Actions",
      "CI/CD Pipelines",
      "Jira",
      "Agile/Scrum",
    ],
  },
];

const EDUCATION_LIST: EducationEntry[] = [
  {
    degree: "Bachelor of Technology (B.Tech) in Computer Science",
    institution: "Gayatri Vidya Parishad College of Engineering",
    location: "Visakhapatnam",
    period: "2019 – 2023",
    score: "",
  },
  {
    degree: "Intermediate (12th)",
    institution: "Narayana Junior College",
    location: "Visakhapatnam",
    period: "2017 – 2019",
    score: "",
  },
  {
    degree: "SSC (10th)",
    institution: "Sri Prakash Vidyaniketan",
    location: "Visakhapatnam",
    period: "2016 – 2017",
    score: "",
  },
];

const CERTIFICATIONS_LIST: CertificationEntry[] = [
  {
    name: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services (AWS)",
    validity: "May 2025 – May 2028",
  },
  {
    name: "Claude Certified Architect - Foundations",
    issuer: "Anthropic",
    validity: "May 2026 – Nov 2026",
  },
  {
    name: "GitHub Copilot",
    issuer: "Microsoft",
    validity: "Aug 2026 – Aug 2028",
  },
];

export default function AboutPage() {
  return (
    <div className="py-section lg:py-section-lg">
      <Container className="space-y-14">
        <section aria-labelledby="about-bio-heading" className="max-w-3xl">
          <p className="font-mono text-xs font-semibold uppercase tracking-wider text-accent">
            About Me
          </p>
          <h1
            id="about-bio-heading"
            className="mt-2 text-3xl font-bold tracking-tight text-ink sm:text-4xl"
          >
            Gannavarapu Venkata Sai Yashwant
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
            Software Engineer based in Hyderabad, India with 3+ years of experience designing,
            developing, and deploying full-stack applications and cloud-backed services. Skilled across
            React.js, Redux, TypeScript, JavaScript, Node.js, Express.js, Java, MongoDB, and AWS
            (EC2, S3, Lambda, RDS, SNS, SQS), with a strong focus on reliability, performance
            optimization, and structured observability.
          </p>
          <p className="mt-3 text-sm text-muted">
            Languages spoken: Telugu, English, and Hindi.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button href="/resume.pdf" size="lg">
              <FileDown className="h-4 w-4" aria-hidden="true" />
              <span>Download Resume (PDF)</span>
            </Button>
            <Button href="/contact" variant="outline" size="lg">
              Get in Touch
            </Button>
          </div>
        </section>

        <section aria-labelledby="experience-heading">
          <div className="mb-6 flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-accent" aria-hidden="true" />
            <h2 id="experience-heading" className="text-2xl font-bold tracking-tight text-ink">
              Experience
            </h2>
          </div>

          <div className="space-y-6">
            {EXPERIENCE_TIMELINE.map((entry) => (
              <Card key={`${entry.role}-${entry.period}`}>
                <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-baseline">
                  <div>
                    <h3 className="text-xl font-semibold text-ink">
                      {entry.role} · {entry.organization}
                    </h3>
                    <p className="text-sm text-muted">{entry.location}</p>
                  </div>
                  <span className="font-mono text-xs font-medium text-accent">
                    {entry.period}
                  </span>
                </div>

                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {entry.summary}
                </p>

                <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-ink">
                  {entry.highlights.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </section>

        <section aria-labelledby="skills-heading">
          <h2 id="skills-heading" className="mb-6 text-2xl font-bold tracking-tight text-ink">
            Technical Skills
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {SKILL_GROUPS.map((group) => (
              <Card key={group.category}>
                <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-accent">
                  {group.category}
                </h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <Badge key={skill}>{skill}</Badge>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </section>

        <div className="grid gap-8 lg:grid-cols-2">
          <section aria-labelledby="education-heading">
            <div className="mb-6 flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-accent" aria-hidden="true" />
              <h2 id="education-heading" className="text-2xl font-bold tracking-tight text-ink">
                Education
              </h2>
            </div>

            <div className="space-y-4">
              {EDUCATION_LIST.map((edu) => (
                <Card key={edu.degree}>
                  <h3 className="text-base font-semibold text-ink">{edu.degree}</h3>
                  <p className="mt-1 text-sm text-muted">
                    {edu.institution} · {edu.location}
                  </p>
                  <div className="mt-2 flex items-center justify-between font-mono text-xs text-muted">
                    <span>{edu.period}</span>
                    <span className="font-semibold text-ink">{edu.score}</span>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          <section aria-labelledby="certifications-heading">
            <div className="mb-6 flex items-center gap-2">
              <Award className="h-5 w-5 text-accent" aria-hidden="true" />
              <h2
                id="certifications-heading"
                className="text-2xl font-bold tracking-tight text-ink"
              >
                Certifications
              </h2>
            </div>

            <div className="space-y-4">
              {CERTIFICATIONS_LIST.map((cert) => (
                <Card key={cert.name}>
                  <h3 className="text-base font-semibold text-ink">{cert.name}</h3>
                  <p className="mt-1 text-sm text-muted">{cert.issuer}</p>
                  <p className="mt-2 font-mono text-xs text-accent">
                    Valid: {cert.validity}
                  </p>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </Container>
    </div>
  );
}
