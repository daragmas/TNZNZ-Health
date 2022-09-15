import styled from 'styled-components'

export const HomeContainer = styled.div`
        position: relative;
      background-color: #ccc;
      width: 50vw;
      transform: translate(10vw);
      border-radius:10px;
      padding: 10px;
      margin: 20px;

`

export const Text = styled.h1`

    color: black;
    font-size:1.5em;
    z-index:2;

`

export const Disclaimer = styled.p`
    color: red;
    font-size:1.1em;
`

export const Button = styled.button`
    
    width: 50vw;
    height: 5vh;
    background-color: #54BAB9;
    border-radius: 5px;
    border: none;
    cursor:pointer;
    :hover {
        background-color: #9ED2C6;
        color: #9ED2C6;
    }
    
`
export const Image = styled.img`
    position: relative;
    /* left: 50%;
    top: 50%;
    transform: translate(-50%, -50%); */
    
    height: 150px;
    width: 150px;
    margin: 20px;    
`

export const Footer = styled.div`
    width: auto;
    height: auto;
    background-color: #ccc;
    bottom: 0;
   /* transform: translate(10vw); */
`