import React, { useContext } from "react";
import { GraphQLClient } from 'graphql-request';
import { GoogleLogin } from 'react-google-login';
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import Context from '../../context';
import { ME_QUERY } from '../../graphql/queries';
import { BASE_URL } from '../../client';

const Login = ({ classes }) => {
  const { dispatch } = useContext(Context);

  const onSuccess = async googleUser => {
    try {
      const idToken = googleUser.getAuthResponse().id_token;
      const client = new GraphQLClient(BASE_URL, {
        headers: { authorization: idToken }
      });
      const { me } = await client.request(ME_QUERY);
      dispatch({ type: "LOGIN_USER", payload: me });
      dispatch({ type: "IS_LOGGED_IN", payload: googleUser.isSignedIn() });
    } catch (err) {
      onFailure(err)
    }
  };

  const onFailure = err => {
    console.error("Error logging in", err);
    dispatch({ type: "IS_LOGGED_IN", payload: false });
  }

  return (
    <div className={classes.root}>
      <Typography
        component="h1"
        variant="h4"
        gutterBottom
        noWrap
        style={{ color: "rgb(66, 133,244)" }}
      >
        Welcome to GeoApp!
      </Typography>
      <GoogleLogin 
        clientId="11549819522-v0qlqcg0ls9senvpcgdlr1i9jrv290g8.apps.googleusercontent.com"
        onSuccess={onSuccess}
        onFailure={onFailure}
        isSignedIn={true}
        buttonText="Login with Google"
        theme="dark"
      />      
    </div>
  )
};

const styles = {
  root: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center"
  }
};

export default withStyles(styles)(Login);
