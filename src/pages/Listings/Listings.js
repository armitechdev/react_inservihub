import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import Wrapper from "../../components/wrapper/Wrapper";
import {getAllListingsAction} from "../../store/actions/listings";
import HelmetComponent from "../../components/react-helmet/HelmetComponent";
import {IoCall} from "react-icons/io5";
import {FaLocationDot} from "react-icons/fa6";
import {NavLink} from "react-router-dom";
import socialImage from '../../assets/img/bannerImage.jpg';

const {REACT_APP_URL, REACT_APP_API_URL} = process.env;

function Listings() {
    const allListings = useSelector(store => store?.listings?.allListings)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllListingsAction())
    }, []);

    const handleNavigation = (city, state, country) => {
        const locationQuery = `${city},${state},${country}`;
        const mapsUrl = `https://www.google.com/maps/place/${encodeURIComponent(locationQuery)}`;
        window.open(mapsUrl, '_blank');
    };

    return (
        <Wrapper>
            <HelmetComponent
                title={'Listings | InServiHub'}
                description={"This is a Listings page"}
                // href={`${REACT_APP_URL}/listings/`}
                // social_title={'Businesses Around You'}
                // social_description={'Navigate the Business World: Find, Connect, Grow – Locally & Beyond'}
                // social_image={`https://erida-design.com${socialImage}`}
            />
            <div className="image-cover hero-banner" data-overlay="6">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 col-md-12">
                            <h1 className="big-header-capt capti">Businesses around you</h1>
                            <h4 className="big-header-h4"> Navigate the Business World: Find, Connect, Grow – Locally &
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
                                <h3>All Listed <span>Businesses</span></h3>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        {allListings && allListings.length ?
                            allListings?.map(listing =>
                                <div className="col-lg-4 col-md-6 col-sm-12" key={listing.id}>
                                    <div className="Reveal-grid-wrapper">
                                        <div className="Reveal-grid-thumb">
                                            <div className="Reveal-listing-price-info">
                                                {/*<span className="pricetag">{listing?.status}</span>*/}
                                            </div>
                                            <div className="lup-category">
                                                <NavLink
                                                    to={listing?.category_id?.title && `/${listing?.category_id?.title?.replaceAll(' ', '-').toLowerCase()}/`}>{listing?.category_id?.title}</NavLink>
                                            </div>
                                            <NavLink
                                                to={listing?.title && `/${listing?.title?.replaceAll(' ', '-').toLowerCase()}/`}>
                                                <img
                                                    src={listing?.cover_img && `${REACT_APP_API_URL}/listings_cover_img/${listing?.cover_img}`}
                                                    className="img-fluid"
                                                    alt={listing?.title}/>
                                            </NavLink>
                                        </div>
                                        <div className="Reveal-grid-caption">
                                            <div className="Reveal-grid-caption-header">
                                                <h4 className="Reveal-header-title">
                                                    <NavLink
                                                        to={listing?.title && `/${listing?.title?.replaceAll(' ', '-').toLowerCase()}/`}>{listing?.title}</NavLink>
                                                </h4>
                                            </div>
                                            <div className="Reveal-grid-caption-body">
                                                <ul className="Reveal-contact-list">
                                                    {listing?.location_id?.city ?
                                                        <li
                                                            onClick={() => handleNavigation(listing?.location_id?.city, listing?.location_id?.state_code, listing?.location_id?.country_code)}
                                                        >
                                                            <FaLocationDot
                                                        style={{marginRight: '3px'}}/>{listing?.location_id?.city}, {listing?.location_id?.state_code}, {listing?.location_id?.country_code}
                                                    </li> : null}
                                                    <a href={`tel:${listing?.phone_number}`}>
                                                        <li>
                                                            <IoCall style={{marginRight: '3px'}}/>
                                                            {listing?.phone_number}
                                                        </li>
                                                    </a>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : null
                        }
                    </div>
                </div>
            </section>
        </Wrapper>
    );
}

export default Listings;