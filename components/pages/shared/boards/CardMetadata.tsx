/* eslint-disable @typescript-eslint/no-explicit-any */
import { TComplexCardDetails } from "@/types/cardType/card.type";

interface CardMetadataProps {
    card: TComplexCardDetails;
}

export default function CardMetadata({ card }: CardMetadataProps) {
    return (
        <div className="flex flex-wrap gap-5 items-start mt-4 pt-2">
            {/* Card Members Badge */}
            {card.members && card.members.length > 0 && (
                <div className="space-y-1">
                    <h4 className="text-[10px] font-bold uppercase tracking-wider text-white/40">Members</h4>
                    <div className="flex -space-x-1.5 items-center">
                        {card.members.map((m: any, idx: number) => (
                            <div
                                key={idx}
                                className="w-7 h-7 rounded-full bg-indigo-600 border-2 border-[#1C2126] flex items-center justify-center text-xs font-bold text-white shadow-md select-none"
                                title={m.user?.name || "Member"}
                            >
                                {m.user?.avatar_url ? (
                                    <img src={m.user.avatar_url} alt="" className="w-full h-full rounded-full object-cover" />
                                ) : (
                                    (m.user?.name || 'U').charAt(0).toUpperCase()
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Card Labels Badge */}
            {card.labels && card.labels.length > 0 && (
                <div className="space-y-1">
                    <h4 className="text-[10px] font-bold uppercase tracking-wider text-white/40">Labels</h4>
                    <div className="flex flex-wrap gap-1">
                        {card.labels.map((l: any, i: number) => {
                            const labelData = l.label || l;
                            return (
                                <span
                                    key={i}
                                    style={{ backgroundColor: labelData.color }}
                                    className="text-xs font-bold px-2.5 py-1 rounded text-white shadow-sm flex items-center justify-center"
                                >
                                    {labelData.name}
                                </span>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Card Dates Badge */}
            {card.due_date && (
                <div className="space-y-1">
                    <h4 className="text-[10px] font-bold uppercase tracking-wider text-white/40">Due Date</h4>
                    <span className="inline-block text-xs font-semibold px-2.5 py-1 rounded bg-white/5 border border-white/10 text-white/90">
                        {new Date(card.due_date).toLocaleDateString()}
                    </span>
                </div>
            )}

            {/* Card Priority Badge */}
            {card.priority && (
                <div className="space-y-1">
                    <h4 className="text-[10px] font-bold uppercase tracking-wider text-white/40">Priority</h4>
                    <span className="inline-block text-xs font-bold px-2.5 py-1 rounded bg-blue-500/15 border border-blue-500/20 text-blue-400 capitalize">
                        {card.priority}
                    </span>
                </div>
            )}
        </div>
    );
}
