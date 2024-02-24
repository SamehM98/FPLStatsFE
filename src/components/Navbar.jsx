import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavDropdown } from 'react-bootstrap';
import { positions } from '../helpers/constants';

function BasicExample() {
  return (
    <Navbar bg="primary" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="/">FPL Stats</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/fixtures">Fixtures</Nav.Link>
          {
            positions.map(position => (
              <NavDropdown title={position.path} id={position.id} style={{ textTransform: 'capitalize' }}>
                <NavDropdown.Item href={`/season/${position.path}`}>Season stats</NavDropdown.Item>
                <NavDropdown.Item href={`/gameweeks/${position.path}`}>Gameeweek stats</NavDropdown.Item>
              </NavDropdown>
            ))
          }
        </Nav>
      </Container>
    </Navbar>
  );
}

export default BasicExample;
