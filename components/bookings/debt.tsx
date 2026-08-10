import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface DebtRecord {
  id: string;
  amount: number | string;
  createdAt: string;
  user?: {
    name: string;
  };
}

export default function Debt({ debts }: { debts: DebtRecord[] }) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Debt Cleared</CardTitle>
        <CardDescription>List of all cleared debts.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {debts?.map((debt) => (
              <TableRow key={debt.id}>
                <TableCell>{debt.user?.name}</TableCell>
                <TableCell>₦{Number(debt.amount).toLocaleString()}</TableCell>
                <TableCell>
                  {new Date(debt.createdAt).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
