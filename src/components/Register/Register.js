import React, { useReducer } from "react";
import styles from "./register.module.css";
import { auth, db } from "../../config/firebase";
import TextField from "@material-ui/core/TextField";
import Alert from "@material-ui/lab/Alert";
import Button from "@material-ui/core/Button";
import { useDispatch, useSelector } from "react-redux";
import { clearError, createError, loginAction } from '../../redux/actions'

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
        if (error) { dispatchRedux(clearError())};
        const user = auth.currentUser;
        user.updateProfile({
          displayName: state.userName,
        }).then(() => {
          db
              .collection("users")
              .add({
                username: state.userName,
                email: state.email,
                firstname: state.fullName.split(" ")[0],
                lastname: state.fullName.split(" ")[1],
              })
              .catch(err => dispatchRedux(createError("Failed to create user")))
        }).catch(err => createError("Failed to update Username"))
        dispatchRedux(loginAction(user))
      }).catch((err) => dispatchRedux(createError(err.message)));  
    }

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
            value={state.email}
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
            value={state.fullName}
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
            value={state.userName}
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
            value={state.password}
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
