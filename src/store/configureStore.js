import { createStore } from "redux";
import calendarReducer from "../reducers/calendar";

export default () => createStore(calendarReducer);
