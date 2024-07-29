import React, {useEffect} from 'react';
import HelmetComponent from "../../components/react-helmet/HelmetComponent";
import Wrapper from "../../components/wrapper/Wrapper";
import '../../assets/css/main.css';
import {NavLink} from "react-router-dom";
import {getFeaturedListingsAction} from "../../store/actions/listings";
import {useDispatch, useSelector} from "react-redux";
import {FaLocationDot} from "react-icons/fa6";
import {IoCall} from "react-icons/io5";
import {getLastBlogsAction} from "../../store/actions/blogs";
import socialImage from '../../assets/img/bannerImage.jpg';
import {useForm} from "react-hook-form";

const {REACT_APP_URL, REACT_APP_API_URL} = process.env;

function Home() {
    const featuredListings = useSelector((store) => store?.listings?.featuredListings)
    const searchedListings = useSelector((store) => store?.listings?.searchedListings)
    const lastBlogs = useSelector((store) => store?.blogs?.lastBlogs)
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
    } = useForm();

    useEffect(() => {
        dispatch(getFeaturedListingsAction())
        dispatch(getLastBlogsAction())
    }, []);

    const handleSearch = async (data) => {
        const searchText = data.searchValue;
        dispatch(getFeaturedListingsAction(searchText))
    }
    const handleNavigation = (city, state, country) => {
        const locationQuery = `${city},${state},${country}`;
        const mapsUrl = `https://www.google.com/maps/place/${encodeURIComponent(locationQuery)}`;
        window.open(mapsUrl, '_blank');
    };
    return (
        <Wrapper>
            <HelmetComponent
                title={'Home | InServiHub'}
                description={"This is a Home page"}
                // href={REACT_APP_URL}
                // social_title={'Home | InServiHub'}
                // social_description={'Find the Right Business around you'}
                // social_image={`https://erida-design.com${socialImage}`}
            />
            <div className="image-cover hero-banner" data-overlay="6">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 col-md-12">
                            <h1 className="big-header-capt capti">Find the Right Business around you</h1>
                            <h4 className="big-header-h4">Navigate the Business World: Find, Connect, Grow – Locally &
                                Beyond</h4>
                            <div className="full-search-2 Reveal-search Reveal-search-radius box-style">
                                <div className="Reveal-search-content">
                                    <form onSubmit={handleSubmit(handleSearch)}>
                                        <div className="row">

                                            <div className="col-lg-10 col-md-8 col-sm-6 br-left-p">
                                                <div className="form-group">
                                                    <div className="input-with-icon">
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder={"Keywords..."}
                                                            {...register('searchValue')}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-2 col-md-4 col-sm-6">
                                                <div className="form-group">
                                                    <button
                                                        className="btn search-btn"
                                                        type="submit"
                                                    >
                                                        Search
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {searchedListings && searchedListings.length
                ?
                <section style={{scrollBehavior: 'smooth', transition: 'all 5000ms ease in'}}>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 col-md-12">
                                <div className="sec-heading center">
                                    <h3>Searched<span> Businesses</span></h3>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            {searchedListings && searchedListings.length ?
                                searchedListings?.map(listing =>
                                    <div className="col-lg-4 col-md-6 col-sm-12" key={listing.id}>
                                        <div className="Reveal-grid-wrapper">
                                            <div className="Reveal-grid-thumb">
                                                <div className="Reveal-listing-price-info">
                                                    <span className="pricetag">{listing?.status}</span>
                                                </div>
                                                <div className="lup-category">
                                                    <NavLink
                                                        to={`/${listing?.['category_id.title']?.replaceAll(' ', '-').toLowerCase()}/`}>{listing?.['category_id.title']}</NavLink>
                                                </div>
                                                <NavLink to={`/${listing?.title?.replaceAll(' ', '-').toLowerCase()}/`}
                                                         className="lup-box">
                                                    <img
                                                        loading="lazy"
                                                        alt={listing?.title}
                                                        className="img-fluid"
                                                        title={listing?.title}
                                                        src={`${REACT_APP_API_URL}/listings_cover_img/${listing.cover_img}`}
                                                    />
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
                                                                >
                                                                    <FaLocationDot
                                                                        style={{marginRight: '3px'}}/>{listing?.['location_id.city']}, {listing?.['location_id.state_code']}, {listing?.['location_id.country_code']}
                                                                </li>
                                                            : null}
                                                        <a href={`tel:${listing?.phone_number}`}>
                                                            <li>
                                                                <IoCall
                                                                    style={{marginRight: '3px'}}/>{listing?.phone_number}
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
                : null}
            <section>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 col-md-12">
                            <div className="sec-heading center">
                                <h2>Featured</h2>
                                <h3>Top Rated <span>Businesses</span></h3>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {featuredListings && featuredListings.length ?
                            featuredListings?.map(listing =>
                                <div className="col-lg-4 col-md-6 col-sm-12" key={listing.id}>
                                    <div className="Reveal-grid-wrapper">
                                        <div className="Reveal-grid-thumb">
                                            <div className="Reveal-listing-price-info">
                                                <span className="pricetag">{listing?.status}</span>
                                            </div>
                                            <div className="lup-category">
                                                <NavLink
                                                    to={`/${listing?.['category_id.title']?.replaceAll(' ', '-').toLowerCase()}/`}>{listing?.['category_id.title']}</NavLink>
                                            </div>
                                            <NavLink to={`/${listing?.title?.replaceAll(' ', '-').toLowerCase()}/`}
                                                     className="lup-box">
                                                <img
                                                    loading="lazy"
                                                    alt={listing?.title}
                                                    className="img-fluid"
                                                    title={listing?.title}
                                                    src={`${REACT_APP_API_URL}/listings_cover_img/${listing.cover_img}`}
                                                />
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
                                                            >
                                                                <FaLocationDot
                                                                    style={{marginRight: '3px'}}/>{listing?.['location_id.city']}, {listing?.['location_id.state_code']}, {listing?.['location_id.country_code']}
                                                            </li>
                                                            : null}
                                                    <a href={`tel:${listing?.phone_number}`}>
                                                        <li>
                                                            <IoCall
                                                                style={{marginRight: '3px'}}/>{listing?.phone_number}
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
                    <div className="all-posts-btn-container">
                        <NavLink to="/featured-businesses/" className="nav-link-button">
                            <button className="all-posts-btn">See All Featured</button>
                        </NavLink>
                    </div>
                </div>
            </section>
            <section>
                <div className="container">
                    <div className="row">
                        <div className="col text-center">
                            <div className="sec-heading center">
                                <h2> Articles</h2>
                                <h3> Our Latest <span>Articles & News</span></h3>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {lastBlogs && lastBlogs.length ?
                            lastBlogs?.map(blog =>
                                <div className="col-lg-4 col-md-4 col-sm-12" key={blog?.id}>
                                    <div className="Reveal-blog-wrap-grid">
                                        <div className="Reveal-blog-thumb">
                                            <NavLink to={`/${blog?.preview_url}/`}>
                                                <img
                                                    loading="lazy"
                                                    alt={blog?.title}
                                                    title={blog?.title}
                                                    className="img-fluid"
                                                    src={blog?.blog_img && `${REACT_APP_API_URL}/blogs_logo/${blog?.blog_img}`}
                                                />
                                            </NavLink>
                                        </div>
                                        <div className="Reveal-blog-info">
                                        </div>
                                        <div className="Reveal-blog-body height-250">
                                            <h4 className="bl-title">
                                                <NavLink to={`/${blog?.preview_url}/`}>
                                                    {blog?.title}
                                                </NavLink>
                                            </h4>
                                            <p>
                                                {blog?.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>)
                            : null}
                        <div className="all-posts-btn-container">
                            <NavLink to="/blog" className="nav-link-button">
                                <button className="all-posts-btn">See All Posts</button>
                            </NavLink>
                        </div>
                    </div>
                </div>
            </section>
        </Wrapper>
    );
}

export default Home;