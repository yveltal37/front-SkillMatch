import { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
} from "@mui/material";
import { createCategoty } from "../../api/category-api";
import CategorySelector from "../../components/categorySelector/CategorySelector";
import { createChallenge } from "../../api/challenge-api";
import { toast } from "react-toastify";
import "./adminButtons.css";
import type { CreateChallengeDto } from "../../api/challenge-api";
import AdminDialogAction from "../adminDialogAction/AdminDialogAction";

interface DialogState {
  isOpen: boolean;
  type: "category" | "challenge" | null;
  step: number;
}

function AdminButtons() {
  const [dialogState, setDialogState] = useState<DialogState>({
    isOpen: false,
    type: null,
    step: 1,
  });
  const [categoryName, setCategoryName] = useState("");
  const [challengeData, setChallengeData] = useState<CreateChallengeDto>({
    name: "",
    description: "",
    expirationDate: "",
    categoryIds: [],
  });

  const handleOpen = (type: "category" | "challenge") => {
    setDialogState({ isOpen: true, type, step: 1 });
  };

  const handleClose = () => {
    setDialogState({ isOpen: false, type: null, step: 1 });
    setCategoryName("");
    setChallengeData({
      name: "",
      description: "",
      expirationDate: "",
      categoryIds: [],
    });
  };

  const handleCreate = async () => {
    if (dialogState.type === "category") {
      try {
        await createCategoty(categoryName);
        toast.success(`Category "${categoryName}" created!`);
        handleClose();
      } catch (err: any) {
        const message =
          err?.response?.data?.message || "An unknown error occurred.";

        console.error(err);
        toast.error(message);
      }
    } else if (dialogState.type === "challenge") {
      try {
        await createChallenge(challengeData);
        toast.success(`Challenge "${challengeData.name}" created!`);
        handleClose();
      } catch (err: any) {
        const message =
          err?.response?.data?.message || "An unknown error occurred.";

        console.error(err);
        toast.error(message);
      }
    }
  };

  return (
    <>
      <div className="admin-actions">
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleOpen("category")}
        >
          Create Category
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => handleOpen("challenge")}
        >
          Create Challenge
        </Button>
      </div>

      <Dialog
        open={dialogState.isOpen}
        onClose={handleClose}
        fullWidth
      >
        <DialogTitle>
          {dialogState.type === "category"
            ? "Create Category"
            : `Create Challenge (Step ${dialogState.step} of 2)`}
        </DialogTitle>

        <DialogContent>
          {dialogState.type === "category" && (
            <TextField
              autoFocus
              margin="dense"
              label="Category Name"
              type="text"
              fullWidth
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
          )}

          {dialogState.type === "challenge" && dialogState.step === 1 && (
            <>
              <TextField
                autoFocus
                margin="dense"
                label="Challenge Name"
                type="text"
                fullWidth
                value={challengeData.name}
                onChange={(e) =>
                  setChallengeData((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
              />
              <TextField
                margin="dense"
                label="Description"
                type="text"
                fullWidth
                multiline
                rows={3}
                value={challengeData.description}
                onChange={(e) =>
                  setChallengeData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
              />
              <TextField
                margin="dense"
                label="Expiration Date and Time"
                type="datetime-local"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={challengeData.expirationDate}
                onChange={(e) =>
                  setChallengeData((prev) => ({
                    ...prev,
                    expirationDate: e.target.value,
                  }))
                }
              />
            </>
          )}

          {dialogState.type === "challenge" && dialogState.step === 2 && (
            <CategorySelector
              selected={challengeData.categoryIds}
              setSelected={(ids) =>
                setChallengeData((prev) => ({ ...prev, categoryIds: ids }))
              }
            />
          )}
        </DialogContent>

        <AdminDialogAction
          prop={{
            challengeData: challengeData,
            dialogState: dialogState,
            setDialogState: setDialogState,
            handleCreate: handleCreate,
          }}
        />
      </Dialog>
    </>
  );
}

export default AdminButtons;
