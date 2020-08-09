import React, { useState } from "react";
import Progress from "./Progress";
import styles from "./upload.module.css";
import TextField from "@material-ui/core/TextField";
import { db } from "../../config/firebase";

const Upload = ({ setImageurl }) => {
  const [file, setFile] = useState(null);
  const [tempFile, setTempFile] = useState(null);
  const [complete, setComplete] = useState(false);
  const [caption, setCaption] = useState("");
  const [uploadurl, setuploadurl] = useState("");

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type === "image/png" || file.type === "image/jpeg") {
        const url = URL.createObjectURL(file);
        setImageurl(url);
        setTempFile(file);
      } else {
        console.log("Invalid file type");
      }
    } else {
      setImageurl(null);
    }
  };

  const handleCaption = (e) => {
    setCaption(e.target.value);
  };

  const handleFile = () => {
    setComplete(true);
    setFile(tempFile);

    // take the url from the return value of the upload
    // submit url and caption to db
    db.collection("posts")
      .add({
        caption,
        photoUrl: uploadurl,
      })
      .then((ref) => {
        console.log(ref);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <label htmlFor="file" className={styles.label}>
        Upload
      </label>
      <input
        name="file"
        id="file"
        type="file"
        onChange={handleChange}
        className={styles.input}
      />
      {complete && (
        <Progress
          file={file}
          setFile={setFile}
          setComplete={setComplete}
          setuploadurl={setuploadurl}
        />
      )}
      <TextField
        label="Caption"
        type="text"
        fullWidth={true}
        value={caption}
        onChange={handleCaption}
      />

      <button onClick={handleFile}>Sumbit</button>
    </>
  );
};

export default Upload;
