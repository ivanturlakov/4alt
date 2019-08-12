import React, { useState, useEffect, useContext } from "react";
import { withStyles } from "@material-ui/core/styles";
import differenceInMinutes from "date-fns/difference_in_minutes";
import { Container, Card, CardActionArea, CardActions, CardContent, CardMedia, Button, Typography, Grid, Box } from '@material-ui/core';
import DeleteIcon from "@material-ui/icons/DeleteTwoTone";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Subscription } from "react-apollo";

import { useClient } from "../client";
import { GET_ITEMS_QUERY } from "../graphql/queries";
import { DELETE_ITEM_MUTATION } from "../graphql/mutations";
import { ITEM_ADDED_SUBSCRIPTION, ITEM_DELETED_SUBSCRIPTION, ITEM_UPDATED_SUBSCRIPTION } from "../graphql/subscriptions";
import Blog from "./Blog";
import Context from "../context";

const Map = ({ classes }) => {
  const client = useClient();
  const mobileSize = useMediaQuery('(max-width: 650px)');
  const { state, dispatch } = useContext(Context);
  useEffect(() => {
    getItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getItems = async () => {
    const { getItems } = await client.request(GET_ITEMS_QUERY);
    dispatch({ type: "GET_ITEMS", payload: getItems })
  };

  const highlightNewItem = item => {
    const isNewItem = differenceInMinutes(Date.now(), Number(item.createdAt)) <= 30;
    return isNewItem ? "limegreen" : "darkblue"
  }

  const handleSelectItem = item => {
    dispatch({ type: "SET_ITEM", payload: item })
  }

  const isAuthUser = (item) => item.author._id === state.currentUser._id;

  const handleDeleteItem = async item => {
    const variables = { itemId: item._id };
    await client.request(DELETE_ITEM_MUTATION, variables);
  }

  const handleAddItem = () => {
    if(!state.draft) {
      dispatch({ type: "CREATE_DRAFT" })
    };
  }

  return (
    <React.Fragment>
      <Container maxWidth="lg">
        <div className={mobileSize ? classes.rootMobile : classes.root}>
          <Grid container spacing={5}> 
            <Grid item xs={12}>
              <Box marginBottom={5}>
                <Button onClick={() => handleAddItem()} size="large" className={classes.addButton}>Add Item</Button>
              </Box>
              {/* Blog Area to Add Item Content */}
              <Blog />
            </Grid>
            {/* Get Items */}
            {state.items.map((item, index) => (
            <Grid item xs key={index}>
              <Card className={classes.card}>
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image={item.image}
                    title={item.title}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {item.title}
                    </Typography>
                    {/* <Typography variant="body2" color="textSecondary" component="p">
                      {item.description}
                    </Typography> */}
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  {isAuthUser(item) && (
                    <Button onClick={() => handleDeleteItem(item)}>
                      Delete <DeleteIcon className={classes.deleteIcon}/>
                    </Button>
                  )}
                </CardActions>
              </Card>
            </Grid>
            ))}
            </Grid>
          
          
          

          {/* Subscriptions for Create/Delete/Update Items */}
          <Subscription
            subscription={ITEM_ADDED_SUBSCRIPTION}
            onSubscriptionData={({ subscriptionData }) => {
              const { itemAdded } = subscriptionData.data;
              console.log({ itemAdded });
              dispatch({ type: "CREATE_ITEM", payload: itemAdded })
            }}
          />

          <Subscription
            subscription={ITEM_UPDATED_SUBSCRIPTION}
            onSubscriptionData={({ subscriptionData }) => {
              const { itemUpdated } = subscriptionData.data;
              console.log({ itemUpdated });
              dispatch({ type: "CREATE_COMMENT", payload: itemUpdated })
            }}
          />

          <Subscription
            subscription={ITEM_DELETED_SUBSCRIPTION}
            onSubscriptionData={({ subscriptionData }) => {
              const { itemDeleted } = subscriptionData.data;
              console.log({ itemDeleted });
              dispatch({ type: "DELETE_ITEM", payload: itemDeleted })
            }}
          />        
        </div>
      </Container>
    </React.Fragment>
  );
};

const styles = {
  root: {
    display: "flex",
  },
  rootMobile: {
    display: "flex",
    flexDirection: "column-reverse"
  },
  card: {
    width: "100%",
  },
  media: {
    height: 140,
  },
  addButton: {
    color: "#000000",
    backgroundColor: "#cccccc"
  }
};

export default withStyles(styles)(Map);
