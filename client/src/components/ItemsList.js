import React, { useEffect, useContext } from "react";
import { withStyles } from "@material-ui/core/styles";
// import differenceInMinutes from "date-fns/difference_in_minutes";
import { Container, Card, CardActionArea, CardContent, CardMedia, Button, Typography, Grid, Box, Fab } from '@material-ui/core';
import DeleteIcon from "@material-ui/icons/DeleteTwoTone";
import AddIcon from "@material-ui/icons/Add";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Subscription } from "react-apollo";

import { useClient } from "../client";
import { GET_ITEMS_QUERY } from "../graphql/queries";
import { DELETE_ITEM_MUTATION } from "../graphql/mutations";
import { ITEM_ADDED_SUBSCRIPTION, ITEM_DELETED_SUBSCRIPTION, ITEM_UPDATED_SUBSCRIPTION } from "../graphql/subscriptions";
import ItemDetails from "./ItemDetails";
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

  // const highlightNewItem = item => {
  //   const isNewItem = differenceInMinutes(Date.now(), Number(item.createdAt)) <= 30;
  //   return isNewItem ? "limegreen" : "darkblue"
  // }

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
                <Button variant="contained" color="primary" size="large" onClick={() => handleAddItem()}>
                  <AddIcon className={classes.addIcon}/> Add Item
                </Button>
              </Box>
              {/* Area to Manage Item Content */}
              <ItemDetails />
            </Grid>
            {/* Get Items */}
            {state.items.map((item, index) => (
            <Grid item xs={4} key={index}>
              <Card className={classes.card} onClick={() => handleSelectItem(item)}>
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image={item.image}
                    title={item.title}
                  />
                  <CardContent>
                    <Box display="flex">
                      <Box flexGrow={1}>
                        <Typography className={classes.title} variant="h6" component="h6">
                          {item.title}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography className={classes.price} variant="h6" component="h6">
                          {item.price} ₿
                        </Typography>
                      </Box>
                    </Box>
                    {/* <Typography className={classes.description} variant="body2" color="textSecondary" component="p">
                      {item.description}
                    </Typography> */}
                  </CardContent>
                </CardActionArea>
                {isAuthUser(item) && (
                  <Box className={classes.itemActions}>
                    <Fab onClick={() => handleDeleteItem(item)} aria-label="delete" className={classes.fab}>
                      <DeleteIcon />
                    </Fab>
                  </Box>
                )}
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
    position: "relative"
  },
  media: {
    height: 200,
  },
  title: {
    width: "100%",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  price: {
    color: "red"
  },
  itemActions: {
    position: "absolute",
    right: 10,
    top: 10
  },
  addIcon: {
    marginRight: 5,
  }
};

export default withStyles(styles)(Map);
