'use client';
import useFilters from "@/hooks/useFilters";
import ButtonComponent from "./ButtonComponent";
import { RotateCcw } from "lucide-react";

export default function ResetButton({ setLimit, setCurrPage }: { setLimit: (value: string) => void, setCurrPage: (value: number) => void }) {
    const { handleReset, searchParams } = useFilters();
    const isSearchPraram = searchParams.toString() !== "";
    return (
        <ButtonComponent
            buttonName="Reset"
            icon={RotateCcw}
            disabled={!isSearchPraram}
            hideTextOnMobile={true}
            handleSubmit={() => handleReset({ setLimit, setCurrPage })}
        />
    );
}