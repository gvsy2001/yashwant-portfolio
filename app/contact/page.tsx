import type { Metadata } from "next";
import { Github, Linkedin, Mail, MapPin } from "lucide-react";
import { ContactForm } from "@/components/forms/ContactForm";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Gannavarapu Venkata Sai Yashwant for software engineering roles, full-stack projects, and technical collaboration.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return (
    <section
      aria-labelledby="contact-page-heading"
      className="py-section lg:py-section-lg"
    >
      <Container className="max-w-5xl">
        <div className="max-w-2xl">
          <p className="font-mono text-xs font-semibold uppercase tracking-wider text-accent">
            Contact
          </p>
          <h1
            id="contact-page-heading"
            className="mt-2 text-3xl font-bold tracking-tight text-ink sm:text-4xl"
          >
            Let&apos;s build reliable software
          </h1>
          <p className="mt-3 text-base text-muted">
            Have an engineering opportunity, technical question, or collaboration idea? Send a
            message using the form or reach out directly.
          </p>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <ContactForm />
          </div>

          <div className="space-y-4 lg:col-span-5">
            <Card>
              <h2 className="font-mono text-xs font-semibold uppercase tracking-wider text-muted">
                Direct Channels &amp; Profiles
              </h2>

              <div className="mt-4 space-y-4 text-sm">
                <a
                  href="mailto:gvsyashwant@gmail.com"
                  className="flex items-center gap-3 text-ink transition-colors hover:text-accent"
                >
                  <Mail className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                  <span>gvsyashwant@gmail.com</span>
                </a>


                <div className="flex items-center gap-3 text-muted">
                  <MapPin className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                  <span>Hyderabad, India</span>
                </div>

                <div className="border-t border-border pt-4 space-y-3">
                  <a
                    href="https://github.com/gvsy2001"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-ink transition-colors hover:text-accent"
                  >
                    <Github className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                    <span>GitHub</span>
                  </a>

                  <a
                    href="https://www.linkedin.com/in/gannavarapu-venkata-sai-yashwant-b798581a9/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-ink transition-colors hover:text-accent"
                  >
                    <Linkedin className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                    <span>LinkedIn</span>
                  </a>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </Container>
    </section>
  );
}
