import { useBlocker } from "react-router-dom";

export const useNavigationBlocker = (shouldBlock) => {
  useBlocker(({ currentLocation, nextLocation }) => {
    if (shouldBlock) {
      return window.confirm("You're in the middle of signup. Are you sure you want to leave?");
    }
    return true;
  }, shouldBlock);
};
