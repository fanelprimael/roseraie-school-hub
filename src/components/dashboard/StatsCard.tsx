import { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  description?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export const StatsCard = ({ 
  title, 
  value, 
  icon, 
  description, 
  trend,
  className 
}: StatsCardProps) => {
  return (
    <Card className={cn("shadow-soft hover:shadow-medium transition-shadow duration-300", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className="text-primary">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">
            {description}
          </p>
        )}
        {trend && (
          <div className={cn(
            "flex items-center text-xs mt-2",
            trend.isPositive ? "text-secondary" : "text-destructive"
          )}>
            <span className={cn(
              "mr-1",
              trend.isPositive ? "text-secondary" : "text-destructive"
            )}>
              {trend.isPositive ? "↑" : "↓"}
            </span>
            {Math.abs(trend.value)}% par rapport au mois dernier
          </div>
        )}
      </CardContent>
    </Card>
  );
};