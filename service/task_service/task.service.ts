import { CreateTaskPayload, UpdateTaskPayload } from "@/types/tasks/tasks.types";
import { createData, deleteData, patchData, readData } from "../apiService/crud";

export async function getUserTasks() {
    return await readData("/tasks/", [''])
}

export async function createTasks(data: CreateTaskPayload) {
    return await createData("/tasks/", "/dashboard/tasks", data)
}

export async function updateTask(data: UpdateTaskPayload, id: string | number) {
    return await patchData(`/tasks/${id}/`, "/dashboard/tasks", data)
}

export async function deleteTask(id: string | number) {
    return await deleteData(`/tasks/${id}/`, "/dashboard/tasks")
}