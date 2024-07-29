import React from 'react';
import Wrapper from "../../components/wrapper/Wrapper";
import HelmetComponent from "../../components/react-helmet/HelmetComponent";
import AddListingForm from "../../components/add-listing-form/AddListingForm";
import socialImage from "../../assets/img/bannerImage.jpg";

const {REACT_APP_URL} = process.env;

function AddListings() {
    return (
        <Wrapper>
            <HelmetComponent
                title={'Add Listings | InServiHub'}
                description={"This is a Add Listings page"}
                // href={`${REACT_APP_URL}/add-listings/`}
                // social_title={'Add Listings | InServiHub'}
                // social_description={'Way to Your Business Success'}
                // social_image={`https://erida-design.com${socialImage}`}
            />
            <div className="image-cover hero-banner" data-overlay="6">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 col-md-12">
                            <h1 className="big-header-capt capti">New Listing</h1>
                            <h4 className="big-header-h4"> Way to Your Business Success</h4>
                        </div>
                    </div>
                </div>
            </div>
            <AddListingForm/>
        </Wrapper>
    );
}

export default AddListings;