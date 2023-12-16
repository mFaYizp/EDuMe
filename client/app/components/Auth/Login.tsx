import React, { FC, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiFillGithub,
} from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { styles } from "../../../app/styles/style";

type Props = {
  setRoute: (route: string) => void;
};

const schema = Yup.object().shape({
  email: Yup.string().email("Invalid email!").required("Please enter email!"),
  password: Yup.string().required("Please enter password").min(6),
});

const Login: FC<Props> = ({setRoute}: Props) => {
  const [show, setShow] = useState(false);

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: schema,
    onSubmit: async ({ email, password }) => {
      console.log(email, password);
    },
  });

  const { errors, touched, values, handleSubmit, handleChange } = formik;

  return (
    <div className="w-full">
      <h1 className={`${styles.title}`}>Login with elearning</h1>
      <form onSubmit={handleSubmit}>
        <label className={`${styles.label}`} htmlFor="email">
          Enter you email
        </label>
        <input
          type="email"
          name=""
          value={values.email}
          onChange={handleChange}
          id="email"
          placeholder="mail@gmail.com"
          className={`${
            errors.email && touched.email && "border-red-500"
          }${styles.input}`}
        />
        {errors.email && touched.email &&(
            <span className="text-red-500 pt-2 block">{errors.email}</span>
        )}
        <div className="w-full mt-5 relative mb-1">
        <label className={`${styles.label}`} htmlFor="password">
          Enter you password
        </label>
        <input type={!show ? 'password':'text'} name="" id="" />
        </div>
      </form>
    </div>
  );
};

export default Login;
