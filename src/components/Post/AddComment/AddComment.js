import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useSelector } from "react-redux";
import { db } from "../../../config/firebase";
import firebase from "firebase/app";

const AddComment = ({ postId }) => {
  const [comment, setComment] = useState("");
  const userData = useSelector((state) => state.user);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (comment != "") {
      db.collection("posts")
        .doc(postId)
        .collection("comments")
        .add({
          username: userData.user.displayName,
          comment,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then(() => {
          setComment("");
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <form>
      <div
        style={{ display: "flex", marginTop: "10px", marginBottom: "-10px" }}
      >
        <TextField
          type="text"
          placeholder="Add a comment"
          fullWidth={true}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <Button color="primary" type="submit" onClick={handleSubmit}>
          Post
        </Button>
      </div>
    </form>
  );
};

export default AddComment;
