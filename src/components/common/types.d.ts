type InputProps = Omit<React.ComponentPropsWithoutRef<"input">, "type" | "id">;
type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: string;
  activeIcon?: string;
  size: number;
  alt: string;
  defaultActive?: boolean;
};
