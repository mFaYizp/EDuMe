"use client";
import DashboardHero from "@/app/components/Admin/DashboardHero";
import AdminSidebar from "@/app/components/Admin/sidebar/AdminSidebar";
import AdminProtected from "@/app/hooks/adminProtected";
import Heading from "@/app/utils/Heading";
import AllCourses from "../../components/Admin/course/AllCourses";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <div>
      <AdminProtected>
        <Heading
          title={`EDuMe - Admin`}
          description="EDuMe is a platform for students to learn and get help from teachers"
          keywords="Programming,MERN,Redux"
        />
        <div className="flex h-screen">
          <div className="1500px:w-[16%] w-1/5">
            <AdminSidebar />
          </div>
          <div className="w-[85%]">
            <DashboardHero />
            <AllCourses />
          </div>
        </div>
      </AdminProtected>
    </div>
  );
};

export default page;
