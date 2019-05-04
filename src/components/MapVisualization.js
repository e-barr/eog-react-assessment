import React, { Component } from "react";
import { connect } from "react-redux"
import Card from "@material-ui/core/Card";
import CardHeaderRaw from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import { withStyles } from "@material-ui/core/styles";
import { withGoogleMap, GoogleMap, withScriptjs, Marker } from 'react-google-maps'

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

const MyMapComponent = withScriptjs(withGoogleMap((props) => {
  let coordinates = props.coordinates

  return (
    <GoogleMap
      defaultZoom={4}
      defaultCenter={coordinates}
    >
      {props.isMarkerShown && <Marker position={coordinates} />}
    </GoogleMap>
  )
}))

class MapVisualization extends Component {

  componentDidMount() {
    const { sendLatLng } = this.props
    const { findDroneLocation } = apiActions

    setInterval(() => {
      findDroneLocation().then(resp => {
        let { latitude, longitude } = resp.data[374]
        sendLatLng(latitude, longitude)
        })
    }, 4000)
  }

  

  render() {
    const { classes } = this.props;
    let latitude = this.props.latitude ? this.props.latitude : 29.763
    let longitude = this.props.longitude ? this.props.longitude : -95.363

    return (
      <Card className={classes.card}>
        <CardHeader title="Map Visualization" />
        <CardContent>
          <MyMapComponent
            isMarkerShown
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDEoztiOLMTzKRf_mrtJ9tVruWvyYZl6-U"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `400px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
            coordinates={{ lat: latitude, lng: longitude }}
          >
          </MyMapComponent>
        </CardContent>
      </Card>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    latitude: state.weather.latitude,
    longitude: state.weather.longitude
  }
}

const mapDisptachToProps = (dispatch) => {
  return {
    sendLatLng: (lat, lng) => {
      dispatch({ 
        type: actions.FETCH_WEATHER, latitude: lat, longitude: lng 
      })
    }
  }
}

const styledComponent = withStyles(styles)(MapVisualization)

export default connect(mapStateToProps, mapDisptachToProps)(styledComponent);
