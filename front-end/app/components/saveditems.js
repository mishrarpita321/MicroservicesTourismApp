'use client'
import { useEffect, useState } from 'react'
import styles from '../components/saveditem.module.css'
import { useRouter } from 'next/navigation'
import { toast, Toaster } from 'sonner'
import Footer from './Footer'

export default function SavedItems() {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [name, setName] = useState()
  const [popup, setPopup] = useState(false);
  const [saveItems, setSaveItems] = useState([]);
  const router = useRouter();
  const [selectedItemId, setSelectedItemId] = useState(null);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:7000/saveditems/delete/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast.success(`Saveditem with ID ${id} deleted successfully`);
        const updatedSaveditemsDetails = saveItems.filter(item => item._id !== id);
        setSaveItems(updatedSaveditemsDetails);
      }
    } catch (error) {
      console.log('Error during deletion:', error.message);
    }
  };

  const handleRemoveList = async () => {
    if (selectedItemId) {
      await handleDelete(selectedItemId);
      setSelectedItemId(null); // Reset selected item after deletion
    }
  };

  // const handleEdit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await axios.post('', { name, email, password });
  //     toast.success(response.data.message);
  //     setOpenEdit(false);
  //     setPopup(true)
  //   } catch (error) {
  //     if (error.response) {
  //       toast.error(error.response.data.message);
  //     } else if (error.request) {
  //       toast.error('No response received from the server');
  //     } else {
  //       toast.error('An unexpected error occurred');
  //     }
  //   }
  // };

  useEffect(() => {
    fetch('http://localhost:7000/users/auth', { credentials: 'include' })
      .then(res => res.json())
      .then(data => {
        if (data.message === "Success") {
          router.push('/saveditems')
          // toast.success("Login Successful")
          // console.log(data);
        } else {
          router.push('/')
        }
      })
      .catch((error) => console.error(error));
  }, [])

  useEffect(() => {
    fetch('http://localhost:7000/saveditems')
      .then(res => res.json())
      .then(data => {
        setSaveItems(data);
        console.log(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      <div className={styles.container}>
        <div>
          <form className="flex flex-col md:flex-row justify-start space-y-1 md:space-y-1 md:space-x-16 items-start my-2 mx-5 md:mx-0 md:my-0">
            <div className="md:w-1/2 max-w-sm" style={{ marginLeft: '10px' }}>
              <div className="text-left" style={{ marginTop: '90px', color: 'white' }}>
                <label className="mr-1" style={{ fontSize: '18px', fontWeight: 'bold' }}>Profile Details</label>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input
                  className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
                  type="text"
                  placeholder="First name"
                  required
                />
                <input
                  className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
                  type="text"
                  placeholder="Last name"
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <input
                className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
                type="email"
                placeholder="Email Address"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <div className="text-left">
                <button
                  className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
                  type="submit"
                >
                  Edit
                </button>
              </div>
            </div>
          </form>

        </div>
        <header className={styles.header}>
          <p style={{ color: 'white', marginTop: '50px', fontSize: '28px' }}>MY LIST ({saveItems.length}) </p>
          <div className={styles.headerContent}>
            <button className={styles.removeBtn} onClick={handleRemoveList}>REMOVE LIST</button>
          </div>
        </header>

        <div className={styles.imageCollage}>
          {saveItems.map((item, index) => (
            <div className={styles.imageItem} key={index}>
              <button onClick={() => setSelectedItemId(item._id)}>
                {item.image ? (
                  <img src={`http://localhost:9000/images/${item.image}`} alt={item.place} className={styles.horizontalImage} />
                ) : (
                  <div className={styles.errorImage}>
                    Image not available
                  </div>
                )}
              </button>
              <p>{item.place}</p>
            </div>
          ))}
        </div>
        <Toaster position="bottom-center" toastOptions={{ duration: 5000 }} />
      </div>
      <Footer />
    </div>
  );
}
