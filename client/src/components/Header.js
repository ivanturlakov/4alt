import React, { useContext } from "react";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import MoneyIcon from "@material-ui/icons/MoneyOffTwoTone";
import Typography from "@material-ui/core/Typography";
import useMediaQuery from '@material-ui/core/useMediaQuery';

import Context from "../context";
import Signout from "../components/Auth/Signout";

const Header = ({ classes }) => {
  const { state } = useContext(Context);
  const { currentUser } = state;
  const mobileSize = useMediaQuery('(max-width: 650px)');

  return (
    <div className={classes.root}>
      <AppBar
        position="absolute"
        color="inherit"
      >
        <Toolbar>
          {/* Title/Logo */}
          <div className={classes.grow}>
            <MoneyIcon 
              className={classes.icon}
            />
            <Typography
              className={mobileSize ? classes.mobile : ""}
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
            >
              4alt
            </Typography>
          </div>
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
                color="initial"
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
    color: "default"
  },
  grow: {
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
    color: "purple"
  },
  icon: {
    // marginRight: theme.spacing(1),
    color: "purple",
    fontSize: 45
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
