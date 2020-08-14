import React, { useEffect } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

const ProgressBar = ({ progress, setProgress }) => {
  useEffect(() => {
    if (progress === 100) {
      setProgress(0);
    }
  }, [progress]);

  return (
    <CircularProgress
      variant="static"
      value={progress}
      style={{ color: "white", height: "30px", width: "30px" }}
    />
  );
};

export default ProgressBar;
