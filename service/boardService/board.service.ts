import { TCreateBoardPayload } from "@/types/baordType/board.type";
import { createData, deleteData, patchData, readData } from "../apiService/crud";

export async function createBoard(workspaceId: string, data: TCreateBoardPayload) {
    return createData(`/boards/workspaces/${workspaceId}/boards`, `/projects/${workspaceId}`, data)
}

export async function getBoardsByWorkspaceId(workspaceId: string) {
    return readData(`/boards/workspaces/${workspaceId}/boards`, [""])
}

export async function getBoardById(boardId: string) {
    return readData(`/boards/${boardId}`, [""])
}

export async function updateBoard(boardId: string, workspaceId: string, data: Partial<TCreateBoardPayload & { status: string }>) {
    return patchData(`/boards/${boardId}`, `/projects/${workspaceId}/${boardId}`, data)
}

export async function toggleStarBoard(boardId: string, workspaceId: string) {
    return createData(`/boards/${boardId}/star`, `/projects/${workspaceId}`, undefined)
}

export async function copyBoard(boardId: string, workspaceId: string) {
    return createData(`/boards/${boardId}/copy`, `/projects/${workspaceId}`, undefined)
}

export async function deleteBoard(boardId: string, workspaceId: string) {
    return deleteData(`/boards/${boardId}`, `/projects/${workspaceId}`)
}

export async function addMemberToBoard(boardId: string, workspaceId: string, data: { email: string, role: string }) {
    return createData(`/boards/${boardId}/members`, `/projects/${workspaceId}/${boardId}`, data)
}

export async function updateBoardMemberRole(boardId: string, userId: string, workspaceId: string, data: { role: string }) {
    return patchData(`/boards/${boardId}/members/${userId}`, `/projects/${workspaceId}/${boardId}`, data)
}

export async function removeMemberFromBoard(boardId: string, userId: string, workspaceId: string) {
    return deleteData(`/boards/${boardId}/members/${userId}`, `/projects/${workspaceId}/${boardId}`)
}