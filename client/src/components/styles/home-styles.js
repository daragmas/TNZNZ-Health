import styled from 'styled-components'

export const HomeContainer = styled.div`
        position: relative;
        display: flex;
      background-color: #03C8A8;
      width: 100%;
      /* transform: translate(10vw); */
      padding-left: 5em;
      margin-bottom: 20px;
      /* margin-left: 50%; */
      /* transform: translate(-50%); */
      

`

export const Text = styled.h1`

    color: white;
    font-size:1.5em;
    z-index:2;
    letter-spacing: 0.05em;

`

export const Disclaimer = styled.p`
    color: black;
    font-size:1.3em;
    font-weight: bold;

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


export const Footer = styled.div`
    width: auto;
    height: auto;
    background-color: #ccc;
    bottom: 0;
   /* transform: translate(10vw); */
`