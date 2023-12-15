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

const Login: FC<Props> = ({}: Props) => {
  const [show, setShow] = useState(false);

  const formik = useFormik({
    initialValues:{email:'',password:''},
    validationSchema: schema,
    onSubmit:async({email,password})=>{console.log(email,password);
    }
  })

  const {errors,touched,values,handleSubmit,handleChange} =formik

  return( 
  <div className="w-full">
<h1 className={`${styles.title}`}></h1>
Login with elearning
  </div>);
};

export default Login;
