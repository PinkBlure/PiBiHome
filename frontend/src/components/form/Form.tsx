import type { ReactNode } from 'react';

interface FormProps {
  onSubmit: (e: React.FormEvent) => void;
  children: ReactNode;
  className?: string;
}

export const Form = ({ onSubmit, children, className = '' }: FormProps) => {
  return (
    <form
      onSubmit={onSubmit}
      className={`space-y-6 ${className}`}
      noValidate
    >
      {children}
    </form>
  );
};