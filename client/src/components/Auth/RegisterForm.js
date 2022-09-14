import React, { useState } from "react";
import {
  FormWrapper,
  FormTitle,
  FormContainer,
  InputContainer,
  TextInput,
  Label,
  SubmitButton,
} from "../styles/global";
import {Navigate} from 'react-router-dom'
import { useSelector} from 'react-redux'
import { useDispatch } from "react-redux";
import { login } from "../../redux/user";
import Cookies from "js-cookie";
const RegisterForm = () => {
  
  const user = useSelector((state) => state.user.value)
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  if (user.id) {
    return <Navigate to="/" replace />;
  }
  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]:e.target.value})
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    
    fetch("http://127.0.0.1:3000/register", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((r) => r.json())
      .then((data) => {
        Cookies.set('token', data.token)
        dispatch(login({id: data.user.id, username: data.user.username, email: data.user.email}))
      });
  };

  
    return (
      <FormWrapper>
        <FormTitle>Register</FormTitle>
        <FormContainer onSubmit={handleSubmit}>
          <InputContainer>
            <Label>Username</Label>
            <TextInput onChange={handleChange} name="username" type="text" />
          </InputContainer>
          <InputContainer>
            <Label>Email</Label>
            <TextInput onChange={handleChange} name="email" type="email" />
          </InputContainer>
          <InputContainer>
            <Label>Password</Label>
            <TextInput
              onChange={handleChange}
              name="password"
              type="password"
            />
          </InputContainer>
          <InputContainer>
            <Label>Password Confirmation</Label>
            <TextInput
              onChange={handleChange}
              name="password_confirmation"
              type="password"
            />
          </InputContainer>
          <SubmitButton type="submit" />
        </FormContainer>
      </FormWrapper>
    );
};

export default RegisterForm;
