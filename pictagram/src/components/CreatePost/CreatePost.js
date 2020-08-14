import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import styles from "./createpost.module.css";
import { useSelector } from "react-redux";
import Progress from "../Upload/Progress";
import Alert from "@material-ui/lab/Alert";

import Upload from "../Upload/Upload";
import { db, fbStorage } from "../../config/firebase";
import firebase from "firebase/app";

const CreatePost = ({ onClose }) => {
  const [file, setFile] = useState(null);
  const userData = useSelector((state) => state.user);
  const [caption, setCaption] = useState("");
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [imageDim, setImageDim] = useState(0);

  const handleCaption = (e) => {
    setCaption(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (caption != "") {
      if (file) {
        let storageRef = fbStorage.ref();
        let uploadTask = storageRef.child("images/" + file.name);
        uploadTask.put(file).on(
          "state_changed",
          (snapshot) => {
            let percentage =
              Math.floor(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(percentage);
            setProgress(percentage);
          },
          (err) => {
            setError("Failed to upload Image, Try again");
          },
          () => {
            uploadTask
              .getDownloadURL()
              .then((uploadedUrl) => {
                db.collection("posts")
                  .add({
                    username: userData.user.displayName,
                    photourl: uploadedUrl,
                    caption,
                    dim: imageDim,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                  })
                  .then(() => {
                    onClose();
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              })
              .catch((err) => {
                console.log(err);
              });
          }
        );
      } else {
        setError("An imaged must be selected");
      }
    } else {
      setError("Caption cannot be empty");
    }
  };

  return (
    <form>
      <div>
        {error && <Alert severity="error">{error}</Alert>}
        <p className={styles.heading}>Upload an image!</p>

        <Upload
          setFile={setFile}
          setImageDim={setImageDim}
          setError={setError}
        />

        <div className={styles.text_contain}>
          <TextField
            label="Caption"
            type="text"
            fullWidth={true}
            value={caption}
            onChange={handleCaption}
            className={styles.caption}
          />

          <Button
            variant="contained"
            color="secondary"
            type="submit"
            onClick={handleSubmit}
            style={{ marginTop: "10px", height: "35px" }}
          >
            {progress > 0 ? (
              <Progress progress={progress} setProgress={setProgress} />
            ) : (
              "Submit"
            )}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default CreatePost;
