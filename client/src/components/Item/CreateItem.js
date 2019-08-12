import React, { useState, useContext } from "react";
import axios from "axios";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import AddAPhotoIcon from "@material-ui/icons/AddAPhotoTwoTone";
import LandscapeIcon from "@material-ui/icons/LandscapeOutlined";
import ClearIcon from "@material-ui/icons/Clear";
import SaveIcon from "@material-ui/icons/SaveTwoTone";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Input } from "@material-ui/core";

import Context from "../../context";
import { useClient } from "../../client";
import { CREATE_ITEM_MUTATION } from '../../graphql/mutations';

const CreateItem = ({ classes }) => {
  const client = useClient();
  const { state, dispatch } = useContext(Context);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const mobileSize = useMediaQuery('(max-width: 650px)');

  const handleSubmit = async event => {
    try {
      event.preventDefault();
      setSubmitting(true);
      const url = await handleImageUpload();
      const variables = { title, image: url, description, category };
      await client.request(CREATE_ITEM_MUTATION, variables);
      handleDeleteDraft();
    } catch (err) {
      setSubmitting(false);
      console.error("Error creating item", err)
    }
  }

  const handleImageUpload = async () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "geoapp");
    data.append("cloud_name", "ivant");
    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/ivant/image/upload",
      data
    );
    return res.data.url
  }

  const handleDeleteDraft = () => {
    setTitle("");
    setDescription("");
    setCategory("");
    setImage("");
    dispatch({ type: "DELETE_DRAFT" });
  }

  return (
    <form className={classes.form}>
      <Typography 
        className={classes.alignCenter}
        component="h2"
        variant="h4"
        color="primary"
      >
        <LandscapeIcon className={classes.iconLarge}/> Item Description
      </Typography>
      <div>
        <TextField
          name="title"
          label="Title"
          onChange={e => setTitle(e.target.value)}
        />
        <Input
          accept="image/*"
          id="image"
          type="file"
          className={classes.input}
          onChange={e => setImage(e.target.files[0])}
        />
        <label htmlFor="image">
          <Button
            style={{ color: image && "green" }}
            component="span"
            size="small"
            className={classes.button}
          >
            <AddAPhotoIcon />
          </Button>
        </label>
      </div>
      <div className={classes.descriptionField}>
        <TextField
          name="description"
          label="Description"
          multiline
          rows={mobileSize ? "3" : "6"}
          margin="normal"
          fullWidth
          variant="outlined"
          onChange={e => setDescription(e.target.value)}
        />
      </div>
      <div className={classes.descriptionField}>
        <TextField
          name="category"
          label="Category"
          onChange={e => setCategory(e.target.value)}
        />
      </div>
      <div>
        <Button
          className={classes.button}
          variant="contained"
          color="default"
          onClick={handleDeleteDraft}
        >
          <ClearIcon className={classes.leftIcon}/> Cancel
        </Button>
        <Button
          type="submit"
          className={classes.button}
          variant="contained"
          color="primary"
          disabled={!title.trim() || !description.trim() || !category.trim() || !image || submitting}
          onClick={handleSubmit}
        >
          Submit <SaveIcon className={classes.rightIcon}/>
        </Button>
      </div>
    </form>
  );
};

const styles = theme => ({
  form: {
    marginTop: theme.spacing(3),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    paddingBottom: theme.spacing(1)
  },
  descriptionField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "95%"
  },
  input: {
    display: "none"
  },
  alignCenter: {
    display: "flex",
    alignItems: "center"
  },
  iconLarge: {
    fontSize: 40,
    marginRight: theme.spacing(1)
  },
  leftIcon: {
    fontSize: 20,
    marginRight: theme.spacing(1)
  },
  rightIcon: {
    fontSize: 20,
    marginLeft: theme.spacing(1)
  },
  button: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    marginRight: theme.spacing(2),
    marginLeft: 0
  }
});

export default withStyles(styles)(CreateItem);
