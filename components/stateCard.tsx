import { motion } from "framer-motion";
import { Card, CardContent } from "./ui/card";
import { ArrowUpRight } from "lucide-react";

export default function StatCard({
  title,
  value,
  icon: Icon,
  trend,
  description,
  color,
}: {
  title: string;
  value: string;
  icon: React.ElementType;
  trend?: string;
  description: string;
  color: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -3 }}
    >
      <Card className="overflow-hidden border-border/60 shadow-sm">
        <CardContent className="p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                {title}
              </p>

              <h3 className="mt-2 text-2xl font-bold tracking-tight">
                {value}
              </h3>
            </div>

            <div
              className={`flex h-10 w-10 items-center justify-center rounded-xl ${color}`}
            >
              <Icon className="h-5 w-5" />
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2 text-xs">
            {trend && (
              <span className="flex items-center gap-1 font-medium text-emerald-600">
                <ArrowUpRight className="h-3.5 w-3.5" />
                {trend}
              </span>
            )}

            <span className="text-muted-foreground">{description}</span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
