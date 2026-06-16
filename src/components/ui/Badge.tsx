interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "academic" | "technical" | "research" | "startup";
}

const variantStyles: Record<string, string> = {
  default: "bg-accent-muted/50 text-accent",
  academic: "bg-category-academic/10 text-category-academic",
  technical: "bg-category-technical/10 text-category-technical",
  research: "bg-category-research/10 text-category-research",
  startup: "bg-category-startup/10 text-category-startup",
};

export function Badge({ children, variant = "default" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${variantStyles[variant]}`}
    >
      {children}
    </span>
  );
}
