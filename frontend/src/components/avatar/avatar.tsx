interface AvatarProps extends React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> {
  initials: string;
}

export const Avatar = ({ initials, ...props }: AvatarProps) => (
  <div
    data-testid="avatar"
    className="rounded-[50%] size-9 bg-(--color-bg-overlay) text-(--color-text-subtle)"
    {...props}
  >
    {initials}
  </div>
);
