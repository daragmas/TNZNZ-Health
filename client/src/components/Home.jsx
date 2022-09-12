import { HomeContainer, Text, Disclaimer, Button, Image, Footer } from "./styles/home-styles";
import ekg from './media/ekg.mp4';
import { Link } from 'react-router-dom'
import DocPic from './media/docPic.jpg'


const Home = () => {
    return (
        <div style={{ height: '100vh' }} >

            <div style={{ display: 'flex' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img style={{ height: '40vh', marginRight: '-5em', marginTop: '5em' }} src={DocPic} />
                    <HomeContainer>

                        <div>
                            <Text>What We Do:</Text>
                            <Text>TNZNZ Health is in the business of providing accurate data to YOU. If you are uninsured or underinsured or just need to have a better understanding of medical billing, we're here to help. Below, you can search based on your providers advice to find the best pricing for similar procedures at the hospitals in your area.</Text>

                            <Disclaimer>Disclaimer: if you are experiencing a medical emergency, dial 911 or seek help immediately</Disclaimer>

                            <Disclaimer>Disclaimer: no information provided here is guaranteed, this service exists to provide estimates of medical costs and assist in the effort at reducing avoidable medical debt</Disclaimer>

                        </div>
                    </HomeContainer >
                </div>

            </div>
            {/* <video
                className='Video'
                autoPlay
                loop
                muted
            >
                <source src={ekg} type='video/mp4' />
            </video> */}
            <div style={{ display: 'flex', gap: '15em', marginLeft: '14%' }}>
                <HomeContainer>
                    <Text>
                        Currently, TNZNZ Health is able to provide accurate data on medical pricing for some of the largest hospital systems in the New York Metropolitan area. TNZNZ is hoping to expand its services and grow its database to continually provide you with the best experience possible
                    </Text>
                </HomeContainer>
                <div>


                    <Link
                        className='Link' to='/search'>
                    </Link>

                    <Image src="https://img.icons8.com/cotton/344/hospital--v3.png" />

                    <Link to='/search'>
                        <Text>Start Here!</Text>
                    </Link>


                </div>
            </div>


            <Footer>
                <Text>
                    Site by: Tomer, Nate, Z, Nick, Zach
                </Text>
            </Footer>
        </div>

    )
}

export default Home;