import React from "react";
 
// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";
 
// We import all the components we need in our app
import Navbar from "./components/navbar";
import RecordList from "./components/recordList";
import Edit from "./components/edit";
import Search from "./components/search";
import SearchTrue from "./components/searchTrue";
import Results from "./components/results"

 
const App = () => {
 return (
   <div>
     <Navbar />
     <Routes>
       <Route exact path="/" element={<RecordList />} />
       <Route path="/edit/:id" element={<Edit />} />
       <Route path="/search" element={<SearchTrue />} />
       <Route path="/query/" element={<Results />} />
     </Routes>
   </div>
 );
};
 
export default App;