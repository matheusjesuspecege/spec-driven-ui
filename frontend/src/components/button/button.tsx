import React from "react";

interface ButtonProps extends React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> {
  variant?: "inverse";
}

export const Button = ({ children, variant, ...props }: ButtonProps) => (
  <>
    {variant === "inverse" && (
      <button
        {...props}
        className={`${props.className} bg-(--color-text-primary) text-(--color-primary) hover:bg-(--color-primary-hover)`}
      >
        {children}
      </button>
    )}
  </>
);
