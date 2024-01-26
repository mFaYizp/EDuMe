import { styles } from "@/app/styles/style";
import CoursePlayer from "@/app/utils/CoursePlayer";
import Image from "next/image";
import React, { FC, useEffect, useState } from "react";
import {
  AiFillStar,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineStar,
} from "react-icons/ai";
import Avatar from "../../../public/assets/avatar.png";
import toast from "react-hot-toast";
import { useAddNewQuestionMutation } from "@/redux/features/courses/courseApi";
import { format } from "timeago.js";
import { BiMessage } from "react-icons/bi";

type Props = {
  data: any;
  setActiveVideo: (activeVideo: number) => void;
  id: string;
  activeVideo: number;
  user: any;
  refetch: any;
};

const CourseContentMedia: FC<Props> = ({
  data,
  setActiveVideo,
  id,
  activeVideo,
  user,
  refetch,
}) => {
  const [activeBar, setActiveBar] = useState(0);
  const [question, setQuestion] = useState("");
  const [rating, setRating] = useState(1);
  const [review, setReview] = useState("");
  const [answer, setAnswer] = useState("");
  const [answerId, setAnswerId] = useState("");

  const [
    addNewQuestion,
    { isSuccess, isLoading: questionCreationLoading, error },
  ] = useAddNewQuestionMutation();

  const isReviewExist = data?.reviews?.find(
    (item: any) => item.user._id == user?._id
  );

  const handleQuestion = async (e: any) => {
    e.preventDefault();
    if (question.length === 0) {
      toast.error("Please fill the questions");
    } else {
      addNewQuestion({
        question,
        courseId: id,
        contentId: data[activeVideo]._id,
      });
    }
  };

  const handleReview = async (e: any) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (isSuccess) {
      setQuestion("");
      refetch();
      toast.success("Question added successfully!");
    }
    if (error) {
      if ("data" in error) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [isSuccess, error]);

  const handleAnswerSubmit = () => {};

  return (
    <div className="w-[95%] 800px:w-[86%] py-4 m-auto">
      <CoursePlayer
        title={data[activeVideo]?.title}
        videoUrl={data[activeVideo]?.videoUrl}
      />
      <div className="w-full flex items-center justify-between my-3">
        <div
          className={`${
            styles.button
          } !w-[unset] text-white !min-h-[40px] !py-[unset] ${
            activeVideo === 0 && "!cursor-no-drop opacity-[.8]"
          }`}
          onClick={() =>
            setActiveVideo(activeVideo === 0 ? 0 : activeVideo - 1)
          }
        >
          <AiOutlineArrowLeft className="mr-2" />
          Prev Lesson
        </div>
        <div
          className={`${
            styles.button
          } !w-[unset] text-white !min-h-[40px] !py-[unset] ${
            data.length - 1 === activeVideo && "!cursor-no-drop opacity-[.8]"
          }`}
          onClick={() =>
            setActiveVideo(
              data && data.length - 1 === activeVideo
                ? activeVideo
                : activeVideo + 1
            )
          }
        >
          Next Lesson
          <AiOutlineArrowRight className="ml-2" />
        </div>
      </div>
      <h1 className="pt-2 text-black dark:text-white text-[25px] font-[600]">
        {data[activeVideo].title}
      </h1>
      <br />
      <div className="w-full text-black dark:text-white p-4 flex items-center justify-between bg-slate-500 bg-opacity-20 backdrop-blur shadow-[bg-slate-700] rounded shadow-inner">
        {["Overview", "Resources", "Q&A", "Reviews"].map((text, index) => (
          <h5
            key={index}
            className={`text-[20px] cursor-pointer ${
              activeBar === index
                ? "text-red-500"
                : "text-black dark:text-white"
            }`}
            onClick={() => setActiveBar(index)}
          >
            {text}
          </h5>
        ))}
      </div>
      <br />
      {activeBar === 0 && (
        <p className="text-black dark:text-white text-[18px] whitespace-pre-line mb-3">
          {data[activeVideo].description}
        </p>
      )}

      {activeBar === 1 && (
        <div>
          {data[activeVideo]?.links.map((item: any, index: number) => (
            <div className="mb-5" key={index}>
              <h2 className="text-[20px] 800px:inline-block text-black dark:text-white">
                {item.title && item.title + " :"}
              </h2>
              <a
                className="inline-block text-[#4395c4] 800px:text-[20px] 800px:pl-2"
                href={item.url}
              >
                {item.url}
              </a>
            </div>
          ))}
        </div>
      )}

      {activeBar === 2 && (
        <>
          <div className="flex w-full">
            <Image
              src={user.avatar ? user.avatar.url : Avatar}
              alt="image"
              width={50}
              height={50}
              className="w-[50px] h-[50px] object-cover rounded-[50%]"
            />
            <textarea
              name=""
              id=""
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              cols={40}
              rows={5}
              placeholder="Write your question...."
              className="outline-none bg-transparent ml-3 border border-[#3b3a3ab8] dark:border-[#ffffff57] 800px:w-full p-2 rounded w-[90%] 800px:text-[18px] font-Poppins text-black dark:text-white"
            ></textarea>
          </div>
          <div className="w-full flex justify-end">
            <div
              className={`${
                styles.button
              } !w-[120px] !h-[40px] text-[18px] mt-5 ${
                questionCreationLoading && "cursor-not-allowed"
              }`}
              onClick={questionCreationLoading ? () => {} : handleQuestion}
            >
              Submit
            </div>
          </div>
          <br />
          <br />
          <div className="w-full h-[1px] bg-[#3b3a3ab8]  dark:bg-[#ffffff3b]"></div>
          <div>
            {/* Question reply */}
            <CommentReply
              data={data}
              activeVideo={activeVideo}
              answer={answer}
              setAnswer={setAnswer}
              handleAnswerSubmit={handleAnswerSubmit}
              user={user}
              setAnswerId={setAnswerId}
            />
          </div>
        </>
      )}

      {activeBar === 3 && (
        <div className="w-full">
          <>
            {!isReviewExist && (
              <>
                <div className="flex w-full">
                  <Image
                    src={user.avatar ? user.avatar.url : Avatar}
                    alt="image"
                    width={50}
                    height={50}
                    className="w-[50px] h-[50px] object-cover rounded-[50%]"
                  />
                  <div className="w-full">
                    <h5 className="pl-3 text-[20px] text-[500] text-black dark:text-white ">
                      Give a rating <span className="text-red-500 ">*</span>
                    </h5>
                    <div className="flex w-full ml-2 pb-3">
                      {[1, 2, 3, 4, 5].map((i) =>
                        rating >= i ? (
                          <AiFillStar
                            key={i}
                            className="mr-1 cursor-pointer"
                            color="rgb(246, 186, 0)"
                            size={25}
                            onClick={() => setRating(i)}
                          />
                        ) : (
                          <AiOutlineStar
                            key={i}
                            className="mr-1 cursor-pointer"
                            color="rgb(246, 186, 0)"
                            size={25}
                            onClick={() => setRating(i)}
                          />
                        )
                      )}
                    </div>
                    <textarea
                      name=""
                      id=""
                      value={review}
                      cols={40}
                      rows={5}
                      onChange={(e) => setReview(e.target.value)}
                      className="outline-none bg-transparent ml-3 border border-[#ffffff57] 800px:w-full p-2 rounded w-[90%] 800px:text-[18px] font-Poppins text-black dark:text-white"
                    ></textarea>
                  </div>
                </div>
                <div className="w-full flex justify-end">
                  <div
                    className={`${styles.button} !w-[120px] !h-[40px] text-[18px] mt-5 800px:mr-0 mr-2`}
                    onClick={handleReview}
                  >
                    Submit
                  </div>
                </div>
                <br />
                <br />
              </>
            )}
          </>
        </div>
      )}
    </div>
  );
};

const CommentReply = ({
  data,
  activeVideo,
  answer,
  setAnswer,
  handleAnswerSubmit,
  user,
  setAnswerId,
}: any) => {
  return (
    <>
      <div className="w-full">
        {data[activeVideo].questions.map((item: any, index: any) => (
          <CommentItem
            key={index}
            data={data}
            activeVideo={activeVideo}
            item={item}
            index={index}
            answer={answer}
            setAnswer={setAnswer}
            handleAnswerSubmit={handleAnswerSubmit}
          />
        ))}
      </div>
    </>
  );
};

const CommentItem = ({
  data,
  activeVideo,
  item,
  answer,
  setAnswer,
  handleAnswerSubmit,
}: any) => {
  const [replyActive, setReplyActive] = useState(false);
  return (
    <>
      <div className="my-4 text-black dark:text-white">
        <div className="flex mb-2">
          <Image
            src={item.user.avatar ? item.user.avatar.url : Avatar}
            alt="image"
            width={50}
            height={50}
            className="w-[50px] h-[50px] object-cover rounded-[50%]"
          />
          <div className="pl-3">
            <h5 className="text-[20px]">{item?.user.name}</h5>
            <p>{item?.question}</p>
            <small className="dark:text-[#ffffff83] text-[#3b3a3ab8]">
              {!item?.createdAt ? "" : format(item?.createdAt)} •
            </small>
          </div>
        </div>
        <div className="w-full flex">
          <span
            className="800px:pl-16 text-[#3b3a3ab8] dark:text-[#ffffff83] cursor-pointer mr-2"
            onClick={() => setReplyActive(!replyActive)}
          >
            {!replyActive
              ? item.questionReplies.length !== 0
                ? "All Replies"
                : "Add Replies"
              : "Hide Replies"}
          </span>
          <BiMessage
            size={20}
            className="cursor-pointer text-[#3b3a3ab8] dark:text-[#ffffff83]"
          />
          <span className="pl-1 mt-[-4px] cursor-pointer  text-[#ffffff83]">
            {item.questionReplies.length}
          </span>
        </div>
        {replyActive && (
          <>
            {item.questionReplies.map((reply: any, index: number) => (
              <div
                className="w-full flex 800px:ml-16 my-5 text-black dark:text-white"
                key={index}
              >
                <div>
                  <Image
                    src={item.user.avatar ? item.user.avatar.url : Avatar}
                    alt="image"
                    width={50}
                    height={50}
                    className="w-[50px] h-[50px] object-cover rounded-[50%]"
                  />
                </div>
                <div className="pl-2">
                  <h5 className="text-[20px]">{item.user.name}</h5>
                  <p>{item.comment}</p>
                  <small className=" text-[#ffffff83]">
                    {format(item.createdAt)}
                  </small>
                </div>
              </div>
            ))}
            <>
              <div className="w-full flex relative text-black dark:text-white">
                <input
                  type="text"
                  placeholder="Enter your answer..."
                  value={answer}
                  onChange={(e: any) => setAnswer(e.target.value)}
                  className="block 800px:ml-12  w-[95%] mt-2 outline-none bg-transparent border-b border-[#00000027] text-black dark:text-white dark:border-[#fff] p-[5px]"
                />
                <button
                  type="submit"
                  className="absolute right-0 bottom-1"
                  onClick={handleAnswerSubmit}
                  disabled={answer === ""}
                >
                  Submit
                </button>
              </div>
            </>
          </>
        )}
      </div>
    </>
  );
};
export default CourseContentMedia;
