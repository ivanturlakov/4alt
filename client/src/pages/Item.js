import React from "react";
import withRoot from "../withRoot";
import Header from "../components/Header";
import Breadcrumbs from "../components/Breadcrumbs";
import ItemDescription from "../components/ItemDescription";


const Item = () => {
  return (
    <React.Fragment>
      <Header />
      <Breadcrumbs />
      <ItemDescription />
    </React.Fragment>
  )
};

export default withRoot(Item);
