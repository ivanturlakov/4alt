import React from "react";
import withRoot from "../withRoot";
import Header from "../components/Header";
import Search from "../components/Search";
import Categories from "../components/Categories";
import ItemsList from "../components/ItemsList";

const Home = () => {
  return (
    <React.Fragment>
      <Header />
      <Categories />
      <Search />
      <ItemsList/>
    </React.Fragment>
  )
};

export default withRoot(Home);
