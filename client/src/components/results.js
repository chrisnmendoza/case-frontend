import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
 
const Record = (props) => (
 <tr>
   <td>{props.record.title}</td>
   <td>{props.record.languages}</td>
   <td style={{height : "300px", display: "block", overflow: "auto"}}>{props.record.firstAnswer}</td>
   <td><a href={props.record.url}>{props.record.url}</a></td>
   <td>
     <Link className="btn btn-link" to={`/edit/${props.record._id}`}>Edit</Link> |
     <button className="btn btn-link"
       onClick={() => {
         props.deleteRecord(props.record._id);
       }}
     >
       Delete
     </button>
   </td>
 </tr>
);

const Record2 = (props) => (
  <tr>
    <td>{props.record.title}</td>
    <td>{props.record.languages}</td>
    <td>{props.record.onlyCode}</td>
    <td><a href={props.record.url}>{props.record.url}</a></td>
    <td>
      <Link className="btn btn-link" to={`/edit/${props.record._id}`}>Edit</Link> |
      <button className="btn btn-link"
        onClick={() => {
          props.deleteRecord(props.record._id);
        }}
      >
        Delete
      </button>
    </td>
  </tr>
 );

 const Record3 = (props) => (
  <tr>
    <td>{props.record.title}</td>
    <td>{props.record.languages}</td>
    <td style={{height : "300px", display: "block", overflow: "auto"}}>{props.record.comment}</td>
    <td><a href={props.record.url}>{props.record.url}</a></td>
    <td>
      <Link className="btn btn-link" to={`/edit/${props.record._id}`}>Edit</Link> |
      <button className="btn btn-link"
        onClick={() => {
          props.deleteRecord(props.record._id);
        }}
      >
        Delete
      </button>
    </td>
  </tr>
 );
 
export default function Results() {
 const [records, setRecords] = useState([]);
 console.log(window.location.href)
 let uriParams = decodeURI(window.location.href)
 uriParams = new URLSearchParams(uriParams)
 
 // This method fetches the records from the database.
 useEffect(() => {
    console.log("i am in the function")
    console.log("heres the updated query terms: ")
    console.log(uriParams.get("query"))
    console.log(uriParams.get("languages"))
    console.log(uriParams.get("onlyCode"))


   async function getRecords() {
     const response = await fetch(`http://localhost:5000/query/?&query=${uriParams.get("query")}&languages=${uriParams.get("languages")}&onlyCode=${uriParams.get("onlyCode")}`);
     
     if (!response.ok) {
       const message = `An error occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
     console.log("here")
 
     const records = await response.json();
     console.log("here are the records")
     console.log(records)
     setRecords(records);
   }
 
   getRecords();
 
   return;
 }, [records.length]);
 
 // This method will delete a record
 async function deleteRecord(id) {
   await fetch(`http://localhost:5000/${id}`, {
     method: "DELETE"
   });
 
   const newRecords = records.filter((el) => el._id !== id);
   setRecords(newRecords);
 }
 
 // This method will map out the records on the table
 function recordList() {
   if(uriParams.get("onlyCode") === "yes") {
    return records.map((record) => {
      return (
        <Record2
          record={record}
          deleteRecord={() => deleteRecord(record._id)}
          key={record._id}
        />
      );
    });
   }
   return records.map((record) => {
     if(record.firstAnswer === "") {
      return (
        <Record3
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
 console.log("hereayo")
 console.log(uriParams.get("query"))
 if(uriParams.get("onlyCode") === "yes") {
  return (
    <div>
      <h3>Record List</h3>
      <table className="table table-striped" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Languages</th>
            <th>Only Code</th>
            <th>url</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody style={{"white-space" : "pre-line"}}>{recordList()}</tbody>
      </table>
    </div>
  );
 }

 return (
   <div>
     <h3>Record List</h3>
     <table className="table table-striped" style={{ marginTop: 20}}>
       <thead>
         <tr>
           <th>Title</th>
           <th>Languages</th>
           <th>Description</th>
           <th>url</th>
           <th>Action</th>
         </tr>
       </thead>
       <tbody>{recordList()}</tbody>
     </table>
   </div>
 );
}