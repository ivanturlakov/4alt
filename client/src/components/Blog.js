import { withStyles } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";
import useMediaQuery from '@material-ui/core/useMediaQuery';

import React, { useContext } from "react";
import Context from "../context";
import NoContent from "./Item/NoContent";
import CreateItem from "./Item/CreateItem";
import ItemContent from "./Item/ItemContent";

const Blog = ({ classes }) => {
  const { state } = useContext(Context);
  const { draft, currentItem } = state;
  const mobileSize = useMediaQuery('(max-width: 650px)');

  let BlogContent;

  if(!draft && !currentItem) {
    BlogContent = NoContent
  } else if(draft && !currentItem) {
    BlogContent = CreateItem
  } else if(!draft && currentItem) {
    BlogContent = ItemContent
  }
  return (
    <Paper className={mobileSize ? classes.rootMobile : classes.root}>
      <BlogContent />
    </Paper>
  )
};

const styles = {
  root: {
    minWidth: 350,
    display: "flex",
    justifyContent: "center",
  },
  rootMobile: {
    maxWidth: "100%",
    maxHeight: 300,
    overflowX: "hidden",
    overflowY: "scroll",
    paddingTop: "56px"
  }
};

export default withStyles(styles)(Blog);
