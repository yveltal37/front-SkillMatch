import {
  Button,
  DialogActions,
} from "@mui/material";
import type { CreateChallengeDto } from "../../api/challenge-api";
import type { Dispatch, SetStateAction } from "react";

interface DialogState {
  isOpen: boolean;
  type: "category" | "challenge" | null;
  step: number;
}

interface AdminDialogActionProp {
  challengeData: CreateChallengeDto;
  dialogState: DialogState;
  setDialogState: Dispatch<SetStateAction<DialogState>>;
  handleCreate: () => Promise<void>;
}

function AdminDialogAction({ prop }: { prop: AdminDialogActionProp }) {
  const handleNextStep = () => {
    prop.setDialogState((prev) => ({ ...prev, step: prev.step + 1 }));
  };

  return (
    <DialogActions>
      {prop.dialogState.type === "challenge" && prop.dialogState.step === 1 && (
        <Button
          onClick={handleNextStep}
          disabled={
            !prop.challengeData.name.trim() ||
            !prop.challengeData.description.trim() ||
            !prop.challengeData.expirationDate.trim()
          }
          
        >
          Next
        </Button>
      )}

      {(prop.dialogState.type === "category" ||
        (prop.dialogState.type === "challenge" &&
          prop.dialogState.step === 2)) && (
        <Button onClick={prop.handleCreate}>Create</Button>
      )}
    </DialogActions>
  );
}

export default AdminDialogAction;
