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
      {/* { user ? ( */}
       
        <div className="navbar">
          <Link to="/profile"><PersonOutlineOutlinedIcon style={{ color: "white"}} fontSize="large"/></Link>
          <Link to="/orders"><HomeIcon style={{ color: "green"}} fontSize="large"/></Link>
          <Link to="/orders/new"><ChatOutlinedIcon style={{ color: "white"}} fontSize="large"/></Link>
          <Link to="" onClick={handleLogOut}>Log Out</Link>
          </div>
        
          {/* <span>Welcome{user ? `, ${user.fname}` : ""}</span>
          &nbsp; | &nbsp; */}
          
      
      {/* ) : (
        <span>Welcome</span>
      )} */}
    </nav>
  );
}