import React, { Component } from "react";
import { connect } from "react-redux"
import Card from "@material-ui/core/Card";
import CardHeaderRaw from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { withStyles } from "@material-ui/core/styles";

import LinearProgress from "@material-ui/core/LinearProgress";

import apiActions from '../store/api/index.js';

import * as actions from "../store/actions";

const cardStyles = theme => ({
  root: {
    background: theme.palette.primary.main
  },
  title: {
    color: "white"
  }
});
const CardHeader = withStyles(cardStyles)(CardHeaderRaw);

const styles = {
  card: {
    margin: "5% 25%"
  }
};

// 1. Connect to the Drone API
// 2. Create your visualization
// 3. Poll the API
// 4. Submit your App

let pollTime;

class MapVisualization extends Component {

  componentDidMount() {
    const { sendLatLng } = this.props
    const { findDroneLocation } = apiActions
    
    setInterval(() => {
      findDroneLocation().then(resp => {
        let { latitude, longitude } = resp.data[374]
        pollTime = new Date(resp.data[374].timestamp)
        sendLatLng(latitude, longitude)
      })
    }, 4000)

  }

  render() {
    const { classes } = this.props;
    let { temperatureinCelsius } = this.props
    let latitude = this.props.latitude ? this.props.latitude : <LinearProgress />
    let longitude = this.props.longitude ? this.props.longitude : <LinearProgress />
    const temperatureinKelvin = temperatureinCelsius ? temperatureinCelsius + 273.15 : <LinearProgress />
    let seconds = <LinearProgress />

    if (pollTime) {
      let diff = new Date(new Date() - pollTime).getSeconds()
      seconds = `${diff} second${diff !== 1 ? 's' : "" } ago`
    }

    return (
      <Card className={classes.card}>
        <CardHeader title="Map Visualization" />
        <CardContent>
          hi        
        </CardContent>
      </Card>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    weatherId: state.weather.weatherId,
    name: state.weather.name,
    temperatureinCelsius: state.weather.temperatureinCelsius,
    weather_state_name: state.weather.weather_state_name,
    latitude: state.weather.latitude,
    longitude: state.weather.longitude,
    data: state.weather.data
  }
}

const mapDisptachToProps = (dispatch) => {
  return {
    sendLatLng: (lat, lng) => {
      dispatch({ 
        type: actions.FETCH_WEATHER, latitude: lat, longitude: lng 
      })
    },
    sendWeatherId: (id) => {
      dispatch({
        type: actions.WEATHER_ID_RECEIVED,
        id
      })
    }
  }
}

const styledComponent = withStyles(styles)(MapVisualization)

export default connect(mapStateToProps, mapDisptachToProps)(styledComponent);
