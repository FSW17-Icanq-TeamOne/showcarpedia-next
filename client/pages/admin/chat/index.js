import { MainContext } from "../../../context/mainContext";
import { SocketContext } from "../../../context/socketContext";
import { useFormik } from "formik";
import { RiSendPlaneFill } from "react-icons/ri";
import {
  Paper,
  Grid,
  Divider,
  TextField,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Box,
  IconButton,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useContext, useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import { useRouter } from 'next/router'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  chatSection: {
    width: "100%",
    height: "100vh",
  },
  headBG: {
    backgroundColor: "#e0e0e0",
  },
  borderRight500: {
    borderRight: "1px solid #e0e0e0",
  },
  messageArea: {
    height: "85vh",
    overflowY: "auto",
  },
  myMsg: {
    color: "white",
    backgroundColor: "orange",
    boxShadow: "0.5px 1px 2px #000000",
  },
  msg: {
    color: "black",
    backgroundColor: "white",
    boxShadow: "0.5px 1px 2px #000000",
  },
});


export default function Chats() {
  const { name, room, setName, setRoom } = useContext(MainContext)
  const socket = useContext(SocketContext)
  const [messages, setMessages] = useState([])
  const [roomLists, setRoomLists] = useState([])

  const router = useRouter()

  useEffect(() => {
    fetch('http://localhost:3001/v1/chat/rooms/', {
          credentials: "include",
      })
    .then((data) => data.json())
    .then((data) => setRoomLists(data))
    .catch((err) => console.log(err))
  },[])

  useEffect(() => {
    if(room.length > 0){
      console.log('Room:',room)
      socket.emit('login', {room}, error => {
          if (error) {
              console.log(error)
          }
      })
      setRoom('')
      router.push(`/admin/chat?room=${room}`)
      fetch(`http://localhost:3001/v1/chat/chat/${room}`, {
      credentials: 'include'
      })
      .then(data => data.json())
      .then(data =>
        data.map((chat, i) =>
          setMessages(messages => [
            ...messages,
            { user: chat.User.username, text: chat.Chat },
          ])
        )
      )
      .catch(err => console.log(err));
    }
  }) 

  useEffect(() => {
    fetch('http://localhost:3001/v1/chat/name/', {
      credentials: 'include',
    })
      .then(data => data.json())
      .then(data => setName(data.username))
      .catch(err => console.log(err));
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      chatBox: '',
    },
    onSubmit: values => {
      let room = router.query.room
      fetch(`http://localhost:3001/v1/chat/chatAdmin/${room}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(values),
      })
        .then(response => {
          return response.json();
        })
        .then(data => { 
          let msg = data.chat.Chat;
          let room = router.query.room
          console.log("ruangannya", room)
          socket.emit('sendMsg', { name, room, msg });
          formik.setFieldValue('chatBox', '');
        })
        .catch(err => {
          console.log(err);
        });
    },
  });

  useEffect(() => {
    socket.on('message', msg => {
      console.log(msg);
      setMessages(messages => [...messages, msg]);
    });
  }, [socket]);

//   const logout = () => {
//     setName("");
//     setRoom("");
//     navigate("/");
//     navigate(0);
//   };

  const classes = useStyles();

  return (
    <Box>
      <Grid container component={Paper} className={classes.chatSection}>
        <Grid item xs={3} className={classes.borderRight500}>
          <List>
            <ListItem button key="Administrator"  onClick={() => window.location.assign("/admin/chat")}>
              <ListItemIcon>
                <Avatar
                  alt="Administrator"
                  src="https://material-ui.com/static/images/avatar/1.jpg"
                />
              </ListItemIcon>
              <ListItemText primary={name}></ListItemText>
            </ListItem>
          </List>
          <Divider />
          <List>
          <Box style={{maxHeight: '90vh', overflow: 'auto'}}>
          {
              roomLists.map(rooms => {
                return(
                <List>
                    <ListItem button onClick={() => {setRoom(rooms.Room); setMessages([])}}>
                    <ListItemIcon>
                        <Avatar
                        alt="Administrator"
                        src="https://material-ui.com/static/images/avatar/1.jpg"
                        />
                    </ListItemIcon>
                    <ListItemText >{rooms.User.username}</ListItemText>
                    </ListItem>
                </List>
                )
            })
          }
          </Box>
          </List>
        </Grid>
        <Grid item xs={9}>
          <List >
                <ScrollToBottom className={classes.messageArea}>
                {messages.length > 0 ?
                    messages.map((msg, i) =>
                    (
                        <ListItem key={i}>
                        
                        <Grid 
                        container
                        justifyContent={`${msg.user === name ? "flex-end" : "flex-start"}`}
                        >
                            <Grid item xs={12}>
                            <ListItemText
                                align={`${msg.user === name ? "right" : "left"}`}
                                secondary={msg.user}
                            ></ListItemText>
                            </Grid>
                            <Grid item xs={`${msg.text.length}`}>
                            <Box  
                                fontSize='sm' 
                                className={`${msg.user === name ? classes.myMsg : classes.msg}`} 
                                p=".4rem .8rem" 
                                borderRadius='15px'>
                            <ListItemText
                                align={`${msg.user === name ? "right" : "left"}`}
                                primary={msg.text}
                            ></ListItemText>
                            </Box>
                            </Grid>
                        </Grid>
                        </ListItem>)
                    )
                    :
                    <ListItem key="1">
                    <Grid container>
                        <Grid item xs={12}>
                        <ListItemText
                            align="center"
                            primary="No Messages"
                        ></ListItemText>
                        </Grid>
                    </Grid>
                    </ListItem>
                }
                </ScrollToBottom>
          </List>
          <Divider />
          <form onSubmit={formik.handleSubmit}>
          <Grid container style={{ padding: '25px' }}>
            <Grid item xs={11}>
              <TextField
                type="text" 
                id="chatBox" 
                name="chatBox" 
                placeholder='Enter Message'
                value={formik.values.chatBox}
                onChange={formik.handleChange}  
                fullWidth
              />
            </Grid>
            <Grid xs={1} align="right">
              <IconButton type="submit" aria-label="Send">
                <RiSendPlaneFill />
              </IconButton>
            </Grid>
          </Grid>
          </form>
        </Grid>
      </Grid>
    </Box>
  );
}
