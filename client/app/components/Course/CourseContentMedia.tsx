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
import {
  useAddAnswerInQuestionMutation,
  useAddNewQuestionMutation,
  useAddReplyInReviewMutation,
  useAddReviewInCourseMutation,
  useGetCourseDetailsQuery,
} from "@/redux/features/courses/courseApi";
import { format } from "timeago.js";
import { BiMessage } from "react-icons/bi";
import { VscVerifiedFilled } from "react-icons/vsc";
import Ratings from "@/app/utils/Ratings";

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
  const [questionId, setQuestionId] = useState("");
  const [isReviewReply, setIsReviewReply] = useState(false);
  const [reply, setReply] = useState("");
  const [reviewId, setReviewId] = useState("");

  const { data: courseData, refetch: refetchCourse } = useGetCourseDetailsQuery(
    id,
    { refetchOnMountOrArgChange: true }
  );
  const course = courseData?.course;
  const [
    addNewQuestion,
    { isSuccess, isLoading: questionCreationLoading, error },
  ] = useAddNewQuestionMutation();
  const [
    addAnswerInQuestion,
    {
      isSuccess: isAnswerSuccess,
      error: answerError,
      isLoading: answerCreationLoading,
    },
  ] = useAddAnswerInQuestionMutation();
  const [
    addReviewInCourse,
    {
      isSuccess: reviewSuccess,
      error: reviewError,
      isLoading: reviewCreationLoading,
    },
  ] = useAddReviewInCourseMutation();
  const [
    addReplyInReview,
    {
      isSuccess: reviewReplySuccess,
      error: reviewReplyError,
      isLoading: reviewReplyCreationLoading,
    },
  ] = useAddReplyInReviewMutation();

  const isReviewExist = course?.reviews?.find(
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

  const handleReviewSubmit = async (e: any) => {
    e.preventDefault();
    if (review.length === 0) {
      toast.error("Please fill the reviews");
    } else {
      addReviewInCourse({ review, rating, courseId: id });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setQuestion("");
      refetch();
      toast.success("Question added successfully!");
    }
    if (isAnswerSuccess) {
      setAnswer("");
      refetch();
      toast.success("Answer added successfully!");
    }
    if (reviewSuccess) {
      setReview("");
      setRating(1);
      refetchCourse();
      toast.success("Review added successfully!");
    }
    if (reviewReplySuccess) {
      setReply("");
      refetchCourse();
      setIsReviewReply(false)
      toast.success("Reply added successfully!");
    }
    if (reviewReplyError) {
      if ("data" in reviewReplyError) {
        const errorMessage = reviewReplyError as any;
        toast.error(errorMessage.data.message);
      }
    }
    if (answerError) {
      if ("data" in answerError) {
        const errorMessage = answerError as any;
        toast.error(errorMessage.data.message);
      }
    }
    if (error) {
      if ("data" in error) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }
    if (reviewError) {
      if ("data" in reviewError) {
        const errorMessage = reviewError as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [
    isSuccess,
    error,
    answerError,
    isAnswerSuccess,
    refetch,
    reviewError,
    reviewSuccess,
    refetchCourse,
    reviewReplySuccess,
    reviewReplyError,
  ]);

  const handleAnswerSubmit = () => {
    addAnswerInQuestion({
      answer,
      courseId: id,
      contentId: data[activeVideo]._id,
      questionId: questionId,
    });
  };

  const handleReviewReplySubmit = () => {
    if (!reviewCreationLoading) {
      if (reply.length === 0) {
        toast.error("Please fill the reply...");
      } else {
        addReplyInReview({
          courseId: id,
          comment: reply,
          reviewId,
        });
      }
    }
  };

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
              setQuestionId={setQuestionId}
              answerCreationLoading={answerCreationLoading}
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
                      placeholder="Write your review...."
                      cols={40}
                      rows={5}
                      onChange={(e) => setReview(e.target.value)}
                      className="outline-none bg-transparent ml-3 border border-[#ffffff57] 800px:w-full p-2 rounded w-[90%] 800px:text-[18px] font-Poppins text-black dark:text-white"
                    ></textarea>
                  </div>
                </div>
                <div className="w-full flex justify-end">
                  <div
                    className={`${
                      styles.button
                    } !w-[120px] !h-[40px] text-[18px] mt-5 800px:mr-0 mr-2 ${
                      reviewCreationLoading && "cursor-no-drop"
                    }`}
                    onClick={
                      reviewCreationLoading ? () => {} : handleReviewSubmit
                    }
                  >
                    Submit
                  </div>
                </div>
                <br />
                <br />
              </>
            )}
            <br />
            <div className="w-full h-[1px] bg-[#ffffff3b]"></div>
            <div className="w-full text-black dark:text-white">
              {(course?.reviews && [...course.reviews].reverse())?.map(
                (item: any, index: number) => (
                  <div className="w-full my-5" key={index}>
                    <div className="w-full flex ">
                      <div>
                        <Image
                          src={item.user.avatar ? item.user.avatar.url : Avatar}
                          alt="image"
                          width={40}
                          height={40}
                          className="h-[40px] w-[40px] object-cover rounded-[50%]"
                        />
                      </div>
                      <div className="ml-2">
                        <h1 className="text-[18px]">{item?.user.name}</h1>
                        <Ratings rating={item.rating} />
                        <p>{item.comment}</p>
                        <small className="text-[#ffffff83] dark:text-[#ffffff83]">
                          {format(item.createdAt)} •{" "}
                        </small>
                      </div>
                    </div>
                    {user.role === "admin" && (
                      <span
                        className={`${styles.label} !ml-10 cursor-pointer`}
                        onClick={() => {
                          setIsReviewReply(true), setReviewId(item._id);
                        }}
                      >
                        Add Reply{" "}
                      </span>
                    )}
                    {isReviewReply && (
                      <div className="w-full flex relative text-black dark:text-white">
                        <input
                          type="text"
                          value={reply}
                          onChange={(e) => setReply(e.target.value)}
                          placeholder="Enter your reply..."
                          className={`block 800px:ml-12  w-[95%] mt-2 outline-none bg-transparent border-b border-[#00000027] text-black dark:text-white dark:border-[#fff] p-[5px] 
`}
                        />
                        <button
                          type="submit"
                          className="absolute right-[-45px] bottom-1"
                          onClick={handleReviewReplySubmit}
                        >
                          Submit
                        </button>
                      </div>
                    )}
                    {
                      item.commentReplies.map((reply:any,index:number)=>(
                        <div
                className="w-full flex 800px:ml-16 my-5 text-black dark:text-white"
                key={index}
              >
                <div>
                  <Image
                    src={reply.user.avatar ? reply.user.avatar.url : Avatar}
                    alt="image"
                    width={40}
                    height={40}
                    className="w-[40px] h-[40px] object-cover rounded-[50%]"
                  />
                </div>
                <div className="pl-3">
                  <div className="flex items-center">
                    <h5 className="text-[20px]">{reply.user.name}</h5>
                    {item.user?.role === "admin" && (
                      <VscVerifiedFilled className="ml-2 text-[#52c952] text-[20px]" />
                    )}
                  </div>
                  <p>{reply.comment}</p>
                  <small className=" text-[#ffffff83]">
                    {format(reply.createdAt)}
                  </small>
                </div>
              </div>
                      ))
                    }
                  </div>
                )
              )}
            </div>
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
  answerCreationLoading,
  user,
  setQuestionId,
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
            setQuestionId={setQuestionId}
            handleAnswerSubmit={handleAnswerSubmit}
            answerCreationLoading={answerCreationLoading}
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
  setQuestionId,
  handleAnswerSubmit,
  answerCreationLoading,
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
            onClick={() => {
              setReplyActive(!replyActive), setQuestionId(item._id);
            }}
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
                    src={reply.user.avatar ? reply.user.avatar.url : Avatar}
                    alt="image"
                    width={40}
                    height={40}
                    className="w-[auto] h-[40px] object-cover rounded-[50%]"
                  />
                </div>
                <div className="pl-3">
                  <div className="flex items-center">
                    <h5 className="text-[20px]">{reply.user.name}</h5>
                    {item.user?.role === "admin" && (
                      <VscVerifiedFilled className="ml-2 text-[#52c952] text-[20px]" />
                    )}
                  </div>
                  <p>{reply.answer}</p>
                  <small className=" text-[#ffffff83]">
                    {format(reply.createdAt)}
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
                  className={`block 800px:ml-12  w-[95%] mt-2 outline-none bg-transparent border-b border-[#00000027] text-black dark:text-white dark:border-[#fff] p-[5px] ${
                    answer === "" ||
                    (answerCreationLoading && "cursor-not-allowed")
                  }`}
                />
                <button
                  type="submit"
                  className="absolute right-[-45px] bottom-1"
                  onClick={handleAnswerSubmit}
                  disabled={answer === "" || answerCreationLoading}
                >
                  Submit
                </button>
              </div>
              <br />
            </>
          </>
        )}
      </div>
    </>
  );
};
export default CourseContentMedia;
