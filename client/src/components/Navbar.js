import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const MyNavbar = () => {
  return (
    <Navbar variant="dark" expand="lg" style={{ backgroundColor: '#8e44ad', color: 'white' }}>
      <Container>
        <Navbar.Brand as={Link} to="/">Stok Takip</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Anasayfa</Nav.Link>
            <Nav.Link as={Link} to="/category">Kategori</Nav.Link>
            <Nav.Link as={Link} to="/product">Ürünler</Nav.Link>
            <Nav.Link as={Link} to="/shipments">Sevkiyatlar</Nav.Link>
            <Nav.Link as={Link} to="/pallet">Paletler</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar >
  );
};

export default MyNavbar;
