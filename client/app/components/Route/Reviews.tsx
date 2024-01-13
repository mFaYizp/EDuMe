import { styles } from "@/app/styles/style";
import Image from "next/image";
import React from "react";
import ReviewCard from "../Review/ReviewCard";

type Props = {};

export const reviews = [
  {
    name: "Gene Bates",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    profession: "Student | Cambridge university",
    comment:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem.",
  },
  {
    name: "Verna Santos",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    profession: "Full stack developer | Quarter ltd.",
    comment:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem.",
  },
  {
    name: "Jay Gibbs",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
    profession: "computer systems engineering student | Zimbabwe",
    comment:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem Lorem ipsum dolor sit amet consectetur adipisicing elit.amet consectetur adipisicing elit. Quisquam, quidem Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, Quisquam, quidem.",
  },
  {
    name: "Mina Davidson",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    profession: "Junior Web Developer | Indonesia",
    comment:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem.",
  },
  {
    name: "Rosemary Smith",
    avatar: "https://randomuser.me/api/portraits/women/3.jpg",
    profession: "Full stack web developer | Algeria",
    comment:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem.",
  },
  {
    name: "Laura Mckenzie",
    avatar: "https://randomuser.me/api/portraits/women/4.jpg",
    profession: "Full stack web developer | Canada",
    comment:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem.",
  },
];

const Reviews = (props: Props) => {
  return (
    <div className="w-[90%] 800px:w-[85%] m-auto">
      <div className="w-full 800px:flex items-center">
        <div className="800px:w-[50%] w-full">
          <Image
            src={require("../../../public/assets/hero2.png")}
            width={700}
            height={700}
            alt="business"
          />
        </div>
        <div className="800px:w-[50%] w-full">
          <h3 className={`${styles.title} 800px:!text-[40px]`}>
            Our Students Are <span className="text-gradient">Our Strength</span>{" "}
            <br /> See What They Say About Us
          </h3>
          <br />I
          <p className={styles.label}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque unde
            voluptatum dignissimos, nulla perferendis dolorem voluptate nemo
            possimus magni deleniti natus accusamus officiis quasi nihil
            commodi, praesentium quidem, quis doloribus?
          </p>
        </div>
        <br />
        <br />
      </div>
      <div className="grid grid-cols-1 gap-[25px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-2 lg:gap-[25px] xl:grid-cols-2 xl:gap-[35px] mb-12 border-0 md:[&>*:nth-child(3)]:!mt-[-10px] md: [&>*:nth-child(6)]:!mt-[-20px]">
        {reviews &&
          reviews.map((i, index) => <ReviewCard item={i} key={index} />)}
      </div>
    </div>
  );
};

export default Reviews;
