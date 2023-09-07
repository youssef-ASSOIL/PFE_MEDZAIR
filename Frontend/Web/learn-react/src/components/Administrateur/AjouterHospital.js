import React, { useState } from 'react'
import "../../css/AjouterHopital.css"
import axios from 'axios';
import SideBar2 from './SideBar2';


export default function AjouterHospital() {
  const [toggleBtn, setToggleBtn] = useState(true);
  const [name, setName] = useState("");
  const [region, setRegion] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState(null); 
  const [password, setPassword] = useState("");

  const [imagePath, setImagePath] = useState("");
  
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(); // Create a FormData object
    formData.append("name", name);
    formData.append("region", region);
    formData.append("email", email);
    // formData.append("image", image); // Append the selected image file
    formData.append("password", password);
    formData.append("imagePath", imagePath);

    try {
        await axios.post("http://localhost:3002/addHospital", formData, {
          headers: {
            "Content-Type": "multipart/form-data", // Set the correct content type
          },
        });
        console.log("Hospital added successfully!");
      } catch (error) {
        console.error("Error adding hospital:", error);
      }
  };

  return (
    <div>
        <SideBar2 toggleBtn={toggleBtn}/>
    <div className="add-hospital-container">
    <h2>AjouterHospital</h2>
    <form className="add-hospital-form" onSubmit={handleSubmit}>
        <div>
          <label>Name Hospital:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label>Region:</label>
          <input type="text" value={region} onChange={(e) => setRegion(e.target.value)} />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Image:</label>
          {/* <input type="file" accept="image/*" onChange={handleImageChange} /> */}
          <input value={imagePath} onChange={(e) => setImagePath(e.target.value)} />
       
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Add Hospital</button>
      </form>
    </div>
    </div>
  )
}
