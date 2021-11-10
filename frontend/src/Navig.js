import { Link } from 'react-router-dom';
import { Nav, Navbar } from 'react-bootstrap'

const Navig = (props) => {
    return (  
        <Navbar bg="light" variant="light">
            <Navbar.Brand>Music Sharing Site</Navbar.Brand>

            <Nav className="ms-auto">
                <Nav.Link as={Link} to="/">Home</Nav.Link>
                <Nav.Link as={Link} to={"/profile/"+props.user_id}>Profile</Nav.Link>
                <Nav.Link as={Link} to="/search">Search</Nav.Link>
                <Nav.Link as={Link} to="/create">Create</Nav.Link>
                <Nav.Link as={Link} to="/chat">Chat</Nav.Link>
                <Nav.Link as={Link} to="/">Spotify</Nav.Link>
                <div>{props.isAdmin && (<Nav.Link as={Link} to="/admin">Admin</Nav.Link>)}</div>
            </Nav>
        </Navbar>
    );
}
 
export default Navig;