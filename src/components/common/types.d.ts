type InputProps = React.ComponentPropsWithoutRef<"input">;
type InputOmitProps = Omit<
  React.ComponentPropsWithoutRef<"input">,
  "type" | "id"
>;

type ToastProps = {
  message: string;
  open: boolean;
  onChange: (isOpen: boolean) => void;
  error?: boolean;
  autoHideDuration?: number;
};

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: string;
  activeIcon?: string;
  size: number;
  alt: string;
  isActive?: boolean;
};
