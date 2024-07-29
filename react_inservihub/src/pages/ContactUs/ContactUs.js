import React from 'react';
import HelmetComponent from "../../components/react-helmet/HelmetComponent";
import Wrapper from "../../components/wrapper/Wrapper";
import {SlUser} from "react-icons/sl";
import {TfiHeadphoneAlt} from "react-icons/tfi";
import ContactUsForm from "../../components/contact-us-form/ContactUsForm";
import socialImage from "../../assets/img/bannerImage.jpg";

const {REACT_APP_URL} = process.env;

function Contact() {
    return (
        <Wrapper>
            <HelmetComponent
                title={'Contact Us | InServiHub'}
                description={"This is a Contact Us page"}
                // href={`${REACT_APP_URL}/contact-us/`}
                // social_title={'Contact Us | InServiHub'}
                // social_description={'Way to Your Business Success'}
                // social_image={`https://erida-design.com${socialImage}`}
            />
            <div className="image-cover hero-banner" data-overlay="6">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 col-md-12">
                            <h1 className="big-header-capt capti">Contact Us</h1>
                            <h4 className="big-header-h4"> Way to Your Business Success</h4>
                        </div>
                    </div>
                </div>
            </div>
            <section className="gray">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 col-md-4 col-sm-12">
                            <div className="contact-box">
                                <SlUser/>
                                <h4 className="contact-h4">Contact Sales</h4>
                                <p>sales@inservihub.com</p>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-12">
                            <div className="contact-box">
                                <SlUser/>
                                <h4 className="contact-h4">Contact Support</h4>
                                <p>support@inservihub.com</p>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-12">
                            <div className="contact-box">
                                <TfiHeadphoneAlt/>
                                <h4 className="contact-h4">Call Us</h4>
                                <p>+1 (559) 512-1084</p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-7 col-md-7">
                            <ContactUsForm/>
                        </div>
                        <div className="col-lg-5 col-md-5">
                            <div className="contact-info-map">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d423284.04421745276!2d-118.74139821924948!3d34.020608445637436!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2c75ddc27da13%3A0xe22fdf6f254608f4!2sLos%20Angeles%2C%20CA%2C%20USA!5e0!3m2!1sen!2sam!4v1700383500916!5m2!1sen!2sam"
                                    width="100%" height="450" allowFullScreen=""
                                    aria-hidden="false" title="Google Map" tabIndex="0"></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Wrapper>
    );
}

export default Contact;