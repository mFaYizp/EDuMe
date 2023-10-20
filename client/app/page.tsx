"use client";

import { FC, useState } from "react";
import Heading from "./utils/Heading";
import Header from "./components/Headers";
import Hero from "./components/Route/Hero";

interface Props {}

const Page: FC<Props> = (props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  return (
    <div>
      <Heading
        title="EDuMe"
        description="EDuMe is a platform for students to learn and get help from teachers"
        keywords="Programming,MERN,Redux"
      />
      <Header open={open} setOpen={setOpen} activeItem={activeItem} />
      <Hero/>
    </div>
  );
};

export default Page;
