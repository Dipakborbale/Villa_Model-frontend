import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../common/Navbar';


const CreateVillaPage = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [sqft, setSqft] = useState('');
    const [occupancy, setOccupancy] = useState('');
    const [data, setData] = useState([]);
    const [imageUrl, setImageUrl] = useState(''); 

    const [nameError, setNameError] = useState('');
    const [descriptionError, setDescriptionError] = useState('');
    const [priceError, setPriceError] = useState('');
    const [sqftError, setSqftError] = useState('');
    const [occupancyError, setOccupancyError] = useState('');
   
    const [bulkError, setBulkError] = useState('');

    useEffect(() => {
        getData();
    }, []);

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

    const handleSave = () => {
        // Reset all error messages
        setNameError('');
        setDescriptionError('');
        setPriceError('');
        setSqftError('');
        setOccupancyError('');
        setBulkError('');

        // Validation
        let isValid = true;

       
        if (!name.trim() || !description.trim() || !price.trim() || !sqft.trim() || !occupancy.trim()) {
            setBulkError('All fields are required');
            isValid = false;
        }

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

        // If all validations pass, proceed with saving data
        if (isValid) {
            const url = 'http://localhost:5211/api/Villas';
            const data = {
                name,
                description,
                price,
                sqft,
                occupancy,
                imageUrl,
            };

            axios
                .post(url, data)
                .then((result) => {
                    // Redirect to VillaListPage with a success parameter
                    navigate('/VillaListPage?success=true');
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    };



const handleBackToList = () => {
    navigate('/VillaListPage');
};

const handleImageChange = (e) => {
    // Handle image file change and update the state
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
        setImageUrl(reader.result);
    };

    if (file) {
        reader.readAsDataURL(file);
    }
};


return (
    <>
    <Navbar admin />
    <div className="w-100 card border-0 p-4">
        <div className="card-header bg-success bg-gradient ml-0 py-3">
            <div className="row">
                <div className="col-12 text-center">
                    <h2 className="text-white py-2">Create Villa</h2>
                </div>
            </div>
        </div>
        <div className="card-body border p-4">
            <form method="post" className="row" encType="multipart/form-data" noValidate="novalidate">
                <div className="p-3">
                    <div className="text-danger mb-2">{bulkError}</div>
                    <div className="form-floating py-1 col-12">
                        <input
                            onChange={(e) => setName(e.target.value)}
                            className={`form-control border shadow ${nameError ? 'is-invalid' : ''}`}
                            type="text"
                            data-val="true"
                            data-val-maxlength="The field Name must be a string or array type with a maximum length of '50'."
                            data-val-maxlength-max="50"
                            data-val-required="The Name field is required."
                            id="Name"
                            maxLength="50"
                            name="Name"
                            value={name}
                        />
                        <label className="ms-2" htmlFor="Name">
                            Name
                        </label>
                        <span className="text-danger field-validation-valid">{nameError}</span>
                    </div>
                    <div className="form-floating py-1 col-12">
                        <input
                            onChange={(e) => setDescription(e.target.value)}
                            className={`form-control border shadow ${descriptionError ? 'is-invalid' : ''}`}
                            type="text"
                            id="Description"
                            name="Description"
                            value={description}
                        />
                        <label className="ms-2" htmlFor="Description">
                            Description
                        </label>
                        <span className="text-danger field-validation-valid">{descriptionError}</span>
                    </div>
                    <div className="form-floating py-1 col-12">
                        <input
                            onChange={(e) => setPrice(e.target.value)}
                            className={`form-control border shadow ${priceError ? 'is-invalid' : ''}`}
                            type="text"
                            data-val="true"
                            data-val-number="The field Price per night must be a number."
                            data-val-range="The field Price per night must be between 10 and 10000."
                            data-val-range-max="10000"
                            data-val-range-min="10"
                            data-val-required="The Price per night field is required."
                            id="Price"
                            name="Price"
                            value={price}
                        />
                        <label className="ms-2" htmlFor="Price">
                            Price per night
                        </label>
                        <span className="text-danger field-validation-valid">{priceError}</span>
                    </div>
                    <div className="form-floating py-1 col-12">
                        <input
                            onChange={(e) => setSqft(e.target.value)}
                            className={`form-control border shadow ${sqftError ? 'is-invalid' : ''}`}
                            type="number"
                            data-val="true"
                            data-val-required="The Sqft field is required."
                            id="Sqft"
                            name="Sqft"
                            value={sqft}
                        />
                        <label className="ms-2" htmlFor="Sqft">
                            Sqft
                        </label>
                        <span className="text-danger field-validation-valid">{sqftError}</span>
                    </div>
                    <div className="form-floating py-1 col-12">
                        <input
                            onChange={(e) => setOccupancy(e.target.value)}
                            className={`form-control border shadow ${occupancyError ? 'is-invalid' : ''}`}
                            type="number"
                            data-val="true"
                            data-val-range="The field Occupancy must be between 1 and 10."
                            data-val-range-max="10"
                            data-val-range-min="1"
                            data-val-required="The Occupancy field is required."
                            id="Occupancy"
                            name="Occupancy"
                            value={occupancy}
                        />
                        <label className="ms-2" htmlFor="Occupancy">
                            Occupancy
                        </label>
                        <span className="text-danger field-validation-valid">{occupancyError}</span>
                    </div>
                    <div className="form-floating py-1 col-12">
                <input
                    hidden
                    className="form-control border shadow"
                    type="text"
                    id="ImageUrl"
                    name="ImageUrl"
                    value={imageUrl}
                />
                <input
                    className="form-control border shadow"
                    type="file"
                    id="Image"
                    name="Image"
                    onChange={handleImageChange} // Handle image change
                />
                <label className="ms-2" htmlFor="ImageUrl">
                    Image Url
                </label>
                <span
                    className="text-danger field-validation-valid"
                    data-valmsg-for="ImageUrl"
                    data-valmsg-replace="true"
                ></span>
            </div>


                    <div className="row pt-2">
                        <div className="col-6 col-md-3">
                            <button
                                type="button"
                                className="btn btn-dark mx-2"
                                style={{ width: '150px' }}
                                onClick={handleSave}
                            >
                                Create
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
                <input
                    name="__RequestVerificationToken"
                    type="hidden"
                    value="CfDJ8Gzg4ab6kKJAmqEZ2x0Zp8aHpmtsRWmdr9ZpBlbcWqF1CCSCceKGoYEDyOEc8mezGacrjxKJxTLPz5118qUYxECTt1--ko-R1d_NJEDdmzSf-yWYOPeeBlZEvsVpB55tZk_wqhCew3guyyK6tHG9R3Mv_V7NWLZdZ4k-MUUr8fK2pJsG_imAaF6IxYyMUEUWDg"
                />
            </form>
        </div>
    </div>
    </>
);
};

export default CreateVillaPage;