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
        className="border border-solid border-(--color-border)"
      >
        {children}
      </button>
    ) : (
      <button {...props}>{children}</button>
    )}
  </>
);
