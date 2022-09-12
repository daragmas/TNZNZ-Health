import { HomeContainer, Text, Disclaimer, Button } from "./styles/home-styles";
import Navbar from "./Navbar";
import ekg from './video/ekg.mp4';
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <HomeContainer>
            <Navbar />
            <video
                className='Video'
                autoPlay
                loop
                muted
            >
                <source src={ekg} type='video/mp4' />
            </video>

            <div>
                <Text>What We Do:</Text>
                <Text>TNZNZ Health is in the business of providing accurate data to YOU. If you are uninsured or underinsured or just need to have a better understanding of medical billing, we're here to help. Below,you can search based on your providers suggestions to find the best pricing for similar procedures at the hospitals in your area.</Text>

                <Disclaimer>Disclaimer: if you are experiencing a medical emergency, dial 911 or seek help immediately</Disclaimer>

                <Disclaimer>Disclaimer: no information provided here is guaranteed, this service exists to provide estimates of medical costs and assist in the effort at reducing avoidable medical debt</Disclaimer>
                <Text>*DO IT FOR GEORGE*</Text>
            </div>
            <Link
                className='Link' to='/search'>
                <Button>Search by Location</Button>
            </Link>
        </HomeContainer >
    )
}

export default Home;