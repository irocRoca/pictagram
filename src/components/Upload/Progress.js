import React, { useEffect } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

const ProgressBar = ({ progress, setProgress }) => {
  useEffect(() => {
    if (progress === 100) {
      setProgress(0);
    }
  }, [progress, setProgress]);

  return (
    <CircularProgress
      variant="static"
      value={progress}
      style={{ height: "40px", width: "40px" }}
    />
  );
};

export default ProgressBar;
