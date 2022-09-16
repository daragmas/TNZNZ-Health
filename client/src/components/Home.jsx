import { HomeContainer, Text, Disclaimer, Button, Image, Footer } from "./styles/home-styles";
import dust from './media/dust.mp4';
import { Link } from 'react-router-dom'
import DocPic from './media/docPic.jpg'


const Home = () => {
    return (
        <div >
            <div>
                <video
                    className='Video'
                    autoPlay
                    loop
                    muted
                >
                    <source src={dust} type='video/mp4' />
                </video>
            </div>
            <div className="homepage">
                {/* <div > */}
                <div className="title-container">
                    <div className="title">
                        TranspareNZ
                    </div>
                </div>


                <HomeContainer>


                    <Text>What We Do:</Text>
                    <Text>TNZNZ Health is in the business of providing accurate data to YOU. If you are uninsured or underinsured or just need to have a better understanding of medical billing, we're here to help. Below, you can search based on your providers advice to find the best pricing for similar procedures at the hospitals in your area.</Text>

                    <Disclaimer>Disclaimer: if you are experiencing a medical emergency, dial 911 or seek help immediately</Disclaimer>

                    <Disclaimer>Disclaimer: no information provided here is guaranteed, this service exists to provide estimates of medical costs and assist in the effort at reducing avoidable medical debt</Disclaimer>


                </HomeContainer >
                {/* </div> */}

            </div>




            <div>
                <HomeContainer>
                    <Text>
                        Currently, TNZNZ Health is able to provide accurate data on medical pricing for some of the largest hospital systems in the New York Metropolitan area. TNZNZ is hoping to expand its services and grow its database to continually provide you with the best experience possible
                    </Text>
                </HomeContainer>
                <div>


                    <Link
                        className='Link' to='/TNZNZ-Health/search'>
                    </Link>

                    <Image src="https://img.icons8.com/cotton/344/hospital--v3.png" />

                    <Link to='/TNZNZ-Health/search'>
                        <Text>Start Here!</Text>
                    </Link>


                </div>
            </div>

            <HomeContainer>
                <Text>What is Hospital Price Transparency?</Text>

                <Text>"Hospital price transparency helps Americans know the cost of a hospital item or service before receiving it. Starting January 1, 2021, each hospital operating in the United States will be required to provide clear, accessible pricing information online about the items and services they provide in two ways: <br /><br />

                    1. As a comprehensive machine-readable file with all items and services.<br /><br />
                    2. In a display of shoppable services in a consumer-friendly format.<br /><br />

                    This information will make it easier for consumers to shop and compare prices across hospitals and estimate the cost of care before going to the hospital."</Text>
                <p>Source: <a target="_blank" href="https://www.cms.gov/hospital-price-transparency">Centers for Medicare & Medicaid Services </a></p>
            </HomeContainer>

            <HomeContainer>
                <Text>Where Do We Get Our Data?</Text>
                <Text>
                    Thanks to those who have advocated for patients rights and the Center for Medicare & Medicaid Services, medical pricing data has become publicly available. Unfortunately, much of that data, while available, is not very accessible or easy to read. That is why we at TranspareNZ have decided to go through that data for you in an attempt to get you the best, most accurate medical pricing available. <br /><br />
                    Our data comes directly from the hospitals we have listed, which will be growing as we grow.
                </Text>

            </HomeContainer>

            <HomeContainer>
                <Text>How Do I Use This Website?</Text>
                <Text>
                    Begin by going to the "Start Here!" link. Go ahead and enter the CPT code provided by your doctor for your needed procedure or search through our list of the most commonly used codes. Once you've entered or clicked on a code and clicked submit, enter your zip code and hit submit again. Then click on your hospital of choice and follow the instructions on screen to get the most accurate data available!
                </Text>
            </HomeContainer>

            <Footer>
                <Text>
                    Site by: Tomer, Nate, Z, Nick, Zach
                </Text>
            </Footer>
        </div>

    )
}

export default Home;