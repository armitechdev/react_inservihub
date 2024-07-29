import React from 'react';
import './footer.css';
import logo from '../../assets/img/inservihub-logo.png'
import { TiArrowUp } from "react-icons/ti";
import {Col, Row} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.css';
import {FaFacebookF, FaLinkedinIn} from "react-icons/fa";
import {NavLink} from "react-router-dom";
import {CiMail} from "react-icons/ci";

function Footer() {
  const date = new Date();
  return (
      <>
        <footer className="dark-footer skin-dark-footer">
          <div className="ht-80"></div>
          <div>
            <div className="container">
              <Row>
                <Col md={6} lg={4} >
                  <div className="footer-widget">
                    <img
                        src={logo}
                        loading="lazy"
                        alt="Footer logo"
                        title="Footer logo"
                        className="img-fluid f-logo"
                        style={{width: '100%', height: '100%'}}
                    />
                    <p>Los Angeles, CA, USA<br/></p>
                    <ul className="footer-bottom-social">
                      <li><a target="_blank" rel='noreferrer' href="https://www.facebook.com/inservihub" name="facebook"><FaFacebookF /></a></li>
                      {/*<li><a target="_blank" href="https://www.instagram.com"><FaInstagram /></a></li>*/}
                      <li><a target="_blank" rel='noreferrer' href="https://www.linkedin.com/company/inservihub/" name="linkedin"><FaLinkedinIn /></a></li>
                    </ul>
                  </div>
                </Col>
                <Col md={4} lg={4}>
                  <div className="footer-widget">
                    <h4 className="widget-title">Sitemap</h4>
                    <ul className="footer-menu">
                      <li><NavLink to="/">Home</NavLink></li>
                      <li><NavLink to="/listings">Listings</NavLink></li>
                      <li><NavLink to="/blog">Blog</NavLink></li>
                      <li><NavLink to="/contact-us">Contact Us</NavLink></li>
                    </ul>
                  </div>
                </Col>

                <Col md={4} lg={4}>
                  <div className="footer-widget">
                    <h4 className="widget-title">Contact Us</h4>
                    <ul className="footer-menu">
                      <li><CiMail style={{marginRight: '3px'}}/><a href="mailto:info@inservihub.com">info@inservihub.com</a></li>
                    </ul>
                  </div>
                </Col>

              </Row>
            </div>
          </div>
          <div className="footer-bottom">
            <div className="container">
              <Row>
                <Col >
                  <p className="mb-0">© {date.getUTCFullYear()}  InServiHub by <a rel='noreferrer' target="_blank" href="https://armitechnologies.com">Armi
                    Technologies</a> All Rights Reserved</p>
                </Col>

              </Row>
            </div>
          </div>
        </footer>
        <a id="back2Top" className="top-scroll" title="Back to top" href="#"><TiArrowUp size={20}/></a>
      </>
  );
}

export default Footer;
