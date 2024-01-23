import { useGetCourseContentQuery } from "@/redux/features/courses/courseApi";
import React, { FC, useState } from "react";
import Loader from "../Loader/Loader";
import Heading from "@/app/utils/Heading";
import CourseContentMedia from "./CourseContentMedia";
import Header from "../Header";

type Props = {
  id: string;
};

const CourseContent: FC<Props> = ({ id }) => {
  const { data: contentData, isLoading } = useGetCourseContentQuery(id);
  const [open, setOpen] = useState(false);
  const [route, setRoute] = useState("Login");
  const data = contentData?.content;

  const [activeVideo, setActiveVideo] = useState(0);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Header
            activeItem={1}
            open={open}
            setOpen={setOpen}
            route={route}
            setRoute={setRoute}
          />
          <div className="w-full grid 800px:grid-cols-10">
            <Heading
              title={data[activeVideo]?.title}
              description="anything"
              keywords={data[activeVideo]?.tags}
            />
            <div className="col-span-7">
              <CourseContentMedia
                data={data}
                setActiveVideo={setActiveVideo}
                id={id}
                activeVideo={activeVideo}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CourseContent;
