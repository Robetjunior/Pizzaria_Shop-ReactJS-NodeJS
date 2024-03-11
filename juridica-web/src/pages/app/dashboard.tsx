import { Helmet } from "react-helmet-async";

export function Dashboard() {
  return (
    <>
      <Helmet title="Dashboard" />
      <div className="p-8">
        <div className="flex w-[320px] flex-col justify-center gap-6">
          <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
        </div>
      </div>
    </>
  );
}
