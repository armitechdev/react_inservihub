import React, {useEffect, useState} from 'react';
import logo from '../../assets/img/inservihub-logo.png'
import './header.css';
import {NavLink, useLocation} from "react-router-dom";
import {IoMdArrowDropdown, IoMdArrowDropup} from "react-icons/io";
import {FaPlusCircle} from "react-icons/fa";
import {useSelector} from "react-redux";
import {IoCloseSharp} from "react-icons/io5";

function Header() {
    const categories = useSelector(store => store   ?.categories?.allCategories)
    const allCountries = useSelector(store => store?.countries?.allCountries)
    const location = useLocation();
    const [activeItem, setActiveItem] = useState('/');
    const [isListingDropdownOpen, setDropdownOpen] = useState(false);
    const [isCountyDropdownOpen, setCountryDropdownOpen] = useState(false);
    const [showMenuMobile, setShowMenuMobile] = useState(false);
    const [showListingsSubMenu, setShowListingsSubMenu] = useState(false);
    const [showCategoriesSubMenu, setShowCategoriesSubMenu] = useState(false);
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 993);
    useEffect(() => {
        if(window.innerWidth > 993) {
            setShowMenuMobile(false)
        }
        const handleResize = () => {
            const smallScreen = window.innerWidth < 993;
            setIsSmallScreen(smallScreen);
        };
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [window.innerWidth]);

    useEffect(() => {
        setActiveItem(location.pathname);
    }, [location]);

    const handleMouseEnter = () => {
        setDropdownOpen(true);
    };

    const handleMouseLeave = () => {
        setDropdownOpen(false);
    };
    const handleCountryMouseEnter = () => {
        setCountryDropdownOpen(true);
    };

    const handleCountryMouseLeave = () => {
        setCountryDropdownOpen(false);
    };

    return (
        <>
            <div className="header header-dark ">
                <div className="header-fixed">
                    <div className="container">
                        <nav id="navigation"
                             className={isSmallScreen ? "navigation navigation-portrait" : "navigation navigation-landscape"}>
                            <div className="nav-header">
                                <NavLink className="nav-brand" to="/">
                                    <img
                                        src={logo}
                                        loading="lazy"
                                        alt="Header logo"
                                        title="Header logo"
                                        className="logo hd-992"
                                        style={{width: '100%', height: '100%'}}
                                    />
                                </NavLink>
                                <div className="nav-toggle" onClick={() => setShowMenuMobile(!showMenuMobile)}></div>
                            </div>
                            <div
                                className={showMenuMobile ? "nav-menus-wrapper nav-menus-wrapper-open" : "nav-menus-wrapper"}>
                                <span className='nav-menus-wrapper-close-button'>
                                    <IoCloseSharp size={'18'} onClick={() => setShowMenuMobile(false)}/>
                               </span>
                                <ul className="nav-menu">

                                    <li className={activeItem === '/' ? 'active' : ''}><NavLink to="/">Home</NavLink>
                                    </li>
                                    <li className={activeItem.startsWith('/listings/') ? 'active' : ''}
                                        onMouseEnter={handleMouseEnter}
                                        onMouseLeave={handleMouseLeave}>
                                        <NavLink to="/listings/">
                                            Listings
                                            {isListingDropdownOpen
                                                ? <IoMdArrowDropup
                                                    onClick={() => setShowListingsSubMenu(!showListingsSubMenu)}
                                                    className={showMenuMobile ? 'open-submenu-mobile' : 'open-submenu-web'}/>
                                                : <IoMdArrowDropdown
                                                    onClick={() => setShowListingsSubMenu(!showListingsSubMenu)}
                                                    className={showMenuMobile ? 'open-submenu-mobile' : 'open-submenu-web'}/>}
                                        </NavLink>
                                        {showListingsSubMenu && showMenuMobile &&
                                            <ul className={isListingDropdownOpen ? "nav-dropdown nav-submenu" : "nav-dropdown-closed"}>
                                                {categories && categories.length ? categories?.map(({id, title}) =>
                                                    <li key={id}>
                                                        <NavLink
                                                            to={`/${title?.replaceAll(' ', '-').toLowerCase()}/`}>{title}</NavLink>
                                                    </li>
                                                ) : null}
                                            </ul>}
                                        {!isSmallScreen &&
                                            <ul className={isListingDropdownOpen ? "nav-dropdown nav-submenu" : "nav-dropdown-closed"}>
                                                {categories && categories.length ? categories?.map(({id, title}) =>
                                                    <li key={id}>
                                                        <NavLink
                                                            to={`/${title?.replaceAll(' ', '-').toLowerCase()}/`}>{title}</NavLink>
                                                    </li>
                                                ) : null}
                                            </ul>}
                                    </li>
                                    <li className={activeItem.includes('/countries/') ? 'active' : ''}
                                        onMouseEnter={handleCountryMouseEnter}
                                        onMouseLeave={handleCountryMouseLeave}>
                                        <NavLink to={'/countries/'}>
                                            Countries
                                            {isCountyDropdownOpen
                                                ? <IoMdArrowDropup
                                                    onClick={() => setShowCategoriesSubMenu(!showCategoriesSubMenu)}
                                                    className={showMenuMobile ? 'open-submenu-mobile' : 'open-submenu-web'}/>
                                                : <IoMdArrowDropdown
                                                    onClick={() => setShowCategoriesSubMenu(!showCategoriesSubMenu)}
                                                    className={showMenuMobile ? 'open-submenu-mobile' : 'open-submenu-web'}/>}
                                        </NavLink>
                                        {showCategoriesSubMenu && showMenuMobile &&
                                            <ul className={isCountyDropdownOpen ? "nav-dropdown nav-submenu" : "nav-dropdown-closed"}>
                                                {allCountries && allCountries.length ? allCountries?.map(({
                                                                                                             id,
                                                                                                             country_name
                                                                                                         }) =>
                                                    <li key={id}>
                                                        <NavLink
                                                            to={`/${country_name?.replaceAll(' ', '-').toLowerCase()}/`}>{country_name}</NavLink>
                                                    </li>
                                                ) : null}
                                            </ul>
                                        }
                                        {!isSmallScreen && <ul
                                            className={isCountyDropdownOpen ? "nav-dropdown nav-submenu" : "nav-dropdown-closed"}>
                                            {allCountries && allCountries.length ? allCountries?.map(({
                                                                                                         id,
                                                                                                         country_name
                                                                                                     }) =>
                                                <li key={id}>
                                                    <NavLink
                                                        to={`/${country_name?.replaceAll(' ', '-').toLowerCase()}/`}>{country_name}</NavLink>
                                                </li>
                                            ) : null}
                                        </ul>}
                                    </li>
                                    <li className={activeItem === '/blog/' ? 'active' : ''}>
                                        <NavLink to="/blog/">Blog</NavLink>
                                    </li>
                                    <li className={activeItem === '/contact-us/' ? 'active' : ''}>
                                        <NavLink to="/contact-us/">Contact Us</NavLink>
                                    </li>
                                </ul>
                                <ul className="nav-menu nav-menu-social align-to-right">
                                    <li className="add-listing bg-whit">
                                        <NavLink to="/add-listings/" >
                                            <FaPlusCircle style={{paddingBottom: '1px', marginRight: '2px'}}/>
                                            Add Listings
                                        </NavLink>
                                    </li>
                                </ul>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
            <div className="clearfix"></div>
        </>
    );
}

export default Header;
