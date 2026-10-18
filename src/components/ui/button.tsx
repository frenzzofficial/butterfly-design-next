import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/packages/utils/cn";

const base =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50";

const variants = {
  default: "bg-primary text-primary-foreground hover:bg-primary/90",
  secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
  outline:
    "border border-border bg-background hover:bg-accent hover:text-accent-foreground",
  ghost: "hover:bg-accent hover:text-accent-foreground",
} as const;

const sizes = {
  sm: "h-8 px-3",
  md: "h-10 px-4",
  lg: "h-12 px-6 text-base",
} as const;

type ButtonStyleOptions = {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
};

/** Class names for anything that should look like a button. */
export const buttonVariants = ({
  variant = "default",
  size = "md",
  className,
}: ButtonStyleOptions & { className?: string } = {}) =>
  cn(base, variants[variant], sizes[size], className);

export const Button = ({
  variant,
  size,
  className,
  type = "button",
  ...props
}: ComponentProps<"button"> & ButtonStyleOptions) => (
  <button
    type={type}
    className={buttonVariants({ variant, size, className })}
    {...props}
  />
);

/** A next/link styled as a button. Works for internal and external hrefs. */
export const ButtonLink = ({
  variant,
  size,
  className,
  ...props
}: ComponentProps<typeof Link> & ButtonStyleOptions) => (
  <Link className={buttonVariants({ variant, size, className })} {...props} />
);
