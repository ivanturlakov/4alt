import React, { useContext } from "react";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import MoneyIcon from "@material-ui/icons/MoneyOffTwoTone";
import Typography from "@material-ui/core/Typography";
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { Link } from "react-router-dom";

import Context from "../context";
import Signout from "../components/Auth/Signout";

const Header = ({ classes }) => {
  const { state } = useContext(Context);
  const { currentUser } = state;
  const mobileSize = useMediaQuery('(max-width: 650px)');

  return (
    <div className={classes.root}>
      <AppBar
        position="sticky"
        color="primary"
      >
        <Toolbar>
          {/* Title/Logo */}
          <Link to="/" className={classes.grow}>
            <MoneyIcon 
              className={classes.icon}
            />
            <Typography
              className={mobileSize ? classes.mobile : ""}
              component="h1"
              variant="h6"
              noWrap
            >
              4alt
            </Typography>
          </Link>
          {/* Current User Info */}
          {currentUser && (
            <div className={classes.grow}>
              <img 
                className={classes.picture}
                src={currentUser.picture}
                alt={currentUser.name}
              />
              <Typography
                className={mobileSize ? classes.mobile : ""}
                variant="h6"
                noWrap
              >
                {currentUser.name}
              </Typography>
            </div>
          )}

          {/* Sign Out Button */}
          <Signout />
        </Toolbar>
      </AppBar>
    </div>
  );
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    color: "default",
    marginBottom: theme.spacing(3),
  },
  grow: {
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
    color: "#ffffff"
  },
  icon: {
    // marginRight: theme.spacing(1),
    fontSize: 45,
    color: "#ffffff"
  },
  mobile: {
    display: "none"
  },
  picture: {
    height: "50px",
    borderRadius: "90%",
    marginRight: theme.spacing(2)
  }
});

export default withStyles(styles)(Header);
