import { ReactNode } from "react";

interface DashboardTileProps {
  title: string;
  description: string;
  icon: ReactNode;
  redirection: ReactNode;
}

export default function DashboardTile({
  title,
  description,
  icon,
  redirection,
}: DashboardTileProps) {
  return (
    <div className="glass-card p-4 md:p-6 rounded-xl flex flex-col justify-between h-full">
      <div className="space-y-3 md:space-y-4">
        <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-primary/10 flex items-center justify-center">
          {icon}
        </div>
        <h2 className="text-lg md:text-xl font-semibold">{title}</h2>
        <p className="text-sm md:text-base text-muted-foreground">{description}</p>
      </div>
      <div className="mt-4">{redirection}</div>
    </div>
  );
}