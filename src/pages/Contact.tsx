import React from "react";
import NavBar from "@/components/NavBar";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import { toast } from "sonner";

const Contact: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the form data to a server
    toast.success("Message sent successfully! We will get back to you soon.");
    // Reset form
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-coquette-50 to-coquette-100 dark:from-coquette-900 dark:to-coquette-800">
      <NavBar />

      <div className="container mx-auto p-4 pt-8 flex-1">
        <Breadcrumbs className="mb-4" />

        <div className="max-w-2xl mx-auto bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-soft">
          <h1 className="text-3xl font-semibold text-coquette-900 mb-6 text-center">
            Contact Us
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-coquette-700 mb-1">
                  Your Name
                </label>
                <Input
                  id="name"
                  placeholder="Enter your name"
                  required
                  className="w-full"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-coquette-700 mb-1">
                  Email Address
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  className="w-full"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="subject"
                className="block text-sm font-medium text-coquette-700 mb-1">
                Subject
              </label>
              <Input
                id="subject"
                placeholder="How can we help you?"
                required
                className="w-full"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-coquette-700 mb-1">
                Message
              </label>
              <Textarea
                id="message"
                placeholder="Tell us more about your inquiry..."
                rows={5}
                required
                className="w-full"
              />
            </div>

            <a
              href="mailto:hello@coquette.app?subject=Website%20Inquiry"
              className="bg-coquette-500 hover:bg-coquette-600 text-white flex items-center space-x-2 px-4 py-2 rounded-md">
              <Send className="h-4 w-4" />
              Send Message
            </a>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
