import axios from "axios";
import {
  GETDOGS,
  GETDOGBYID,
  GETDOGSBYNAME,
  GETTEMPERAMENT,
  FILTEREDTEMPERAMENT,
  ORDER,
  FILTER_BY_ID_TYPE,
} from "./types";

const URL = 'http://localhost:3001'

export const getDogs = () => async (dispatch) => {
  try {
    const response = await axios.get(`${URL}/dogs`);
    const data = response.data;
    return dispatch({
      type: GETDOGS,
      payload: data,
    });
  } catch (error) {
    return console.log(error.message);
  }
};

export const getDogById = (id) => async (dispatch) => {
  try {
    const response = await axios.get(`http://localhost:3001/dogs/${id}`);
    const data = response.data;
    return dispatch({
      type: GETDOGBYID,
      payload: data,
    });
  } catch (error) {
    return console.log(error.message);
  }
};

export const getDogsByName = (dataName) => async (dispatch) => {
  try {
    const response = await axios.get(
      `${URL}/dogsname?name=${dataName}`
    );
    const data = response.data;
    if (dataName === "") {
      return dispatch({
        type: GETDOGSBYNAME,
        payload: [],
      });
    } else {
      return dispatch({
        type: GETDOGSBYNAME,
        payload: data,
      });
    }
  } catch (error) {
    return console.log(error.message);
  }
};

export const getTemperament = () => async (dispatch) => {
  try {
    const response = await axios.get(`${URL}/temperaments`);
    const data = response.data;
    return dispatch({
      type: GETTEMPERAMENT,
      payload: data,
    });
  } catch (error) {
    return console.log(error.message);
  }
};

export const filterTemperaments = (selectedTemperament) => async (dispatch, getState) => {
  try {
    const allCharacters = getState().charactersDogs;
  
    if (selectedTemperament === "allcharacters") {
      dispatch({
        type: FILTEREDTEMPERAMENT,
        payload: allCharacters,
      });
    } else {
      const filteredByTemperament = allCharacters.filter((dog) =>
      dog.temperament && dog.temperament.split(',').map(item => item.trim()).includes(selectedTemperament)
      );
      
      dispatch({
        type: FILTEREDTEMPERAMENT,
        payload: filteredByTemperament,
      });
    }
  } catch (error) {
    return console.log(error.message);
  }
};

export const orderDogs = (order) => {
  return { type: ORDER, payload: order };
};

export const filterByIdType = (idType) => {
  return { type: FILTER_BY_ID_TYPE, payload: idType };
}


export const createDog = (data) => async (dispatch) => {
  try {
    const response = await axios.post(`${URL}/dogs`, data);
    return response;
  } catch (error) {
    return console.log(error.message);
  }
}