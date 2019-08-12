import { withStyles } from "@material-ui/core/styles";
import { Container, Typography, Box, TextField } from "@material-ui/core";
import useMediaQuery from '@material-ui/core/useMediaQuery';

import React, { useContext } from "react";
import Context from "../context";

const Search = ({ classes }) => {
  const mobileSize = useMediaQuery('(max-width: 650px)');

  return (
    <Container maxWidth="lg">
      <Box className={classes.root} marginBottom={5}>
        <form noValidate autoComplete="off">
          <TextField
            id="standard-search"
            label="Search"
            type="search"
            margin="normal"
            fullWidth
            variant="outlined"
          />
        </form>
      </Box>
    </Container>
  )
};

const styles = {
  root: {
    color: 'ffffff',
  },
  rootMobile: {
    maxWidth: "100%",
    maxHeight: 300,
    overflowX: "hidden",
    overflowY: "scroll",
    paddingTop: "56px"
  }
};

export default withStyles(styles)(Search);