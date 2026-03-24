interface AvatarProps extends React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> {
  initials: string;
  size?: "sm" | "md" | "lg" | "xl";
}

export const Avatar = ({ initials, size = "md", ...props }: AvatarProps) => (
  <div
    className={`rounded-[50%] ${sizeClasses[size]} bg-(--color-bg-overlay) text-(--color-text-subtle)`}
    {...props}
  >
    {initials}
  </div>
);
const sizeClasses = {
  sm: "size-6 text-(--font-size-3xs)",
  md: "size-9 text-[12px]",
  lg: "size-12 text-base",
  xl: "size-16 text-xl",
};
