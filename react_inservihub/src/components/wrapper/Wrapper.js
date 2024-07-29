import React from 'react';
import './wrapper.scss';
import Header from "../header/Header";
import Footer from "../footer/Footer";

function Wrapper(props) {

  return (
   <>
     <Header/>
     {props.children}
     <Footer/>
   </>
  );
}

export default Wrapper;
