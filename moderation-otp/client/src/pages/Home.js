import React from "react";
import "../style/home.css";
import TimeTable from "../components/Timetable.js"

const Home = () => {
  return (
    <div className= 'body'>
      <TimeTable />
    </div>
  );
}

export default Home; 
