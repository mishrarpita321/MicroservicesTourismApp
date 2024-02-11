import React from 'react';
import Places from '../../../components/Places'
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';


export default function page( {params}) {
  const place = params.place;
  const country = params.country;
  return (
    <div>
        <Places place = { place } country = {country} />
       <Navbar/>
        <Footer/>
    </div>
  )
}
