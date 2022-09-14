import React, { useRef } from "react";
import {
  FormWrapper,
  FormTitle,
  FormContainer,
  InputContainer,
  TextInput,
  Label,
  SubmitButton,
} from "../styles/global";
import { useDispatch } from "react-redux";
const RegisterForm = () => {
  // inputs is an array of objects that define the input tag.
  // each input should have a label, type

  const form = useRef({
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(form.current);
    console.log("data", data);
    fetch("http://127.0.0.1:3000/register", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((r) => r.json())
      .then((data) => console.log(data));
  };

  return (
    <FormWrapper>
      <FormTitle>Register</FormTitle>
      <FormContainer onSubmit={handleSubmit} ref={form}>
        <InputContainer>
          <Label>Username</Label>
          <TextInput name="username" type="text" ref={form.username} />
        </InputContainer>
        <InputContainer>
          <Label>Email</Label>
          <TextInput name="email" type="email" ref={form.email} />
        </InputContainer>
        <InputContainer>
          <Label>Password</Label>
          <TextInput name="password" type="password" ref={form.password} />
        </InputContainer>
        <InputContainer>
          <Label>Password Confirmation</Label>
          <TextInput
            name="password_confirmation"
            type="password"
            ref={form.password_confirmation}
          />
        </InputContainer>
        <SubmitButton type="submit" />
      </FormContainer>
    </FormWrapper>
  );
};

export default RegisterForm;
