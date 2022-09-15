import React, { useState } from "react";
import {
  FormWrapper,
  FormTitle,
  FormContainer,
  InputContainer,
  TextInput,
  Label,
  SubmitButton,
} from "../styles/auth-forms";
// useDispatch can edit our redux store while useSelector will read the store
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import {login} from '../../redux/user'
import Cookies from "js-cookie";

const LoginForm = () => {


  const dispatch = useDispatch()
  const user = useSelector((state) => state.user.value)
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });
  const [errors, setErrors] = useState(null)
  if (user.id) {
    return <Navigate to="/" replace />;
  }

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name] : e.target.value})
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const req = await fetch("http://127.0.0.1:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(formData),
    })
    const data = await req.json()
      
    if (req.ok) {
      console.log("user", data);
      console.log("token", data.token);
      Cookies.set("token", data.token);
      dispatch(
        login({
          id: data.user.id,
          username: data.user.username,
          email: data.user.email,
        })
      );
    } else {
      setErrors(data.errors[0])
    }
  };
  return (
    <FormWrapper>
      <FormTitle>Login</FormTitle>
      <FormContainer onSubmit={handleSubmit}>
        <InputContainer>
          <Label>Username</Label>
          <TextInput onChange={handleChange} name="username" type="text" />
        </InputContainer>
        <InputContainer>
          <Label>Password</Label>
          <TextInput onChange={handleChange} name="password" type="password" />
        </InputContainer>

        <SubmitButton type="submit" />
        {errors}
      </FormContainer>
    </FormWrapper>
  );
};

export default LoginForm;
