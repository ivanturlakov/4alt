import { withStyles } from "@material-ui/core/styles";
import { Drawer, Box } from "@material-ui/core";
import useMediaQuery from '@material-ui/core/useMediaQuery';

import React, { useContext } from "react";
import Context from "../context";
import CreateItem from "./Item/CreateItem";
import ItemContent from "./Item/ItemContent";

const ItemDetails = ({ classes }) => {
  const { state, dispatch } = useContext(Context);
  const { draft, currentItem } = state;

  const mobileSize = useMediaQuery('(max-width: 650px)');

  let DetailsContent;

  const NoContent = () => {
    return <div>No content</div>;
  };

  if(!draft && !currentItem) {
    DetailsContent = NoContent
  } else if(draft && !currentItem) {
    DetailsContent = CreateItem
  } else if(!draft && currentItem) {
    DetailsContent = ItemContent
  }

  const handleCloseDrawer = () => {
    if(draft) {
      dispatch({ type: "DELETE_DRAFT" });
    } else {
      dispatch({ type: "DELETE_CURRENT_ITEM" });
    }
    
  }

  return (
    <Drawer open={draft !== null || currentItem !== null} anchor="right" onClose={handleCloseDrawer}>
      <Box className={mobileSize ? classes.rootMobile : classes.root}>
        <DetailsContent />
      </Box> 
    </Drawer>
  )
};

const styles = {
  root: {
    width: "50vw",
    display: "flex",
    justifyContent: "center",
    padding: 20,
  },
  rootMobile: {
    maxWidth: "100%",
    maxHeight: 300,
    overflowX: "hidden",
    overflowY: "scroll",
    paddingTop: "56px"
  }
};

export default withStyles(styles)(ItemDetails);
