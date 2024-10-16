type InputProps = React.ComponentPropsWithoutRef<"input">;
type InputOmitProps = Omit<
  React.ComponentPropsWithoutRef<"input">,
  "type" | "id"
>;
