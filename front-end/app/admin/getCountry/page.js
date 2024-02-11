'use client'
import NavbarAdmin from '@/app/components/NavbarAdmin'
import React, { useState, useEffect } from 'react'
import styles from './getCountry.module.css'
import AddCountryPopup from '@/app/components/AddCountryPopup'
import { useRouter } from 'next/navigation';
import UpdateCountryPopup from '@/app/components/UpdateCountryPopup'
import { toast, Toaster } from 'sonner'
import AdminChat from '@/app/components/Customercare'

export default function page() {
  const [openPopup, setOpenPopup] = useState(false);
  const [updatePopup, setUpdatePopup] = useState(false);
  const [countrydetails, setCountryDetail] = useState([]);
  const [countryId, setCountryId] = useState('');
  
  const router = useRouter();

  /* Code refactorings: Can be done in a better way by avoiding the use of useEffect for multiple fetch requests */

  useEffect(() => {
    fetch('http://localhost:7000/users/admin/auth', { credentials: 'include' })
      .then(res => res.json())
      .then(data => {
        if (data === "Success") {
          router.push('/admin/getCountry')
          // toast.success("Login Successful")
          // console.log(data);
        } else {
          router.push('/admin')
        }
      })
      .catch((error) => console.error(error));
  }, [])


  useEffect(() => {
    fetch('http://localhost:7000/countries')
      .then(res => res.json())
      .then(data => {
        setCountryDetail(data)
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [])

  const handleClick = () => {
    setOpenPopup(true);
  }

  const handleUpdate = (id) => () => {
    // router.push(`/admin/updateCountry/${id}`)
    setUpdatePopup(true);
    setCountryId(id);
  }

  const updatedCountry = () => {
    fetch('http://localhost:7000/countries')
      .then(res => res.json())
      .then(data => {
        setCountryDetail(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:7000/countries/delete/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast.error("Country Deleted Successfully");
        const updatedCountryDetails = countrydetails.filter(detail => detail._id !== id);
        setCountryDetail(updatedCountryDetails);
      }
    } catch (error) {
      console.error('Error during deletion:', error.message);
      toast.error("Error during deletion");
    }
  };

  return (
    <div>
      <NavbarAdmin />
      <br />
      <div className={styles.countrydetails}>
        <div>
          <h1 className={styles.label}>Country Details</h1>
          <div className={styles.buttons}>
            <button className={styles.add} onClick={handleClick}>Add</button>
          </div>
          <br />
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Image</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {countrydetails.map((detail) => (
                <tr key={detail._id}>
                  <td>{detail.name}</td>
                  <td><img
                    src={`http://localhost:5000/images/${detail.image}`}
                    height={100}
                    width={100}
                  /></td>
                  <td>{detail.description} </td>
                  <td className={styles.buttons}>
                    <button className={styles.add} onClick={handleUpdate(detail._id)}>Update</button>
                    <button className={styles.delete} onClick={(e) => handleDelete(detail._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
        </div>
        <Toaster position="bottom-center" richColors duration={5000}/>
     
    </div>
    <div class="flex justify-end">
  <div class="mr-4">
    <AdminChat />
  </div>
</div>
      
      {openPopup && <AddCountryPopup setOpenPopup={setOpenPopup} setCountryDetail={setCountryDetail} countryId={countryId} />}
      {updatePopup && <UpdateCountryPopup setOpenPopup={setUpdatePopup} countryId={countryId} updatedCountryDetails={updatedCountry} />}
    </div>
  )
}
