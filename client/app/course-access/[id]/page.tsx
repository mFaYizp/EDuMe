"use client";
import Loader from "@/app/components/Loader/Loader";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import { redirect } from "next/navigation";
import React, { FC, useEffect } from "react";
import CourseContent from "../../components/Course/CourseContent";

type Props = { params: any };

const Page: FC<Props> = ({ params }) => {
  const id = params.id;

  const { isLoading, data, error } = useLoadUserQuery(undefined, {});

  useEffect(() => {
    if (data) {
      const isPurchased = data?.user.courses?.find(
        (item: any) => item._id == id
      );

      if (!isPurchased) {
        console.log("red");
        redirect("/");
      }
      if (error) {
        console.log(error);
        redirect("/");
      }
    }
  }, [data, error]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <CourseContent id={id} />
        </div>
      )}
    </>
  );
};

export default Page;
