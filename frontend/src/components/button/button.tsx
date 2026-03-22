import React from "react";

interface ButtonProps extends React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> {
  variant?: "secondary";
}

export const Button = ({ children, variant, ...props }: ButtonProps) => (
  <>
    {variant === "secondary" ? (
      <button
        {...props}
        className={`${props.className} border border-solid border-(--color-border) bg-(--color-bg-muted)`}
      >
        {children}
      </button>
    ) : (
      <button
        {...props}
        className={`${props.className} bg-(--color-primary) text-(--color-text-primary) hover:bg-(--color-primary-hover)`}
      >
        {children}
      </button>
    )}
  </>
);
