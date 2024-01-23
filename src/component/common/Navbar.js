import React from "react";

const Nav = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-dark">
        <div className="container-fluid">

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">

              <a class="navbar-brand" href="#"><img src="./images/resort.png" alt="#" style={{ width: "35px" }} /></a>

              <li className="nav-item">
                <a className="nav-link active text-light" aria-current="page" href="/home">Home</a>
              </li>

            </ul>
            <form className="d-flex">

              <a className="btn btn-outline-success" href="/login" style={{ marginRight: '10px', padding: '10px' }}>Login</a>
              <a className="btn btn-outline-success" href="/register" style={{ padding: '10px' }}>Register</a>
            </form>
          </div>
        </div>
      </nav>
    </div>);
}



export function NavUser() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-dark">
        <div className="container-fluid">

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">

              <a class="navbar-brand" href="#"><img src="./images/resort.png" alt="#" style={{ width: "35px" }} /></a>

              <li className="nav-item">
                <a className="nav-link active text-light" aria-current="page" href="/home2">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link active text-light" aria-current="page" href="/home2">Villa</a>
              </li>

            </ul>
            <form className="d-flex">
              <a className="btn btn-outline-success" href="/login" style={{ marginRight: '10px', padding: '10px' }}>Logout</a>

            </form>
          </div>
        </div>
      </nav>
    </div>);
}

export function NavAdmin() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-dark">
        <div className="container-fluid">

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <a class="navbar-brand" href="#"><img src="./images/resort.png" alt="#" style={{ width: "35px" }} /></a>

              <li className="nav-item">
                <a className="nav-link active text-light" aria-current="page" href="/home1">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-light" href="/amenity-list">Amenity</a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-light" href="/VillaListPage">VillaList</a>
              </li>

            </ul>
            <form className="d-flex">

              <a className="btn btn-outline-success" href="/login" style={{ marginRight: '10px', padding: '10px' }}>Logout</a>

            </form>
          </div>
        </div>
      </nav>
    </div>);
}

export default function Navbar(props) {
  if (props.user) {
    return <NavUser />;
  }
  if (props.admin) {
    return <NavAdmin />;
  }
  else {
    return <Nav />;
  }
}
