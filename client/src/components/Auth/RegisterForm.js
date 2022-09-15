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
  if (user.username) {
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
      dispatch(login(data.user));
    } else {
      setErrors(data.errors)
    }
  };

  return (
    <FormWrapper>
      <FormTitle>Register</FormTitle>
      <FormContainer onSubmit={handleSubmit}>
        <InputContainer>
          <Label>Username</Label>
          <TextInput
            required
            name="username"
            type="text"
            onChange={handleChange}
          />
        </InputContainer>
        <InputContainer>
          <Label>Email</Label>
          <TextInput name="email" type="email" onChange={handleChange} />
        </InputContainer>
        <InputContainer>
          <Label>Password</Label>
          <TextInput
            required
            name="password"
            type="password"
            onChange={handleChange}
          />
        </InputContainer>
        <InputContainer>
          <Label>Password Confirmation</Label>
          <TextInput
            required
            name="password_confirmation"
            type="password"
            onChange={handleChange}
          />
        </InputContainer>
        <InputContainer>
          <Label>Zip Code</Label>
          <TextInput
            name="zip_code"
            type="text"
            minLength={5}
            maxLength={9}
            onChange={handleChange}
          />
        </InputContainer>
        <SubmitButton type="submit" />
        {errors && errors.map(e => <p key={e}>{e}</p>)}
      </FormContainer>
    </FormWrapper>
  );

};

export default RegisterForm;
