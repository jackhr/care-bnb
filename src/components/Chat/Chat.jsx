import React,{ useState, useEffect }  from 'react';
import { Container, Col, Row } from "react-bootstrap";
import io from "socket.io-client";
import * as userService from "../../utilities/users-service";
import './Chat.css'

const socket = io();

const Chat = () => {
  const [chatUsers, setChatUsers] = useState([])
  const [chatMessage, setChatMessage] = useState({name: "", msg: "", room: "", isPrivate: false})
  const [msgList, setMsgList] = useState([])
  const [currentRoom, setCurrentRoom] = useState("General Chat")

  const [user, setUser] = useState({});

  useEffect(() => {
    async function getThisUser() {
      let thisUser = await userService.getUser();
      setUser(thisUser);
    }
    getThisUser();
    console.log(user);
  }, []);

  socket.on("newMessage", newMessage => {
    setMsgList([...msgList, {name: newMessage.name, msg: newMessage.msg, isPrivate: newMessage.isPrivate}])
  })

  socket.on("userList", (userList) => {
    setChatUsers(userList);
    setChatMessage({name: user.fname, msg: chatMessage.msg})
  });

  const handleChange = (e) => {
    setChatMessage({...chatMessage, [e.target.name]: e.target.value})
  }

  const newMessageSubmit = (e) => {
    e.preventDefault()
    const newMessage = {
      name: chatMessage.name,
      msg: chatMessage.msg,
      room: currentRoom,
      isPrivate: isChatPrivate(currentRoom, chatUsers)
    }

    socket.emit("newMessage", newMessage)

    setChatMessage({
      name: user.fname,
      msg: ""
    })
  }

  const enteringRoom = (e) => {
    let oldRoom = currentRoom
    let newRoom = e.target.textContent
    setCurrentRoom(newRoom)
    socket.emit("roomEntered", { oldRoom, newRoom })
    setMsgList([])
  }

  const isChatPrivate = (roomName, userList) => {
    let isPrivate = false
    userList.forEach(userName => {
      if(userName === roomName){
        isPrivate = true
      }
    })
    return isPrivate
  }

  return (
    <div style={{backgroundColor: "#ebd8ca"}}>
    <Container>
      <Row>
        <Col xs={5} style={{ border: "1px solid black" }}>
          <br/>
          <h1 onClick={enteringRoom} style={{ cursor: "pointer" }}>Chat with your caregiver</h1>
          <br />
          <p><b>Please Choose a Chat Room</b></p>
          <ul style={{ listStyleType: "none" }}>
            <li onClick={enteringRoom} style={{ cursor: "pointer" }}>Room 1</li>
            <li onClick={enteringRoom} style={{ cursor: "pointer" }}>Room 2</li>
            <li onClick={enteringRoom} style={{ cursor: "pointer" }}>Room 3</li>
          </ul>
          {/* <p><b>Currently Connected Users:</b></p> */}
          <ul style={{ listStyleType: "none" }}>
            {chatUsers.map((user) => {
              return <li onClick={enteringRoom} style={{cursor:"pointer"}}
                key={user}>{user}</li>;
            })}
          </ul>
        </Col>
        <Col>
          <h2>Chat Messages ({currentRoom})</h2>
          <form onSubmit={newMessageSubmit}>
          <br/>
            <input type="text" name="msg" 
              value={chatMessage.msg}
              onChange={handleChange} required style={{ width: "80%" }} />
              <br/>
              <br/>
            <input type="submit" value="Send" style={{width: "40%"}}/>
          </form>
          <div id="chatMessages">
            Messages:
            <ul style={{ listStyle:"none" }}>
              {msgList.map((msgList, index) => {
                return (
                  <li key={index}>
                    <b>{msgList.name}: </b>
                    <i>
                      <span style={{color: msgList.isPrivate ? "blue" : "black"}}>
                        {msgList.msg}
                      </span></i>
                  </li>
                )
              })}
            </ul>
          </div>
        </Col>
      </Row>
    </Container>
    </div>
  );
};

export default Chat; 