"use client";
import Heading from "@/app/utils/Heading";
import AdminSidebar from "../../../app/components/Admin/sidebar/AdminSidebar";
import React from "react";
import EditFaq from "../../../app/components/Admin/Customization/EditFaq";
import DashboardHeader from "@/app/components/Admin/DashboardHeader";

type Props = {};

const page = (props: Props) => {
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
          <EditFaq />
        </div>
      </div>
    </div>
  );
};

export default page;
