import { useEffect, useState } from "react";
import CaregiverProfile from "../../components/CaregiverProfile/CaregiverProfile";
import * as usersAPI from "../../utilities/users-api";
import * as usersServices from "../../utilities/users-service";
import * as userService from "../../utilities/users-service";
import "./CaregiverPage.css";
import StarIcon from "@material-ui/icons/Star";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import Modal from "react-modal";
import { Link } from "react-router-dom";

Modal.setAppElement("#root");
export default function CaregiverPage({ caregivers, setCaregivers }) {
  // const [data, setData] = useState([]);
  const [user, setUser] = useState({});
  const [message, setMessage] = useState(false);
  const [textData, setTextData] = useState(true);

  // useEffect(() => {
  //   async function getAllCaregivers() {
  //     const caregivers = await usersAPI.getAllCaregivers();
  //     setCaregivers(caregivers);
  //   }
  //   getAllCaregivers();
  // }, []);

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
  const h1 = {
    fontFamily: "open sans",
    fontWeight: 800,
    margin: 0,
    fontSize: "1.4em",
  };

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "50%",
      height: "45%",
      backgroundColor: "#EBD8CA",
    },
  };

  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "black";
  }

  function closeModal() {
    setIsOpen(false);
  }

  function handleClick() {
    setMessage(true);
    setTextData(false);
  }
  return (
    <div className="caregiver">
      <div className="image-container">
        <img className="prof-image" src={user.profile_image} alt="" />
      </div>
      <div className="info-container">
        <div className="heading">
          <div className="heading-info">
            <div>
              <h1 style={h1}>
                {user.fname} {user.lname},
              </h1>
              <CheckCircleIcon style={{ color: "#588B8B" }} fontSize="large" />
            </div>
            <h1 style={h1}>{user.age}</h1>
          </div>

          <div className="location">
            <FavoriteBorderIcon style={{ fontSize: 45 }} />
            <h3 style={{ margin: 0, fontSize: "1em" }}>{user.location}</h3>
            <a href="####" style={{ color: "black", fontWeight: "600" }}>
              Reviews (23)
            </a>
          </div>
        </div>
        <br />
        <div className="review-icon">
          <StarIcon style={{ fontSize: 35 }} />
          <h3 style={{ margin: 0 }}>(4.5)</h3>
        </div>

        <button className="credentials">{user.credentials}</button>
        <div className="horizontal-line"></div>
        <div className="about-info">
          {/* <h2>{user.phone_number}</h2> */}
          <h2 style={{ marginTop: ".5em" }}>About</h2>
          <p>{user.about}</p>
        </div>
        <h2 style={{ margin: 0 }}>Availability</h2>
        <p>{user.best_time}</p>
        <div className="meet-div">
          <button onClick={openModal} className="meet-button">
            Meet
          </button>
          <Modal
            isOpen={modalIsOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
          >
            {textData ? (
              <div>
                <h2 ref={(_subtitle) => (subtitle = _subtitle)}>
                  {`Get in touch with this caregiver`}
                </h2>

                <div className="modal1">
                  <h3>Message</h3>
                  <div className="modal-info">
                    <textarea name="" id="" cols="30" rows="10"></textarea>
                    <button className="meet-button" onClick={handleClick}>
                      Send
                    </button>

                    <a className="closeMode" onClick={closeModal}>
                      Go Back
                    </a>
                  </div>
                </div>
              </div>
            ) : (
              <div className="modal-result">
                <CheckCircleIcon
                  style={{ color: "#588B8B", fontSize: "3em" }}
                />
                <h2>Message Sent!</h2>
                <p>Your messsage was sent successfully!</p>
                <Link to="/chat">
                  <button className="modal-button">Go to Chat</button>
                </Link>
              </div>
            )}
          </Modal>
        </div>
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
