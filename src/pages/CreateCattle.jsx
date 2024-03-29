import { useState } from "react"
import { useCattleContext } from "../hooks/useCattlesContext"
import { ACTIONS } from "../context/CattleContext"
import { useAuthContext } from "../hooks/useAuthContext"
import API_BASE_URL from "../apiConfig"

function CreateCattle() {
  const { dispatch } = useCattleContext()
  const { user } = useAuthContext()

  const [petName, setPetName] = useState('')
  const [age, setAge] = useState('')
  const [breed, setBreed] = useState('')
  const [gender, setGender] = useState('')
  const [identificationMark, setIdentificationMark] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  const handleSubmit = async (event) => {
    event.preventDefault();

    if(!user) {
      setError('You must be login.')
      return 
    }

    const cattle = {petName, age, breed, gender, identificationMark};
    try {
      const response = await fetch(`${API_BASE_URL}/api/cattles`, {
        method: 'POST',
        body: JSON.stringify(cattle),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`,
        }
      });
      const json = await response.json();
  
      if(!response.ok) {
        setError(json.error);
        setEmptyFields(json.emptyFields);
      }

      if(response.ok){
        setPetName('')
        setAge('')
        setBreed('')
        setGender('')
        setIdentificationMark('')
        setError(null)
        setEmptyFields([])
        console.log("New Cattle added", json)
        dispatch({type: ACTIONS.CREATE_CATTLE, payload: json})  
      }

    } catch (error) {
        console.log("Error registering a Cattle.")
    }
  }

  // const handleFileUpload = (e) => {
  //   const file = e.target.files;

  // }

  return (
    <div className="form-page">
      <form onSubmit={handleSubmit} className="create">
        <h2>Add a New Cattle</h2>

        {/* <input 
        className="image-input"
        type="file"
        name="myProfile"
        accept=".jpeg, .png, .jpg"
        onChange={e => handleFileUpload(e)}
        />
         */}

        <label>Cattle Petname:</label>
        <input
          type="text" 
          onChange={(event) => setPetName(event.target.value)}
          value={petName}
          className={emptyFields.includes('Pet Name') ? 'error' : ''}
        />

        <label>Approx Age:</label>
        <input 
          type="number" 
          onChange={(event) => setAge(event.target.value)}
          max={30} min={0} 
          value={age}
          className={emptyFields.includes('Age') ? 'error' : ''}
        />

        <label>Breed:</label>
        <input 
          type="text" 
          onChange={(event) => setBreed(event.target.value)}
          value={breed}
          className={emptyFields.includes('Breed') ? 'error' : ''}
        />

        <p>
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
        </p>

        <label>Identification Mark:</label>
        <input 
          type="text" 
          onChange={(event) => setIdentificationMark(event.target.value)}
          value={identificationMark}
        />


        <button>
            Add Cattle
        </button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
    
  )
}

export default CreateCattle