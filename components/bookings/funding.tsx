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
import { formatDate } from "@/lib/utils";

interface FundRecord {
  id: string;
  amount: number;
  createdAt: string;
  user?: {
    name: string;
  };
}

export default function Funding({ fund }: { fund: FundRecord[] }) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Funding</CardTitle>
        <CardDescription>List of 10 recent funding records.</CardDescription>
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
            {fund?.map((f) => (
              <TableRow key={f.id}>
                <TableCell>{f.user?.name}</TableCell>
                <TableCell>₦{Number(f.amount).toLocaleString()}</TableCell>
                <TableCell>{formatDate(f.createdAt)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
