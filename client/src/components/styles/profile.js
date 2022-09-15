import styled from "styled-components"
export const ProfileContainer = styled.div`
    margin-top: 65px;
    margin-left: 40px;
    padding: 0 100px;
    text-align: start;
    
    `
export const ProfileHeader = styled.div`
    display: flex;
    
    
`
export const Avatar = styled.div`
    width: 45px;
    height: 45px;
    border-radius: 32px;
    margin-right: 15px;
    margin-top: 15px;
`
export const Username = styled.h1`
text-transform: uppercase;
`
export const ProfileFormContainer = styled.div`
  margin: 0 auto;
  width: 1400px;
  height: 400px;
border: 2px solid black;
`;
export const ProfileForm = styled.form`
    
    display: flex;
    width: 400px;
    flex-direction: column;
    border-radius: 13px;
    padding: 48px 32px;
    margin: 0 auto;
    `;
export const ProfileLabel = styled.label`
    margin-right: 16px;
    font-weight: 800;
`
export const ProfileInput = styled.input`
    width: 125px;
    height: 35px;
    border-radius: 12px;

`
export const PortfolioSubmit = styled.input`
    width: 200px;
    height: 35px;
`