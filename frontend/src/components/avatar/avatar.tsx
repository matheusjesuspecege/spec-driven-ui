interface AvatarProps extends React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> {
  initials: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  backgroundColor?: string;
  textColor?: string;
}

const sizeClasses = {
  sm: 'size-6 text-[10px]',
  md: 'size-9 text-[12px]',
  lg: 'size-12 text-[16px]',
  xl: 'size-16 text-[20px]',
};

export const Avatar = ({
  initials,
  size = 'md',
  backgroundColor,
  textColor,
  className,
  ...props
}: AvatarProps) => (
  <div
    data-testid="avatar"
    role="img"
    className={`rounded-[50%] flex items-center justify-center font-semibold font-inter ${sizeClasses[size]} ${className || ''}`}
    style={{
      backgroundColor: backgroundColor || 'var(--color-bg-overlay)',
      color: textColor || 'var(--color-text-subtle)',
    }}
    {...props}
  >
    {initials}
  </div>
);
