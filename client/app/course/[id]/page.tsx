"use client";
import React from "react";
import CourseDetailPage from "../../components/Course/CourseDetailPage";

type Props = {};

const Page = ({ params }: any) => {
  return (
    <div>
      <CourseDetailPage  id={params.id}/>
    </div>
  );
};

export default Page;
