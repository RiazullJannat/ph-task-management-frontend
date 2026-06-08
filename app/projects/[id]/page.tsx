import PageHeader from "@/components/ui/PageHeader";
import { getWorkspaceById } from "@/service/workspaceService/workspace.service";
import CreateBoard from "@/components/pages/shared/boards/CreateBoard";
import BoardsList from "@/components/pages/shared/boards/BoardsList";
import { getAllUsers } from "@/service/authService";
import AddWorkspaceMember from "@/components/pages/shared/workspaces/AddWorkspaceMember";
import WorkspaceSettings from "@/components/pages/shared/workspaces/WorkspaceSettings";

export default async function page({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params
    const workspace = await getWorkspaceById(id)
    const users = await getAllUsers()

    return (
        <div>
            <div className="flex items-center justify-between pr-6 mb-6">
                <PageHeader title={workspace?.data?.name || "Workspace"} subtitle={workspace?.data?.description || "Manage your boards here."} />
                <div className="flex items-center gap-3">
                    <AddWorkspaceMember workspaceId={id} users={users?.data || []} />
                    {workspace?.data && <WorkspaceSettings workspace={workspace.data} />}
                    <CreateBoard workspaceId={id} />
                </div>
            </div>

            <div className="p-6">
                <BoardsList boards={workspace?.data?.boards || []} workspaceId={id} />
            </div>
        </div>
    )
}