import Link from "next/link";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "ghost";
  external?: boolean;
  className?: string;
}

const variantStyles = {
  primary:
    "bg-accent text-background hover:bg-accent-hover font-medium",
  secondary:
    "border border-border bg-surface text-text-primary hover:bg-surface-hover",
  ghost:
    "text-text-secondary hover:text-text-primary hover:bg-surface",
};

export function Button({
  children,
  href,
  variant = "primary",
  external = false,
  className = "",
}: ButtonProps) {
  const styles = `inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm transition-all ${variantStyles[variant]} ${className}`;

  if (href && external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={styles}
      >
        {children}
      </a>
    );
  }

  if (href) {
    return (
      <Link href={href} className={styles}>
        {children}
      </Link>
    );
  }

  return <button className={styles}>{children}</button>;
}
