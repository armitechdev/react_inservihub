import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home/Home";
import Listings from "./pages/Listings/Listings";
import Blog from "./pages/Blog/Blog";
import ContactUs from "./pages/ContactUs/ContactUs";
import AddListings from "./pages/Listings/AddListings";
import SingleListing from "./pages/Listings/SingleListing";
import AllFeaturedListings from "./pages/Listings/AllFeaturedListings";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getAllListingsAction} from "./store/actions/listings";
import {getAllCategoriesAction} from "./store/actions/categories";
import {getAllBlogsAction} from "./store/actions/blogs";
import SingleBlog from "./pages/Blog/SingleBlog";
import {getAllCountriesAction} from "./store/actions/countries";
import CountryListings from "./pages/Listings/CountryListings";
import CategoryListings from "./pages/Listings/CategoryListings";
import Page404 from "./pages/Page404";
import Countries from "./pages/Countries/Countries";
import ScrollToTop from "./services/scrollTop/ScrollTop";
import LoadingSpinner from "./components/spinLoader/LoadingSpinner";

function App() {
    const allListings = useSelector(store => store?.listings?.allListings);
    const listingsStatus = useSelector(store => store?.listings?.status);
    const allCategories = useSelector(store => store?.categories?.allCategories);
    const categoriesStatus = useSelector(store => store?.categories?.status);
    const allBlogs = useSelector((store) => store?.blogs?.allBlogs);
    const blogsStatus = useSelector((store) => store?.blogs?.status);
    const allCountries = useSelector(store => store?.countries?.allCountries)
    const countriesStatus = useSelector(store => store?.countries?.status)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllListingsAction())
        dispatch(getAllCategoriesAction())
        dispatch(getAllBlogsAction())
        dispatch(getAllCountriesAction());
    }, []);

    return (
        <>
            {
                // listingsStatus === 'Success'
                // || categoriesStatus === 'Success'
                // || blogsStatus === 'Success'
                // || countriesStatus === 'Success'
                //     ?
                    <BrowserRouter>
                        <ScrollToTop/>
                        <Routes>
                            <Route path='/' element={<Home/>}/>
                            <Route path='/listings/' element={<Listings/>}/>
                            <Route path='/blog/' element={<Blog/>}/>
                            <Route path='/contact-us/' element={<ContactUs/>}/>
                            <Route path='/add-listings/' element={<AddListings/>}/>
                            <Route path='/countries/' element={<Countries/>}/>
                            <Route path='/featured-businesses/' element={<AllFeaturedListings/>}/>
                            {allListings?.map(({id, title}) => <Route key={id}
                                                                      path={`/${title?.replaceAll(' ', '-')?.toLowerCase()}/`}
                                                                      element={<SingleListing/>}/>)}
                            {allCategories?.map(({id, title}) => <Route key={id}
                                                                        path={`/${title?.replaceAll(' ', '-')?.toLowerCase()}/`}
                                                                        element={<CategoryListings/>}/>)}
                            {allBlogs?.map(({id, preview_url}) => <Route key={id}
                                                                         path={`/${preview_url}/`}
                                                                         element={<SingleBlog/>}/>)}
                            {allCountries?.map(({id, country_name}) => <Route key={id}
                                                                              path={`/${country_name?.replaceAll(' ', '-')?.toLowerCase()}/`}
                                                                              element={<CountryListings/>}/>)}
                            <Route path='/*' element={<Page404/>}/>
                            <Route path='/404' element={<Page404/>}/>
                        </Routes>
                    </BrowserRouter>
                    // :
                    // <div className="gif_container">
                    //     <LoadingSpinner/>
                    // </div>
            }
        </>
    );
}

export default App;
