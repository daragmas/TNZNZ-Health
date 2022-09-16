import styled from 'styled-components'

export const HomeContainer1 = styled.div`
        position: relative;
        display: flex;
        background-color: #aff1da;
        width: 100%;
        padding-left: 5em;
        `

export const HomeContainer2 = styled.div`
        position: relative;
        display: flex;
        background-color: #ffcfdf;
      width: 100%;
      padding-right: 5em;
`

export const HomeContainer3 = styled.div`
        position: relative;
        /* display: flex; */
      background-color: #b0f3f1;
      width: 100%;
      padding: 5em;
      margin: 5px;
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
    background-color: #b0f3f1;
    bottom: 0;
    margin: 15px;
   /* transform: translate(10vw); */
`