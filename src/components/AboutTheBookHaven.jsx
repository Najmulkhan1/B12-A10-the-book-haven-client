import React from "react";
import { motion } from "framer-motion";
import { BookOpenText } from 'lucide-react'; // Added a relevant icon

/**
 * AboutTheBookHaven
 * Now fully themed with DaisyUI base classes for seamless light/dark mode.
 */

const AboutTheBookHaven = () => {
  return (
    <section className="w-11/12 max-w-6xl mx-auto py-16">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        className="
          relative rounded-3xl p-8 md:p-12 overflow-hidden shadow-2xl
          bg-base-100 border border-base-300
          hover:shadow-3xl transition-all duration-500
        "
      >
        {/* Decorative accent element - Using DaisyUI warning/accent color */}
        <div
          className="
            absolute -top-16 -right-16 w-64 h-64 rounded-full blur-3xl opacity-50
            bg-warning/30 dark:bg-warning/50 
            mix-blend-screen dark:mix-blend-color-dodge
            transition-colors duration-500
          "
          aria-hidden
        />

        <div className="relative z-10 text-center md:text-left space-y-6">
          <BookOpenText className="w-10 h-10 text-warning mx-auto md:mx-0 mb-4" />

          <h2 className="text-3xl md:text-4xl font-extrabold leading-tight 
                        text-base-content">
            About <span className="text-warning">The Book Haven</span>
          </h2>

          <p className="max-w-3xl mx-auto md:mx-0 text-base-content/80 text-base md:text-lg leading-relaxed">
            <strong>The Book Haven</strong> is your cozy corner for every story lover.
            We bring together timeless classics, contemporary gems, and hidden indie treasures —
            all handpicked to inspire, comfort, and challenge readers of every kind.
          </p>

          <p className="max-w-3xl mx-auto md:mx-0 text-base-content/60 text-sm md:text-base">
            Our goal is simple: to make reading accessible, enjoyable, and community-driven.
            Whether you’re discovering your next favorite novel or sharing a review with friends,
            The Book Haven is where your reading journey begins.
          </p>

          <div className="flex justify-center md:justify-start pt-2">
            <a
              href="/about"
              className="
                btn btn-warning btn-outline btn-lg font-semibold 
                hover:btn-warning hover:text-warning-content transition-all duration-300
              "
            >
              Learn more about us
              <svg
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ml-1"
                viewBox="0 0 24 24"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default AboutTheBookHaven;