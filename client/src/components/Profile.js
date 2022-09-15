import React, { useEffect, useState } from 'react'
import {
  ProfileContainer,
  ProfileForm,
  Username,
  ProfileHeader,
  Avatar,
  ProfileInput,
  ProfileLabel,
  PortfolioSubmit,
  ProfileFormContainer,
} from "./styles/profile";
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { login } from '../redux/user';
import {useNavigate} from 'react-router-dom'
import Cookies from 'js-cookie';
const Profile = () => {
    const user = useSelector((state) => state.user.value)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [avatarImage, setAvatarImage] = useState(null)
    useEffect(() => {
        if (!user.username) {
            navigate('/');
        }
        const getAvatar = async () => {
            const req = await fetch(
                `https://avatars.dicebear.com/api/bottts/${user.username}.svg`
                );
                const avatarUrl = await req.text()
                setAvatarImage(avatarUrl);
            }
            getAvatar();
    }, [])
    const [formData, setFormData] = useState({
      zip_code: user.zip_code,
    });
    const handleChange = (e) => {
        setFormData({...formData, [e.target.name] :e.target.value})
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        const req = await fetch(`http://127.0.0.1:3000/users/${user.id}`, {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData),
        });
        if (req.ok) {
            const data = await req.json()
            dispatch(login({ ...user, zip_code: data.zip_code}));
            
        }
    }
  return (
    <>
      
      <ProfileContainer>
        <ProfileHeader>
          <Avatar dangerouslySetInnerHTML={{ __html: avatarImage }}></Avatar>
          <Username>{user.username}</Username>
        </ProfileHeader>
        <ProfileFormContainer>

            <ProfileForm onSubmit={handleSubmit}>
            <div>
                <ProfileLabel>Zip Code</ProfileLabel>
                <ProfileInput
                name="zip_code"
                value={formData.zip_code}
                onChange={handleChange}
                />
            </div>
            
            <br />
            {/* <div>
                <ProfileLabel>Insurance</ProfileLabel>
                <ProfileInput
                name="insurance"
                value={formData.insurance}
                onChange={handleChange}
                />
            </div> */}
                <PortfolioSubmit type="submit" />
            </ProfileForm>
        </ProfileFormContainer>
      </ProfileContainer>
    </>
  );
}

export default Profile