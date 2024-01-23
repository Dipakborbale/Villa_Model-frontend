// VillaDetails.js
import React from 'react';

const VillaDetails = ({ villas }) => {
  if (!villas || villas.length === 0) {
    return null; // If no villas are provided, don't render anything
  }

  return (
    <div className="modal fade" id="exampleModal-1" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-xl" style={{ border: '1px solid #aaa', borderRadius: '7px' }}>
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-3 text-success" id="exampleModalLabel">
              Villa Details
            </h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body m-0">
            {villas.map((villa) => (
              <div key={villa.id} className="row">
                <div className="col-12 col-md-5">
                  <img src={villa.imageUrl} alt={villa.name} style={{ borderRadius: '10px', width: '100%' }} />
                </div>
                <div className="col-12 col-md-7">
                  <div className="row p-2">
                    <div className="col-12">
                      <p className="card-title text-warning" style={{ fontSize: 'xx-large' }}>
                        {villa.name}
                      </p>
                      <p className="card-text" style={{ fontSize: 'large' }}>
                        {villa.description}
                      </p>
                    </div>
                  </div>
                  <div className="row col-12">
                    <span className="text-end p-0 pt-3 m-0">
                      <span className="float-right">Max Occupancy: {villa.maxOccupancy} </span>
                      <br />
                      <span className="float-right pt-1">Villa Size: {villa.size}</span>
                      <br />
                      <p className="text-warning font-weight-bold pt-1">
                        USD
                        <span style={{ color: '#ff6a00' }}>
                          ₹ {villa.price} / night
                        </span>
                      </p>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-outline-danger" data-bs-dismiss="modal">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VillaDetails;
