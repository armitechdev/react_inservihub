import React from 'react';
import HelmetComponent from "../components/react-helmet/HelmetComponent";
import Wrapper from "../components/wrapper/Wrapper";
import notFoundImg from '../assets/img/404.png'
import '../assets/css/main.css';
import socialImage from "../assets/img/bannerImage.jpg";
const {REACT_APP_URL} = process.env;
function Page404() {
    return (
        <Wrapper>
            <HelmetComponent
                title={'404'}
                description={"This is a 404 page"}
                // href={`${REACT_APP_URL}/404`}
            />
            <div className="image-cover hero-banner" data-overlay="6">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 col-md-12">
                            <h1 className="big-header-capt capti">404</h1>
                            <h4 className="big-header-h4">Page Not Found</h4>
                        </div>
                    </div>
                </div>
            </div>
            <section>
                <div className="container">
                    <div className="row">
                        <div className="container_notfound">
                            <img
                                loading="lazy"
                                alt={'404'}
                                className="img-fluid"
                                title={'404 Page not found'}
                                src={notFoundImg}
                                style={{width: '50%', height: '400px'}}
                            />
                        </div>
                    </div>
                </div>
            </section>
        </Wrapper>
    );
}

export default Page404;