import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import { useFlagQuestion } from "../hooks/useQuestionsAndAnswers";

const FlagDialog = ({ open, onClose, questionId, isAdmin = false }) => {
  const [flagReason, setFlagReason] = useState("");
  const flagQuestion = useFlagQuestion();

  const handleSubmit = (e) => {
    e.stopPropagation();
    if (!flagReason.trim()) {
      alert("Please provide a reason for flagging");
      return;
    }

    flagQuestion.mutate(
      { questionId, reason: flagReason },
      {
        onSuccess: () => {
          onClose();
          setFlagReason("");
        },
        onError: (error) => {
          console.error("Failed to flag question:", error);
        },
      }
    );
  };

  const handleClose = (e) => {
    e?.stopPropagation();
    onClose();
    setFlagReason("");
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      onClick={(e) => e.stopPropagation()}
      PaperProps={{
        sx: {
          background: "white",
          borderRadius: "12px",
          boxShadow: "0 4px 16px rgba(0, 0, 0, 0.2)",
          padding: "16px",
        },
      }}
    >
      <DialogTitle
        sx={{
          fontWeight: "bold",
          fontSize: "1.25rem",
          color: "#333",
        }}
      >
        Flag this Question
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          sx={{
            color: "#555",
            fontSize: "0.95rem",
            marginBottom: "16px",
          }}
        >
          {isAdmin
            ? "Please provide your review comments for this flagged question."
            : "Please provide a reason why you're flagging this question An administrator will review it."}
        </DialogContentText>
        <textarea
          value={flagReason}
          onChange={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setFlagReason(e.target.value);
          }}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={4}
          placeholder="Enter reason for flagging this question..."
          onKeyDown={(e) => e.stopPropagation()}
          onKeyUp={(e) => e.stopPropagation()}
        />
      </DialogContent>
      <DialogActions
        sx={{
          justifyContent: "flex-end",
          gap: "8px",
        }}
      >
        <Button
          onClick={handleClose}
          sx={{
            color: "#fff",
            backgroundColor: "#f44336",
            "&:hover": { backgroundColor: "#d32f2f" },
            borderRadius: "8px",
            padding: "6px 16px",
            textTransform: "none",
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={flagQuestion.isPending || !flagReason.trim()}
          sx={{
            color: "#fff",
            backgroundColor: "#4caf50",
            "&:hover": { backgroundColor: "#388e3c" },
            borderRadius: "8px",
            padding: "6px 16px",
            textTransform: "none",
          }}
        >
          {flagQuestion.isPending ? "Submitting..." : "Submit Flag"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FlagDialog;
