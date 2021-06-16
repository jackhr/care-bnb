import { Link } from 'react-router-dom';
import * as userService from '../../utilities/users-service';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import HomeIcon from '@material-ui/icons/Home';
import ChatOutlinedIcon from '@material-ui/icons/ChatOutlined';
import './NavBar.css'

export default function NavBar({ user, setUser }) {
  function handleLogOut() {
    userService.logOut();
    setUser(null);
  }

  return (
    <nav>

      { user && (
        <>
          <Link to="/profile"><img className="nav-icons" src="media/profile-page.svg" alt="icon of person to profile page." /></Link>
          <Link to="/caregivers"><img className="nav-icons" src="media/main-page.svg" alt="icon of a house to main page." /></Link>
          <Link to="/chat"><img className="nav-icons" src="media/chat-page.svg" alt="icon of chat bubble to chat room page." /></Link>
          {/* ^^^^^^^^^^^^ This will be the link to the chat feature */}
          <Link to="" onClick={handleLogOut}>Log Out</Link>
        </>
      )}

    </nav>
  );
}