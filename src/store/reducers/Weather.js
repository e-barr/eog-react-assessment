import * as actions from "../actions";

const initialState = {
  loading: false,
  weatherId: null,
  name: "",
  temperature: "",
  weather_state_name: "",
  latitude: null,
  longitude: null,
  data: {}
};



const toF = c => (c * 9) / 5 + 32;

const startLoading = (state, action) => {
  const { latitude, longitude } = action
  if (latitude && longitude) {
    return { ...state, latitude, longitude }
  } else {
    return { ...state, loading: true };
  }
};

const weatherIDReceived = (state, action) => {
  return { ...state, weatherId: action.id };
};

const weatherDataRecevied = (state, action) => {
  const { data } = action;
  if (!data["consolidated_weather"]) return state;
  const weather = data.consolidated_weather[data.consolidated_weather.length - 1]
  const { weather_state_name, the_temp } = weather;
  const { title: name } = data;

  return {
    ...state,
    loading: false,
    temperatureinCelsius: the_temp,
    temperatureinFahrenheit: toF(the_temp),
    weather_state_name,
    name,
    data: action.data
  };
};

const handlers = {
  [actions.FETCH_WEATHER]: startLoading,
  [actions.WEATHER_ID_RECEIVED]: weatherIDReceived,
  [actions.WEATHER_DATA_RECEIVED]: weatherDataRecevied
};

export default (state = initialState, action) => {
  const handler = handlers[action.type];
  if (typeof handler === "undefined") return state;
  return handler(state, action);
};
