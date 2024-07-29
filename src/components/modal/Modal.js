import React from 'react';
import './modal.css'
import PreviewListing from "../add-listing-form/PreviewListing";

function Modal({data, images, onClose, onSubmit}) {
    return (
        <div className="modal-wrapper">
            <div id="myModal" className="modal">
                <PreviewListing data={data} images={images} closeModal={onClose} submit={onSubmit}/>
            </div>
        </div>
    );
}

export default Modal;