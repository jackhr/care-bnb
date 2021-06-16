import { useEffect, useState } from "react";
import CaregiverProfile from "../../components/CaregiverProfile/CaregiverProfile";
import * as usersAPI from "../../utilities/users-api";

import * as userService from "../../utilities/users-service";
import "./CaregiverPage.css";
import StarIcon from "@material-ui/icons/Star";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";


export default function CaregiverPage({ caregivers, setCaregivers }) {
  // const [data, setData] = useState([]);
  const [user, setUser] = useState({});

  useEffect(() => {
    async function getAllCaregivers() {
      const caregivers = await usersAPI.getAllCaregivers();
      setCaregivers(caregivers);
    }
    getAllCaregivers();
  }, []);

  useEffect(() => {
    async function getThisUser() {
      let thisUser = await userService.getUser();
      setUser(thisUser);
    }
    getThisUser();
    // console.log(user);
  }, []);

  function handleLogOut() {
    userService.logOut();
    setUser(null);
  }

  return (
    <div className="caregiver">

      <div className="image-container">
        <img src={user.profile_image} alt="" />
      </div>
      <div className="info-container">
        <div className="heading">
          <div className="heading-info">
            <div>
              <h1>
                {user.fname} {user.lname},
              </h1>
              <CheckCircleIcon style={{ color: "#588B8B" }} fontSize="large" />
            </div>
            <h1>{user.age}</h1>
          </div>
          <div></div>
          <div className="location">
            <FavoriteBorderIcon style={{ fontSize: 50 }} />
            <h3>{user.location}</h3>
          </div>
        </div>
        <StarIcon style={{ fontSize: 50 }} />
        <h2>{user.credentials}</h2>
        <div className="horizontal-line"></div>
        <hr />
        <h2>{user.phone_number}</h2>
        <h2>About</h2>
        <p>{user.about}</p>
        <h2>Availability</h2>
        <p>{user.best_time}</p>
        <button>Meet</button>
      </div>

      {/* {caregivers.map((x) => (

        <CaregiverProfile
          key={x._id}
          fname={x.fname}
          lname={x.lname}
          email={x.email}
          experiences={x.experiences}
          location={x.location}
          phone_number={x.phone_number}
          age={x.age}
          best_time={x.best_time}
          rate={x.rate}
          credentials={x.credentials}
          linkedin={x.linkedin}
          facebook={x.facebook}
          instagram={x.instagram}
          about={x.about}
          profile_image={x.profile_image}
        />
      ))} */}
    </div>
  );
}
