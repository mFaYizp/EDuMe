"use client";
import React, { useState } from "react";
import Heading from "../utils/Heading";
import Header from "../components/Header";
import Footer from "../components/Route/Footer";
import FAQ from "../components/Route/FAQ";

type Props = {};

const Page = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(4);
  const [route, setRoute] = useState("Login");
  return (
    <div className="min-h-screen">
      <Heading
        title="Policy - EDuMe"
        description="EDuMe is a learning management system for helping programmers."
        keywords="programming, mern"
      />
      <Header
        open={open}
        setOpen={setOpen}
        setRoute={setRoute}
        activeItem={activeItem}
        route={route}
      />
      <br />
      <FAQ/>
      <br />
      <Footer />
    </div>
  );
};

export default Page;
