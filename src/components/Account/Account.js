import React from "react";
import TextField from "@material-ui/core/TextField";
import { Avatar } from "@material-ui/core";
import Container from '../Container/Container';

const Account = () => {
  return (
    <div>
      {/* maybe do a change password */}
      {/* for the avatar that url will be stored in the user at redux user.user.photoUrl */}
      <Container>
      <Avatar />
      <form>
        <TextField label="username" />
        <div>
        <TextField label="First Name" />
        <TextField label="Last Name" />
        </div>
        
        <TextField label="password" />
      </form>
      </Container>

      <div>image</div>
      <div>First name</div>
      <div>Last name</div>
      <div>edit Bio</div>
      <div>button to update</div>
    </div>
  );
};

export default Account;
