import {
  Tooltip as UITooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function Tooltip({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <TooltipProvider>
      <UITooltip>
        <TooltipTrigger>{children}</TooltipTrigger>
        <TooltipContent>{title}</TooltipContent>
      </UITooltip>
    </TooltipProvider>
  );
}
