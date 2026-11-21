"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, AlertCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { contactFormSchema, type ContactFormValues } from "@/lib/schemas";

type FormStatus = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [feedbackMessage, setFeedbackMessage] = useState<string>("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
      botcheck: "",
    },
  });

  const onSubmit = async (values: ContactFormValues) => {
    if (values.botcheck && values.botcheck.trim().length > 0) {
      setStatus("success");
      setFeedbackMessage("Thanks for reaching out. Your message has been received.");
      reset();
      return;
    }

    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
    if (!accessKey) {
      setStatus("error");
      setFeedbackMessage(
        "Contact form access key is not configured. Please email gvsyashwant@gmail.com directly."
      );
      return;
    }

    setStatus("submitting");
    setFeedbackMessage("");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: values.name,
          email: values.email,
          message: values.message,
          botcheck: values.botcheck ?? "",
        }),
      });

      const data = (await response.json()) as { success?: boolean; message?: string };
      if (!response.ok || !data.success) {
        throw new Error(data.message || "Unable to send your message.");
      }

      setStatus("success");
      setFeedbackMessage(
        "Message sent successfully. I will get back to you as soon as possible."
      );
      reset();
    } catch (err) {
      setStatus("error");
      setFeedbackMessage(
        err instanceof Error
          ? err.message
          : "Something went wrong while sending your message. Please try again."
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="space-y-5 rounded-xl border border-border bg-surface p-6 shadow-sm"
    >
      <div>
        <label htmlFor="contact-name" className="block text-sm font-medium text-ink">
          Name
        </label>
        <input
          id="contact-name"
          type="text"
          autoComplete="name"
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "contact-name-error" : undefined}
          placeholder=""
          {...register("name")}
          className="mt-1.5 w-full rounded-md border border-border bg-canvas px-3.5 py-2.5 text-sm text-ink placeholder:text-muted focus:border-accent focus:outline-none"
        />
        {errors.name && (
          <p id="contact-name-error" className="mt-1.5 text-xs text-red-600 dark:text-red-400">
            {errors.name.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="contact-email" className="block text-sm font-medium text-ink">
          Email
        </label>
        <input
          id="contact-email"
          type="email"
          autoComplete="email"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "contact-email-error" : undefined}
          placeholder=""
          {...register("email")}
          className="mt-1.5 w-full rounded-md border border-border bg-canvas px-3.5 py-2.5 text-sm text-ink placeholder:text-muted focus:border-accent focus:outline-none"
        />
        {errors.email && (
          <p id="contact-email-error" className="mt-1.5 text-xs text-red-600 dark:text-red-400">
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="contact-message" className="block text-sm font-medium text-ink">
          Message
        </label>
        <textarea
          id="contact-message"
          rows={5}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
          placeholder="Tell me about your project, role, or engineering question..."
          {...register("message")}
          className="mt-1.5 w-full rounded-md border border-border bg-canvas px-3.5 py-2.5 text-sm text-ink placeholder:text-muted focus:border-accent focus:outline-none"
        />
        {errors.message && (
          <p
            id="contact-message-error"
            className="mt-1.5 text-xs text-red-600 dark:text-red-400"
          >
            {errors.message.message}
          </p>
        )}
      </div>

      <div className="hidden" aria-hidden="true">
        <label htmlFor="contact-botcheck">Do not fill this field</label>
        <input
          id="contact-botcheck"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("botcheck")}
        />
      </div>

      <Button
        type="submit"
        size="lg"
        disabled={status === "submitting"}
        className="w-full sm:w-auto"
      >
        <Send className="h-4 w-4" aria-hidden="true" />
        <span>{status === "submitting" ? "Sending..." : "Send Message"}</span>
      </Button>

      <div aria-live="polite" className="min-h-[1.25rem]">
        {status === "success" && (
          <div className="flex items-start gap-2 rounded-lg border border-emerald-500/40 bg-emerald-500/10 p-3 text-sm text-emerald-800 dark:text-emerald-300">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            <span>{feedbackMessage}</span>
          </div>
        )}
        {status === "error" && (
          <div className="flex items-start gap-2 rounded-lg border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-800 dark:text-red-300">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            <span>{feedbackMessage}</span>
          </div>
        )}
      </div>
    </form>
  );
}
