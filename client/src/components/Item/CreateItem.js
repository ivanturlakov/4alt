import React, { useState, useContext } from "react";
import axios from "axios";
import { withStyles } from "@material-ui/core/styles";
import { TextField, Typography, Button, Input, Select, MenuItem } from "@material-ui/core";
import AddAPhotoIcon from "@material-ui/icons/AddAPhotoTwoTone";
import AssignmentIcon from "@material-ui/icons/AssignmentOutlined";
import ClearIcon from "@material-ui/icons/Clear";
import SaveIcon from "@material-ui/icons/SaveTwoTone";
import useMediaQuery from '@material-ui/core/useMediaQuery';

import Context from "../../context";
import { useClient } from "../../client";
import { CREATE_ITEM_MUTATION } from '../../graphql/mutations';

const CreateItem = ({ classes }) => {
  const client = useClient();
  const { dispatch } = useContext(Context);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Category");
  const [price, setPrice] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const mobileSize = useMediaQuery('(max-width: 650px)');

  // Categories
  const None = "Category";
  const Auto = "Auto";
  const Moto = "Moto";
  const MTB = "MTB";
  const RealEstate = "Real Estate";

  const handleSubmit = async event => {
    try {
      event.preventDefault();
      setSubmitting(true);
      const url = await handleImageUpload();
      const variables = { title, image: url, description, category, price };
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
    setPrice("");
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
        <AssignmentIcon className={classes.iconLarge}/> Description
      </Typography>
      <div>
        <TextField
          name="title"
          label="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className={classes.titleInput}
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
            style={{ color: image && "teal" }}
            component="span"
            size="small"
            className={classes.buttonImage}
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
        <Select
          value={category}
          label="Category"
          onChange={e => setCategory(e.target.value)}
          className={classes.categorySelect}
        >
          <MenuItem value={None}>Category</MenuItem>
          <MenuItem value={Auto}>Auto</MenuItem>
          <MenuItem value={Moto}>Moto</MenuItem>
          <MenuItem value={MTB}>MTB</MenuItem>
          <MenuItem value={RealEstate}>Real Estate</MenuItem>
        </Select>
      </div>
      <div className={classes.descriptionField}>
        <TextField
          name="price"
          label="Price in BTC"
          value={price}
          onChange={e => setPrice(e.target.value)}
          className={classes.priceInput}
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
    width: "100%",
    display: "flex",
    flexDirection: "column",
    paddingBottom: theme.spacing(1)
  },
  descriptionField: {
    width: "100%",
    marginBottom: 25,
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
  },
  categorySelect: {
    width: "50%",
  },
  titleInput: {
    width: "90%"
  },
  priceInput: {
    width: "50%",
  },
  buttonImage: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    marginLeft: 0
  }
});

export default withStyles(styles)(CreateItem);
