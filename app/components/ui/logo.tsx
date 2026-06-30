import { UtensilsCrossed } from "lucide-react";

export function Logo({
  size = "md",
  withWordmark = true,
}: {
  size?: "sm" | "md" | "lg";
  withWordmark?: boolean;
}) {
  const boxSize = size === "lg" ? "h-20 w-20" : size === "sm" ? "h-9 w-9" : "h-12 w-12";
  const iconSize = size === "lg" ? 32 : size === "sm" ? 16 : 22;
  const textSize = size === "lg" ? "text-2xl" : size === "sm" ? "text-sm" : "text-lg";

  return (
    <div className="flex items-center gap-3">
      <div
        className={`flex ${boxSize} items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary-dark shadow-sm`}
      >
        <UtensilsCrossed size={iconSize} className="text-primary-foreground" />
      </div>
      {withWordmark && (
        <span className={`${textSize} font-bold text-foreground`}>QuickBite</span>
      )}
    </div>
  );
}
