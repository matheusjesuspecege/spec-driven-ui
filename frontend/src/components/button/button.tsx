import React from "react";

interface ButtonProps extends React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> {
  variant?: "inverse";
  fullWidth?: boolean;
  loading?: boolean;
}

export const Button = ({
  children,
  variant,
  fullWidth,
  loading,
  ...props
}: ButtonProps) => (
  <>
    {variant === "inverse" && (
      <button
        role="button"
        className={`${fullWidth ? "min-w-full" : "w-47"} h-11 bg-(--color-text-primary) text-(--color-primary) hover:bg-(--color-bg-muted) pt-(--spacing-5) pb-(--spacing-5) text-xs font-semibold rounded-md active:opacity-95 ${props.disabled ? "opacity-50 cursor-not-allowed" : ""} ${loading ? "cursor-not-allowed" : ""} focus:outline-2 focus:outline-offset-2 focus:outline-[#3b82f6]`}
        aria-busy={loading}
        aria-disabled={loading || props.disabled}
        {...props}
      >
        {loading ? <span className="btn-spinner">Loading...</span> : children}
      </button>
    )}
  </>
);
