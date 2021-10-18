import { Link } from 'react-router-dom';
import { Nav, Navbar, Button, Form, FormControl} from 'react-bootstrap'

const Navig = () => {
    return (  
        <Navbar bg="light" variant="light">
            <Navbar.Brand>Music Sharing Site</Navbar.Brand>
            <Nav className="ms-auto">
                <Nav.Link as={Link} to="/">Home</Nav.Link>
                <Nav.Link as={Link} to="/posts">Posts</Nav.Link>
            </Nav>
            <Form className="d-flex">
                <FormControl
                    type="search"
                    placeholder="Search"
                    className="mr-2"
                    aria-label="Search"
                />
                <Button variant="outline-success">Search</Button>
            </Form>
        </Navbar>
    );
}
 
export default Navig;