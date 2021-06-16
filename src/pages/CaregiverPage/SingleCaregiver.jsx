import { useEffect, useState } from "react";
import CaregiverProfile from "../../components/CaregiverProfile/CaregiverProfile";
import * as usersAPI from "../../utilities/users-api";

import * as userService from "../../utilities/users-service";
import "./CaregiverPage.css";
import StarIcon from "@material-ui/icons/Star";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { useParams } from 'react-router';


export default function CaregiverPage({ caregivers, setCaregivers }) {
  // const [data, setData] = useState([]);
  const [caregiver, setCaregiver] = useState({});
  const { id } = useParams();

  useEffect(() => {
    async function getCaregiver() {
      let thisCaregiver = await userService.getOneCaregiver();
      setCaregiver(caregiver);
    }
    getCaregiver();
  }, []);

  return (
    <div className="caregiver">

      <div className="image-container">
        <img src={caregiver.profile_image} alt="" />
      </div>
      <div className="info-container">
        <div className="heading">
          <div className="heading-info">
            <div>
              <h1>
                {caregiver.fname} {caregiver.lname},
              </h1>
              <CheckCircleIcon style={{ color: "#588B8B" }} fontSize="large" />
            </div>
            <h1>{caregiver.age}</h1>
          </div>
          <div></div>
          <div className="location">
            <FavoriteBorderIcon style={{ fontSize: 50 }} />
            <h3>{caregiver.location}</h3>
          </div>
        </div>
        <StarIcon style={{ fontSize: 50 }} />
        <h2>{caregiver.credentials}</h2>
        <div className="horizontal-line"></div>
        <hr />
        <h2>{caregiver.phone_number}</h2>
        <h2>About</h2>
        <p>{caregiver.about}</p>
        <h2>Availability</h2>
        <p>{caregiver.best_time}</p>
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
