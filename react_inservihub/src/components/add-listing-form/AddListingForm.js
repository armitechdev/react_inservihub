import React, {useEffect, useState} from 'react';
import {
    TfiAlarmClock,
    TfiBriefcase,
    TfiImage,
    TfiLocationPin,
    TfiMedallAlt,

} from "react-icons/tfi";
import {AiOutlineTag} from "react-icons/ai";
import {Controller, useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {BsUpload} from "react-icons/bs";
import {hours} from "../../services/staticData/staticHoursData";
import {Country, State, City} from 'country-state-city';
import Select from 'react-select';
import {createBusinessListing} from "../../store/actions/listings";
import {FaCheck} from "react-icons/fa";
import {CiCircleRemove} from "react-icons/ci";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Modal from "../modal/Modal";

const formats = [
    'bold', 'italic', 'underline', 'strike', 'list', 'bullet',
];

const modules = {
    toolbar: [
        ['bold', 'italic', 'underline', 'strike'],
        [{'list': 'ordered'}, {'list': 'bullet'}]
    ],
};

function AddListingForm() {
    const {
        watch,
        reset,
        control,
        register,
        setValue,
        handleSubmit,
    } = useForm();
    const categories = useSelector(store => store?.categories?.allCategories);
    const [countries, setCountries] = useState([]);
    const [filteredStates, setFilteredStates] = useState([]);
    const [filteredCities, setFilteredCities] = useState([]);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showPreviewModal, setShowPreviewModal] = useState(false);
    const [selectedImages, setSelectedImages] = useState({
        logo_file: null,
        cover_file: null,
        featured_file: null,
    });
    const dispatch = useDispatch();

    const closeModal = () => {
        setShowPreviewModal(false);
    };
    useEffect(() => {
        setCountries([...Country?.getAllCountries()])
    }, []);

    const getStates = (isoCode) => {
        setFilteredStates([...State.getStatesOfCountry(isoCode)])
    }
    const getCities = (isoCode) => {
        setFilteredCities([...City.getCitiesOfState(watch('country_code'), isoCode)])
    }

    const removeImage = (key) => {
        setSelectedImages((prevImages) => ({
            ...prevImages,
            [key]: null,
        }));
        setValue(key, '');
    };

    const handleFileChange = (key, ev) => {
        const file = ev.target.files[0];
        setValue(key, file);
        setSelectedImages((prevImages) => ({
            ...prevImages,
            [key]: file && URL.createObjectURL(file),
        }));
    };

    const onSubmit = async () => {
        setShowPreviewModal(true)
    }
    const save = async () => {
        const data = watch();
        if(watch()) {
            dispatch(createBusinessListing(data, (err) => {
                if(!err) {
                    reset();
                    closeModal();
                    setShowSuccess(true)
                    setValue('always_open', '')
                    setValue('country_name', null)
                    setValue('country_code', null)
                    setValue('state_code', null)
                    setValue('state', null)
                    setValue('city', null)
                    setSelectedImages({logo_file: null, cover_file: null, featured_file: null})
                    setTimeout(() => setShowSuccess(false), 5000)
                }
            }))
        }
    }

    return (
        <>
            <section className="gray">
                <div className="container">
                    <div className="row justify-content-md-center">
                        <div className="col-lg-10 col-md-10 col-sm-12">
                            <div className="add-listing-form form-submit">
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="tr-single-box">
                                        <div className="tr-single-header">
                                            <h4><TfiMedallAlt/> General information</h4>
                                        </div>
                                        <div className="Reveal-other-body">
                                            <div className="form-group">
                                                <label>Listing Title *</label>
                                                <input
                                                    placeholder="Title"
                                                    className="form-control"
                                                    {...register('title', {required: true})}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>Category *</label>
                                                <Controller
                                                    name="category"
                                                    control={control}
                                                    render={({field}) => (
                                                        <Select
                                                            {...field}
                                                            options={categories}
                                                            placeholder='Category'
                                                            classNamePrefix="react-select"
                                                            getOptionLabel={categories => categories.title}
                                                            getOptionValue={categories => categories.title}
                                                            className="form-control chosen-select"
                                                            {...register('category', {required: true})}
                                                            value={categories && categories?.find(category => category.title === watch('category'))}
                                                            onChange={(ev) => {
                                                                field.onChange(ev.id)
                                                                setValue("category_name", ev.title)
                                                            }}
                                                        />
                                                    )}/>
                                            </div>

                                            <div className="form-group">
                                                <label>Tagline *</label>
                                                <input
                                                    placeholder="Tagline"
                                                    className="form-control"
                                                    {...register('tagline', {required: true})}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>Description *</label>
                                                <ReactQuill
                                                    theme="snow"
                                                    modules={modules}
                                                    formats={formats}
                                                    value={watch('description')}
                                                    onChange={(ev) => setValue('description', ev)}
                                                />

                                            </div>
                                        </div>
                                    </div>
                                    <div className="tr-single-box">
                                        <div className="tr-single-header">
                                            <h4><TfiImage/> Gallery</h4>
                                        </div>
                                        <div className="Reveal-other-body">
                                            <div className="row">
                                                <div className="col-lg-4 col-md-6">
                                                    <div className="dropzone">
                                                        <label htmlFor="logo_file">
                                                            <BsUpload/>
                                                            <div className="dz-default dz-message">
                                                                <span>Drop files here to upload</span>
                                                            </div>
                                                        </label>
                                                        <input
                                                            type="file"
                                                            id="logo_file"
                                                            accept="image/*"
                                                            style={{display: 'none'}}
                                                            onChange={(ev) => handleFileChange('logo_file', ev)}
                                                        />
                                                        {selectedImages?.logo_file
                                                            &&
                                                            <div className='img_container'>
                                                                <img src={selectedImages?.logo_file} style={{width: '100%'}} alt={'logo_file'}/>
                                                                <div>
                                                                    <CiCircleRemove
                                                                        className="remove_img"
                                                                        onClick={() => removeImage('logo_file')}
                                                                    />
                                                                </div>
                                                            </div>
                                                        }
                                                    </div>
                                                    <label className="smart-text">
                                                        Logo: 400x400 px. Maximum file size: 1 MB.
                                                    </label>
                                                </div>
                                                <div className="col-lg-4 col-md-6">
                                                    <div className="dropzone">
                                                        <label htmlFor="cover_file">
                                                            <BsUpload/>
                                                            <div className="dz-default dz-message">
                                                                <span>Drop files here to upload</span>
                                                            </div>
                                                        </label>
                                                        <input
                                                            type="file"
                                                            id="cover_file"
                                                            accept="image/*"
                                                            style={{display: 'none'}}
                                                            onChange={(ev) => handleFileChange('cover_file', ev)}
                                                        />
                                                        {selectedImages?.cover_file
                                                            &&
                                                            <div className='img_container'>
                                                                <img src={selectedImages?.cover_file} style={{width: '100%'}} alt={'cover_file'}/>
                                                                <div>
                                                                    <CiCircleRemove
                                                                        className="remove_img"
                                                                        onClick={() => {
                                                                            removeImage('cover_file')
                                                                        }
                                                                        }
                                                                    />
                                                                </div>
                                                            </div>
                                                        }
                                                    </div>
                                                    <label className="smart-text">
                                                        Cover Image: 1920x800 px. Maximum file size: 2 MB.
                                                    </label>
                                                </div>
                                                <div className="col-lg-4 col-md-6">
                                                    <div className="dropzone">
                                                        <label htmlFor="featured_file">
                                                            <BsUpload/>
                                                            <div className="dz-default dz-message">
                                                                <span>Drop files here to upload</span>
                                                            </div>
                                                        </label>
                                                        <input
                                                            type="file"
                                                            id="featured_file"
                                                            accept="image/*"
                                                            style={{display: 'none'}}
                                                            onChange={(ev) => handleFileChange('featured_file', ev)}
                                                        />
                                                        {selectedImages?.featured_file
                                                            &&
                                                            <div className='img_container'>
                                                                <img src={selectedImages?.featured_file} style={{width: '100%'}} alt={'feature_file'}/>
                                                                <div>
                                                                    <CiCircleRemove
                                                                        className="remove_img"
                                                                        onClick={() => removeImage('featured_file')}
                                                                    />
                                                                </div>
                                                            </div>
                                                        }
                                                    </div>
                                                    <label className="smart-text">
                                                        Featured Image: 1920x800 px. Maximum file size: 2 MB.
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tr-single-box">
                                        <div className="tr-single-header">
                                            <h4><TfiLocationPin/> Location information</h4>
                                        </div>
                                        <div className="Reveal-other-body">
                                            <div className="row">
                                                <div className="col-lg-6 col-md-6">
                                                    <div className="form-group">
                                                        <label>Country *</label>
                                                        <Controller
                                                            name="country_code"
                                                            control={control}
                                                            render={({field}) => (
                                                                <Select
                                                                    placeholder={'Your Country'}
                                                                    classNamePrefix="react-select"
                                                                    options={countries}
                                                                    className="form-control chosen-select"
                                                                    getOptionLabel={countries => countries.name}
                                                                    getOptionValue={countries => countries.isoCode}
                                                                    {...register('country_code', {required: true})}
                                                                    value={categories && countries?.find(country => country.isoCode === watch('country_code'))}
                                                                    onChange={(ev) => {
                                                                        getStates(ev.isoCode)
                                                                        setValue('country_name', ev.name,)
                                                                        setValue('country_code', ev.isoCode,)
                                                                    }}
                                                                />
                                                            )}/>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 col-md-6">
                                                    <label>State *</label>
                                                    <Controller
                                                        name="state"
                                                        control={control}
                                                        render={({field}) => (
                                                            <Select
                                                                placeholder={'Your State'}
                                                                classNamePrefix="react-select"
                                                                options={filteredStates}
                                                                className="form-control chosen-select"
                                                                getOptionLabel={filteredStates => filteredStates.name}
                                                                getOptionValue={filteredStates => filteredStates.isoCode}
                                                                {...register('state_code', {required: true})}
                                                                value={filteredStates && filteredStates?.find(state => state.isoCode === watch('state_code'))}
                                                                onChange={(ev) => {
                                                                    getCities(ev.isoCode)
                                                                    setValue('state_code', ev.isoCode,)
                                                                    setValue('state', ev.name,)
                                                                }}
                                                            />
                                                        )}/>
                                                </div>
                                                <div className="col-lg-6 col-md-6">
                                                    <label>City *</label>
                                                    <Controller
                                                        name="city"
                                                        control={control}
                                                        render={({field}) => (
                                                            <Select
                                                                placeholder={'Your City'}
                                                                classNamePrefix="react-select"
                                                                options={filteredCities}
                                                                className="form-control chosen-select"
                                                                getOptionLabel={filteredCities => filteredCities.name}
                                                                getOptionValue={filteredCities => filteredCities.name}
                                                                {...register('city', {required: true})}
                                                                value={filteredCities && filteredCities?.find(city => city.name === watch('city'))}
                                                                onChange={(ev) => {
                                                                    field.onChange(ev.name)
                                                                }}
                                                            />
                                                        )}/>
                                                </div>

                                                <div className="col-lg-6 col-md-6">
                                                    <div className="form-group">
                                                        <label>Address *</label>
                                                        <input
                                                            placeholder="Your Business Address"
                                                            className="form-control"
                                                            {...register('address', {required: true})}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tr-single-box">
                                        <div className="tr-single-header">
                                            <h4><TfiBriefcase/> Contact information</h4>
                                        </div>
                                        <div className="Reveal-other-body">
                                            <div className="row">
                                                <div className="col-lg-6 col-md-6">
                                                    <div className="form-group">
                                                        <label>Email *</label>
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
                                                                        placeholder="youremail@yourdomain.com"
                                                                        className="form-control"
                                                                    />
                                                                </>
                                                            )}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 col-md-6">
                                                    <div className="form-group">
                                                        <label>Phone Number *</label>
                                                        <input
                                                            placeholder="+1 (123) 456-7890"
                                                            className="form-control"
                                                            {...register('phone_number', {required: true})}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-lg-12 col-md-12">
                                                    <div className="form-group">
                                                        <label>Website *</label>
                                                        <input
                                                            className="form-control"
                                                            placeholder="https://yourdomain.com/"
                                                            {...register('website')}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tr-single-box">
                                        <div className="tr-single-header">
                                            <h4><AiOutlineTag/> Services</h4>
                                        </div>
                                        <div className="Reveal-other-body">
                                            <div className="form-group">
                                                <textarea
                                                    className="form-control"
                                                    placeholder="Comma (,) separated list of services"
                                                    {...register('services')}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tr-single-box">
                                        <div className="tr-single-header">
                                            <h4><TfiAlarmClock/> Business hour</h4>
                                        </div>
                                        <div className="Reveal-other-body">
                                            <div className="form-group">
                                                <div className="row align-items-center">
                                                    <label className="control-label col-lg-2 col-md-2">Monday</label>
                                                    <div className="col-lg-5 col-md-5">
                                                        <Controller
                                                            name="open_week_monday"
                                                            control={control}
                                                            render={({field}) => (
                                                                <Select
                                                                    {...field}
                                                                    options={hours}
                                                                    placeholder={'Opening Time'}
                                                                    classNamePrefix="react-select"
                                                                    className="form-control chosen-select"
                                                                    getOptionLabel={hours => hours.value}
                                                                    getOptionValue={hours => hours.value}
                                                                    isDisabled={watch('always_open')}
                                                                    value={watch('open_week_monday') ? hours && hours?.find(hour => hour.value === watch('open_week_monday')) : null}
                                                                    {...register('open_week_monday')}
                                                                    onChange={(ev) => {
                                                                        field.onChange(ev.value)
                                                                    }}
                                                                />
                                                            )}/>
                                                    </div>
                                                    <div className="col-lg-5 col-md-5">
                                                        <Controller
                                                            name="close_week_monday"
                                                            control={control}
                                                            render={({field}) => (
                                                                <Select
                                                                    {...field}
                                                                    options={hours}
                                                                    placeholder={'Closing Time'}
                                                                    classNamePrefix="react-select"
                                                                    className="form-control chosen-select"
                                                                    getOptionLabel={hours => hours.value}
                                                                    getOptionValue={hours => hours.value}
                                                                    isDisabled={watch('always_open')}
                                                                    value={watch('close_week_monday') ? hours && hours?.find(hour => hour.value === watch('close_week_monday')) : null}
                                                                    {...register('close_week_monday')}
                                                                    onChange={(ev) => {
                                                                        field.onChange(ev.value)
                                                                    }}
                                                                />
                                                            )}/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <div className="row align-items-center">
                                                    <label className="control-label col-lg-2 col-md-2">Tuesday</label>
                                                    <div className="col-lg-5 col-md-5">
                                                        <Controller
                                                            name="open_week_tuesday"
                                                            control={control}
                                                            render={({field}) => (
                                                                <Select
                                                                    {...field}
                                                                    options={hours}
                                                                    placeholder={'Opening Time'}
                                                                    classNamePrefix="react-select"
                                                                    className="form-control chosen-select"
                                                                    getOptionLabel={hours => hours.value}
                                                                    getOptionValue={hours => hours.value}
                                                                    isDisabled={watch('always_open')}
                                                                    value={watch('open_week_tuesday') ? hours && hours?.find(hour => hour.value === watch('open_week_tuesday')) : null}
                                                                    {...register('open_week_tuesday')}
                                                                    onChange={(ev) => {
                                                                        field.onChange(ev.value)
                                                                    }}
                                                                />
                                                            )}/>
                                                    </div>
                                                    <div className="col-lg-5 col-md-5">
                                                        <Controller
                                                            name="close_week_tuesday"
                                                            control={control}
                                                            render={({field}) => (
                                                                <Select
                                                                    {...field}
                                                                    options={hours}
                                                                    placeholder={'Closing Time'}
                                                                    classNamePrefix="react-select"
                                                                    className="form-control chosen-select"
                                                                    getOptionLabel={hours => hours.value}
                                                                    getOptionValue={hours => hours.value}
                                                                    isDisabled={watch('always_open')}
                                                                    value={watch('close_week_tuesday') ? hours && hours?.find(hour => hour.value === watch('close_week_tuesday')) : null}
                                                                    {...register('close_week_tuesday')}
                                                                    onChange={(ev) => {
                                                                        field.onChange(ev.value)
                                                                    }}
                                                                />
                                                            )}/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <div className="row align-items-center">
                                                    <label className="control-label col-lg-2 col-md-2">Wednesday</label>
                                                    <div className="col-lg-5 col-md-5">
                                                        <Controller
                                                            name="open_week_wednesday"
                                                            control={control}
                                                            render={({field}) => (
                                                                <Select
                                                                    {...field}
                                                                    options={hours}
                                                                    placeholder={'Opening Time'}
                                                                    classNamePrefix="react-select"
                                                                    className="form-control chosen-select"
                                                                    getOptionLabel={hours => hours.value}
                                                                    getOptionValue={hours => hours.value}
                                                                    isDisabled={watch('always_open')}
                                                                    value={watch('open_week_wednesday') ? hours && hours?.find(hour => hour.value === watch('open_week_wednesday')) : null}
                                                                    {...register('open_week_wednesday')}
                                                                    onChange={(ev) => {
                                                                        field.onChange(ev.value)
                                                                    }}
                                                                />
                                                            )}/>
                                                    </div>
                                                    <div className="col-lg-5 col-md-5">
                                                        <Controller
                                                            name="close_week_wednesday"
                                                            control={control}
                                                            render={({field}) => (
                                                                <Select
                                                                    {...field}
                                                                    options={hours}
                                                                    placeholder={'Closing Time'}
                                                                    classNamePrefix="react-select"
                                                                    className="form-control chosen-select"
                                                                    getOptionLabel={hours => hours.value}
                                                                    getOptionValue={hours => hours.value}
                                                                    isDisabled={watch('always_open')}
                                                                    value={watch('close_week_wednesday') ? hours && hours?.find(hour => hour.value === watch('close_week_wednesday')) : null}
                                                                    {...register('close_week_wednesday')}
                                                                    onChange={(ev) => {
                                                                        field.onChange(ev.value)
                                                                    }}
                                                                />
                                                            )}/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <div className="row align-items-center">
                                                    <label className="control-label col-lg-2 col-md-2">Thursday</label>
                                                    <div className="col-lg-5 col-md-5">
                                                        <Controller
                                                            name="open_week_thursday"
                                                            control={control}
                                                            render={({field}) => (
                                                                <Select
                                                                    {...field}
                                                                    options={hours}
                                                                    placeholder={'Opening Time'}
                                                                    classNamePrefix="react-select"
                                                                    className="form-control chosen-select"
                                                                    getOptionLabel={hours => hours.value}
                                                                    getOptionValue={hours => hours.value}
                                                                    isDisabled={watch('always_open')}
                                                                    value={watch('open_week_thursday') ? hours && hours?.find(hour => hour.value === watch('open_week_thursday')) : null}
                                                                    {...register('open_week_thursday')}
                                                                    onChange={(ev) => {
                                                                        field.onChange(ev.value)
                                                                    }}
                                                                />
                                                            )}/>
                                                    </div>
                                                    <div className="col-lg-5 col-md-5">
                                                        <Controller
                                                            name="close_week_thursday"
                                                            control={control}
                                                            render={({field}) => (
                                                                <Select
                                                                    {...field}
                                                                    options={hours}
                                                                    placeholder={'Closing Time'}
                                                                    classNamePrefix="react-select"
                                                                    className="form-control chosen-select"
                                                                    getOptionLabel={hours => hours.value}
                                                                    getOptionValue={hours => hours.value}
                                                                    isDisabled={watch('always_open')}
                                                                    value={watch('close_week_thursday') ? hours && hours?.find(hour => hour.value === watch('close_week_thursday')) : null}
                                                                    {...register('close_week_thursday')}
                                                                    onChange={(ev) => {
                                                                        field.onChange(ev.value)
                                                                    }}
                                                                />
                                                            )}/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <div className="row align-items-center">
                                                    <label className="control-label col-lg-2 col-md-2">Friday</label>
                                                    <div className="col-lg-5 col-md-5">
                                                        <Controller
                                                            name="open_week_friday"
                                                            control={control}
                                                            render={({field}) => (
                                                                <Select
                                                                    {...field}
                                                                    options={hours}
                                                                    placeholder={'Opening Time'}
                                                                    classNamePrefix="react-select"
                                                                    className="form-control chosen-select"
                                                                    getOptionLabel={hours => hours.value}
                                                                    getOptionValue={hours => hours.value}
                                                                    isDisabled={watch('always_open')}
                                                                    value={watch('open_week_friday') ? hours && hours?.find(hour => hour.value === watch('open_week_friday')) : null}
                                                                    {...register('open_week_friday')}
                                                                    onChange={(ev) => {
                                                                        field.onChange(ev.value)
                                                                    }}
                                                                />
                                                            )}/>
                                                    </div>
                                                    <div className="col-lg-5 col-md-5">
                                                        <Controller
                                                            name="close_week_friday"
                                                            control={control}
                                                            render={({field}) => (
                                                                <Select
                                                                    {...field}
                                                                    options={hours}
                                                                    placeholder={'Closing Time'}
                                                                    classNamePrefix="react-select"
                                                                    className="form-control chosen-select"
                                                                    getOptionLabel={hours => hours.value}
                                                                    getOptionValue={hours => hours.value}
                                                                    isDisabled={watch('always_open')}
                                                                    value={watch('close_week_friday') ? hours && hours?.find(hour => hour.value === watch('close_week_friday')) : null}
                                                                    {...register('close_week_friday')}
                                                                    onChange={(ev) => {
                                                                        field.onChange(ev.value)
                                                                    }}
                                                                />
                                                            )}/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <div className="row align-items-center">
                                                    <label className="control-label col-lg-2 col-md-2">Saturday</label>
                                                    <div className="col-lg-5 col-md-5">
                                                        <Controller
                                                            name="open_week_saturday"
                                                            control={control}
                                                            render={({field}) => (
                                                                <Select
                                                                    {...field}
                                                                    options={hours}
                                                                    placeholder={'Opening Time'}
                                                                    classNamePrefix="react-select"
                                                                    className="form-control chosen-select"
                                                                    getOptionLabel={hours => hours.value}
                                                                    getOptionValue={hours => hours.value}
                                                                    isDisabled={watch('always_open')}
                                                                    value={watch('open_week_saturday') ? hours && hours?.find(hour => hour.value === watch('open_week_saturday')) : null}
                                                                    {...register('open_week_saturday')}
                                                                    onChange={(ev) => {
                                                                        field.onChange(ev.value)
                                                                    }}
                                                                />
                                                            )}/>
                                                    </div>
                                                    <div className="col-lg-5 col-md-5">
                                                        <Controller
                                                            name="close_week_saturday"
                                                            control={control}
                                                            render={({field}) => (
                                                                <Select
                                                                    {...field}
                                                                    options={hours}
                                                                    placeholder={'Closing Time'}
                                                                    classNamePrefix="react-select"
                                                                    className="form-control chosen-select"
                                                                    getOptionLabel={hours => hours.value}
                                                                    getOptionValue={hours => hours.value}
                                                                    isDisabled={watch('always_open')}
                                                                    value={watch('close_week_saturday') ? hours && hours?.find(hour => hour.value === watch('close_week_saturday')) : null}
                                                                    {...register('close_week_saturday')}
                                                                    onChange={(ev) => {
                                                                        field.onChange(ev.value)
                                                                    }}
                                                                />
                                                            )}/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <div className="row align-items-center">
                                                    <label className="control-label col-lg-2 col-md-2">Sunday</label>
                                                    <div className="col-lg-5 col-md-5">
                                                        <Controller
                                                            name="open_week_sunday"
                                                            control={control}
                                                            render={({field}) => (
                                                                <Select
                                                                    {...field}
                                                                    options={hours}
                                                                    placeholder={'Opening Time'}
                                                                    classNamePrefix="react-select"
                                                                    className="form-control chosen-select"
                                                                    getOptionLabel={hours => hours.value}
                                                                    getOptionValue={hours => hours.value}
                                                                    isDisabled={watch('always_open')}
                                                                    value={watch('open_week_sunday') ? hours && hours?.find(hour => hour.value === watch('open_week_sunday')) : null}
                                                                    {...register('open_week_sunday')}
                                                                    onChange={(ev) => {
                                                                        field.onChange(ev.value)
                                                                    }}
                                                                />
                                                            )}/>
                                                    </div>
                                                    <div className="col-lg-5 col-md-5">
                                                        <Controller
                                                            name="close_week_sunday"
                                                            control={control}
                                                            render={({field}) => (
                                                                <Select
                                                                    {...field}
                                                                    options={hours}
                                                                    placeholder={'Closing Time'}
                                                                    classNamePrefix="react-select"
                                                                    className="form-control chosen-select"
                                                                    getOptionLabel={hours => hours.value}
                                                                    getOptionValue={hours => hours.value}
                                                                    isDisabled={watch('always_open')}
                                                                    value={watch('close_week_sunday') ? hours && hours?.find(hour => hour.value === watch('close_week_sunday')) : null}
                                                                    {...register('close_week_sunday')}
                                                                    onChange={(ev) => {
                                                                        field.onChange(ev.value)
                                                                    }}
                                                                />
                                                            )}/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group mt-4">
                                                <input id="always_open"
                                                       className="checkbox-custom"
                                                       name="24-1"
                                                       type="checkbox"
                                                       onChange={(ev) => {
                                                           setValue('always_open', ev.target.checked)
                                                           setValue('open_week_monday', null)
                                                           setValue('close_week_monday', null)
                                                           setValue('open_week_tuesday', null)
                                                           setValue('close_week_tuesday', null)
                                                           setValue('open_week_wednesday', null)
                                                           setValue('close_week_wednesday', null)
                                                           setValue('open_week_thursday', null)
                                                           setValue('close_week_thursday', null)
                                                           setValue('open_week_friday', null)
                                                           setValue('close_week_friday', null)
                                                           setValue('open_week_saturday', null)
                                                           setValue('close_week_saturday', null)
                                                           setValue('open_week_sunday', null)
                                                           setValue('close_week_sunday', null)
                                                       }
                                                       }
                                                       value={watch('always_open')}
                                                />
                                                <label htmlFor="always_open" className="checkbox-custom-label">
                                                    This Business open 7x24
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <button className="btn-add-listing btn-md full-width" type="submit">
                                        Preview & Submit
                                    </button>
                                    {showSuccess &&
                                        <span className="success-message"> <FaCheck/> Successfully Added</span>}
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
            {showPreviewModal
                ?
                    <Modal
                        images={selectedImages}
                        data={watch()}
                        onClose={closeModal}
                        onSubmit={save}
                    />
                : null}
        </>
    );
}

export default AddListingForm;