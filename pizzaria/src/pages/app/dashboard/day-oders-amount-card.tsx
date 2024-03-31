import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Utensils } from "lucide-react";
import { getDayOrdersAmount } from "../../../api/get-day-orders-amount";

export function DayOrdersAmountCard() {
  const { data: dayOrdersAmountCard } = useQuery({
    queryFn: getDayOrdersAmount,
    queryKey: ["metrics", "day-orders-amount"],
  });

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">Pedidos (dia)</CardTitle>
        <Utensils className="m-4 h-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-1">
        {dayOrdersAmountCard && (
          <>
            <span className="text-2xl font-bold tracking-tight">
              {dayOrdersAmountCard.amount.toLocaleString("pt-BR")}
            </span>
            <p className="text-xs text-muted-foreground">
              {dayOrdersAmountCard.diffFromYesterday >= 0 ? (
                <>
                  <span className="text-rose-500 dark:text-emerald-400">
                    +{dayOrdersAmountCard.diffFromYesterday}
                  </span>{" "}
                  em relação a ontem
                </>
              ) : (
                <>
                  <span className="text-rose-500 dark:text-rose-400">
                    {dayOrdersAmountCard.diffFromYesterday}
                  </span>{" "}
                  em relação a ontem
                </>
              )}
            </p>
          </>
        )}
      </CardContent>
    </Card>
  );
}
