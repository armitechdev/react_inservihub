import React, {useEffect} from 'react';
import Wrapper from "../../components/wrapper/Wrapper";
import HelmetComponent from "../../components/react-helmet/HelmetComponent";
import {getAllBlogsAction} from "../../store/actions/blogs";
import {useDispatch, useSelector} from "react-redux";
import {NavLink} from "react-router-dom";
import socialImage from "../../assets/img/bannerImage.jpg";

const {REACT_APP_URL, REACT_APP_API_URL} = process.env;

function Blog() {
    const allBlogs = useSelector((store) => store?.blogs?.allBlogs)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllBlogsAction())
    }, []);

    return (
        <Wrapper>
            <HelmetComponent
                title={'Blog | InServiHub'}
                description={"This is a Blog page"}
                // href={`${REACT_APP_URL}/blog/`}
                // social_title={'Blog | InServiHub'}
                // social_description={'Expert Views at Your Fingertips: Navigating Business Success'}
                // social_image={`https://erida-design.com${socialImage}`}
            />
            <div className="image-cover hero-banner" data-overlay="6">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 col-md-12">
                            <h1 className="big-header-capt capti">Blog Posts</h1>
                            <h4 className="big-header-h4">Expert Views at Your Fingertips: Navigating Business Success</h4>
                        </div>
                    </div>
                </div>
            </div>
            <section>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 col-md-12">
                            <div className="sec-heading center">
                                <h2>Articles</h2>
                                <h3>Latest <span>Articles & News</span></h3>
                            </div>
                        </div>
                    </div>
                </div>
            <div className="container">
                <div className="row">
                    {allBlogs && allBlogs.length ?
                        allBlogs?.map(blog =>
                            <div className="col-lg-4 col-md-4 col-sm-12" key={blog?.id}>
                                <div className="Reveal-blog-wrap-grid">
                                    <div className="Reveal-blog-thumb">
                                        <NavLink to={`/${blog?.preview_url}/`}>
                                            <img
                                                src={blog?.blog_img && `${REACT_APP_API_URL}/blogs_logo/${blog?.blog_img}`}
                                                className="img-fluid"
                                                alt={blog?.title}/>
                                        </NavLink>
                                    </div>
                                    <div className="Reveal-blog-info">
                                    </div>
                                    <div className="Reveal-blog-body">
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
                            </div>
                        ) : null
                    }
                </div>

            </div>
            </section>
        </Wrapper>
    );
}

export default Blog;