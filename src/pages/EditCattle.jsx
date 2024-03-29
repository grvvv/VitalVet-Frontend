import React, { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useParams } from "react-router-dom";

function EditCattle() {
  const [documentData, setDocumentData] = useState({});
  const [updatedData, setUpdatedData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuthContext();
  const { cattleId } = useParams();

  const [emptyFields] = useState([])

  useEffect(() => {
    const fetchCattle = async function() {
      try {
        const response = await fetch(`/api/cattles/${cattleId}`, {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const json = await response.json()
      setDocumentData(json[0])
  
      } catch (error) {
        setError(error)
        console.log("Error fetching the cattles")
      }
    }

    if (user){
      fetchCattle();
    }
  }, [cattleId, user])


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData({ ...updatedData, [name]: value });
  };

  const handlePatchRequest = async () => {
    try {
      setLoading(true);
      console.log(updatedData);
      const response = await fetch(`/api/cattles/${cattleId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`,
        },
        body: JSON.stringify(updatedData) // Send the updated data
      }); 
      console.log('PATCH request successful:', response);
      // Optionally, you can update the documentData state with the updated data here
    } catch (error) {
      console.error('Error making PATCH request:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-page">
      {
        loading ?
        <p>Loading...</p>:
        <form onSubmit={handlePatchRequest} className="create">
          <h2>Edit Cattle Profile</h2>

          <label>Cattle Petname:</label>
          <input
            type="text" 
            onChange={handleInputChange}
            name="petName"
            value={updatedData.petName || documentData.petName || ''}
            className={emptyFields.includes('Pet Name') ? 'error' : 'readonly'}
            readOnly
          />

          <label>Approx Age:</label>
          <input 
            type="number" 
            onChange={handleInputChange}
            max={25} min={0} 
            name="age"
            value={updatedData.age || documentData.age || ''}
            className={emptyFields.includes('Age') ? 'error' : ''}
          />

          <label>Breed:</label>
          <input 
            type="text" 
            onChange={handleInputChange}
            name="breed"
            value={updatedData.breed || documentData.breed || ''}
            className={emptyFields.includes('Breed') ? 'error' : ''}
          />

          {/* <p>
            <span>Gender:</span>
            <label className="radio-container radio-first">
              <input type="radio" 
              name="gender" 
              onClick={() => setGender('Male')} 
              value={gender} /> Male
              <span className="checkmark"></span>
            </label>
            <label className="radio-container">
              <input 
              type="radio" 
              name="gender" 
              onClick={() => setGender('Female')} 
              value={gender} /> Female
              <span className="checkmark"></span>
            </label>
          </p> */}

          <label>Identification Mark:</label>
          <input 
            type="text" 
            onChange={handleInputChange}
            name="identificationMark"
            value={updatedData.identificationMark || documentData.identificationMark || ''}
          />


          <button>
            {loading ? 'Updating...' : 'Update'}
          </button>
          {error && <div className="error">{error}</div>}
        </form>
      }
    </div>
  )
}

export default EditCattle;