import React, { Component } from "react";
import { Grid, Button, Typography } from "@material-ui/core";
import CreateRoomPage from "./CreateRoomPage";


export default class Room extends Component {
  constructor(props) {
    super(props);
    this.state = {
      votesToSkip: 2,
      guestCanPause: false,
      isHost: false,
      showSettings: false,
      spotifyAuthenticated: false
    };
    // this.roomCode = this.props.match.params.roomCode

    this.roomCode = "";
    this.leaveButtonPressed = this.leaveButtonPressed.bind(this);
    this.updateShowSettings = this.updateShowSettings.bind(this);
    this.renderSettingsButton = this.renderSettingsButton.bind(this);
    this.renderSettings = this.renderSettings.bind(this);
    this.getRoomDetails = this.getRoomDetails.bind(this);
    this.authenticateSpotify = this.authenticateSpotify.bind(this);
    this.getRoomDetails();

  }
  

  getRoomDetails() {
    var curr_url = window.location.href.split("/");
    // console.lo
    this.roomCode = curr_url[4];
    fetch("/api/get-room" + "?code=" + curr_url[4])
      .then((response) =>{ 
        if (!response.ok) {
          console.log("Error fetching room detils")
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
        if (this.state.isHost) {
          this.authenticateSpotify()
        }
      });
  }

  // authenticateSpotify() {

  //   fetch('/spotify/is_authenticated').then((response)=> response.json()).then((data) => {
  //     console.log("Spotify authentication status:", data.status); // Debugging statement

  //     this.setState({spotifyAuthenticated: data.status });
  //     if (!data.status) {
  //       fetch('/spotify/get-auth-url').then((response) => response.json()).then((data) =>{
  //         console.log("Redirecting to Spotify authentication URL:", data.url); // Debugging statement

  //         window.location.replace(data.url)
  //       })
  //     }

  //   });

  // }

  authenticateSpotify() {
    console.log("Fetching Spotify authentication status...");
    // debugger;
    fetch('/spotify/is_authenticated')
        .then((response) => response.json())
        .then((data) => {
            console.log("Spotify authentication status:", data.status);
            this.setState({ spotifyAuthenticated: data.status });
            if (!data.status) {
                console.log("User is not authenticated. Fetching authentication URL...");
                fetch('/spotify/get-auth-url')
                    .then((response) => response.json())
                    .then((data) => {
                        console.log("Redirecting to Spotify authentication URL:", data.url);
                        window.location.replace(data.url);
                    });
            }
            console.log("hiii")
        });
}




  leaveButtonPressed(){
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      };
      fetch('/api/leave-room', requestOptions)
      .then((_response) => {
        console.log("ROOM LEFT SUCCESSFULLY")
        this.props.leaveRoomCallback();
        this.props.history.push("/")
        

      });
    }

    updateShowSettings(value) {
      this.setState({
        showSettings : value,
      });
    }

    renderSettings() {
      return (<Grid container spacing={1}>
        <Grid item xs={12} align="center">
          <CreateRoomPage update={true} votesToSkip={this.state.votesToSkip} guestCanPause={this.state.guestCanPause} roomCode={this.roomCode} updateCallback={this.getRoomDetails}/>
        </Grid>
        <Grid item xs={12} align="center">
        <Button variant="contained" color="secondary" onClick={() => this.updateShowSettings(false)}>Close</Button>
        </Grid>

      </Grid>
      )
    }
    
    renderSettingsButton(){
      return(
        <Grid item xs={12} align="center">
          <Button variant="contained" color="primary" onClick={() => this.updateShowSettings(true)}>Settings</Button>
        </Grid>
      )
    }
  

  render() {
    if (this.state.showSettings) {
      return this.renderSettings();
    }

    console.log("in room.js..")
    console.log("RENDERING ROOM COMPONENT")
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
        {this.state.isHost ? this.renderSettingsButton() : null}
        <Grid item xs={12} align="center">
          <Button  variant="contained" color="secondary" onClick={this.leaveButtonPressed}
          >Leave Room</Button>
    
        </Grid>
      </Grid>

   
    );
  }
}








