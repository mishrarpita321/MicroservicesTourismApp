import React from 'react';
import 'text-encoding';
import Footer from './Footer';
import { render, getAllByText } from '@testing-library/react';


import Homepagebody from './Homepagebody';

describe('Footer component', () => {
  it('renders correctly', () => {
    const { getAllByText } = render(<Footer />);
    // Test for the presence of certain text/content
    const contactUsElements = getAllByText('Contact Us');
    expect(contactUsElements.length).toBeGreaterThan(0);

    const menu = getAllByText('Menu');
    expect(menu.length).toBeGreaterThan(0);

    const { getAllByText: getAllByTextAnotherPage } = render(<Homepagebody />);
    const Austria = getAllByTextAnotherPage('Austria');
    expect(Austria.length).toBeGreaterThan(0);
    const Finland = getAllByTextAnotherPage('Finland');
    expect(Finland.length).toBeGreaterThan(0);

  });

  // Add more specific tests as needed for your component
});