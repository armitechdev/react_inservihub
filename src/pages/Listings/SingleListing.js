import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import Wrapper from "../../components/wrapper/Wrapper";
import {getSingleFeaturedListingAction} from "../../store/actions/listings";
import {IoCallOutline, IoLocationOutline, IoMailOutline} from "react-icons/io5";
import {FaLocationDot} from "react-icons/fa6";
import {NavLink, useLocation} from "react-router-dom";
import {TfiDirection, TfiWorld} from "react-icons/tfi";
import {days} from "../../services/staticData/staticDays";
import {IoIosCheckmark} from "react-icons/io";
import HelmetComponent from "../../components/react-helmet/HelmetComponent";
import dummyLogo from '../../assets/img/dummy_image.jpg'

const {REACT_APP_API_URL, REACT_APP_URL} = process.env;

function SingleListing() {
    const allListings = useSelector(store => store?.listings?.allListings)
    const singleListing = useSelector(store => store?.listings?.singleFeaturedListing)
    const dispatch = useDispatch();
    const params = useLocation();
    const fullPath = params?.pathname && params?.pathname?.replaceAll('-', ' ')?.replaceAll('/', '',)
    const filteredListing = allListings?.filter(i => i?.title?.toLowerCase() == fullPath)

    useEffect(() => {
        dispatch(getSingleFeaturedListingAction(filteredListing[0].id))
    }, []);

    const handleNavigation = (city, state, country, address) => {
        const locationQuery = address ? `${address},${city},${state},${country}` : `${city},${state},${country}`;
        const mapsUrl = `https://www.google.com/maps/place/${encodeURIComponent(locationQuery)}`;
        window.open(mapsUrl, '_blank');
    };

    return (
        <Wrapper>
            <HelmetComponent
                title={singleListing?.meta_seo_title}
                description={`This is a ${singleListing?.title} page`}
                // href={`${REACT_APP_URL}/${singleListing?.title?.replaceAll(' ', '-')?.toLowerCase()}/`}
                // social_title={singleListing?.meta_seo_title}
                // social_description={singleListing?.meta_seo_description}
                // social_image={`${REACT_APP_API_URL}/featured_img/${singleListing?.featured_img}`}
                // social_url={`${REACT_APP_URL}/${singleListing?.title?.replaceAll(' ', '-')?.toLowerCase()}/`}
            />
            <section
                className="page-title-banner listing-banner"
                style={singleListing?.cover_img && {
                    backgroundImage: `url(${REACT_APP_API_URL}/listings_cover_img/${singleListing?.cover_img})`,
                    backgroundRepeat: 'no-repeat',
                }}>
                <div className="container">
                    <div className="row m-0 align-items-end detail-swap">
                        <div className="tr-list-wrap">
                            <div className="tr-list-detail">
                                <div className="tr-list-thumb">
                                    {singleListing?.logo ?
                                        <img
                                            loading="lazy"
                                            src={`${REACT_APP_API_URL}/listings_logo/${singleListing?.logo}`}
                                            className="img-responsive" alt="single-listing-logo"
                                            style={{width: '100%', height: 'auto'}}
                                        /> :
                                        <img
                                            loading="lazy"
                                            src={dummyLogo}
                                            className="img-responsive" alt="single-listing-logo"
                                            style={{width: '100%', height: '100%'}}
                                        />
                                    }
                                </div>
                                <div className="tr-list-info">
                                    <div className="cate-gorio">
                                        <NavLink
                                            to={`/${singleListing?.category_id?.title?.replaceAll(' ', '-').toLowerCase()}/`}>
                                            {singleListing?.category_id?.title}
                                        </NavLink>
                                    </div>
                                    <h1 className="veryfied-title">
                                        {singleListing?.title}
                                    </h1>
                                    <h2 className="h2_red">
                                        {singleListing?.tagline}
                                    </h2>
                                    {singleListing?.location_id?.address ?
                                        <p
                                            style={{display: 'flex', alignItems: 'center', cursor: 'pointer'}}
                                            onClick={() => handleNavigation(singleListing?.location_id?.city, singleListing?.location_id?.state_code, singleListing?.location_id?.country_code,singleListing?.location_id?.address)}

                                        >
                                            <FaLocationDot style={{marginRight: '3px'}}/>
                                            {singleListing?.location_id?.address} {singleListing?.location_id?.city}, {singleListing?.location_id?.state_code}, {singleListing?.location_id?.country_code}
                                        </p>
                                        : null}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="gray">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 col-md-12 col-sm-12">
                            <div className="Reveal-block-wrap">
                                <div className="Reveal-block-header">
                                    <h4 className="block-title">Description</h4>
                                </div>
                                <div className="Reveal-block-body">
                                    <div dangerouslySetInnerHTML={{__html: singleListing?.description}}/>
                                </div>

                            </div>
                            <div className="Reveal-block-wrap">
                                <div className="Reveal-block-header">
                                    <h4 className="block-title">Services</h4>
                                </div>
                                <div className="Reveal-block-body">
                                    <ul className="avl-features third">
                                        {singleListing?.services ?
                                            singleListing?.services?.split(',')?.map(i => <li key={i}>
                                                <IoIosCheckmark className='service_check'/>
                                                {i}</li>) : null}
                                    </ul>
                                </div>

                            </div>
                        </div>
                        <div className="col-lg-4 col-md-12 col-sm-12">
                            <div className="page-sidebar">
                                <div className="tr-single-box">
                                    <div className="tr-single-header">
                                        <h4><TfiDirection/> Listing Details</h4>
                                    </div>
                                    <div className="Reveal-other-body">
                                        <ul className="Reveal-service">
                                            {singleListing?.location_id?.city ?
                                                <li>
                                                    <div className="Reveal-service-icon">
                                                            <span
                                                            onClick={() => handleNavigation(singleListing?.location_id?.city, singleListing?.location_id?.state_code, singleListing?.location_id?.country_code)}
                                                        >
                                                            <div className="Reveal-icon-box-round">
                                                                <IoLocationOutline size={17}/>
                                                            </div>
                                                            <div className="Reveal-icon-box-text">
                                                                {singleListing?.location_id?.city}, {singleListing?.location_id?.state_code}, {singleListing?.location_id?.country_code}
                                                            </div>
                                                        </span>
                                                    </div>
                                                </li>
                                                : null}
                                            {singleListing?.phone_number ? <li>
                                                    <div className="Reveal-service-icon">
                                                        <a href={`tel:${singleListing?.phone_number}`}>
                                                            <div className="Reveal-icon-box-round">
                                                                <IoCallOutline size={17}/>
                                                            </div>
                                                            <div className="Reveal-icon-box-text">
                                                                {singleListing?.phone_number}
                                                            </div>
                                                        </a>
                                                    </div>
                                                </li>
                                                : null}
                                            {singleListing?.email ? <li>
                                                <div className="Reveal-service-icon">
                                                    <a href={`mailto:${singleListing?.email}`}>
                                                        <div className="Reveal-icon-box-round">
                                                            <IoMailOutline size={17}/>
                                                        </div>
                                                        <div className="Reveal-icon-box-text">
                                                            {singleListing?.email}
                                                        </div>
                                                    </a>
                                                </div>
                                            </li> : null}

                                            {singleListing?.website ? <li>
                                                <div className="Reveal-service-icon">
                                                    <a href={`https://${singleListing?.website}`} target="_blank">
                                                        <div className="Reveal-icon-box-round">
                                                            <TfiWorld size={17}/>
                                                        </div>
                                                        <div className="Reveal-icon-box-text">
                                                            {singleListing?.website}
                                                        </div>
                                                    </a>
                                                </div>
                                            </li> : null}

                                        </ul>
                                    </div>

                                </div>
                                <div className="Reveal-side-widget">
                                    <div className="Reveal-Reveal-side-widget-header dark green">
                                        <div className="Reveal-thumb-details">
                                            <h4>Operation Hours</h4>
                                        </div>
                                        <div className="clearfix"></div>
                                    </div>
                                    <div className="Reveal-other-body">
                                        <ul className="listing-hour-day">
                                            {days && singleListing?.always_open ? days.map(day =>
                                                    <li key={day.id}>
                                                        <span className="listing-hour-day">{day.value}</span>
                                                        <span className="listing-hour-time">   Open 24 Hrs </span>
                                                    </li>
                                                ) :
                                                <>
                                                    <li>
                                                        <span className="listing-hour-day">Monday</span>
                                                        <span
                                                            className="listing-hour-time">{singleListing?.open_week_monday} - {singleListing?.close_week_monday}</span>
                                                    </li>
                                                    <li>
                                                        <span className="listing-hour-day">Tuesday</span>
                                                        <span
                                                            className="listing-hour-time">{singleListing?.open_week_tuesday} - {singleListing?.close_week_tuesday}</span>
                                                    </li>
                                                    <li>
                                                        <span className="listing-hour-day">Wednesday</span>
                                                        <span
                                                            className="listing-hour-time">{singleListing?.open_week_wednesday} - {singleListing?.close_week_wednesday}</span>
                                                    </li>
                                                    <li>
                                                        <span className="listing-hour-day">Thursday</span>
                                                        <span
                                                            className="listing-hour-time">{singleListing?.open_week_thursday} - {singleListing?.close_week_thursday}</span>
                                                    </li>
                                                    <li>
                                                        <span className="listing-hour-day">Friday</span>
                                                        <span
                                                            className="listing-hour-time">{singleListing?.open_week_friday} - {singleListing?.close_week_friday}</span>
                                                    </li>
                                                    <li>
                                                        <span className="listing-hour-day">Saturday</span>
                                                        <span
                                                            className="listing-hour-time">
                                                            {singleListing?.open_week_saturday == 'Closed'
                                                            && singleListing?.close_week_saturday == 'Closed'
                                                                ? singleListing?.open_week_saturday
                                                                : `${singleListing?.open_week_saturday} - ${singleListing?.close_week_saturday}`}
                                                        </span>
                                                    </li>
                                                    <li>
                                                        <span className="listing-hour-day">Sunday</span>
                                                        <span
                                                            className="listing-hour-time">
                                                            {singleListing?.open_week_sunday == 'Closed'
                                                            && singleListing?.close_week_sunday == 'Closed'
                                                                ? singleListing?.open_week_sunday
                                                                : `${singleListing?.open_week_sunday} - ${singleListing?.close_week_sunday}`}
                                                        </span>
                                                    </li>
                                                </>
                                            }
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Wrapper>);
}

export default SingleListing;