import React from "react";
import Main from "../Main/Main";
import Banner from "../../components/Banner";
import Footer from "../Footer/Footer";
import Card from "../../components/Card";
import Trending from "../../components/Trending";
import Sport from "../../components/Sport";
import FAQ from "../../components/FAQ";
import { BestSellersProvider } from "../../components/context/BestSellersContext";
import { SportsProvider } from "../../components/context/SportsContext";

export default function Home() {
  return (
    <>
      <Main />
      <BestSellersProvider>
        <Card />
      </BestSellersProvider>
      <Banner />
      <Trending />
      <SportsProvider>
        <Sport />
      </SportsProvider>
      <FAQ />
      <Footer />
    </>
  );
}
