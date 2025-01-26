import React from 'react';
import Banner from './Banner';
import Testimonials from './Testimonials';
import ContactUs from './ContactUs';
import {Helmet} from "react-helmet";

const Home = () => {
    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Home - BloodDonate</title>
            </Helmet>
            <Banner/>
            <Testimonials/>
            <ContactUs/>
        </div>
    );
};

export default Home;