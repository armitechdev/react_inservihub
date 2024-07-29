import React, {useEffect} from 'react';
import Wrapper from "../../components/wrapper/Wrapper";
import HelmetComponent from "../../components/react-helmet/HelmetComponent";
import {useDispatch, useSelector} from "react-redux";
import {NavLink, useLocation} from "react-router-dom";
import {getLastBlogsAction, getSingleBlogAction} from "../../store/actions/blogs";

const {REACT_APP_URL, REACT_APP_API_URL} = process.env;

function SingleBlog() {
    const params = useLocation();
    const dispatch = useDispatch();
    const allBlogs = useSelector((store) => store?.blogs?.allBlogs);
    const singleBlog = useSelector((store) => store?.blogs?.singleBlog);
    const lastBlogs = useSelector((store) => store?.blogs?.lastBlogs);
    const filteredBlog = allBlogs?.filter(i => params?.pathname?.replaceAll('/', '',) == i?.preview_url)

    useEffect(() => {
        dispatch(getSingleBlogAction(filteredBlog[0]?.id))
        dispatch(getLastBlogsAction())
    }, [params.pathname]);

    return (
        <Wrapper>
            <HelmetComponent
                title={singleBlog?.title}
                description={`This is a ${singleBlog?.title} page`}
                // href={`${REACT_APP_URL}/${singleBlog?.preview_url}/`}
                // social_title={singleBlog?.meta_seo_title}
                // social_description={singleBlog?.meta_seo_description}
                // social_image={`${REACT_APP_API_URL}/blogs_cover_img/${singleBlog?.blog_img}`}
            />
            <div className="page-title">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 col-md-12">
                            <h2 className="ipt-title">{singleBlog?.title}</h2>
                        </div>
                    </div>
                </div>
            </div>
            <section>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 col-md-12 col-sm-12 col-12">
                            <div className="blog-details single-post-item format-standard">
                                <div className="post-details">
                                    <div className="post-featured-img">
                                        <img
                                            className="img-fluid"
                                            src={singleBlog && singleBlog?.blog_img && `${REACT_APP_API_URL}/blogs_cover_img/${singleBlog?.blog_img}`}
                                            alt={singleBlog?.title}
                                        />
                                    </div>
                                    <div dangerouslySetInnerHTML={{__html: singleBlog?.html_component}}/>
                                </div>
                            </div>

                        </div>
                        <div className="col-lg-4 col-md-12 col-sm-12 col-12">
                            <div className="single-widgets ">
                                <h4 className="title">Trending Posts</h4>
                                <ul>
                                    {lastBlogs && lastBlogs.length ?
                                        lastBlogs?.map(blog =>
                                            <li key={blog.id}>
                                                    <span className="left">
                                                        <img
                                                            src={blog?.blog_img && `${REACT_APP_API_URL}/blogs_cover_img/${blog?.blog_img}`}
                                                            alt={blog.title}/>
                                                    </span>
                                                <span className="right" >
                                                        <NavLink to={`/${blog?.preview_url}/`}>
                                                           {blog?.title}
                                                        </NavLink>
                                                    </span>
                                            </li>
                                        ) : null}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Wrapper>
    );
}

export default SingleBlog;