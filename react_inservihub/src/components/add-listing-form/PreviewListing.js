import React from 'react';
import {NavLink} from "react-router-dom";
import {FaLocationDot} from "react-icons/fa6";
import {IoIosCheckmark} from "react-icons/io";
import {days} from "../../services/staticData/staticDays";
import {TfiDirection, TfiWorld} from "react-icons/tfi";
import {IoCallOutline, IoLocationOutline, IoMailOutline} from "react-icons/io5";

function PreviewListing({data, images, closeModal, submit}) {
    return (
        <>
            <section
                className="page-title-banner listing-banner"
                style={images?.cover_file && {
                    backgroundImage: `url(${images?.cover_file})`,
                    backgroundRepeat: 'no-repeat',
                }}>
                <div className="container">
                    <div className="row m-0 align-items-end detail-swap">
                        <div className="tr-list-wrap">
                            <div className="tr-list-detail">
                                <div className="tr-list-thumb">
                                    {images?.logo_file &&
                                        <img
                                            loading="lazy"
                                            src={images?.logo_file}
                                            className="img-responsive" alt="single-listing-logo"
                                            style={{width: '100%', height: 'auto'}}
                                        />
                                    }
                                </div>
                                <div className="tr-list-info">
                                    <div className="cate-gorio">
                                        <NavLink
                                            to={'#'}>
                                            {data?.category_name}
                                        </NavLink>
                                    </div>
                                    <h1 className="veryfied-title">
                                        {data?.title}
                                    </h1>
                                    <h2 className="h2_red">
                                        {data?.tagline}
                                    </h2>
                                    {data?.address ?
                                        <p style={{display: 'flex', alignItems: 'center'}}>
                                            <FaLocationDot style={{marginRight: '3px'}}/>
                                            {data?.address} {data?.city}, {data?.state_code}, {data?.country_code}
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
                                        <div dangerouslySetInnerHTML={{__html: data?.description}}/>
                                </div>

                            </div>
                            <div className="Reveal-block-wrap">
                                <div className="Reveal-block-header">
                                    <h4 className="block-title">Services</h4>
                                </div>
                                <div className="Reveal-block-body">
                                    <ul className="avl-features third">
                                        {data?.services ?
                                            data?.services?.split(',')?.map(i => <li
                                                key={i}>
                                                <IoIosCheckmark className='service_check'/>
                                                {i}</li>) : null}
                                    </ul>
                                </div>

                            </div>
                        </div>
                        <div className="col-lg-4 col-md-12 col-sm-12">
                            <div className="page-sidebar">
                                <div className="Reveal-side-widget">
                                    <div
                                        className="Reveal-Reveal-side-widget-header dark green">
                                        <div className="Reveal-thumb-details">
                                            <h4>Operation Hours</h4>
                                        </div>
                                        <div className="clearfix"></div>
                                    </div>
                                    <div className="Reveal-other-body">
                                        <ul className="listing-hour-day">
                                            {days && data?.always_open ? days.map(day =>
                                                    <li key={day.id}>
                                                                                <span
                                                                                    className="listing-hour-day">{day.value}</span>
                                                        <span className="listing-hour-time">   Open 24 Hrs </span>
                                                    </li>
                                                ) :
                                                <>
                                                    <li>
                                                                                <span
                                                                                    className="listing-hour-day">Monday</span>
                                                        <span
                                                            className="listing-hour-time">{data?.open_week_monday} - {data?.close_week_monday}</span>
                                                    </li>
                                                    <li>
                                                                                <span
                                                                                    className="listing-hour-day">Tuesday</span>
                                                        <span
                                                            className="listing-hour-time">{data?.open_week_tuesday} - {data?.close_week_tuesday}</span>
                                                    </li>
                                                    <li>
                                                                                <span
                                                                                    className="listing-hour-day">Wednesday</span>
                                                        <span
                                                            className="listing-hour-time">{data?.open_week_wednesday} - {data?.close_week_wednesday}</span>
                                                    </li>
                                                    <li>
                                                                                <span
                                                                                    className="listing-hour-day">Thursday</span>
                                                        <span
                                                            className="listing-hour-time">{data?.open_week_thursday} - {data?.close_week_thursday}</span>
                                                    </li>
                                                    <li>
                                                                                <span
                                                                                    className="listing-hour-day">Friday</span>
                                                        <span
                                                            className="listing-hour-time">{data?.open_week_friday} - {data?.close_week_friday}</span>
                                                    </li>
                                                    <li>
                                                                                <span
                                                                                    className="listing-hour-day">Saturday</span>
                                                        <span
                                                            className="listing-hour-time">
                                                            {data?.open_week_saturday == 'Closed'
                                                            && data?.close_week_saturday == 'Closed'
                                                                ? data?.open_week_saturday
                                                                : `${data?.open_week_saturday} - ${data?.close_week_saturday}`}
                                                        </span>
                                                    </li>
                                                    <li>
                                                                                <span
                                                                                    className="listing-hour-day">Sunday</span>
                                                        <span
                                                            className="listing-hour-time">
                                                            {data?.open_week_sunday == 'Closed'
                                                            && data?.close_week_sunday == 'Closed'
                                                                ? data?.open_week_sunday
                                                                : `${data?.open_week_sunday} - ${data?.close_week_sunday}`}
                                                        </span>
                                                    </li>
                                                </>
                                            }
                                        </ul>
                                    </div>

                                </div>
                                <div className="tr-single-box">
                                    <div className="tr-single-header">
                                        <h4><TfiDirection/> Listing Info</h4>
                                    </div>
                                    <div className="Reveal-other-body">
                                        <ul className="Reveal-service">
                                            {data?.city ?
                                                <li>
                                                    <div className="Reveal-service-icon">
                                                        <a href="#">
                                                            <div
                                                                className="Reveal-icon-box-round">
                                                                <IoLocationOutline size={17}/>
                                                            </div>
                                                            <div
                                                                className="Reveal-icon-box-text">
                                                                {data?.city}, {data?.state_code}, {data?.country_code}
                                                            </div>
                                                        </a>
                                                    </div>
                                                </li>
                                                : null}
                                            {data?.phone_number ? <li>
                                                    <div className="Reveal-service-icon">
                                                        <a href='#'>
                                                            <div className="Reveal-icon-box-round">
                                                                <IoCallOutline size={17}/>
                                                            </div>
                                                            <div className="Reveal-icon-box-text">
                                                                {data?.phone_number}
                                                            </div>
                                                        </a>
                                                    </div>
                                                </li>
                                                : null}
                                            {data?.email ? <li>
                                                <div className="Reveal-service-icon">
                                                    <a href='#'>
                                                        <div className="Reveal-icon-box-round">
                                                            <IoMailOutline size={17}/>
                                                        </div>
                                                        <div className="Reveal-icon-box-text">
                                                            {data?.email}
                                                        </div>
                                                    </a>
                                                </div>
                                            </li> : null}

                                            {data?.website ? <li>
                                                <div className="Reveal-service-icon">
                                                    <a href='#'>
                                                        <div className="Reveal-icon-box-round">
                                                            <TfiWorld size={17}/>
                                                        </div>
                                                        <div className="Reveal-icon-box-text">
                                                            {data?.website}
                                                        </div>
                                                    </a>
                                                </div>
                                            </li> : null}

                                        </ul>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='add_btn_div'>
                    <button onClick={closeModal} className=" preview-btn">Cancel</button>
                    <button onClick={submit} className="preview-btn">Submit</button>
                </div>
            </section>
        </>
    );
}

export default PreviewListing;