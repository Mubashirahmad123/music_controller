import React, { Component } from "react";
import RoomJoinPage from "./RoomJoinPage";
import CreateRoomPage from "./CreateRoomPage";
import { BrowserRouter as Router, Routes, Route, Redirect } from "react-router-dom";
import Room from "./Room";
import { Grid, Button, ButtonGroup, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';



export default class HomePage extends Component {
    constructor(props) {
        super(props);
        this.renderHomePage = this.renderHomePage.bind(this);
        this.state = {
            roomCode: null,
        };
        this.clearRoomCode = this.clearRoomCode.bind(this)


    }
   

    // async componentDidMount(){
    //     fetch('/api/user-in-room').then((response)=> response.json())
    //     .then((data)=>{
    //         this.setState({
    //             roomCode : data.code
    //         })

    //     })
            
    // }

    // async componentDidMount(){
    //     debugger
    //     console.log("Component is mounting..."); // Add this line
    //     fetch('/api/user-in-room').then((response)=> response.json())
    //     .then((data)=>{
    //         console.log("API response:", data); // Add this line to check API response
    //         this.setState({
    //             roomCode : data.code
    //         })
    
    //     }).catch(error => {
    //         console.error("Error fetching data:", error); // Add this line to handle errors
    //     });
    // }
    



    renderHomePage() {
        return(
            <Grid container spacing={3}>
                <Grid item xs={12} align="center">
                    <Typography variant="h3" compact="h3">
                        House Pary
                    </Typography>
                </Grid>
                <Grid item xs={12} align="center">
                <ButtonGroup disableElevation variant="contained" color="primary">
                    <Button color="primary" component={Link} to='/join'>
                        Join a Room 
                        </Button>
                    <Button color="secondary" component={Link} to='/create'>
                        Create a Room
                        </Button>
                </ButtonGroup>

                    
                 
                </Grid>
            </Grid>

        )
    }
    clearRoomCode(){
        this.setState({
            roomCode: null,
        })
    }

    render() {
        // debugger
        return (
            <Router>
                <Routes>
                <Route path="/" element={this.renderHomePage()} />

                {/* <Route path="/" element={this.state.roomCode ? <Redirect to={`/room/${this.state.roomCode}`} /> : this.renderHomePage()} /> */}


                    <Route path="/join" element={<RoomJoinPage />} />
                    <Route path="/create" element={<CreateRoomPage />} />
                    <Route path="/room/:roomCode" element={<Room/>} />
                    {/* <Route path="/room/:roomCode"
                     render={(props) =>{ 
                       return <Room {...props} leaveRoomCallback={this.clearRoomCode}></Room> 
                     }} /> */}
                     {/* <Route path="/room/:roomCode">
                        {({ params }) => (
                            <Room roomCode={params.roomCode} leaveRoomCallback={clearRoomCode} />
                        )} */}
                    {/* </Route> */}


                </Routes>
            </Router>
        );
    }
}



