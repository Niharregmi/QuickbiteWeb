import * as React from "react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
}

const variantClasses: Record<string, string> = {
  primary:
    "bg-gradient-to-br from-primary to-primary-dark text-primary-foreground shadow-sm hover:brightness-105 active:brightness-95",
  secondary:
    "bg-card text-foreground border border-border hover:bg-muted/60",
  ghost: "bg-transparent text-foreground hover:bg-muted/60",
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "primary", ...props }, ref) => (
    <button
      className={`inline-flex h-12 items-center justify-center gap-2 rounded-2xl px-5 text-sm font-semibold tracking-wide transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${variantClasses[variant]} ${className}`}
      ref={ref}
      {...props}
    />
  )
);
Button.displayName = "Button";

export { Button };
