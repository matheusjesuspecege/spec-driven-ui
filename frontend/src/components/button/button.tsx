import React from "react";

interface ButtonProps extends React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> {}

export const Button = ({ children, ...props }: ButtonProps) => (
  <button {...props}>{children}</button>
);
