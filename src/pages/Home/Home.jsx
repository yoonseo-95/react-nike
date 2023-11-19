import React from "react";
import Main from "../Main/Main";
import Banner from "../../components/Banner";
import Footer from "../Footer/Footer";
import Card from "../../components/Card";
import Trending from "../../components/Trending";
import Sport from "../../components/Sport";
import BasicMap from "../../components/BasicMap";
import FAQ from "../../components/FAQ";

export default function Home() {
  return (
    <>
      <Main />
      <Card />
      <Banner />
      <Trending />
      <Sport />
      <BasicMap />
      <FAQ />
      <Footer />
    </>
  );
}
