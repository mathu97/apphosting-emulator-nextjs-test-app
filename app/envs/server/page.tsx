import EnvVariables from "@/components/server-env-variables";

export default function Page({
  searchParams,
}: {
  searchParams?: { query?: string };
}) {
  return (
    <div className="p-8">
      <EnvVariables searchParams={searchParams} />
    </div>
  );
}
