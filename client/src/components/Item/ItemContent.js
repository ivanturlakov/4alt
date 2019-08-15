import React, { useContext } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Typography, Box, Chip } from "@material-ui/core";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import FaceIcon from "@material-ui/icons/Face";
import format from "date-fns/format";

import CreateComment from "../Comment/CreateComment";
import Comments from "../Comment/Comments";
import Context from "../../context";

const ItemContent = ({ classes }) => {
  const { state } = useContext(Context);
  const { title, description, category, price, author, createdAt, comments, image } = state.currentItem;

  return (
    <div className={classes.root}>
      <Box display="flex">
        <Box flexGrow={1}>
          <Typography className={classes.text} component="h3" variant="h6" color="inherit" gutterBottom>
            <FaceIcon className={classes.icon} /> {author.name}
          </Typography>
        </Box>
        <Box>
          <Typography className={classes.text} variant="subtitle2" color="inherit" gutterBottom>
            <AccessTimeIcon className={classes.icon} />
            {format(Number(createdAt), "MMM Do, YYYY")}
          </Typography>
        </Box>
      </Box>
      <Box display="flex">
        <Box flexGrow={1}>
          <Typography component="h2" variant="h4" color="primary" gutterBottom>
            {title}
          </Typography>
        </Box>
        <Box>
          <Typography component="h2" variant="h4" color="secondary" gutterBottom>
            {price} ₿
          </Typography>
        </Box>
      </Box>
      <Box className={classes.imageBox} borderRadius={10}>
        <img src={image} alt={title} width="100%" />
      </Box>
      <Typography variant="subtitle1" className={classes.description}>
        {description}
      </Typography>
      <Typography variant="subtitle1">
        <Chip label={category} />
      </Typography>

      {/* Item Comments */}
      <CreateComment />
      <Comments comments={comments} />
    </div>
  );
};

const styles = theme => ({
  root: {
    padding: 2,
    width: "100%"
  },
  icon: {
    marginRight: theme.spacing(1)
  },
  text: {
    display: "flex",
    alignItems: "center",
  },
  imageBox: {
    marginBottom: 25,
  },
  description: {
    marginBottom: 15,
  }
});

export default withStyles(styles)(ItemContent);
