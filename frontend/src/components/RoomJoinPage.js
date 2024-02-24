import React, { Component } from "react";
import { TextField, Button, Typography, Grid } from "@material-ui/core";
import { Link } from "react-router-dom";

export default class RoomJoinPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomCode: "",
      error: "",
    };
    this.handleTextFieldChange = this.handleTextFieldChange.bind(this);
    this.roomButtonPressed = this.roomButtonPressed.bind(this);
  

  }

  render() {
    console.log("in roomjoin page..");
    return (
      <Grid container spacing={1} >
        <Grid item xs={12} align="center">
          <Typography variant="h4" component="h4">
            Join a room
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <TextField
            error={this.state.error}
            label="Code"
            placeholder="Enter a room code"
            value={this.state.roomCode}
            helperText={this.state.error}
            variant="filled"
            onChange={this.handleTextFieldChange}
          />
        </Grid>
        <Grid item xs={12} align="center">
        <Button variant="contained" color="primary" 
        onClick={this.roomButtonPressed}>Enter Room</Button>
          
        </Grid>
        <Grid item xs={12} align="center">
        <Button variant="contained" color="secondary" to="/" component={Link}>Back</Button>
        </Grid>


      </Grid>
    );
  }
  handleTextFieldChange(e) {
    console.log("Room code changed:", e.target.value);

    this.setState({
      roomCode: e.target.value
    })
  }

  // roomButtonPressed() {
  //   const requestOptions = {
  //     method:  'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body:  JSON.stringify({code: this.state.roomCode})
  //   };
  
  //   fetch("/api/join-room", requestOptions)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log("Response from server:", data);
  //       const roomCode = data.code; // Extract the room code from the response
  //       if (roomCode) {
  //         console.log("Redirecting to room:", roomCode);
  //         window.location.href = 'http://127.0.0.1:8000/room/' + roomCode;
  //       } else {
  //         console.error("No room code received from server");
  //         // Optionally, display an error message to the user
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("Error occurred:", error);
  //       // Optionally, display an error message to the user
  //     });
  // roomButtonPressed() {
  //   console.log("Room button pressed");

  //   const requestOptions = {
  //     method:  'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body:  JSON.stringify({code: this.state.roomCode})
  //   };
  
  //   fetch("/api/join-room", requestOptions)
  //     .then((response) => {
  //       console.log("Response received:", response);
  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       console.log("Response from server:", data);
  //       const roomCode = data.code;
  //       if (roomCode) {
  //         console.log("Redirecting to room:", roomCode);
  //         window.location.href = 'http://127.0.0.1:8000/room/' + roomCode;
  //       } else {
  //         console.error("No room code received from server");
  //         // Optionally, display an error message to the user
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("Error occurred:", error);
  //       // Optionally, display an error message to the user
  //     });
  // }
  
  roomButtonPressed() {
    console.log("Room button pressed with room code:", this.state.roomCode);
  
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code: this.state.roomCode })
    };
  
    console.log("Sending request to join-room API endpoint...");
    fetch("/api/join-room", requestOptions)
      .then((response) => {
        console.log("Response status:", response.status);
        return response.json()
      })
      .then((data) => {
        console.log("Response from server:", data);
        const roomCode = data.code;
        console.log("Room code received from server:", roomCode);
        if (roomCode) {
          console.log("Redirecting to room:", roomCode);
          window.location.href = 'http://127.0.0.1:8000/room/' + roomCode;
        }
      })
      .catch((error) => {
        console.error("Error occurred:", error);
      });
  }
  

  


    
    
  }

