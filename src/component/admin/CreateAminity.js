import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../common/Navbar';

const CreateAmenity = () => {
  const navigate = useNavigate();
  const [villas, setVillas] = useState([]);
  const [additionalData, setAdditionalData] = useState([]);
  const [amenityData, setAmenityData] = useState({
    villaName: "",
    name: '',  // assuming you have a 'name' field in your Amenity model
    // Add other fields as needed
  });

  useEffect(() => {
    // Fetch villa data when the component mounts
    axios
      .get('http://localhost:5211/api/Villas')
      .then((result) => {
        setAdditionalData(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAmenityData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Assuming you have a function to create the amenity on the server
      const createdAmenity = await axios.post('http://localhost:5211/api/Amenity', amenityData);
      
      // Navigate to AmenityList page
      navigate('/amenity-list');
    } catch (error) {
      console.error('Error creating amenity:', error);
    }
  };

  return (
    <>
    <Navbar admin />
    {/* <div className="container-fluid">
      <div className="row">
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <div className="w-100 card border-0 p-4">
            <div className="card-header bg-success bg-gradient ml-0 py-3">
              <div className="row">
                <div className="col-12 text-center">
                  <h2 className="text-white py-2">Create Amenity</h2>
                </div>
              </div>
            </div>
            <div className="card-body border p-4">
              <form method="post" className="row" onSubmit={handleSubmit} noValidate>
                <div className="p-3">
                  <div className="form-floating py-1 col-12">
                    {additionalData.length > 0 ? (
                                <select
                                className="form-select"
                                name="villaName"
                                value={amenityData.villaName}
                                onChange={handleInputChange}
                            >
                                <option value="">--Select Villa--</option>
                                {additionalData.map((item) => (
                                    <option key={item.id} value={item.name}>
                                        {item.name}
                                    </option>
                                ))}
                            </select>
                            
                            ) : (
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Leave Type"
                                    value={amenityData.villaName}
                                    onChange={(e) => setVillas(e.target.value)}
                                />
                            )}
                    <label className="ms-2" htmlFor="VillaId">
                      VillaId
                    </label>
                  </div>
                  
                  <div className="form-floating py-1 col-12">
                    <input
                      type="text"
                      className="form-control border shadow"
                      id="Amenity_Name"
                      name="name"
                      placeholder="Name"
                      value={amenityData.name}
                      onChange={handleInputChange}
                    />
                    <label className="ms-2" htmlFor="Amenity_Name">
                      Name
                    </label>
                  </div>
                  
                  <div className="row pt-2">
                    <div className="col-6 col-md-3">
                      <button type="submit" className="btn btn-success w-100" onClick={handleSubmit}> 
                        <i className="bi bi-check-circle"></i> Create
                      </button>
                    </div>
                    <div className="col-6 col-md-3">
                      
                      <button type="button" className="btn btn-secondary w-100" onClick={() => navigate('/amenity-list')}>
                        <i className="bi bi-x-circle"></i> Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div> */}

<div className="container">
  <div className="row h-100 justify-content-center align-items-center">
    <main className="col-md-9  col-lg-10">
      <div className="w-100 card border-0 p-4">
        <div className="card-header bg-success bg-gradient ml-0 py-3">
          <div className="row">
            <div className="col-12 text-center">
              <h2 className="text-white py-2">Create Amenity</h2>
            </div>
          </div>
        </div>
        <div className="card-body border p-4">
          <form method="post" className="row" onSubmit={handleSubmit} noValidate>
            <div className="p-3">
            <div className="form-floating py-1 col-12">
                    {additionalData.length > 0 ? (
                                <select
                                className="form-select"
                                name="villaName"
                                value={amenityData.villaName}
                                onChange={handleInputChange}
                            >
                                <option value="">--Select Villa--</option>
                                {additionalData.map((item) => (
                                    <option key={item.id} value={item.name}>
                                        {item.name}
                                    </option>
                                ))}
                            </select>
                            
                            ) : (
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Leave Type"
                                    value={amenityData.villaName}
                                    onChange={(e) => setVillas(e.target.value)}
                                />
                            )}
                    <label className="ms-2" htmlFor="VillaId">
                      VillaId
                    </label>
                  </div>
                  
                  <div className="form-floating py-1 col-12">
                    <input
                      type="text"
                      className="form-control border shadow"
                      id="Amenity_Name"
                      name="name"
                      placeholder="Name"
                      value={amenityData.name}
                      onChange={handleInputChange}
                    />
                    <label className="ms-2" htmlFor="Amenity_Name">
                      Name
                    </label>
                  </div>
                  
                  <div className="row pt-2">
                    <div className="col-6 col-md-3">
                      <button type="submit" className="btn btn-success w-100" onClick={handleSubmit}> 
                        <i className="bi bi-check-circle"></i> Create
                      </button>
                    </div>
                    <div className="col-6 col-md-3">
                      
                      <button type="button" className="btn btn-secondary w-100" onClick={() => navigate('/amenity-list')}>
                        <i className="bi bi-x-circle"></i> Cancel
                      </button>
                    </div>
                  </div>
            </div>
          </form>
        </div>
      </div>
    </main>
  </div>
</div>

    </>
  );
};

export default CreateAmenity;
