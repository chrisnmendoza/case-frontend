import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
 
const Record = (props) => (
 <tr>
   <td>{props.record.title}</td>
   <td>{props.record.languages}</td>
   <td style={{height : "300px", display: "block", overflow: "auto"}}>{props.record.firstAnswer}</td>
   <td><a href={props.record.url}>{props.record.url}</a></td>
 </tr>
);

const Record2 = (props) => (
  <tr>
    <td>{props.record.title}</td>
    <td>{props.record.languages}</td>
    <td style={{height : "300px", display: "block", overflow: "auto"}}>{props.record.comment}</td>
    <td><a href={props.record.url}>{props.record.url}</a></td>
  </tr>
 );
 
export default function RecordList() {
 const [records, setRecords] = useState([]);
 
 // This method fetches the records from the database.
 useEffect(() => {
   async function getRecords() {
     const response = await fetch(`http://localhost:54321/record/`);
 
     if (!response.ok) {
       const message = `An error occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
 
     const records = await response.json();
     setRecords(records);
   }
 
   getRecords();
 
   return;
 }, [records.length]);
 
 // This method will delete a record
 async function deleteRecord(id) {
   await fetch(`http://localhost:54321/${id}`, {
     method: "DELETE"
   });
 
   const newRecords = records.filter((el) => el._id !== id);
   setRecords(newRecords);
 }
 
 // This method will map out the records on the table
 function recordList() {
   return records.map((record) => {
     if(record.firstAnswer === ""){ 
      return (
        <Record2
          record={record}
          deleteRecord={() => deleteRecord(record._id)}
          key={record._id}
        />
      );
     }
     return (
       <Record
         record={record}
         deleteRecord={() => deleteRecord(record._id)}
         key={record._id}
       />
     );
   });
 }
 
 // This following section will display the table with the records of individuals.
 return (
   <div>
     <h3>Record List</h3>
     <table className="table table-striped" style={{ marginTop: 20 }}>
       <thead>
         <tr>
           <th>Title</th>
           <th>Languages</th>
           <th>Answer</th>
           <th>url</th>
         </tr>
       </thead>
       <tbody>{recordList()}</tbody>
     </table>
   </div>
 );
}