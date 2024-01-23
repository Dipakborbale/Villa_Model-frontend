import React, { useState, useEffect } from 'react';
import axios from 'axios';
// Import VillaDetails component

import { Modal, Button } from 'react-bootstrap';
import { Link, Navigate, useNavigate } from 'react-router-dom';




const Carousel = () => {


    const [villas, setVillas] = useState([]);

    const [selectedVilla, setSelectedVilla] = useState(null);

    const [showModal, setShowModal] = useState(false);
    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);
    const currentDate = new Date().toISOString().split('T')[0];
    const [showBookingModal, setShowBookingModal] = useState(false);
    const handleCloseBookingModal = () => setShowBookingModal(false);
    const handleShowBookingModal = () => setShowBookingModal(true);
    const [selectedNights, setSelectedNights] = useState(1);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
   const handleCheckout = () => {

        console.log('Handling checkout...');
    };

   



    const navigate = useNavigate(); // Use useHistory hook
    // ... (existing code)



    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        axios
            .get('http://localhost:5211/api/Villas')
            .then((result) => {
                setVillas(result.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };













    const handleDetails = (villaId) => {
        const selectedVilla = villas.find((villa) => villa.id === villaId);
        setSelectedVilla(selectedVilla);
        handleShowModal();
    };
    const handleBook = (villaId) => {
        const selectedVilla = villas.find((villa) => villa.id === villaId);
        setSelectedVilla(selectedVilla);
        handleShowBookingModal();
    };








    return (
        <>

            <div className="container mt-4">
                <div className="row">
                    {villas.map((villa) => (
                        <div key={villa.id} className="col-12 col-md-4 mb-4">
                            <div className="card text-white bg-dark">
                                <img
                                    className="card-img-top"
                                    style={{ borderRadius: '5px' }}
                                    src={villa.imageUrl}
                                    alt={villa.name}
                                />
                                <div className="card-body">
                                    <h5 className="card-title text-warning">{villa.name}</h5>
                                    <p className="card-text">{villa.description}</p>
                                    <div className="d-flex justify-content-between">
                                        <button
                                            type="button"
                                            className="btn btn-sm btn-outline-success"
                                            onClick={() => handleDetails(villa.id)}
                                        >
                                            Details
                                        </button>
                                        {selectedVilla && selectedVilla.id === villa.id && (
                                            <button
                                                type="button"
                                                className="btn btn-success"
                                                onClick={() => handleBook(villa.id)}
                                            >
                                                Book
                                            </button>
                                        )}
                                    </div>
                                    <div className="mt-3">
                                        <p className="text-warning">Max Occupancy: {villa.maxOccupancy}</p>
                                        <p className="text-warning">Price: ₹ {villa.price} / night</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <Modal show={showModal} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title className="text-primary">Villa Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {selectedVilla && (
                            <div>
                                <div className="text-center">
                                    <img
                                        src={selectedVilla.imageUrl}
                                        alt={selectedVilla.name}
                                        style={{ maxWidth: '100%', borderRadius: '5px' }}
                                    />
                                </div>
                                <h5>{selectedVilla.name}</h5>
                                <p>Description: {selectedVilla.description}</p>
                                <p>Price: {selectedVilla.price}</p>
                                <p>sqft: {selectedVilla.sqft}</p>
                                <p>Occupancy: {selectedVilla.occupancy}</p>
                            </div>
                        )}
                    </Modal.Body>
                    <Modal.Footer>
                        <button variant="secondary" onClick={handleCloseModal}>
                            Close
                        </button>
                    </Modal.Footer>
                </Modal>


                <Modal show={showBookingModal} onHide={handleCloseBookingModal}>
                    <Modal.Header closeButton>
                        <Modal.Title className="text-primary">Enter Booking details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {selectedVilla && (
                            <div>
                                <div className="text-center">
                                    <img
                                        src={selectedVilla.imageUrl}
                                        alt={selectedVilla.name}
                                        style={{ maxWidth: '100%', borderRadius: '5px' }}
                                    />
                                </div>
                                <div className="form-group pt-0">
                                    <label className="text-warning" htmlFor="Name">
                                        Name
                                    </label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                                <div className="form-group pt-2">
                                    <label className="text-warning" htmlFor="Phone">
                                        Phone
                                    </label>
                                    <input
                                        className="form-control" type="text"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                    />
                                </div>
                                <div className="form-group pt-2">
                                    <label className="text-warning" htmlFor="Email">
                                        Email
                                    </label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                {/* <h5>{selectedVilla.name}</h5>
                                <p>Description: {selectedVilla.description}</p>
                                <p>Price: {selectedVilla.price}</p>
                                <p>sqft: {selectedVilla.sqft}</p>
                                <p>Occupancy: {selectedVilla.occupancy}</p> */}


                                <div className="form-group">
                                    <label className="text-warning">Check In Date</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        data-val="true"
                                        data-val-required="The CheckInDate field is required."
                                        id="CheckInDate"
                                        name="CheckInDate"
                                        min={currentDate}
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="text-warning">Check Out Date</label>
                                    <input type="date" className="form-control"
                                        data-val="true"
                                        data-val-required="The CheckInDate field is required."
                                        id="CheckInDate"
                                        name="CheckInDate"
                                        min={currentDate}

                                    />


                                </div>



                                <div className="form-group">
                                    <label className="text-warning">No. of nights</label>
                                    <select
                                        className="form-select"
                                        data-val="true"
                                        data-val-required="The Nights field is required."
                                        id="Nights"
                                        name="Nights"
                                        value={selectedNights}
                                        onChange={(e) => setSelectedNights(Number(e.target.value))}
                                    >
                                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
                                            <option key={value} value={value}>
                                                {value}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <p className="text-warning" style={{ textDecoration: 'underline', fontSize: '20px', marginTop: '10px' }}>
                                    Total Price: ₹ {selectedNights * selectedVilla.price}
                                </p>



                            </div>
                        )}
                    </Modal.Body>
                    <Modal.Footer>
                        <div>








                            <div className="form-group pt-2 pt-md-4">
                                <button onClick={handleCheckout}>
                                    <a href={`https://buy.stripe.com/test_28o4hXgP76pi65y7st`}>
                                        Looks Good! Checkout Now
                                    </a>
                                </button>
                            </div>

                        </div>

                    </Modal.Footer>
                </Modal>







            </div>

            {/* Use the selectedVilla to display details using VillaDetails component */}
            {/* {selectedVilla && (
        <VillaDetails villa={selectedVilla} modalId={`exampleModal-${selectedVilla.id}`} />
      )} */}


        </>
    );
};

export default Carousel;
