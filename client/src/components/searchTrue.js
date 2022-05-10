import React, { useState } from "react";
import { useNavigate } from "react-router";
import Multiselect from 'multiselect-react-dropdown';
 
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
   console.log("Here's the languages")
   console.log(codeForm.languages)
 
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

 function myFunc(selectedList, selectedItem) {
   let selectedLanguages = ""
   console.log(selectedList)
   console.log(selectedItem)
   selectedList.forEach(element => selectedLanguages += element.name + " ")
   updateForm({ languages: selectedLanguages})
 }

 function changeCode(event) {
   console.log(event.target.value)
   updateForm({onlyCode: event.target.value})
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
         <label htmlFor="languages">Languages? (dont enter to search all)</label>
         <Multiselect className="form-group"
         options={[{name: 'javascript'},{name: 'python'},{name: 'java'},{name: 'c-sharp'},{name: 'php'},{name: 'html'},{name: 'c-plus-plus'},{name: 'css'},{name: 'sql'},{name: 'r'},{name: 'c'},{name: 'swift'},{name: 'ruby'},{name: 'xml'},{name: 'vba'},{name: 'typescript'},{name: 'bash'},{name: 'scala'},{name: 'powershell'},{name: 'matlab'},{name: 'kotlin'},{name: 'perl'},{name: 'dart'},{name: 'go'},{name: 'haskell'},{name: 'rust'}]} // Options to display in the dropdown
         onSelect={myFunc}//(updateForm({ languages: e[0].name})} // Function will trigger on select event
         onRemove={myFunc} // Function will trigger on remove event
         displayValue="name" // Property name to display in the dropdown options
         />
       </div>
       <div className="form-group" onChange={changeCode}>
         <label htmlFor="onlyCode">Only Code?</label>
         <input type="radio" value="yes" name="onlyCode" /> Yes
         <input type="radio" value="no" name="onlyCode" /> No
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