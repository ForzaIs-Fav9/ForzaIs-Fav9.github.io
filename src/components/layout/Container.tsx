interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function Container({ children, className = "" }: ContainerProps) {
  return (
    <div className={`mx-auto max-w-4xl px-6 sm:px-8 ${className}`}>
      {children}
    </div>
  );
}
