import { Link } from 'react-router-dom';
import { Nav, Navbar} from 'react-bootstrap'

const Navig = (props) => {
    return (  
        <Navbar bg="light" variant="light">
            <Navbar.Brand>Music Sharing Site</Navbar.Brand>
            <Nav className="ms-auto">
                <Nav.Link as={Link} to="/">Home</Nav.Link>
                <Nav.Link as={Link} to="/posts">Posts</Nav.Link>
                <Nav.Link as={Link} to="/search">Search</Nav.Link>
                <Nav.Link as={Link} to="/create">Create</Nav.Link>
                <div>{props.isAdmin && (<Nav.Link as={Link} to="/admin">Admin</Nav.Link>)}</div>
            </Nav>
            {/* <Form className="d-flex">
                <FormControl
                    type="search"
                    placeholder="Search"
                    className="mr-2"
                    aria-label="Search"
                />
                <Button variant="outline-success">Search</Button>
            </Form> */}
        </Navbar>
    );
}
 
export default Navig;