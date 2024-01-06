"use client";
import Heading from "@/app/utils/Heading";
import AdminSidebar from "../../../../app/components/Admin/sidebar/AdminSidebar";
import React from "react";
import EditCourse from "../../../../app/components/Admin/course/EditCourse";
import DashboardHeader from "../../../../app/components/Admin/DashboardHeader";

type Props = {};

const page = ({params}:any) => {
    const id = params?.id
  return (
    <div>
      <Heading
        title={`EDuMe - Admin`}
        description="EDuMe is a platform for students to learn and get help from teachers"
        keywords="Programming,MERN,Redux"
      />
      <div className="flex ">
        <div className="1500px:w-[16%] w-1/5">
          <AdminSidebar />
        </div>
        <div className="w-[85%] ">
          <DashboardHeader />
          <EditCourse id={id}/>
        </div>
      </div>
    </div>
  );
};

export default page;
