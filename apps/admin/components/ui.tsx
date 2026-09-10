"use client";

import type { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { ChevronDown } from "lucide-react";

// Two-tier shadow scale: resting cards get the flat version, hover/elevated
// states (menus, active drags) can opt into the larger one below.
export const SHADOW_REST = "shadow-[0_1px_2px_rgba(16,24,32,0.04),0_1px_1px_rgba(16,24,32,0.03)]";
export const SHADOW_RAISED = "shadow-[0_1px_2px_rgba(16,24,32,0.04),0_8px_20px_-8px_rgba(16,24,32,0.12)]";

export function Card({ className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`rounded-xl border border-gray-200 bg-paper ${SHADOW_REST} ${className}`}
      {...props}
    />
  );
}

const buttonVariants = {
  primary: "bg-brand-blue text-white hover:bg-brand-blue-dark",
  ghost: "bg-transparent text-gray-600 hover:bg-gray-100 hover:text-ink",
  danger: "bg-transparent text-accent-pink hover:bg-accent-pink/10",
};

export function Button({
  variant = "primary",
  className = "",
  ...props
}: HTMLMotionProps<"button"> & { variant?: keyof typeof buttonVariants }) {
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 sm:min-h-0 ${buttonVariants[variant]} ${className}`}
      {...props}
    />
  );
}

export function IconButton({
  variant = "ghost",
  className = "",
  ...props
}: HTMLMotionProps<"button"> & { variant?: keyof typeof buttonVariants }) {
  return (
    <motion.button
      whileTap={{ scale: 0.92 }}
      className={`inline-flex h-11 w-11 items-center justify-center rounded-full transition disabled:cursor-not-allowed disabled:opacity-50 sm:h-9 sm:w-9 ${buttonVariants[variant]} ${className}`}
      {...props}
    />
  );
}

export function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-gray-500">
      {children}
    </label>
  );
}

const controlClass =
  "w-full rounded-xl border border-gray-200 bg-paper px-3 py-2 text-base text-ink placeholder:text-gray-400 transition focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20 sm:text-sm";

export function Input({ className = "", ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={`${controlClass} ${className}`} {...props} />;
}

export function Textarea({ className = "", ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={`${controlClass} resize-y ${className}`} {...props} />;
}

export function Select({ className = "", ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <span className="relative block">
      <select className={`${controlClass} appearance-none pr-9 ${className}`} {...props} />
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
    </span>
  );
}

const badgeVariants = {
  neutral: "bg-gray-100 text-gray-600",
  amber: "bg-accent-amber/15 text-accent-amber",
  blue: "bg-brand-blue/10 text-brand-blue",
};

export function Badge({
  variant = "neutral",
  className = "",
  children,
}: {
  variant?: keyof typeof badgeVariants;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold ${badgeVariants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}

export function EmptyState({
  icon,
  children,
  className = "",
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-gray-200 bg-gray-50/60 px-6 py-10 text-center ${className}`}
    >
      {icon}
      <p className="text-sm text-gray-500">{children}</p>
    </div>
  );
}
