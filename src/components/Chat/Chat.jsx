import React,{ useState, useEffect }  from 'react';
import { Container, Col, Row } from "react-bootstrap";
import io from "socket.io-client";

const socket = io();

const Chat = () => {
    const [chatUsers, setChatUsers] = useState([])
    const [chatMessage, setChatMessage] = useState({name: "", msg: ""})
    const [msgList, setMsgList] = useState([])

    useEffect(() => {
        socket.emit("updateUsers")
    }, [])

    socket.on("newMessage", newMessage => {
        console.log("Just in from server: ", newMessage);
        setMsgList([...msgList, {name: newMessage.name, msg: newMessage.msg}])
    })

    socket.on("userList", (userList) => {
    setChatUsers(userList);
    setChatMessage({name: socket.id, msg: chatMessage.msg})
    });

    const handleChange = (e) => {
        setChatMessage({...chatMessage, [e.target.name]: e.target.value})
    }

    const newMessageSubmit = (e) => {
        e.preventDefault()
        const newMessage = {
            name: chatMessage.name,
            msg: chatMessage.msg
        }

        socket.emit("newMessage", newMessage);
        console.log("Just Sent: ", newMessage);

        setChatMessage({
            name: socket.id,
            msg: ""
        })
    }

    return (
        <Container>
            <Row>
                <Col xs={5} style={{ border: "1px solid black" }}>
                    <h1>Connected Sockets:</h1>
                    <ul style={{ listStyleType:"none" }}>
                        {chatUsers.map((user) => {
                            return( <li key={user}>{user}</li>)
                        })}
                    </ul>
                </Col>
                <Col style={{ border: "1px solid black" }}>
                    <p>Chat Messages:</p>
                    <form onSubmit={newMessageSubmit}>
                        <input
                        type="text"
                        name="msg" 
                        value={chatMessage.msg} 
                        onChange={handleChange} 
                        required style={{ width: "80%" }} />
                        <input type="submit" value="Message!" />
                    </form>
                    <div id="chatMessages" style={{border: "1px solid black"}}>
                        Messages
                        <ul style={{ listStyle: "none" }}>
                            {msgList.map((msgList, index) => {
                                return (
                                    <li key={index}>
                                        <b>{msgList.name}: </b><i>{msgList.msg}</i>
                                    </li>
                                )
                            })}
                        </ul>
                        <br />
                    </div>
                </Col>
            </Row>
        </Container>
        
    );
};

export default Chat;