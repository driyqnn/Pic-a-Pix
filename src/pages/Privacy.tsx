import React from "react";
import NavBar from "@/components/NavBar";
import Breadcrumbs from "@/components/Breadcrumbs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Privacy: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-coquette-50 to-coquette-100 dark:from-coquette-900 dark:to-coquette-800">
      <NavBar />

      <main className="container mx-auto flex-1 p-4 lg:p-8 pt-4 max-h-screen overflow-auto">
        <Breadcrumbs className="mb-4" />

        <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-soft border border-coquette-100 max-w-4xl mx-auto">
          <h1 className="text-3xl font-display text-coquette-900 mb-6">
            Privacy Policy
          </h1>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-lg font-medium text-coquette-800">
                Introduction
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-coquette-700 mb-4">
                  Welcome to Pic-a-Pix. We respect your privacy and are
                  committed to protecting your personal data. This privacy
                  policy will inform you how we look after your personal data
                  when you visit our website and tell you about your privacy
                  rights and how the law protects you.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger className="text-lg font-medium text-coquette-800">
                Data We Collect
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-coquette-700 mb-3">
                  We respect your privacy and do not collect any personal data.
                  All photos and data remain on your device unless you choose to
                  share them.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger className="text-lg font-medium text-coquette-800">
                How We Use Your Data
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-coquette-700 mb-3">
                  We don't collect any personal data. This website is designed
                  to be a fun and interactive way to create a photo strip, and
                  we don't store any of your information.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger className="text-lg font-medium text-coquette-800">
                Data Security
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-coquette-700 mb-4">
                  We have put in place appropriate security measures to prevent
                  your personal data from being accidentally lost, used or
                  accessed in an unauthorized way, altered or disclosed. Your
                  photos are processed locally on your device and are not stored
                  on our servers unless you explicitly choose to save or share
                  them.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger className="text-lg font-medium text-coquette-800">
                Cookies
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-coquette-700 mb-3">
                  This website does not use cookies. We don't track you or store
                  any information about you.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6">
              <AccordionTrigger className="text-lg font-medium text-coquette-800">
                Contact Us
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-coquette-700 mb-4">
                  If you have any questions about this privacy policy or our
                  privacy practices, please contact us at:
                  <br />
                  <br />
                  <a
                    href="mailto:flores.charlesadrian@gmail.com"
                    className="border-b border-dotted border-coquette-800 pb-1">
                    Email Us!
                  </a>
                  <br />
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </main>
    </div>
  );
};

export default Privacy;
