import * as React from "react";
import { useState } from "react";
import { siteConfig } from "../config/site";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const validateEmail = (value: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setStatus("error");
      setMessage("Please enter your email address.");
      return;
    }
    if (!validateEmail(email)) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }
    setStatus("success");
    setMessage("You're in! Check your inbox for confirmation.");
    setEmail("");
  };

  return (
    <section className="section-padding bg-[#0a0a0a]">
      <div className="container-custom mx-auto max-w-2xl text-center">
        <h2 className="font-[Oswald] text-3xl md:text-4xl font-bold tracking-wide uppercase text-white mb-4">
          {siteConfig.home.newsletter.heading}
        </h2>
        <p className="text-[#a1a1a1] mb-8">
          {siteConfig.home.newsletter.body}
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (status !== "idle") setStatus("idle");
            }}
            placeholder="Enter your email"
            className="flex-1 px-4 py-3 bg-[#1a1a1a] border border-[#2a2a2a] text-white placeholder:text-[#666] focus:outline-none focus:border-[#ff0000] transition-colors"
          />
          <button
            type="submit"
            className="btn-primary whitespace-nowrap"
          >
            {siteConfig.home.newsletter.cta}
          </button>
        </form>

        {status !== "idle" && (
          <p
            className={`mt-4 text-sm ${
              status === "success" ? "text-green-400" : "text-[#ff4444]"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </section>
  );
}
