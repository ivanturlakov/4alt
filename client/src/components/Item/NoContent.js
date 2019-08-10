import React from "react";
import { withStyles } from "@material-ui/core/styles";
import ExploreIconTwoTone from "@material-ui/icons/ExploreTwoTone";
import Typography from "@material-ui/core/Typography";

const NoContent = ({ classes }) => (
  <div className={classes.root}>
    <ExploreIconTwoTone className={classes.icon}/>
    <Typography
      noWrap
      component="h2"
      variant="h6"
      align="center"
      color="textPrimary"
      gutterBottom
    >
      Click to the map to add Pin
    </Typography>
  </div>
);

const styles = theme => ({
  root: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center"
  },
  icon: {
    margin: theme.spacing(1),
    fontSize: "80px"
  }
});

export default withStyles(styles)(NoContent);
