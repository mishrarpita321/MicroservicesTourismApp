import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Countries from '../../components/Countries';

const CountryPage = ({params}) => {
  const country = params.country;
  return (
    <div>
      <Navbar />
      <Countries country = {country} />
      <Footer />
    </div>
  );
};

export default CountryPage;
