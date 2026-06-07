/* eslint-disable @next/next/no-img-element */
import PageHeader from "@/components/ui/PageHeader";
import AddProject from "@/components/pages/shared/dashboard/all-projects/AddProject";
import { getAllWorkspaces } from "@/service/workspaceService/workspace.service";
import { Workspace } from "@/types/projectType/project.type";
import Link from "next/link";

export default async function ProjectsPage() {
  const workspacesRes = await getAllWorkspaces();
  const workspaces = workspacesRes?.data || [];

  return (
    <div>
      <div className="flex items-center justify-between pr-6">
        <PageHeader title="All Projects" subtitle="List of all projects here." />
        <AddProject />
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {workspaces.map((project: Workspace) => (
            <Link href={`/projects/${project.id}`} key={project.id} className="group effect border border-white/10 bg-[#030115] rounded-xl p-5 shadow-sm hover:shadow-md transition cursor-pointer flex flex-col min-h-[180px]">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-semibold text-lg text-[#C3C0D8] truncate pr-2" title={project.name}>{project.name}</h3>
                <span className="text-[10px] font-medium px-2 py-1 bg-[#2C293D] rounded-md text-[#9B98AE] whitespace-nowrap">
                  {project._count?.boards || 0} Board{project._count?.boards !== 1 ? 's' : ''}
                </span>
              </div>
              
              <p className="text-sm text-[#9B98AE] line-clamp-2 flex-grow">
                {project.description || "No description provided."}
              </p>
              
              <div className="mt-4 pt-4 flex items-center justify-between border-t border-white/5">
                <div className="flex -space-x-2">
                  {project.members?.slice(0, 3).map((member) => (
                    <div 
                      key={member.id} 
                      className="w-7 h-7 rounded-full bg-[#1A1829] border border-[#2C293D] flex items-center justify-center text-xs text-[#C3C0D8] font-medium uppercase overflow-hidden" 
                      title={member.user?.name}
                    >
                      {member.user?.avatar_url ? (
                        <img src={member.user.avatar_url} alt={member.user.name} className="w-full h-full object-cover" />
                      ) : (
                        member.user?.name?.charAt(0) || 'U'
                      )}
                    </div>
                  ))}
                  {(project.members?.length || 0) > 3 && (
                    <div className="w-7 h-7 rounded-full bg-[#2C293D] border border-[#1A1829] flex items-center justify-center text-[10px] text-[#C3C0D8] font-medium z-10">
                      +{(project.members?.length || 0) - 3}
                    </div>
                  )}
                </div>
                <span className="text-xs text-[#FFB13F] font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  View Board →
                </span>
              </div>
            </Link>
          ))}
          {(!workspaces || workspaces.length === 0) && (
            <div className="col-span-full flex flex-col items-center justify-center p-12 text-[#9B98AE] border border-dashed border-[#2C293D] rounded-xl bg-white/5">
              <p>No projects found. Create one to get started.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
