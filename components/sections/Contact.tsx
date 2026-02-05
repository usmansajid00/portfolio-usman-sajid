"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Copy, Check, Send } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { SocialLinks } from "@/components/shared/SocialLinks";
import { contact, personalInfo } from "@/lib/portfolio-data";
import { staggerContainer, staggerItem } from "@/lib/animations";
import { copyToClipboard } from "@/lib/utils";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleCopyEmail = async () => {
    const success = await copyToClipboard(contact.email);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });

      setTimeout(() => {
        setSubmitStatus("idle");
      }, 5000);
    }, 2000);
  };

  return (
    <section id="contact" className="section bg-surface/30">
      <div className="container-custom">
        <SectionHeading
          title="Let's Work Together"
          subtitle="Have a project in mind? Let's discuss how I can help"
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2" // Increased gap for better separation
        >
          <motion.div variants={staggerItem} className="space-y-6">
            <Card variant="glass" className="p-5">
              {" "}
              {/* Consistent padding */}
              <h3 className="text-text mb-4 font-heading text-xl font-bold md:text-2xl">
                Contact Information
              </h3>
              <div className="mb-4 flex items-center justify-between rounded-lg bg-surface/50 p-3 md:p-4">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="flex-shrink-0 rounded-lg bg-accent/10 p-2">
                    <Mail className="h-5 w-5 text-accent" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-textMuted text-xs md:text-sm">Email</p>
                    <p className="text-text truncate text-sm font-medium md:text-base">
                      {contact.email}
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="flex-shrink-0 rounded-lg p-2 transition-colors hover:bg-accent/10"
                  aria-label="Copy email"
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-accent md:h-5 md:w-5" />
                  ) : (
                    <Copy className="text-textSecondary h-4 w-4 md:h-5 md:w-5" />
                  )}
                </button>
              </div>
              <a
                href={`https://wa.me/${contact.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mb-4 flex items-center gap-3 rounded-lg bg-surface/50 p-3 transition-colors hover:bg-accent/5 md:p-4"
              >
                <div className="rounded-lg bg-accent/10 p-2">
                  <Phone className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="text-textMuted text-xs md:text-sm">Phone / WhatsApp</p>
                  <p className="text-text text-sm font-medium md:text-base">{contact.phone}</p>
                </div>
              </a>
              <div className="mb-6 flex items-center gap-3 rounded-lg bg-surface/50 p-3 md:p-4">
                <div className="rounded-lg bg-accent/10 p-2">
                  <MapPin className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="text-textMuted text-xs md:text-sm">Location</p>
                  <p className="text-text text-sm font-medium md:text-base">{contact.location}</p>
                </div>
              </div>
              <div className="border-t border-border pt-6">
                <div className="mb-3 flex items-center gap-2">
                  <motion.div
                    className="bg-success h-3 w-3 rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <span className="text-success text-sm font-medium md:text-base">
                    {contact.availability}
                  </span>
                </div>
                <p className="text-textSecondary mb-2 text-xs md:text-sm">
                  Response Time: {contact.responseTime}
                </p>
                <p className="text-textSecondary text-xs md:text-sm">
                  Working Hours: {contact.workingHours} ({contact.timezone})
                </p>
              </div>
            </Card>

            <Card variant="glass" className="p-5">
              <h4 className="text-text mb-4 font-heading text-lg font-semibold">Follow Me</h4>
              <SocialLinks social={personalInfo.social} iconSize={24} />
            </Card>
          </motion.div>

          <motion.div variants={staggerItem}>
            <Card variant="glass" className="relative overflow-hidden p-5 md:p-8">
              {/* Decorative background element */}
              <div className="absolute right-0 top-0 h-32 w-32 -translate-y-1/2 translate-x-1/2 rounded-full bg-accent/5 blur-3xl" />

              <h3 className="text-text relative z-10 mb-6 font-heading text-xl font-bold md:text-2xl">
                Send a Message
              </h3>

              <form onSubmit={handleSubmit} className="relative z-10 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Your Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    required
                    className="border-white/10 bg-surface/50 focus:border-accent/50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Your Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="john@example.com"
                    required
                    className="border-white/10 bg-surface/50 focus:border-accent/50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="Project Inquiry"
                    required
                    className="border-white/10 bg-surface/50 focus:border-accent/50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell me about your project..."
                    required
                    rows={6}
                    className="min-h-[120px] resize-y border-white/10 bg-surface/50 focus:border-accent/50"
                  />
                </div>

                <Button
                  type="submit"
                  variant="default"
                  fullWidth
                  size="lg"
                  isLoading={isSubmitting}
                  rightIcon={<Send size={20} />}
                  className="mt-2"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>

                {submitStatus === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="border-success/30 bg-success/10 text-success rounded-lg border p-4 text-center"
                  >
                    ✨ Message sent successfully! I&apos;ll get back to you soon.
                  </motion.div>
                )}

                {submitStatus === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="border-error/30 bg-error/10 text-error rounded-lg border p-4 text-center"
                  >
                    Something went wrong. Please try again or email me directly.
                  </motion.div>
                )}
              </form>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
