"use client";

import { Dispatch, ReactNode, SetStateAction, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";
import { Button } from "./button";
import TriggeredButton from "./TriggeredButton";
import { Trash2 } from "lucide-react";

export type TOnChangeProps = {
  id: string;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
};

type TDeleteProps = {
  onChange?: ({ id, setOpen, setLoading }: TOnChangeProps) => Promise<void>;
  id: string;
  buttonName?: string;
  acceptButtonName?: string;
  title?: string;
  description?: string;
  type?: string;
  children?: ReactNode;
};

const ConfirmComponent = ({
  onChange,
  id,
  buttonName = "Confirm Approve",
  acceptButtonName = "Approve",
  title = "Are you sure?",
  description = "If you confirm this, the payment will be confirmed from the pending status to paid status",
  type,
  children,
}: TDeleteProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* Trigger button */}
      <DialogTrigger
        asChild
        onClick={(e) => e.stopPropagation()}
        className="z-20 "
      >
        {type ? (
          <TriggeredButton name={buttonName} varient="red" icon={Trash2} />
        ) : children ? (
          children
        ) : (
          <TriggeredButton name={buttonName} varient="red" icon={Trash2} />
        )}
      </DialogTrigger>

      <DialogContent onClick={(e) => e.stopPropagation()} className="w-[450px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <DialogDescription>{description}</DialogDescription>
        <DialogFooter className="flex justify-end gap-2">
          <Button
            variant="outline"
            disabled={loading}
            onClick={() => {
              onChange?.({ id, setOpen, setLoading });
            }}
            className="cursor-pointer text-xs"
          >
            {acceptButtonName}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmComponent;
