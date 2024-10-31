import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CopyIcon } from "lucide-react";

export default function EnvVariables({
  searchParams,
}: {
  searchParams?: { query?: string };
}) {
  const query = searchParams?.query || "";
  console.log(`query: ${query}`);
  const envVariables = Object.entries(process.env)
    .sort(([a], [b]) => a.localeCompare(b))
    .filter(
      ([key, value]) =>
        key.toLowerCase().includes(query.toLowerCase()) ||
        value?.toLowerCase().includes(query.toLowerCase())
    );

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Server-Side Environment Variables</CardTitle>
        <CardDescription>
          Displaying all server-side environment variables
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <form>
            <Input
              type="search"
              name="query"
              placeholder="Search environment variables..."
              defaultValue={query}
              className="max-w-sm"
            />
          </form>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">Variable</TableHead>
                <TableHead>Value</TableHead>
                <TableHead className="w-[100px]">Copy</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {envVariables.map(([key, value]) => (
                <TableRow key={key}>
                  <TableCell className="font-medium">{key}</TableCell>
                  <TableCell className="font-mono">{value}</TableCell>
                  <TableCell>
                    <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                      <CopyIcon className="h-4 w-4" />
                      <span className="sr-only">Copy</span>
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
