import React, {useEffect} from 'react';
import Wrapper from "../../components/wrapper/Wrapper";
import HelmetComponent from "../../components/react-helmet/HelmetComponent";
import {NavLink, useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getCategoryListingsAction} from "../../store/actions/listings";
import {FaLocationDot} from "react-icons/fa6";
import {IoCall} from "react-icons/io5";

const {REACT_APP_URL, REACT_APP_API_URL} = process.env;

function CategoryListings() {
    const categoryListings = useSelector(store => store?.listings?.categoryListings);
    const category = useSelector(store => store?.listings?.categoryPath);
    const params = useLocation();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCategoryListingsAction(params.pathname));
    }, [params.pathname]);

    const handleNavigation = (city, state, country) => {
        const locationQuery = `${city},${state},${country}`;
        const mapsUrl = `https://www.google.com/maps/place/${encodeURIComponent(locationQuery)}`;
        window.open(mapsUrl, '_blank');
    };

    return (
        <Wrapper>
            <HelmetComponent
                title={category?.meta_seo_title}
                description={`This is a ${category?.title} page`}
                // href={`${REACT_APP_URL}${params?.pathname}`}
                // social_title={category?.meta_seo_title}
                // social_description={category?.meta_seo_description}
                // social_image={`${REACT_APP_API_URL}/categories_img/${category?.categories_img}`}
            />
            <div className="business-banner">
                <section className="page-title-banner listing-banner" style={category?.categories_img && {
                    backgroundImage: `url(${REACT_APP_API_URL}/categories_img/${category?.categories_img})`,
                    backgroundRepeat: 'no-repeat',
                    width: '100%',
                    height: '450px',
                    display: 'flex',
                    alignItems: 'center'
                }}>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 col-md-12">
                                <h1 className="big-header-capt capti">{category?.title}</h1>
                                <h4 className="big-header-h4">{category?.banner_description}</h4>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <div className="container">
                <div className="row">
                    <div className='business-title'>
                        <h2>{category?.page_title}</h2>
                        <h3>{category?.title_description}</h3>
                        <p> {category?.description}</p>
                        <span>{category?.small_description}</span>
                    </div>

                </div>
                <div className="row">
                    {categoryListings && categoryListings.length ?
                        categoryListings?.map(listing =>
                            <div className="col-lg-4 col-md-6 col-sm-12" key={listing.id}>
                                <div className="Reveal-grid-wrapper">
                                    <div className="Reveal-grid-thumb">
                                        <div className="Reveal-listing-price-info">
                                            {/*<span className="pricetag">{listing?.status}</span>*/}
                                        </div>
                                        <div className="lup-category">
                                            <NavLink
                                                to={`#`}>
                                                {category?.title}
                                            </NavLink>
                                        </div>
                                        <NavLink to={`/${listing?.title?.replaceAll(' ', '-').toLowerCase()}/`}
                                                 className="lup-box">
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
                                                    to={`/${listing?.title?.replaceAll(' ', '-').toLowerCase()}/`}>{listing?.title}</NavLink>
                                            </h4>
                                        </div>
                                        <div className="Reveal-grid-caption-body">
                                            <ul className="Reveal-contact-list">
                                                {listing?.['location_id.city'] ?
                                                    <li
                                                        onClick={() => handleNavigation(listing?.['location_id.city'],listing?.['location_id.state_code'], listing?.['location_id.country_code'])}
                                                    ><FaLocationDot
                                                        style={{marginRight: '3px'}}/>{listing?.['location_id.city']}, {listing?.['location_id.state_code']}, {listing?.['location_id.country_code']}
                                                    </li>
                                                    : null}
                                                <a href={`tel:${listing?.phone_number}`}>
                                                    <li>
                                                        <IoCall style={{marginRight: '3px'}}/>{listing?.phone_number}
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
        </Wrapper>

    );
}

export default CategoryListings;