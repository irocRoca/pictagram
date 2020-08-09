import React, { useEffect } from "react";
import useStroage from "../../hooks/useStorage";
import CircularProgress from "@material-ui/core/CircularProgress";

const ProgressBar = ({ file, setFile, setComplete, setuploadurl }) => {
  const { progress, url, errors } = useStroage(file);
  useEffect(() => {
    console.log(url);
    if (url) {
      setuploadurl(url);
      setFile(null);
      setComplete(false);
    }
  }, [url, setFile]);

  return <CircularProgress variant="static" value={progress} />;
};

export default ProgressBar;
