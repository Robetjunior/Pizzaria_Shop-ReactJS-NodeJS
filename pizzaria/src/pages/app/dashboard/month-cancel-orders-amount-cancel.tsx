import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { DollarSign } from "lucide-react";
import { getMonthCanceldOrdersAmount } from "../../../api/get-month-canceled-orders-amount";

export function MonthCancelOrdersAmountCard() {
  const { data: monthCancelOrdersAmountCard } = useQuery({
    queryFn: getMonthCanceldOrdersAmount,
    queryKey: ["metrics", "month-canceled-orders-amount"],
  });

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">
          Cancelamento (mês)
        </CardTitle>
        <DollarSign className="m-4 h-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-1">
        {monthCancelOrdersAmountCard && (
          <>
            <span className="text-2xl font-bold tracking-tight">
              {monthCancelOrdersAmountCard.amount.toLocaleString("pt-BR")}
            </span>
            <p className="text-xs text-muted-foreground">
              {monthCancelOrdersAmountCard.diffFromLastMonth < 0 ? (
                <>
                  <span className="text-rose-500 dark:text-emerald-400">
                    {monthCancelOrdersAmountCard.diffFromLastMonth}%
                  </span>{" "}
                  em relação ao mês passado
                </>
              ) : (
                <>
                  <span className="text-rose-500 dark:text-rose-400">
                    +{monthCancelOrdersAmountCard.diffFromLastMonth}%
                  </span>{" "}
                  em relação ao mês passado
                </>
              )}
            </p>
          </>
        )}
      </CardContent>
    </Card>
  );
}
