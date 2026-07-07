import AllTasks from "@/components/pages/tasks/AllTasks";
import PageHeader from "@/components/ui/PageHeader";
import { getUserTasks } from "@/service/task_service/task.service";
import React from "react";

export default async function TasksPage() {
  const responce = await getUserTasks();
  return (
    <div className="p-6">
      <PageHeader title="Your All Tasks" subtitle="A centralized list of assigned tasks across all projects."/>

      <AllTasks tasks = {responce.data}/>
    </div>
  );
}
