import { AddQuestForm } from "@/components/AddQuestForm";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlusCircle } from "lucide-react";
import { useState } from "react";

export function AddQuestDialog() {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <PlusCircle className="w-4 h-4 mr-2" />
                    Add New Quest
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Embark on a New Quest</DialogTitle>
                    <DialogDescription>
                        Define your next challenge. Fill in the details below to add a new quest to your log.
                    </DialogDescription>
                </DialogHeader>
                <AddQuestForm onQuestAdded={() => setOpen(false)} />
            </DialogContent>
        </Dialog>
    )
}
