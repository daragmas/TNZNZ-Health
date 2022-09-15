import styled from "styled-components";
export const FormWrapper = styled.div`
  margin: 4em auto;
  width: 600px;
  height: 700px;
  border: 2px solid black;
  border-radius: 32px;
  box-shadow: 5px 10px;
  padding: 45px 25px;
`;
export const FormTitle = styled.h1`
  font-size: 2em;
  margin: auto;
`;
export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  height: 360px;
  width: 500px;
  margin: 21px auto;
  padding: 52px 16px;
`;
export const InputContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 16px 0;
`;
export const Label = styled.div`
  padding: 10px 0 0 0;
  font-weight: bold;
  width: 120px;
`;
export const TextInput = styled.input`
  width: 285px;
  height: 45px;
`;
export const SubmitButton = styled.input`
  width: 225px;
  height: 48px;
  font-size: 1.3em;
  padding: 0.2em 1em;
  margin: auto;
  margin-top: 22px;
  background-color: #62cbb2;
  border-radius: 32px;
  cursor: pointer;
`;
