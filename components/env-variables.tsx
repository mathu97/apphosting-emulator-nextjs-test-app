"use client";

import { useState, useEffect } from "react";
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
import { CopyIcon, Loader2 } from "lucide-react";

type EnvVariable = {
  key: string;
  value: string;
};

export default function EnvVariables() {
  const [envVariables, setEnvVariables] = useState<EnvVariable[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const publicEnvVariables = Object.entries(window)
      // .filter(([key]) => key.startsWith("NEXT_PUBLIC_"))
      .map(([key, value]) => ({ key, value: String(value) }))
      .sort((a, b) => a.key.localeCompare(b.key));

    setEnvVariables(publicEnvVariables);
    setIsLoading(false);
  }, []);

  const filteredVariables = envVariables.filter(
    (variable) =>
      variable.key.toLowerCase().includes(searchTerm.toLowerCase()) ||
      variable.value.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Environment Variables</CardTitle>
        <CardDescription>
          Displaying all environment variables (via `process.env`)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Input
            type="search"
            placeholder="Search environment variables..."
            className="max-w-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {isLoading ? (
            <div className="flex justify-center items-center h-32">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[300px]">Variable</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead className="w-[100px]">Copy</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredVariables.map(({ key, value }) => (
                  <TableRow key={key}>
                    <TableCell className="font-medium">{key}</TableCell>
                    <TableCell className="font-mono">{value}</TableCell>
                    <TableCell>
                      <button
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        onClick={() => {
                          navigator.clipboard.writeText(`${key}=${value}`);
                          // You might want to add a toast notification here
                        }}
                      >
                        <CopyIcon className="h-4 w-4" />
                        <span className="sr-only">Copy</span>
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
