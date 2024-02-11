'use client';
import React, { useEffect, useState } from 'react';
import styles from './places.module.css';
import { MdRestaurant } from "react-icons/md";
import { FaShoppingBag, FaHotel, FaRegHeart, FaMapMarkedAlt, FaCloudSun } from "react-icons/fa";
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';

import Webweather from '../components/Webweather';
import { useRouter } from 'next/navigation';


export default function Places({ place, country }) {
  const [showMore, setShowMore] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const [placeData, setPlaceData] = useState([]);

  const [location, setLocation] = useState([]);

  const router = useRouter();

  useEffect(() => {
    fetch(`http://localhost:7000/places/countries/${country}/${place}`)
      .then((res) => res.json())
      .then((data) => {
        setPlaceData(data);
        setLocation(data.location);
        // console.log(data);
      }).catch((error) => {
        console.error('Error fetching country data:', error);
      });
  }, [country]);


  const toggleContent = () => {
    setShowMore(!showMore);
  };
  /* const handleCategoryClick = async (category) => {
     setActiveCategory(category);
     if (category === 'weather') {
       < Webweather/>
       setWeatherComponent(() => weatherModule.default);
       fetchWeatherData();
     } else {
       setWeatherComponent(null);
     }
   }; */

  const renderImages = () => {
    const commonImageStyle = "w-64 h-64 mr-20";
    switch (activeCategory) {
      case 'restaurants':
        return (
          <div className="flex mt-4 min-h-64 justify-center items-center ">
            <img src="/image/restaurant1.jpg" alt="Restaurant 1" className={commonImageStyle} />
            <img src="/image/restaurant 2.jpg" alt="Restaurant 2" className={commonImageStyle} />
            <img src="/image/restaurant3.jpg" alt="Restaurant 3" className={commonImageStyle} />

          </div>
        );
      case 'hotels':
        return (
          <div className="flex mt-4 min-h-64 justify-center items-center ">
            <img src="/image/hotel2.jpg" alt="Hotel 1" className={commonImageStyle} />
            <img src="/image/hotel3.jpg" alt="Hotel 2" className={commonImageStyle} />
            <img src="/image/hotel4.jpg" alt="Hotel 3" className={commonImageStyle} />

          </div>
        );
      case 'shopping':
        return (

          <div className="flex mt-4 min-h-64 justify-center items-center mr-20">
            <img src="/image/shopping1.jpeg" alt="Shopping 1" className={commonImageStyle} />
            <img src="/image/shopping2.jpg" alt="Shopping 2" className={commonImageStyle} />
            <img src="/image/shopping5.jpg" alt="Shopping 5" className={commonImageStyle} />

          </div>
        );

  
      case 'weather':
        return (
          <div>
            <Webweather city = {placeData.name} />
          </div>
        );

      default:
        return null;
    }
  };

  const handleSave = async () => {
    try {
      const response = await fetch('http://localhost:7000/users/auth', { credentials: 'include' });
      const data = await response.json();
      if (data.message === "Success") {
        await fetch('http://localhost:7000/saveditems/addSavedItem', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            place: placeData.name,
            email: data.email,
            country: country,
            image: placeData.image
          })
        });
        router.push('/saveditems');
      } else {
        router.push('/Userpage/Login');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className={styles.placesContainer}>
      <img
        src={`http://localhost:9000/images/${placeData.imageMain}`}
        alt="Valletta Banner"
        className={styles.bannerImage}
      />
      <div className={styles.contentContainer}>
        <div className={styles.headingLeft + ' text-center'}>
          <h1 className="font-bold text-4xl">{placeData.name}</h1>
          {/* <p className={`${styles.subHeading} text-sm`}>Malta, Southern Europe</p> */}
        </div>

        <button className={`${styles.saveButton} flex items-center`} onClick={handleSave}>
          <FaRegHeart className="mr-2" />
          save
        </button>
        <div className={styles.description + ' text-justify'}>
          <p>
            {placeData.description}
          </p>
        </div>


        {showMore ? (
          <>
            <div className={styles.additionalContent + ' text-justify mb-4'}>
              <p>
                Valletta is located on the north-east coast of the island and is located on the Monte Sciberras headland,
                which is surrounded by the two largest natural harbors in the Mediterranean, Grand Harbor and Marsamxett Harbour.
                Valletta borders the neighboring town of Floriana to the southwest. Longitudinally (northeast-southwest),
                Republic Street (formerly Queen's Street) and the parallel Merchants Street have long been the main commercial streets.
              </p>
            </div>
            <div>
              <p className="text-xl font-bold text-blue-500 ml-0 text-left mb-4">{`Things to do around ${placeData.name}`}</p>
              <div className={`${styles.buttonsAndImagesContainer} mb-4`}>
                <div className={styles.actionButtonsContainer}>

                  <button className={`px-4 py-2 mr-4 focus:outline-none ${activeCategory === 'restaurants' ? 'bg-black text-white' : 'bg-gray-800 text-gray-300'}`} onClick={() => setActiveCategory('restaurants')}>
                    <MdRestaurant className="inline-block mr-2" />
                    Restaurants
                  </button>

                  <button className={`px-4 py-2 mr-4 focus:outline-none ${activeCategory === 'hotels' ? 'bg-black text-white' : 'bg-gray-800 text-gray-300'}`} onClick={() => setActiveCategory('hotels')}>
                    <FaHotel className="inline-block mr-2" />
                    Hotels
                  </button>

                  <button className={`px-4 py-2 mr-4 focus:outline-none ${activeCategory === 'shopping' ? 'bg-black text-white' : 'bg-gray-800 text-gray-300'}`} onClick={() => setActiveCategory('shopping')}>
                    <FaShoppingBag className="inline-block mr-2" />
                    Shopping
                  </button>

                
                  <button className={`px-4 py-2 focus:outline-none ${activeCategory === 'weather' ? 'bg-black text-white' : 'bg-gray-800 text-gray-300'}`} onClick={() => setActiveCategory('weather')}>
                    <FaCloudSun className="inline-block mr-2" />
                    Weather
                  </button>
                </div>
              </div>

              <div className="flex justify-center items-center"></div>
              {renderImages()}
            </div>
            {/* <div className={styles.googleMapsImageContainer}>
            <div className="flex mt-4">
              <Link href="https://www.google.com/maps/place/Valletta" target="_blank" rel="noopener noreferrer">
                <img
                  src="/image/valleta_map.PNG"
                  alt="Google Maps Link"
                  className="w-full h-full"
                />
              </Link>
              </div>
  
            </div>  */}

            <button className={`${styles.readMoreButton} bg-transparent text-black font-bold flex items-center`} onClick={toggleContent}>
              Read Less <FaAngleUp className="ml-4" />
            </button>
          </>
        ) : (
          <button className={`${styles.readMoreButton} bg-transparent text-black font-bold flex items-center`} onClick={toggleContent}>
            Read More <FaAngleDown className="ml-4" />
          </button>
        )}
      </div>
    </div>
  );
}
