"use client";
import { styles } from "@/app/styles/style";
import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
import Image from "next/image";
import React, { FC, useEffect, useState } from "react";

type Props = {
  active: number;
  setActive: (active: number) => void;
  courseInfo: any;
  setCourseInfo: (courseInfo: any) => void;
};

const CourseInformation: FC<Props> = ({
  active,
  setCourseInfo,
  courseInfo,
  setActive,
}) => {
  const [dragging, setDragging] = useState(false);

  const { data } = useGetHeroDataQuery("Categories");
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    if (data) {
      setCategories(data?.layout?.categories);
    }
  }, [data]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setActive(active + 1);
  };

  const handleFileChange = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        if (reader.readyState === 2) {
          setCourseInfo({ ...courseInfo, thumbnail: reader.result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e: any) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    setDragging(false);

    const file = e.dataTransfer.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setCourseInfo({ ...courseInfo, thumbnail: reader.result });
      };
      reader.onerror = (error) => {
        console.error("Error reading the file:", error);
        // Handle the error, perhaps set a state indicating an issue with the file.
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-[80%] m-auto mt-24">
      <form onSubmit={handleSubmit}>
        <div>
          <label className={`${styles.label}`}>Course Name</label>
          <input
            type="name"
            name=""
            id="name"
            required
            value={courseInfo.name}
            onChange={(e: any) =>
              setCourseInfo({ ...courseInfo, name: e.target.value })
            }
            placeholder="MERN stack LMS platform with next 14"
            className={`${styles.input}`}
          />
        </div>
        <br />
        <div className="mb-5">
          <label className={`${styles.label}`}>Course Description</label>
          <textarea
            name=""
            cols={30}
            rows={8}
            id="name"
            required
            value={courseInfo.description}
            onChange={(e: any) =>
              setCourseInfo({ ...courseInfo, description: e.target.value })
            }
            placeholder="Write something amazing...."
            className={`${styles.input} !h-min !py-2`}
          ></textarea>
        </div>
        <br />
        <div className="w-full flex justify-between">
          <div className="w-[45%]">
            <label className={`${styles.label}`}>Course Price</label>
            <input
              type="number"
              name=""
              id="price"
              required
              value={courseInfo.price}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, price: e.target.value })
              }
              placeholder="29"
              className={`${styles.input}`}
            />
          </div>
          <div className="w-[45%]">
            <label className={`${styles.label}`}>
              Estimated Price(optional)
            </label>
            <input
              type="number"
              name=""
              id="price"
              value={courseInfo.estimatedPrice}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, estimatedPrice: e.target.value })
              }
              placeholder="79"
              className={`${styles.input}`}
            />
          </div>
        </div>
        <br />
        <div className="w-full flex justify-between">
          <div className="w-[45%]">
            <label className={`${styles.label}`}>Course Tags</label>
            <input
              type="text"
              name=""
              id="name"
              required
              value={courseInfo.tags}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, tags: e.target.value })
              }
              placeholder="MERN, LMS, next14, tailwindCss, websocket"
              className={`${styles.input}`}
            />
          </div>
          <div className="w-[45%]">
            <label className={`${styles.label}`}>Course categories</label>
            <select
              name=""
              id=""
              className={`${styles.input}`}
              value={courseInfo.categories}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, categories: e.target.value })
              }
            >
              <option value="">Select category</option>
              {categories.map((item: any) => (
                <option value={item.title} key={item._id}>
                  {item.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        <br />
        <div className="w-full flex justify-between">
          <div className="w-[45%]">
            <label className={`${styles.label}`}>Course Level</label>
            <input
              type="text"
              name=""
              id="level"
              required
              value={courseInfo.level}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, level: e.target.value })
              }
              placeholder="Beginner/Intermediate/Expert"
              className={`${styles.input}`}
            />
          </div>
          <div className="w-[45%]">
            <label className={`${styles.label}`}>Demo Url</label>
            <input
              type="text"
              name=""
              id="demo url"
              value={courseInfo.demoUrl}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, demoUrl: e.target.value })
              }
              placeholder="eer7f4"
              className={`${styles.input}`}
            />
          </div>
        </div>
        <br />
        <div className="w-full">
          <input
            type="file"
            accept="image/*"
            id="file"
            className="hidden"
            onChange={handleFileChange}
          />
          <label
            htmlFor="file"
            className={`[w-full min-h-[10vh] dark:border-white border-[#00000026] p-3 border flex items-center justify-center ${
              dragging ? "bg-blue-500" : "bg-transparent"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {courseInfo.thumbnail ? (
              <img
                src={courseInfo.thumbnail}
                alt="thumbnail"
                className="mx-h-full w-full object-cover"
              />
            ) : (
              <span className="text-black dark:text-white">
                Drag and Drop your thumbnail here or click browse
              </span>
            )}
          </label>
        </div>
        <div className="w-full flex items-center justify-end">
          <input
            type="submit"
            value="Next"
            className="w-full 800px:w-[180px] h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
          />
        </div>
        <br />
        <br />
      </form>
    </div>
  );
};

export default CourseInformation;
