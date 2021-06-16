import { useEffect, useState } from "react";
import CaregiverProfile from "../../components/CaregiverProfile/CaregiverProfile";
import * as usersAPI from "../../utilities/users-api";
import * as userService from "../../utilities/users-service";

export default function CaregiverPage({ caregivers, setCaregivers }) {
  const [data, setData] = useState([]);
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
      <img src={user.profile_image} alt="" />
      <h1>
        {user.fname} {user.lname}
      </h1>
      <h2>{user.email}</h2>
      <h2>{user.location}</h2>
      <h2>{user.phone_number}</h2>
      <h2>{user.age}</h2>
      <h2>{user.best_time}</h2>
      <h2>{user.rate}</h2>
      <h2>{user.credentials}</h2>
      <h2>{user.about}</h2>
      <h2>{user.linkedin}</h2>
      <h2>{user.facebook}</h2>
      <h2>{user.instagram}</h2>
      <button onClick={handleLogOut}>LOG OUT</button>
      {data.map((x) => (
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
      ))}
    </div>
  );
}
