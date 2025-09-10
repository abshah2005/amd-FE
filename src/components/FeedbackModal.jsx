import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  IconButton,
  Box,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const Star = ({ filled, onClick }) => (
  <IconButton
    size="large"
    onClick={onClick}
    sx={{ color: filled ? "#FACC15" : "#D1D5DB" }}
  >
    <svg width={32} height={32} viewBox="0 0 20 20" fill="currentColor">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.921-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.175 0l-3.38 2.455c-.784.57-1.838-.197-1.539-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.174 9.393c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.966z" />
    </svg>
  </IconButton>
);

const FeedbackModal = ({
  open,
  onClose,
  loading,
  onSubmit,
}) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (!open) {
      setRating(0);
      setComment("");
      setHover(0);
    }
  }, [open]);

  const handleSubmit = () => {
    if (rating > 0) {
      onSubmit({ rating, comment });
      // setRating(0);
      // setComment("");
    }
  };

  const handleAskLater = () => {
    onClose();
    // setRating(0);
    // setComment("");
  };

  return (
    <Dialog open={open} onClose={handleAskLater} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        Share your experience with this Answer
        <IconButton onClick={handleAskLater} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Typography variant="body2" color="text.secondary" mb={2}>
          Your feedback helps build a trusted community of experts and askers.<br />
          Rate your experience and leave a short comment — it only takes a moment and goes a long way.
        </Typography>
        <Box display="flex" justifyContent="center" mb={2}>
          {Array.from({ length: 5 }).map((_, i) => (
            <span
              key={i}
              onMouseEnter={() => setHover(i + 1)}
              onMouseLeave={() => setHover(0)}
            >
              <Star
                filled={hover ? i < hover : i < rating}
                onClick={() => setRating(i + 1)}
              />
            </span>
          ))}
        </Box>
        <TextField
          label="Write your review (optional)"
          multiline
          minRows={2}
          fullWidth
          variant="outlined"
          value={comment}
          onChange={e => setComment(e.target.value)}
        />
      </DialogContent>
      <DialogActions sx={{ justifyContent: "space-between", px: 2, pb: 2 }}>
        <Button onClick={handleAskLater} disabled={loading} variant="text">
          Ask Later
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={loading || rating === 0}
          variant="contained"
          sx={{ backgroundColor: "#0066FF" }}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FeedbackModal;