import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Container, List, ListItem, ListItemAvatar, ListItemText, Avatar, Grid } from "@material-ui/core";
import FolderIcon from '@material-ui/icons/Folder';
// import useMediaQuery from '@material-ui/core/useMediaQuery';

const Categories = ({ classes }) => {
  // const mobileSize = useMediaQuery('(max-width: 650px)');

  return (
    <Container maxWidth="md">
      <Grid container spacing={5}>
        <Grid item xs={3}>
          <List>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <FolderIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Single-line item"
              />
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={3}>
          <List>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <FolderIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Single-line item"
              />
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={3}>
          <List>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <FolderIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Single-line item"
              />
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={3}>
          <List>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <FolderIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Single-line item"
              />
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={3}>
          <List>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <FolderIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Single-line item"
              />
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={3}>
          <List>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <FolderIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Single-line item"
              />
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={3}>
          <List>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <FolderIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Single-line item"
              />
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={3}>
          <List>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <FolderIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Single-line item"
              />
            </ListItem>
          </List>
        </Grid>
      </Grid>
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

export default withStyles(styles)(Categories);