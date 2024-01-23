import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Navbar from '../common/Navbar';

const EditVillaPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // State for form inputs and errors
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [sqft, setSqft] = useState('');
  const [occupancy, setOccupancy] = useState('');

  const [nameError, setNameError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [priceError, setPriceError] = useState('');
  const [sqftError, setSqftError] = useState('');
  const [occupancyError, setOccupancyError] = useState('');

  const[data,setData] = useState([]);

  // Fetch data for editing when component mounts
  useEffect(() => {
    axios
      .get(`http://localhost:5211/api/Villas/${id}`)
      .then((result) => {
        const { name, description, price, sqft, occupancy } = result.data;
        setName(name);
        setDescription(description);
        setPrice(price.toString());
        setSqft(sqft.toString());
        setOccupancy(occupancy.toString());
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);
//Defining the getData function that makes an HTTP GET request to fetch all Villa data from the server
  useEffect(() => {
    getData();
}, [])
 
const getData = () =>
{
    axios.get('http://localhost:5211/api/Villas')
    .then((result)=>{
        setData(result.data)
       //toast.success('Category has been added')
    })
    .catch((error)=>{
        console.log(error)
    })
}

  // Function to validate form inputs
  const validateInputs = () => {
    let isValid = true;

    // Reset all error messages
    setNameError('');
    setDescriptionError('');
    setPriceError('');
    setSqftError('');
    setOccupancyError('');

    // Validation logic for each input field
    if (name.trim().length === 0) {
      setNameError('Name is required');
      isValid = false;
    } else if (name.length > 50) {
      setNameError('Name should not exceed 50 characters');
      isValid = false;
    }

    if (description.length > 100) {
      setDescriptionError('Description should not exceed 100 characters');
      isValid = false;
    }

    if (isNaN(price) || price < 10 || price > 10000) {
      setPriceError('Price per night must be a number between 10 and 10000');
      isValid = false;
    }

    if (isNaN(sqft) || sqft < 0 || sqft > 10) {
      setSqftError('Sqft must be a number between 0 and 10');
      isValid = false;
    }

    if (isNaN(occupancy) || occupancy < 1 || occupancy > 10) {
      setOccupancyError('Occupancy must be a number between 1 and 10');
      isValid = false;
    }

    return isValid;
  };

  // Function to handle form submission
  const handleSave = () => {
    // Validate form inputs
    const isValid = validateInputs();

    if (isValid) {
      // If validation passes, proceed with saving data
      const url = `http://localhost:5211/api/Villas/${id}`;
      const data = {
        id,
        name,
        description,
        price,
        sqft: parseInt(sqft)|| 0,
        occupancy: parseInt(occupancy)|| 0,
      };

      axios
        .put(url, data)
        .then(() => {
          // Redirect to VillaListPage with a success parameter
          navigate('/VillaListPage?success=true');
          toast.success('Villa has been edited')
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  // Function to handle navigation back to the list
  const handleBackToList = () => {
    navigate('/VillaListPage');
  };

  return (
    <>
    <Navbar admin />
    <div className="w-100 card border-0 p-4">
      <div className="card-header bg-success bg-gradient ml-0 py-3">
        <div className="row">
          <div className="col-12 text-center">
            <h2 className="text-white py-2">Edit Villa</h2>
          </div>
        </div>
      </div>
      <div className="card-body border p-4">
        <form method="post" className="row" encType="multipart/form-data" noValidate="novalidate">
          <div className="p-3">
            {/* Name Input */}
            <div className="form-floating py-1 col-12">
              <input
                onChange={(e) => setName(e.target.value)}
                className={`form-control border shadow ${nameError ? 'is-invalid' : ''}`}
                type="text"
                value={name}
              />
              <label className="ms-2" htmlFor="Name">
                Name
              </label>
              <span className="text-danger field-validation-valid">{nameError}</span>
            </div>

            {/* Description Input */}
            <div className="form-floating py-1 col-12">
              <input
                onChange={(e) => setDescription(e.target.value)}
                className={`form-control border shadow ${descriptionError ? 'is-invalid' : ''}`}
                type="text"
                value={description}
              />
              <label className="ms-2" htmlFor="Description">
                Description
              </label>
              <span className="text-danger field-validation-valid">{descriptionError}</span>
            </div>

            {/* Price Input */}
            <div className="form-floating py-1 col-12">
              <input
                onChange={(e) => setPrice(e.target.value)}
                className={`form-control border shadow ${priceError ? 'is-invalid' : ''}`}
                type="text"
                value={price}
              />
              <label className="ms-2" htmlFor="Price">
                Price per night
              </label>
              <span className="text-danger field-validation-valid">{priceError}</span>
            </div>

            {/* Sqft Input */}
            <div className="form-floating py-1 col-12">
              <input
                onChange={(e) => setSqft(e.target.value)}
                className={`form-control border shadow ${sqftError ? 'is-invalid' : ''}`}
                type="number"
                value={sqft}
              />
              <label className="ms-2" htmlFor="Sqft">
                Sqft
              </label>
              <span className="text-danger field-validation-valid">{sqftError}</span>
            </div>

            {/* Occupancy Input */}
            <div className="form-floating py-1 col-12">
              <input
                onChange={(e) => setOccupancy(e.target.value)}
                className={`form-control border shadow ${occupancyError ? 'is-invalid' : ''}`}
                type="number"
                value={occupancy}
              />
              <label className="ms-2" htmlFor="Occupancy">
                Occupancy
              </label>
              <span className="text-danger field-validation-valid">{occupancyError}</span>
            </div>
            <div className="form-floating py-1 col-12">
    <input hidden className="form-control border shadow" type="text" id="ImageUrl" name="ImageUrl" value="" />
    <input className="form-control border shadow" type="file" id="Image" name="Image" />
    <label className="ms-2" htmlFor="ImageUrl">Image Url</label>
    <span className="text-danger field-validation-valid" data-valmsg-for="ImageUrl" data-valmsg-replace="true"></span>
</div>
          </div>
        </form>

        {/* Render buttons for save and back to list */}
        <div className="row pt-2">
          <div className="col-6 col-md-3">
            <button
              type="button"
              className="btn btn-dark mx-2"
              style={{ width: '150px' }}
              onClick={handleSave}
            >
              Save
            </button>
          </div>
          <div className="col-6 col-md-3">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleBackToList}
            >
              Back To List
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default EditVillaPage;
