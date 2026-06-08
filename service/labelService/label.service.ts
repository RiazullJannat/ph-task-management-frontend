import { createData, deleteData } from "../apiService/crud";

export async function createLabel(boardId: string, data: { name: string; color: string }, projectId: string) {
    return createData(`/boards/${boardId}/labels`, `/projects/${projectId}/${boardId}`, data)
}

export async function assignLabelToCard(boardId: string, cardId: string, data: { labelId: string }, projectId: string) {
    return createData(`/boards/${boardId}/cards/${cardId}/labels`, `/projects/${projectId}/${boardId}`, data)
}

export async function unassignLabelFromCard(boardId: string, cardId: string, labelId: string, projectId: string) {
    return deleteData(`/boards/${boardId}/cards/${cardId}/labels/${labelId}`, `/projects/${projectId}/${boardId}`)
}
