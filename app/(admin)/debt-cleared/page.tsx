import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Table } from "@/components/ui/table";
import { getDebtCleared } from "@/lib/actions/debt.actions";

export default async function DebtCleared() {
  const debts = await getDebtCleared();

  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Debt Cleared</CardTitle>
          <CardDescription>List of all cleared debts.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table></Table>{" "}
        </CardContent>
      </Card>

      <pre>{JSON.stringify(debts, null, 2)}</pre>
    </>
  );
}
