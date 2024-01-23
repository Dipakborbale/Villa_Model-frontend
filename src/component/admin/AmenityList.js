// AmenityList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from '../common/Navbar';

const AmenityList = () => {
  const [amenities, setAmenities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deletingAmenity, setDeletingAmenity] = useState(null);

  useEffect(() => {
    // Fetch amenity data when the component mounts
    getAmenities();
  }, []);

  const getAmenities = () => {
    axios
      .get('http://localhost:5211/api/Amenity')
      .then((result) => {
        setAmenities(result.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDelete = async () => {
    if (deletingAmenity) {
      try {
        // Perform the delete action on the server
        await axios.delete(`http://localhost:5211/api/Amenity/${deletingAmenity.id}`);

        // Refresh the amenity list after successful deletion
        getAmenities();

        // Close the delete confirmation modal
        setDeleteModalOpen(false);
        setDeletingAmenity(null);
      } catch (error) {
        console.error('Error deleting amenity:', error);
      }
    }
  };

  const openDeleteModal = (amenity) => {
    // Set the amenity to be deleted and open the delete confirmation modal
    setDeletingAmenity(amenity);
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    // Close the delete confirmation modal without performing the delete action
    setDeletingAmenity(null);
    setDeleteModalOpen(false);
  };

  return (
    <>
    <Navbar admin />
    <div className="container">
      {loading && <div className="loading spinner"></div>}
      <div className="row">
        <main className="col-md-12 px-md-4">
          <div className="card border-0 p-4 mt-4">
            <div className="card-header bg-success bg-gradient ml-0 py-3">
              <div className="row">
                <div className="col-12 text-center">
                  <h2 className="text-white py-2">Amenity List</h2>
                </div>
              </div>
            </div>
            <div className="card-body border p-4">
              <div className="row pb-3">
                <div className="col-6 offset-6 text-end">
                  <Link to="/create-amenity" className="btn btn-secondary">
                    <i className="bi bi-plus-circle"></i> Create New Amenity
                  </Link>
                </div>
              </div>
              <table className="table table-bordered table-striped">
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Villa Name</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {amenities.map((amenity) => (
                    <tr key={amenity.id}>
                      <td>{amenity.id}</td>
                      <td>{amenity.name}</td>
                      <td>{amenity.villaName}</td>
                      <td>
                        {/* Edit button */}
                        <Link to={`/Amenity/Edit/${amenity.id}`} className="btn btn-primary me-2">
                          Edit
                        </Link>
                        {/* Delete button with confirmation modal */}
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={() => openDeleteModal(amenity)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
      {/* Delete confirmation modal */}
      <div
        className={`modal fade ${deleteModalOpen ? 'show' : ''}`}
        tabIndex="-1"
        role="dialog"
        aria-labelledby="deleteModalLabel"
        aria-hidden={!deleteModalOpen}
        style={{ display: deleteModalOpen ? 'block' : 'none' }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="deleteModalLabel">
                Confirm Deletion
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={closeDeleteModal}
              ></button>
            </div>
            <div className="modal-body">
              {deletingAmenity && (
                <p>
                  Are you sure you want to delete the amenity with ID {deletingAmenity.id} - {deletingAmenity.name}?
                </p>
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={closeDeleteModal}
              >
                Cancel
              </button>
              <button type="button" className="btn btn-danger" onClick={handleDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default AmenityList;
