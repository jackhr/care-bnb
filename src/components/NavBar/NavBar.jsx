import { Link } from 'react-router-dom';
import * as userService from '../../utilities/users-service';

export default function NavBar({ user, setUser }) {
  function handleLogOut() {
    userService.logOut();
    setUser(null);
  }

  return (
    <nav>
      { user && (
        <>
          <Link to="/profile">Profile Page</Link>
          &nbsp; | &nbsp;
          <Link to="/orders/new">New Order</Link>
          &nbsp; | &nbsp;
          <Link to="" onClick={handleLogOut}>Log Out</Link>
          {/* ^^^^^^^^^^^^ This will be the link to the chat feature */}
          {/* <Link to="" onClick={handleLogOut}>Log Out</Link> */}
        </>
      )}
    </nav>
  );
}