import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import * as usersAPI from "../../utilities/users-api";
import CaregiverProfile from "../../components/CaregiverProfile/CaregiverProfile";
import Autocomplete from "../Search/Autocomplete";

export default function AllCaregivers() {

    const [caregivers, setCaregivers] = useState([]);

    useEffect(() => {
        async function getAllCaregivers() {
          const caregivers = await usersAPI.getAllCaregivers();
          setCaregivers(caregivers);
        }
        getAllCaregivers();
      }, []);

      return (
        <>
          <h1> Select your filters </h1>
          <div className="needFilterContainer">
              <Autocomplete
                  suggestions={
                      ['CPR Certified', 'Pet Friendly', 'Can Drive', 'Fluent in English', 'Fluent in Spanish', 'Arts & Crafts', 'First Aid Certified', 'Tutoring Assistance', 'Open Communication']
                  }
              />
          </div>

          <div className="wantFilterContainer">
              <Autocomplete 
              suggestions={
                  ['Age 18-30', 'Age 31-45', 'Age 46-64', 'Age 65+', 'Able to Drive']
              }
              />
          </div>

          <div className="allCaregivers">
                {caregivers.map((x) => (
                    <>
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
                    {/* <Link to={`/caregivers/${index}`} >
                      <button> hehe click me </button>
                    </Link> */}
                    </>
                  ))
                } 
          </div>
        </>
      )
}