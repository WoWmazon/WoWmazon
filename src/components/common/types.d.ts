type InputProps = Omit<React.ComponentPropsWithoutRef<"input">, "type" | "id">;

type BadgeProps = {
  text: string;
  height: "h-[18px]" | "h-7";
  backgroundColor: "bg-SYSTEM-main" | "bg-ELSE-FF3" | "bg-ELSE-F0";
  textColor: "text-SYSTEM-white" | "text-SYSTEM-main" | "text-ELSE-C1";
  textSize: "text-sm" | "text-lg";
  hasIcon: boolean;
  iconSrc?: string;
  iconWidth?: number;
};
