// src/components/VillaListPage.js
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate} from 'react-router-dom';
import Navbar from '../common/Navbar';

const VillaListPage = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate(); 

  const toastShownRef = useRef(false);

  const getData = () => {
    axios
      .get('http://localhost:5211/api/Villas')
      .then((result) => {
        setData(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getData();

    return () => {
      // Clear the toastShown value when the component is unmounted
      localStorage.removeItem('toastShown');
    };
  }, []); // Run once on component mount

  useEffect(() => {
    if (!toastShownRef.current) {
      toast.success('Villa has been added');
      toastShownRef.current = true;
      localStorage.setItem('toastShown', 'true');
    }
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure to delete this Villa') === true) {
      try {
        await axios.delete(`http://localhost:5211/api/Villas/${id}`);
        toast.success('Villa has been deleted');
        await getData(); // Wait for data to be updated
      } catch (error) {
        toast.error(error.message);
      }
    }
  };
  
  const handleLogout = () => {
    // Clear the token from local storage or state management solution
    localStorage.removeItem('token');

    // Redirect to the login page after logout
    navigate('/login');

    // Display a success toast message
    toast.success('Logout successful!', { position: 'top-right', autoClose: 3000 });
  };

  return (
    <>
    <Navbar admin />
    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 w-100">
      <ToastContainer />
      
      <div className="w-100 card border-0 p-4">
        <div className="card-header bg-success bg-gradient ml-0 py-3">
          <div className="row">
            <div className="col-12 text-center">
              <h2 className="text-white py-2">Villa List</h2>
            </div>
          </div>
        </div>
        <div className="card-body border p-4">
          <div className="row pb-3">
            <div className="col-6 offset-6 text-end">
              <Link to="/create-villa" className="btn btn-secondary">
                <i className="bi bi-plus-circle"></i> Create New Villa
              </Link>
            </div>
          </div>
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th> {/* Added description field */}
                <th>Price</th>
                <th>Sqft</th>
                <th>Occupancy</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data && data.length > 0 ? (
                data.map((item, id) => {
                  return (
                    <tr key={id}>
                      <td>{item.name}</td>
                      <td>{item.description}</td>
                      <td>{item.price}</td>
                      <td>{item.sqft}</td>
                      <td>{item.occupancy}</td>
                      <td>
                        {/* Link to the EditVillaPage with the villa ID */}
                        <Link to={`/edit-villa/${item.id}`} className="btn btn-primary">
                          Edit
                        </Link>{' '}
                        &nbsp;
                        <button className="btn btn-danger" onClick={() => handleDelete(item.id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                'Loading.....'
              )}
            </tbody>
          </table>
          <button className="btn btn-outline-danger" onClick={handleLogout}>
        Logout
      </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default VillaListPage;
