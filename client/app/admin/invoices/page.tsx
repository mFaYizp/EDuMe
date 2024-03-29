"use client";
import DashboardHero from "@/app/components/Admin/DashboardHero";
import AllUsers from "@/app/components/Admin/users/AllUsers";
import AdminSidebar from "@/app/components/Admin/sidebar/AdminSidebar";
import AdminProtected from "@/app/hooks/adminProtected";
import Heading from "@/app/utils/Heading";
import React from "react";
import AllInvoices from "@/app/components/Admin/Order/AllInvoices";

type Props = {};

const Page = (props: Props) => {
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
            <AllInvoices isDashboard={false} />
          </div>
        </div>
        <br />
        <br />
      </AdminProtected>
    </div>
  );
};

export default Page;
