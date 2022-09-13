import React, {useRef} from 'react'
import {
  FormWrapper,
  FormTitle,
  FormContainer,
  InputContainer,
  TextInput,
  Label,
  SubmitButton,
} from "./styles/global";
const Form = ({title, inputs, handleSubmit}) => {
    // inputs is an array of objects that define the input tag.
    // each input should have a label, type
    

    const form = useRef(inputs.reduce((obj, input) => {
      
      if (input.type === 'text' || input.type === 'password') {
        obj[input.name] = ''
      }
      else {
        obj[input.name] = 0
      }
      return obj
    }, {}))
    
  return (
    <FormWrapper>
      <FormTitle>{title}</FormTitle>
      <FormContainer onSubmit={(e) => handleSubmit(e, form)} ref={form}>
        {inputs.map((input) => (
          <InputContainer key={input.label}>
            <Label>{input.label}</Label>
            <TextInput name={input.name} type={input.type} ref={form[input.name]}/>
          </InputContainer>
        ))}
        <SubmitButton type="submit" />
      </FormContainer>
    </FormWrapper>
  );
}

export default Form;