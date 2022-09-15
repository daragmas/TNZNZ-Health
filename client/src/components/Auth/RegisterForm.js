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
    zip_code: ""
  });
  const [errors, setErrors] = useState(null)
  if (user.id) {
    return <Navigate to="/" replace />;
  }
  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]:e.target.value})
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const req = await fetch("http://127.0.0.1:3000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(formData),
    })
    const data = await req.json();
    if (req.ok) {
      Cookies.set('token', data.token)
      dispatch(login({id: data.user.id, username: data.user.username, email: data.user.email}))
    } else {
      setErrors(data.errors)
    }
  };

  return (
    <FormWrapper>
      <FormTitle>Register</FormTitle>
      <FormContainer onSubmit={handleSubmit} ref={form}>
        <InputContainer>
          <Label>Username</Label>
          <TextInput required name="username" type="text" ref={form.username} />
        </InputContainer>
        <InputContainer>
          <Label>Email</Label>
          <TextInput name="email" type="email" ref={form.email} />
        </InputContainer>
        <InputContainer>
          <Label>Password</Label>
          <TextInput
            required
            name="password"
            type="password"
            ref={form.password}
          />
        </InputContainer>
        <InputContainer>
          <Label>Password Confirmation</Label>
          <TextInput
            required
            name="password_confirmation"
            type="password"
            ref={form.password_confirmation}
          />
        </InputContainer>
        <InputContainer>
          <Label>Zip Code</Label>
          <TextInput
            name="zip_code"
            type="text"
            minLength={5}
            maxLength={9}
            ref={form.password_confirmation}
          />
        </InputContainer>
        <SubmitButton type="submit" />
      </FormContainer>
    </FormWrapper>
  );

};

export default RegisterForm;
