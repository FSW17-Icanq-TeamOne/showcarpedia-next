import { fetchRoom } from "../../redux/slices/chatsSlice/getRoomSlice";
import { fetchUname } from "../../redux/slices/chatsSlice/getUnameSlice";
import { fetchChats } from "../../redux/slices/chatsSlice/getChats";
import { MainContext } from "../../context/mainContext";
import { SocketContext } from "../../context/socketContext";
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
import { useDispatch, useSelector } from "react-redux";
import React, { useContext, useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
// import { useNavigate } from "react-router-dom";

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
  const { name, room, setName, setRoom } = useContext(MainContext);
const socket = useContext(SocketContext);
  
  const [messages, setMessages] = useState([]);

//   const navigate = useNavigate();

//   window.onpopstate = (e) => logout();
    const theUname = useSelector((state) => state.getUname.data.username)
    setName(theUname);
    
    const theRoom = useSelector((state) => state.getRoom.data.Room)
    setRoom(theRoom);

    // const data = useSelector((state) => [state.getChats]);
    // data.map((chat, i) =>
    // //   setMessages((messages) => [
    // //     ...messages,
    // //     { user: chat.User.Username, text: chat.Chat },
    // //   ]) 
    // console.log(chat)
    // );

    useEffect(() => {
      fetch('http://localhost:3001/v1/chat/chat/', {
        credentials: 'include',
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
        .catch(err => console.log(err))
    }, [])

  const dispatch = useDispatch();

  const loadRoom = async () => {
    await dispatch(fetchRoom());
  };

  const loadUname = async () => {
    await dispatch(fetchUname());
  };

  const loadChats = async () => {
    await dispatch(fetchChats());
  };

  useEffect(() => {
    loadRoom();
   
  }, []);

  useEffect(() => {
    loadUname();
    
  }, []);

  useEffect(() => {
    loadChats();
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      chatBox: "",
    },
    onSubmit: (values) => {
      fetch("http://localhost:3001/v1/chat/chat", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(values),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data.chat.Chat, "This is the Chat");
          let msg = data.chat.Chat;
          socket.emit("sendMsg", { name, room, msg });
          formik.setFieldValue("chatBox", "");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });

  useEffect(() => {
    socket.on("message", (msg) => {
      setMessages((messages) => [...messages, msg]);
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
            <ListItem button key="RemySharp">
              <ListItemIcon>
                <Avatar
                  alt="Remy Sharp"
                  src="https://material-ui.com/static/images/avatar/1.jpg"
                />
              </ListItemIcon>
              <ListItemText primary={name}></ListItemText>
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem button key="Administrator">
              <ListItemIcon>
                <Avatar
                  alt="Administrator"
                  src="https://material-ui.com/static/images/avatar/1.jpg"
                />
              </ListItemIcon>
              <ListItemText primary="Administrator">Administrator</ListItemText>
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={9}>
          <List>
            <ScrollToBottom className={classes.messageArea}>
              {messages.length > 0 ? (
                messages.map((msg, i) => (
                  <ListItem key={i}>
                    <Grid
                      container
                      justifyContent={`${
                        msg.user === name ? "flex-end" : "flex-start"
                      }`}
                    >
                      <Grid item xs={12}>
                        <ListItemText
                          align={`${msg.user === name ? "right" : "left"}`}
                          secondary={msg.user}
                        ></ListItemText>
                      </Grid>
                      <Grid item xs={`${msg.text.length}`}>
                        <Box
                          fontSize="sm"
                          className={`${
                            msg.user === name ? classes.myMsg : classes.msg
                          }`}
                          p=".4rem .8rem"
                          borderRadius="15px"
                        >
                          <ListItemText
                            align={`${msg.user === name ? "right" : "left"}`}
                            primary={msg.text}
                          ></ListItemText>
                        </Box>
                      </Grid>
                    </Grid>
                  </ListItem>
                ))
              ) : (
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
              )}
            </ScrollToBottom>
          </List>
          <Divider />
          <form onSubmit={formik.handleSubmit}>
            <Grid container style={{ padding: "25px" }}>
              <Grid item xs={11}>
                <TextField
                  type="text"
                  id="chatBox"
                  name="chatBox"
                  placeholder="Enter Message"
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
