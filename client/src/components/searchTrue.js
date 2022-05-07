import React, { useState } from "react";
import { useNavigate } from "react-router";
 
export default function Search() {
 const [form, setForm] = useState({
   query: "",
   languages: "",
   onlyCode: "",
 });
 const navigate = useNavigate();
 
 // These methods will update the state properties. 
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }
 
 // This function will handle the submission.
 async function onSubmit(e) {
   e.preventDefault();
 
   // When a post request is sent to the create url, we'll add a new record to the database.
   const codeForm = { ...form };
   console.log("here's the query: ")
   console.log(codeForm.query)
 
   console.log("Success");
    setForm({ query: "", languages: "", onlyCode: "" });
    let queryUrl = "/query/?&query=" + codeForm.query + "&languages=" + codeForm.languages + "&onlyCode=" + codeForm.onlyCode
    navigate(queryUrl);
    window.location.reload()
   .catch(error => {
     window.alert(error);
     return;
   });
 
 }
 
 // This following section will display the form that takes the input from the user.
 return (
   <div>
     <h3>Search Code</h3>
     <form onSubmit={onSubmit}>
       <div className="form-group">
         <label htmlFor="query">Query</label>
         <input
           type="text"
           className="form-control"
           id="query"
           value={form.query}
           onChange={(e) => updateForm({ query: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="languages">Languages</label>
         <input
           type="text"
           className="form-control"
           id="languages"
           value={form.languages}
           onChange={(e) => updateForm({ languages: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="onlyCode">Only Code?</label>
         <input
           type="text"
           className="form-control"
           id="onlyCode"
           value={form.onlyCode}
           onChange={(e) => updateForm({ onlyCode: e.target.value })}
         />
       </div>
       <div className="form-group">
         <input
           type="submit"
           value="Search!"
           className="btn btn-primary"
         />
       </div>
     </form>
   </div>
 );
}