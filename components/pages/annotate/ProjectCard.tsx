import { Project } from "@/types/annotate/annotate.types";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { Eye, Pencil, Trash2 } from "lucide-react";

export default function ProjectCard({
  project,
  onEdit,
  onDelete,
}: {
  project: Project;
  onEdit: (project: Project) => void;
  onDelete: (id: string) => void;
}) {
  const defaultImage = project.images?.[0]?.image_url || "https://i.ibb.co/6wPQy9V/placeholder-image.png";

  return (
    <div className="effect flex flex-col rounded-xl overflow-hidden group relative border border-white/5 hover:border-white/15 transition-all duration-300 transform hover:-translate-y-1">
      {/* Thumbnail */}
      <div className="w-full h-48 relative bg-white/5 overflow-hidden">
        <Image
          src={defaultImage}
          alt={project.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 right-2 flex gap-2">
          <span className="bg-black/50 backdrop-blur-md px-2 py-1 rounded-md text-xs font-semibold text-white">
            {project.images?.length || 0} images
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-lg font-semibold text-white mb-2 line-clamp-1">
          {project.title}
        </h3>
        <p className="text-sm text-white/50 mb-4 line-clamp-2 flex-1">
          {project.description}
        </p>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
          <span className="text-xs text-white/40">
            {format(new Date(project.created_at), "MMM dd, yyyy")}
          </span>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onEdit(project)}
              className="text-white/50 hover:text-[var(--accent-yellow)] transition-colors"
              title="Edit"
            >
              <Pencil size={16} />
            </button>
            <button
              onClick={() => onDelete(project.id)}
              className="text-white/50 hover:text-[var(--accent-red)] transition-colors"
              title="Delete"
            >
              <Trash2 size={16} />
            </button>
            <Link
              href={`/dashboard/annotate/${project.id}`}
              className="text-white/50 hover:text-[var(--accent-blue)] transition-colors"
              title="View"
            >
              <Eye size={16} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
