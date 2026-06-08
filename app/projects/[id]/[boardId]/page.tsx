import BoardDetails from "@/components/pages/shared/boards/BoardDetails";
import { getAllUsers } from "@/service/authService";
import { getBoardById } from "@/service/boardService/board.service";
import { getWorkspaceById } from "@/service/workspaceService/workspace.service";

export default async function page({
    params,
}: {
    params: Promise<{ id: string, boardId: string }>;
}) {
    const {id, boardId } = await params
    const board = await getBoardById(boardId)
    const workspace = await getWorkspaceById(id)
    console.log(workspace)
    return (
        <div>
            <BoardDetails board={board?.data || {}} projectId={id} users={workspace?.data?.members} />
        </div>
    )
}