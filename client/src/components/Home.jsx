import { HomeContainer } from "./styles/home-styles";
import Navbar from "./Navbar";
import ekg from './video/ekg.mp4';

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
                <h2>What We Do:</h2>
                <h3>TNZNZ Health is in the business of providing accurate data to YOU. If you are uninsured or underinsured or just need to have a better understanding of medical billing, we're here to help. Below,you can search based on your providers suggestions to find the best pricing for similar procedures at the hospitals in your area.</h3>
                <p>Disclaimer: if you are experiencing a medical emergency, dial 911 or seek help immediately</p>
                <p>Disclaimer: no information provided here is guaranteed, this service exists to provide estimates of medical costs and assist in the effort at reducing avoidable medical debt</p>
                <h1>DO IT FOR GEORGE</h1>
            </div>
        </HomeContainer>
    )
}

export default Home;