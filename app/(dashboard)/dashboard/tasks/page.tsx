import AllTasks from "@/components/pages/tasks/AllTasks";
import PageHeader from "@/components/ui/PageHeader";
import { getUserTasks } from "@/service/task_service/task.service";
import { Query, TSearchParams } from "@/types/shared/shared.types";


export default async function TasksPage({
  searchParams,
}: {
  searchParams?: TSearchParams;
}) {
  const query = await searchParams;
  const responce = await getUserTasks(query as Query);
  return (
    <div className="p-4 md:p-6 lg:p-8">
      <PageHeader title="Your All Tasks" subtitle="A centralized list of assigned tasks across all projects."/>

      <AllTasks tasks = {responce.data}/>
    </div>
  );
}
