import React, {useState} from 'react';
import {Controller, useForm} from "react-hook-form";
import {createContact} from "../../store/actions/contact-us";
import {useDispatch} from "react-redux";
import {FaCheck} from "react-icons/fa";

function ContactUsForm() {
    const {
        reset,
        control,
        register,
        handleSubmit,
        formState: {errors},
    } = useForm();
    const [showSuccess, setShowSuccess] = useState(false);
    const dispatch = useDispatch();
    const onSubmit = async (data) => {
        dispatch(createContact(data, (err) => {
            if (!err) {
                reset();
                setShowSuccess(true)
                setTimeout(() => setShowSuccess(false), 5000)
            }
        }))
    }
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                    <div className="col-lg-6 col-md-6">
                        <div className="form-group">
                            <input
                                className="form-control"
                                placeholder="First Name *"
                                style={errors.first_name && {borderColor: '#EE204D '}}
                                {...register('first_name', {required: true})}
                            />

                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                        <div className="form-group">
                            <input
                                className="form-control"
                                placeholder="Last Name *"
                                style={errors.last_name && {borderColor: '#EE204D '}}
                                {...register('last_name', {required: true})}
                            />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-6 col-md-6">
                        <div className="form-group">
                            <Controller
                                name="email"
                                control={control}
                                rules={{
                                    required: 'Email is required',
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    },
                                }}
                                render={({ field }) => (
                                    <>
                                        <input
                                            {...field}
                                            type="email"
                                            placeholder="Email *"
                                            className="form-control"
                                            style={errors.email && {borderColor: '#EE204D '}}
                                        />
                                    </>
                                )}
                            />
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                        <div className="form-group">
                            <input
                                placeholder="Subject *"
                                className="form-control"
                                style={errors.subject && {borderColor: '#EE204D '}}
                                {...register('subject', {required: true})}
                            />
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <input
                        placeholder="Website"
                        className="form-control"
                        {...register('website')}
                    />
                </div>
                <div className="form-group">
                                    <textarea
                                        placeholder="Message *"
                                        className="form-control"
                                        style={errors.message && {borderColor: '#EE204D '}}
                                        {...register('message', {required: true})}
                                    />
                </div>
                <div className="form-group d-flex justify-content-sm-between align-items-sm-center">
                    <button className="btn btn-theme" type="submit">Submit Request</button>
                    {showSuccess && <span className="success-message"> <FaCheck/> Successfully Sent</span>}
                </div>
            </form>
        </>
    );
}

export default ContactUsForm;