/* eslint-disable @typescript-eslint/no-explicit-any */
import { TComplexCardDetails } from "@/types/cardType/card.type";
import { TBoardDetails } from "@/types/baordType/board.type";
import { toast } from "sonner";

interface CardCustomFieldsProps {
    card: TComplexCardDetails;
    board: TBoardDetails;
    projectId: string;
    onUpdateCard?: (updatedCard: any) => void;
}

export default function CardCustomFields({ card, board, projectId, onUpdateCard }: CardCustomFieldsProps) {
    const handleSetCardCustomFieldValue = (fieldId: string, val: string) => {
        console.log("INTEGRATION: Service: customFieldService/customField.service.ts -> setCardCustomFieldValue(boardId, cardId, data, projectId), Endpoint: POST /boards/${boardId}/cards/${cardId}/custom-fields");

        const existingValues = (card as any).customFieldValues || [];
        const index = existingValues.findIndex((v: any) => v.field_id === fieldId);

        let newValues;
        if (index > -1) {
            newValues = [...existingValues];
            newValues[index] = { ...newValues[index], value: val };
        } else {
            newValues = [...existingValues, { field_id: fieldId, value: val }];
        }

        const updated = { ...card, customFieldValues: newValues };
        if (onUpdateCard) onUpdateCard(updated);
        toast.success("Custom field value updated (MOCK)");
    };

    if (!board.custom_fields || board.custom_fields.length === 0) return null;

    return (
        <div className="space-y-2.5 pt-4 border-t border-white/5">
            <h3 className="text-sm font-semibold text-white/80">Custom Fields values</h3>
            <div className="grid grid-cols-2 gap-4">
                {board.custom_fields.map((def: any) => {
                    const cardVal = ((card as any).customFieldValues || [])?.find((val: any) => val.field_id === def.id)?.value || "";
                    return (
                        <div key={def.id} className="space-y-1">
                            <span className="text-xs text-white/50">{def.name} ({def.type})</span>
                            {def.type === "checkbox" ? (
                                <input
                                    type="checkbox"
                                    checked={cardVal === "true"}
                                    onChange={(e) => handleSetCardCustomFieldValue(def.id, String(e.target.checked))}
                                    className="w-4 h-4 rounded bg-[#22272B] border-white/10"
                                />
                            ) : (
                                <input
                                    type={def.type === "number" ? "number" : "text"}
                                    value={cardVal}
                                    placeholder={`Set ${def.name}...`}
                                    onChange={(e) => handleSetCardCustomFieldValue(def.id, e.target.value)}
                                    className="w-full bg-[#22272B] border border-white/10 rounded px-2.5 py-1 text-xs text-white focus:outline-none"
                                />
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
