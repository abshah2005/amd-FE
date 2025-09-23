import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
} from "@mui/material";
import { useReviewFlaggedQuestion } from "../hooks/useQuestionsAndAnswers";

const ReviewFlagDialog = ({ open, onClose, questionId, flagReason }) => {
  const [reviewAction, setReviewAction] = useState("");
  const [reviewNote, setReviewNote] = useState("");
  const reviewQuestion = useReviewFlaggedQuestion();

  const handleSubmit = (e) => {
    e.stopPropagation();
    if (!reviewAction) {
      alert("Please select an action");
      return;
    }

    reviewQuestion.mutate(
      { questionId, action: reviewAction, note: reviewNote },
      {
        onSuccess: () => {
          onClose();
          resetForm();
        },
        onError: (error) => {
          console.error("Failed to review flagged question:", error);
        },
      }
    );
  };

  const handleClose = (e) => {
    e?.stopPropagation();
    onClose();
    resetForm();
  };

  const resetForm = () => {
    setReviewAction("");
    setReviewNote("");
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
          width: "500px",
          maxWidth: "90vw",
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
        Review Flagged Question
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          sx={{
            color: "#555",
            fontSize: "0.95rem",
            marginBottom: "8px",
          }}
        >
          Please review this flagged question and select an appropriate action.
        </DialogContentText>
        
        {flagReason && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <h4 className="text-sm font-semibold text-red-700 mb-1">Flag Reason:</h4>
            <p className="text-sm text-gray-700">{flagReason}</p>
          </div>
        )}

        <div className="mb-4">
          <FormControl component="fieldset">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">Select Action:</h4>
            <RadioGroup
              value={reviewAction}
              onChange={(e) => setReviewAction(e.target.value)}
            >
              <FormControlLabel 
                value="reanswer" 
                control={<Radio />} 
                label={
                  <div>
                    <span className="font-medium">Request Re-answer</span>
                    <p className="text-xs text-gray-500">Professional will need to provide a new answer</p>
                  </div>
                } 
              />
              {/* <FormControlLabel 
                value="refund" 
                control={<Radio />} 
                label={
                  <div>
                    <span className="font-medium">Issue Refund</span>
                    <p className="text-xs text-gray-500">Money will be refunded to the asker</p>
                  </div>
                } 
              /> */}
              <FormControlLabel 
                value="no_action" 
                control={<Radio />} 
                label={
                  <div>
                    <span className="font-medium">No Action Required</span>
                    <p className="text-xs text-gray-500">Dismiss the flag and keep the question as is</p>
                  </div>
                } 
              />
            </RadioGroup>
          </FormControl>
        </div>

        <div className="mt-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">Admin Notes:</h4>
          <textarea
            value={reviewNote}
            onChange={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setReviewNote(e.target.value);
            }}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
            placeholder="Enter additional notes about your decision..."
            onKeyDown={(e) => e.stopPropagation()}
            onKeyUp={(e) => e.stopPropagation()}
          />
        </div>
      </DialogContent>
      <DialogActions
        sx={{
          justifyContent: "flex-end",
          gap: "8px",
          padding: "16px",
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
          disabled={reviewQuestion.isPending || !reviewAction}
          sx={{
            color: "#fff",
            backgroundColor: "#4caf50",
            "&:hover": { backgroundColor: "#388e3c" },
            borderRadius: "8px",
            padding: "6px 16px",
            textTransform: "none",
          }}
        >
          {reviewQuestion.isPending ? "Submitting..." : "Submit Review"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReviewFlagDialog;