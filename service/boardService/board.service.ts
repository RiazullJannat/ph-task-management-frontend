import { TCreateBoardPayload } from "@/types/baordType/board.type";
import { createData, readData } from "../apiService/crud";

export async function createBoard(workspaceId: string,data: TCreateBoardPayload) {
    return createData(`/boards/workspaces/${workspaceId}/boards`, `/projects/${workspaceId}`,data)
}

export async function getBoardsByWorkspaceId(workspaceId: string) {
    return readData(`/boards/workspaces/${workspaceId}/boards`, [""])
}