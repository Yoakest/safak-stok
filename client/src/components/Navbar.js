import { Navbar, Nav, Container, Dropdown } from "react-bootstrap";
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
            <Dropdown className="my-dropdown" >
              <Dropdown.Toggle >
                Ürünler
              </Dropdown.Toggle>
              <Dropdown.Menu >
                <Dropdown.Item as={Link} to="/product/create">
                  Ürün Ekle
                </Dropdown.Item>
                <Dropdown.Item as={Link} to='/product' >
                  Ürün Listele
                </Dropdown.Item>
                <Dropdown.Item >
                  Ürün Düzenle
                </Dropdown.Item>

              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar >
  );
};

export default MyNavbar;
