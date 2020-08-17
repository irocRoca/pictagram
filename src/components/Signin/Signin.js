import React, { useState } from "react";
import styles from "./signin.module.css";
import { auth } from "../../config/firebase";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useDispatch, useSelector } from "react-redux";
import Alert from "@material-ui/lab/Alert";

const Signin = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatchRedux = useDispatch();
  const error = useSelector((state) => state.errors.message);

  const handleSubmit = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then((ref) => {
        if (error) {
          dispatchRedux({ type: "CLEAR_ERROR" });
        }
        // dispatchRedux({ type: "LOGIN", payload: ref.user.uid });
        // send userid also to db to store users
        // or store user in state
        // close the form or mover away from it
        setEmail("");
        setPassword("");
        console.log(ref.user.uid);
        props.history.push("/");
      })
      .catch((err) => {
        dispatchRedux({ type: "ERROR", payload: err.message });
      });
  };

  return (
    <div className={styles.container}>
      {error && <Alert severity="error">{error}</Alert>}

      <h3 className={styles.title}>Pictagram</h3>
      <form onSubmit={handleSubmit}>
        <div className={styles.row}>
          <TextField
            label="Email"
            margin="dense"
            name="email"
            variant="outlined"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={styles.row}>
          <TextField
            label="Password"
            margin="dense"
            name="password"
            variant="outlined"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className={styles.btncontain}>
          <Button
            variant="contained"
            color="primary"
            style={{ textAlign: "center" }}
            type="submit"
          >
            Login
          </Button>
        </div>
      </form>
      <p className={styles.helpercontainer}>
        <span className={styles.helper}>Forgot Password</span>
        <span className={styles.helper}>Create Account</span>
      </p>
    </div>
  );
};

export default Signin;
