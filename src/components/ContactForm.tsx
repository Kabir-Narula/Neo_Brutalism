"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { sendEmail } from "@/actions/send-email";
import { NeoButton } from "./NeoButton";
import { motion } from "framer-motion";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <NeoButton
      type="submit"
      variant="primary"
      disabled={pending}
      className="w-full font-bold"
    >
      {pending ? "TRANSMITTING..." : "SEND MESSAGE"}
    </NeoButton>
  );
}

export function ContactForm() {
  const [state, action] = useActionState(sendEmail, { message: "", errors: {}, success: false });

  return (
    <motion.form 
      action={action} 
      className="flex flex-col gap-6 border-3 border-neo-black bg-white p-8 shadow-neo"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="font-bold uppercase tracking-wide">Your Email</label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="you@example.com"
          required
          aria-invalid={state?.errors?.email ? "true" : "false"}
          aria-describedby={state?.errors?.email ? "email-error" : undefined}
          className="border-3 border-neo-black bg-concrete p-3 font-mono focus:outline-none focus:ring-2 focus:ring-neo-lime transition-all"
        />
        {state?.errors?.email && (
          <p id="email-error" role="alert" className="text-sm font-bold text-neo-pink">
            {state.errors.email}
          </p>
        )}
      </div>
      
      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="font-bold uppercase tracking-wide">Message</label>
        <textarea
          id="message"
          name="message"
          rows={5}
          placeholder="Let's collaborate..."
          required
          minLength={10}
          aria-invalid={state?.errors?.message ? "true" : "false"}
          aria-describedby={state?.errors?.message ? "message-error" : "message-hint"}
          className="border-3 border-neo-black bg-concrete p-3 font-mono focus:outline-none focus:ring-2 focus:ring-neo-lime transition-all"
        />
        <span id="message-hint" className="text-xs text-neo-dark-grey">Minimum 10 characters</span>
        {state?.errors?.message && (
          <p id="message-error" role="alert" className="text-sm font-bold text-neo-pink">
            {state.errors.message}
          </p>
        )}
      </div>

      <SubmitButton />
      
      {state?.message && (
        <motion.div 
          role="alert"
          aria-live="polite"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className={`border-2 border-neo-black p-3 text-center font-bold shadow-neo-sm ${state.success ? 'bg-neo-lime text-neo-black' : 'bg-neo-pink text-white'}`}
        >
          {state.message}
        </motion.div>
      )}
    </motion.form>
  );
}
