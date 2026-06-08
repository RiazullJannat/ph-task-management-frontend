import { createData, deleteData, patchData } from "../apiService/crud";

export async function createChecklist(boardId: string, cardId: string, data: { title: string }, projectId: string) {
    return createData(`/boards/${boardId}/cards/${cardId}/checklists`, `/projects/${projectId}/${boardId}`, data)
}

export async function addChecklistItem(boardId: string, checklistId: string, data: { title: string }, projectId: string) {
    return createData(`/boards/${boardId}/checklists/${checklistId}/items`, `/projects/${projectId}/${boardId}`, data)
}

export async function toggleChecklistItem(boardId: string, checklistId: string, itemId: string, projectId: string) {
    console.log(boardId, checklistId, itemId, projectId)
    const data = await patchData(`/boards/${boardId}/checklists/${checklistId}/items/${itemId}/toggle`, `/projects/${projectId}/${boardId}`)
    console.log(data)
    return data
}
// export async function toggleChecklistItem(
//   boardId: string,
//   checklistId: string,
//   itemId: string,
//   projectId: string
// ) {
//   return await patchData(
//     /boards/${boardId}/checklists/${checklistId}/items/${itemId}/toggle,
//     /projects/${projectId}/${boardId},
//     {}
//   );
// }
export async function deleteChecklist(boardId: string, checklistId: string, projectId: string) {
    return deleteData(`/boards/${boardId}/checklists/${checklistId}`, `/projects/${projectId}/${boardId}`)
}
