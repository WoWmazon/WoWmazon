type InputProps = Omit<React.ComponentPropsWithoutRef<"input">, "type" | "id">;

type ToastProps = {
  message: string;
  open: boolean;
  onChange: (isOpen: boolean) => void;
  position?: "left" | "right" | "center";
  type?: "error";
  autoHideDuration?: number;
};
