import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import { FaPlaceOfWorship } from "react-icons/fa";
import { MdPlace } from "react-icons/md";
import { MdFavorite } from "react-icons/md";

export const Navbardata = [
  {
    title: 'Home',
    path: '/',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'Country',
    path: '/admin/getCountry',
    icon: <FaPlaceOfWorship />,
    cName: 'nav-text'
  },
  {
    title: 'Places',
    path: '/admin/getPlaces',
    icon: <MdPlace />,
    cName: 'nav-text'
  },
  {
    title: 'Favorites',
    path: '/admin/getSavedItems',
    icon: <MdFavorite />,
    cName: 'nav-text'
  },
];