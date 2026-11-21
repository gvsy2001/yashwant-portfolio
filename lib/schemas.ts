import { z } from "zod";

export const projectFrontmatterSchema = z.object({
  title: z.string().min(3, "Project title must be at least 3 characters"),
  slug: z
    .string()
    .min(2)
    .regex(/^[a-z0-9-]+$/, "Slug must contain only lowercase letters, numbers, and hyphens"),
  summary: z.string().min(10, "Project summary must be at least 10 characters"),
  date: z.string().refine((val) => !Number.isNaN(Date.parse(val)), {
    message: "Project date must be a valid ISO date string",
  }),
  tags: z.array(z.string().min(1)).min(1, "At least one tag is required"),
  stack: z.array(z.string().min(1)).min(1, "At least one stack item is required"),
  featured: z.boolean(),
  cover: z.string().min(1, "Cover image path is required"),
  liveUrl: z.string().url().optional(),
  repoUrl: z.string().url().optional(),
});

export const postFrontmatterSchema = z.object({
  title: z.string().min(3, "Post title must be at least 3 characters"),
  slug: z
    .string()
    .min(2)
    .regex(/^[a-z0-9-]+$/, "Slug must contain only lowercase letters, numbers, and hyphens"),
  summary: z.string().min(10, "Post summary must be at least 10 characters"),
  date: z.string().refine((val) => !Number.isNaN(Date.parse(val)), {
    message: "Post date must be a valid ISO date string",
  }),
  tags: z.array(z.string().min(1)).min(1, "At least one tag is required"),
  draft: z.boolean().optional().default(false),
  cover: z.string().min(1).optional(),
});

export const contactFormSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name (at least 2 characters)."),
  email: z.string().trim().email("Please enter a valid email address."),
  message: z
    .string()
    .trim()
    .min(10, "Please write a message of at least 10 characters.")
    .max(2000, "Message must be 2000 characters or fewer."),
  botcheck: z.string().optional(),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
