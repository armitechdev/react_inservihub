import React from 'react';
import {Helmet} from "react-helmet-async";

function HelmetComponent(props) {
    return (
        <Helmet prioritizeSeoTags>
            <title data-rh={true}>{props?.title}</title>
            <meta name="description" content={props?.description} data-rh={true}/>
            {/*<link rel="canonical" href={props?.href} />*/}
            {/*<meta property="fb:app_id" content={'956258652270616'} data-rh={true}/>*/}
            {/*<meta property="og:type" content="website" data-rh={true}/>*/}
            {/*<meta property="og:url" content={props?.social_url ? props?.social_url : props?.href} data-rh={true}/>*/}
            {/*<meta property="og:title" content={props?.social_title} data-rh={true}/>*/}
            {/*<meta property="og:image" content={props?.social_image} data-rh={true}/>*/}
            {/*<meta property="og:description" content={props?.social_description} data-rh={true}/>*/}
        </Helmet>
    );
}

export default HelmetComponent;