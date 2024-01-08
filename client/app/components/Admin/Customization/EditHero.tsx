import { styles } from "@/app/styles/style";
import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
import React, { FC, useEffect, useState } from "react";
import { AiOutlineCamera } from "react-icons/ai";

type Props = {};

const EditHero: FC<Props> = () => {
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const { data } = useGetHeroDataQuery("Banner", {
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (data) {
      setTitle(data?.layout?.banner.title);
      setSubtitle(data?.layout?.banner.subtitle);
      setImage(data?.layout?.banner?.image?.url);
    }
  }, [data]);

  const handleUpdate = (e: any) => {};
  const handleEdit = () => {};

  return (
    <>
      <div className="w-full 1000px:flex items-center">
        <div className="absolute top-[100px] 1000px:top-[unset] 1500px:h-[700px] 1500px:w-[700px] 1100px:h-[600px] 1100px:w-[600px] h-[50vh] w-[50vh] hero_animation rounded-[50%] 1100px:left-[18rem] 1500px:left-[21rem]"></div>
        <div className="1000px:w-[30%] flex  1000px:min-h-screen items-center justify-end pt-[70px] 1000px:pt-[0] z-10 ">
          <div className="relative flex items-center justify-end">
            <img
              src={image}
              alt="Hero"
              className="object-contain 1100px:max-w-[90%] w-[100%] 1500px:max-w-[85%] h-[auto] z-[10]"
            />
            <input
              type="file"
              name=""
              id="banner"
              accept="image/*"
              onChange={handleUpdate}
              className="hidden"
            />
            <label htmlFor="banner" className="absolute bottom-0 right-0 z-20">
              <AiOutlineCamera className="dark:text-white text-black text-[18px] cursor-pointer" />
            </label>
          </div>
        </div>

        <div className="1000px:w-[60%] flex flex-col items-center 1000px:mt-[0px] text-center 1000px:text-left mt-[150px]">
          <textarea
            className="dark:text-white resize-none text-[#000000c7] text-[30px] px-3 w-full 1000px:text-[60px] 1500px:text-[70px] bg-transparent"
            placeholder="Improve Your Online Learning Experience Better Instantly"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            rows={4}
          />
          <br />
          <textarea
            className="dark:text-[#edfff4] font-josefin text-[#000000ac] font-[600] text-[18px] 1500px:!w-[55%] 1100px:!w-[74%] bg-transparent"
            value={subtitle}
            placeholder="We have 40k+ Online courses & 500K+ Online registered student. Find your desired Courses from them."
            onChange={(e) => setSubtitle(e.target.value)}
          ></textarea>
          <br />
          <br />
          <br />
          <div
            className={`${
              styles.button
            } !w-[100px] !min-h-[40px] !h-[40px] dark:text-white text-black Dbg-[#cccccc34]${
              data?.layout?.banner?.title !== title ||
              data?.layout?.banner?.subtitle !== subtitle ||
              data?.layout?.banner?.image?.url !== image
                ? "!cursor-pointer !bg-[#42d383]"
                : "!cursor-not-allowed"
            }!rounded absolute bottom-12 right-12`}
            onClick={
              data?.layout?.banner?.title !== title ||
              data?.layout?.banner?.subtitle !== subtitle ||
              data?.layout?.banner?.image?.url !== image
                ? handleEdit
                : () => null
            }
          >
            Save
          </div>
        </div>
      </div>
    </>
  );
};

export default EditHero;
