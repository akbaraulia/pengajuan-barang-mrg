import React, { Suspense, lazy } from 'react';
import { SECONDARY_COLOR } from '../constants/colors';
import { Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';
import { FaUser } from 'react-icons/fa'; 
import withRoleData from './WithRoleData';
import withAuthentication from './WithAuthentication';
import { Link } from 'react-router-dom';

const HistoryTable = lazy(() => 
  new Promise(resolve =>
    setTimeout(() => resolve(import('./HistoryTable')), 5000)
  )
);

const History = ({ history, user, handleLogout }) => {
  return (
    <div className="container-fluid" style={{ backgroundColor: SECONDARY_COLOR }}>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">
          <img 
            src="https://merryriana.com/assets/images/mrg.png" 
            alt="Logo" 
            style={{ 
              width: '300px', 
              height: '100px', 
              filter: 'invert(1)' 
            }} 
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
            <NavDropdown title={<FaUser />} id="basic-nav-dropdown">
              <NavDropdown.Header style={{ maxWidth: '200px', whiteSpace: 'pre-wrap' }}>
                {`Halo ${user.name} !!! kamu login sebagai ${user.role}`}
              </NavDropdown.Header>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Button as={Link} to="/admin" variant="primary" className="ml-auto">Go to Admin Page</Button>
        </Navbar.Collapse>
      </Navbar>

      <Suspense fallback={<div>Loading...</div>}>
        <HistoryTable historyData={history} />
      </Suspense>
    </div>
  );
};

export default withAuthentication(withRoleData(History));