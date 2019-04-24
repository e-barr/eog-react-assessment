import React, { Component } from "react";
import { connect } from "react-redux";
import LinearProgress from "@material-ui/core/LinearProgress";
import ChipRaw from "@material-ui/core/Chip";
import { withStyles } from "@material-ui/core/styles";

const cardStyles = theme => ({
  root: {
    background: theme.palette.secondary.main
  },
  label: {
    color: theme.palette.primary.main
  }
});
const Chip = withStyles(cardStyles)(ChipRaw);

class Weather extends Component {
  render() {
    const {
      loading,
      name,
      weather_state_name,
      temperatureinFahrenheit
    } = this.props;
    if (loading) return <LinearProgress />;
    return (
      <Chip
        label={name ? `Weather in ${name}: ${weather_state_name} and ${temperatureinFahrenheit.toFixed(2)}°` : "Loading location and weather..." }
      />
    );
  }
}

const mapState = (state, ownProps) => {
  const {
    loading,
    name,
    weather_state_name,
    temperatureinFahrenheit
  } = state.weather;
  return {
    loading,
    name,
    weather_state_name,
    temperatureinFahrenheit
  };
};

export default connect(mapState)(Weather);
