import React, { Component } from "react";
import { Grid, Button, Typography } from "@material-ui/core";


export default class Room extends Component {
  constructor(props) {
    super(props);
    this.state = {
      votesToSkip: 2,
      guestCanPause: false,
      isHost: false,
    };
    this.roomCode = "";
    this.getRoomDetails();
    this.leaveButtonPressed = this.leaveButtonPressed.bind(this);
  }
  

  getRoomDetails() {
    var curr_url = window.location.href.split("/");
    // console.lo
    this.roomCode = curr_url[4];
    fetch("/api/get-room" + "?code=" + curr_url[4])
      .then((response) =>{ 
        if (!response.ok) {
          this.props.leaveRoomCallback();
          this.props.history.push("/")
        }
        return response.json(); 
        
      })
      .then((data) => {
        this.setState({
          votesToSkip: data.votes_to_skip,
          guestCanPause: data.guest_can_pause,
          isHost: data.is_host,
        });
      });
  }


  leaveButtonPressed(){
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      };
      fetch('/api/leave-room', requestOptions).then((_response) => {
        this.props.leaveRoomCallback();
        this.props.history.push("/")
        

      });
    }
    

  

  render() {
    console.log("in room.js..")
    return (

      <Grid container spacing={1}>
        <Grid item xs={12} align="center">
          <Typography variant="h4" component={'h4'}>
            Code : {this.roomCode}
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
        <Typography variant="h6" component={'h6'}>
        Votes: {this.state.votesToSkip}
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
        <Typography variant="h6" component={'h6'}>
        Guest Can Pause: {this.state.guestCanPause.toString()}
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
        <Typography variant="h6" component={'h6'}>
        Host: {this.state.isHost.toString()}
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <Button  variant="contained" color="secondary" onClick={this.leaveButtonPressed}
          >Leave Room</Button>
    
        </Grid>
      </Grid>

   
    );
  }
}








