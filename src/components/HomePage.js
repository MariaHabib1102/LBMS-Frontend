import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const HomePage = () => {
  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Welcome to the Library Management System</h1>
      <div className="row">
        <div className="col-md-4 mb-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Books</h5>
              <p className="card-text">View and manage books.</p>
              <Link to="/books" className="btn btn-primary">Go to Books</Link>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Authors</h5>
              <p className="card-text">View and manage authors.</p>
              <Link to="/authors" className="btn btn-primary">Go to Authors</Link>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Users</h5>
              <p className="card-text">View and manage users.</p>
              <Link to="/users" className="btn btn-primary">Go to Users</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
