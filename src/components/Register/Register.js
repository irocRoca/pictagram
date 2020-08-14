import React, { useReducer } from "react";
import styles from "./register.module.css";
import { auth } from "../../config/firebase";
import TextField from "@material-ui/core/TextField";
import Alert from "@material-ui/lab/Alert";
import Button from "@material-ui/core/Button";
import { useDispatch, useSelector } from "react-redux";

const initalState = {
  userName: "",
  email: "",
  fullName: "",
  password: "",
};

const reducer = (state, { field, value }) => {
  return { ...state, [field]: value };
};

const Register = (props) => {
  const [state, dispatch] = useReducer(reducer, initalState);
  const dispatchRedux = useDispatch();
  const error = useSelector((state) => state.errors.message);

  const handleChange = (e) => {
    dispatch({ field: e.target.name, value: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(state.email, state.password)
      .then((ref) => {
        const user = auth.currentUser;
        console.log(user);
        user
          .updateProfile({
            displayName: state.userName,
          })
          .catch((err) => {
            dispatchRedux({ type: "ERROR", payload: err.message });
          });
        dispatchRedux({ type: "LOGIN", payload: user });
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
      <p className={styles.details}>Sign up to see photos from your friends</p>

      <form autoComplete="off">
        <div className={styles.row}>
          <TextField
            label="Email"
            margin="dense"
            name="email"
            variant="outlined"
            onChange={handleChange}
            autoComplete="off"
          />
        </div>
        <div className={styles.row}>
          <TextField
            label="Full Name"
            margin="dense"
            name="fullName"
            variant="outlined"
            onChange={handleChange}
            autoComplete="off"
          />
        </div>
        <div className={styles.row}>
          <TextField
            label="Username"
            margin="dense"
            name="userName"
            variant="outlined"
            onChange={handleChange}
            autoComplete="off"
          />
        </div>
        <div className={styles.row}>
          <TextField
            label="Password"
            margin="dense"
            name="password"
            variant="outlined"
            type="password"
            onChange={handleChange}
            autoComplete="off"
          />
        </div>

        <div className={styles.btncontain}>
          <Button
            variant="contained"
            color="primary"
            style={{ textAlign: "center" }}
            onClick={handleSubmit}
          >
            Sign up
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Register;