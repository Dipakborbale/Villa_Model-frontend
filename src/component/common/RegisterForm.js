// src/components/RegisterForm.js
// src/components/RegisterForm.js
import React, { useState } from 'react';
import { register } from './apiService.js'; // Import the register function
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import Navbar from './Navbar.js';

const RegisterForm = () => {
    const navigate = useNavigate(); // Initialize the navigate function

    const [formData, setFormData] = useState({
        email: '',
        name: '',
        phoneNumber: '',
        password: '',
        confirmPassword: '',
       // role: '',  Added role field
    });

    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Client-side validation logic
        const newErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^\d{10}$/; // Adjust as needed
        const passwordRegex = /(?=.*[A-Z])(?=.*\d)(?=.*\W)/;

        if (!formData.email || !emailRegex.test(formData.email)) {
            newErrors.email = 'Valid email is required';
        }

        if (!formData.name || !/^[a-zA-Z\s]+$/.test(formData.name)) {
            newErrors.name = 'Valid name is required';
        }

        if (!formData.phoneNumber || !phoneRegex.test(formData.phoneNumber)) {
            newErrors.phoneNumber = 'Valid phone number is required';
        }

        if (!formData.password || !passwordRegex.test(formData.password)) {
            newErrors.password =
                'Password must contain at least one uppercase letter, one digit, and one special character';
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        if (!formData.role) {
            newErrors.role = 'Role is required';
        }

        if (Object.keys(newErrors).length === 0) {
            try {
                // Make an API request to register the user
                const response = await register(formData);
                console.log('Registration successful:', response.data);

                // Redirect to VillaListPage only if the role is 'admin'
                if (formData.role === 'admin') {
                    navigate('/VillaListPage');
                }
                else if(formData.role === 'customer'){
                    navigate('/home1');
                }
            } catch (error) {
                console.error('Registration failed:', error.response?.data || 'Unexpected error', error);
            }
        } else {
            setErrors(newErrors);
        }
    };

    



    return (
        <>
        <Navbar />
        <div className="container pt-5">
            <div className="card shadow border">
                <div className="card-header bg-success bg-gradient ml-0 py-4">
                    <div className="row">
                        <div className="col-12 text-center">
                            <h2 className="py-2 text-white">Registration</h2>
                        </div>
                    </div>
                </div>
                <div className="card-body p-4">
                    <div className="row pt-3">
                        <div className="col-md-12"></div>
                        <form className="row" method="post" onSubmit={handleSubmit}>
                            <div className="form-floating mb-3 col-md-6">
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                />
                                <label htmlFor="email" className="ms-2 text-muted">
                                    Email
                                </label>
                                <span className="text-danger">{errors.email}</span>
                            </div>
                            <div className="form-floating mb-3 col-md-6">
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                />
                                <label htmlFor="name" className="ms-2 text-muted">
                                    Name
                                </label>
                                <span className="text-danger">{errors.name}</span>
                            </div>
                            <div className="form-floating mb-3 col-md-6">
                                <input
                                    type="tel"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleInputChange}
                                    className={`form-control ${errors.phoneNumber ? 'is-invalid' : ''}`}
                                />
                                <label htmlFor="phoneNumber" className="ms-2 text-muted">
                                    Phone No
                                </label>
                                <span className="text-danger">{errors.phoneNumber}</span>
                            </div>
                            <div className="form-floating mb-3 col-md-6">
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                />
                                <label htmlFor="password" className="ms-2 text-muted">
                                    Password
                                </label>
                                <span className="text-danger">{errors.password}</span>
                            </div>
                            <div className="form-floating mb-3 col-md-6">
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                                />
                                <label htmlFor="confirmPassword" className="ms-2 text-muted">
                                    Confirm Password
                                </label>
                                <span className="text-danger">{errors.confirmPassword}</span>
                            </div>

                            {/* <div className="form-floating mb-3 col-md-6">
                                <select
                                    className={`form-select custom-select ${errors.role ? 'is-invalid' : ''}`}
                                    id="role"
                                    name="role"
                                    value={formData.role}
                                    onChange={handleInputChange}
                                >
                                    <option value="" disabled>
                                        - Select Role -
                                    </option>
                                    <option value="customer">Customer</option>
                                    <option value="admin">Admin</option>
                                </select>
                                <label htmlFor="role" className="ms-2 text-muted">
                                    Role
                                </label>
                                <span className="text-danger">{errors.role}</span>
                            </div> */}

                            <div className="col-12">
                                <button type="submit" className="w-100 btn btn-lg btn-outline-success">
                                    Register
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

export default RegisterForm;