"use client";

import { useState } from "react";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [nationality, setNationality] = useState("");
  const [slot, setSlot] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">(
    "idle"
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !message) return;

    setStatus("sending");

    try {
      const res = await fetch("/api/inquire", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, nationality, slot, message }),
      });

      if (res.ok) {
        setStatus("success");
        setName("");
        setEmail("");
        setNationality("");
        setSlot("");
        setMessage("");
        if (typeof window !== "undefined" && (window as any).gtag) {
          (window as any).gtag("event", "inquiry_submit", { slot });
        }
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="contact-form flex flex-col gap-6 fade-in"
    >
      <div className="form-row grid grid-cols-2 gap-6">
        <div className="form-group flex flex-col gap-2.5">
          <label className="text-[12px] tracking-[0.25em] uppercase text-gray-500 font-bold">
            Your Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full name"
            required
            className="cursor-none"
          />
        </div>
        <div className="form-group flex flex-col gap-2.5">
          <label className="text-[12px] tracking-[0.25em] uppercase text-gray-500 font-bold">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            className="cursor-none"
          />
        </div>
      </div>

      <div className="form-row grid grid-cols-2 gap-6">
        <div className="form-group flex flex-col gap-2.5">
          <label className="text-[12px] tracking-[0.25em] uppercase text-gray-500 font-bold">
            Where are you from?
          </label>
          <input
            type="text"
            value={nationality}
            onChange={(e) => setNationality(e.target.value)}
            placeholder="Country"
            className="cursor-none"
          />
        </div>
        <div className="form-group flex flex-col gap-2.5">
          <label className="text-[12px] tracking-[0.25em] uppercase text-gray-500 font-bold">
            When works for you?
          </label>
          <select
            value={slot}
            onChange={(e) => setSlot(e.target.value)}
            className="cursor-none"
          >
            <option value="">Select a slot</option>
            <option value="nov-dec-2026">Nov – Dec 2026</option>
            <option value="future">Future dates — just notify me</option>
          </select>
        </div>
      </div>

      <div className="form-group flex flex-col gap-2.5">
        <label className="text-[12px] tracking-[0.25em] uppercase text-gray-500 font-bold">
          What&apos;s brought you here?
        </label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="No need to be formal. Just tell us where you are and what you're looking for."
          required
          className="cursor-none"
        />
      </div>

      <div className="form-note text-[13px] text-gray-400 tracking-[0.1em] leading-[1.8]">
        Six guests per pop-up, maximum. Every inquiry is read by a real person.
        There is no automated response.
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="submit-btn self-start bg-transparent border border-moss text-moss text-[11px] font-bold tracking-[0.3em] uppercase px-12 py-[18px] relative overflow-hidden transition-all duration-400 hover:text-white cursor-none disabled:opacity-50"
      >
        <div className="absolute inset-0 bg-moss scale-x-0 origin-left transition-transform duration-400 hover:scale-x-100 -z-1" />
        {status === "sending" ? "Sending..." : "Send Message"}
      </button>

      {status === "success" && (
        <div className="form-success show">
          Got it — thank you. We&apos;ll read this carefully and get back to you
          within 48 hours if we think it&apos;s a good fit.
        </div>
      )}

      {status === "error" && (
        <div className="form-success show !border-red-300 !bg-red-50 !text-red-500">
          Something went wrong. Please try again or email us directly at
          inquire@ashandmoss.com.
        </div>
      )}
    </form>
  );
}
