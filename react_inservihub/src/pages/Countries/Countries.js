import React from 'react';
import Wrapper from "../../components/wrapper/Wrapper";
import HelmetComponent from "../../components/react-helmet/HelmetComponent";
import socialImage from "../../assets/img/bannerImage.jpg";
import {useSelector} from "react-redux";
import {NavLink} from "react-router-dom";
const {REACT_APP_URL, REACT_APP_API_URL} = process.env;

function Countries() {
    const allCountries = useSelector(store => store?.countries?.allCountries)
    return (
        <Wrapper>
            <HelmetComponent
                title={'Countries | InServiHub'}
                description={"This is a Countries page"}
                // href={`${REACT_APP_URL}/countries/`}
                // social_title={'Countries | InServiHub'}
                // social_description={'Find the Right Business around you'}
                // social_image={`https://erida-design.com${socialImage}`}
            />
            <div className="image-cover hero-banner" data-overlay="6">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 col-md-12">
                            <h1 className="big-header-capt capti">Businesses around you</h1>
                            <h4 className="big-header-h4">Navigate the Business World: Find, Connect, Grow – Locally &
                                Beyond</h4>
                        </div>
                    </div>
                </div>
            </div>
            <section>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 col-md-12">
                            <div className="sec-heading center">
                                <h2>Listings</h2>
                                <h3>All Listed <span>Countries</span></h3>
                            </div>
                        </div>
                    </div>
                    <div className="row countries_component">
                        {allCountries && allCountries?.length ?
                            allCountries?.map(country =>
                                <div className="col-lg-5 col-md-5 country_container" key={country?.id}>
                                    <NavLink to={`/${country?.country_name?.replaceAll(' ', '-').toLowerCase()}/`}>
                                        <h4>{country.country_name}</h4>
                                        <img
                                            loading="lazy"
                                            alt={country?.country_name}
                                            className="img-fluid"
                                            title={country?.country_name}
                                            src={`${REACT_APP_API_URL}/countries/${country?.country_code?.toLowerCase()}.jpg`}
                                        />
                                    </NavLink>
                                </div>
                            )
                            : null}
                    </div>
                </div>
            </section>
        </Wrapper>
    );
}

export default Countries;