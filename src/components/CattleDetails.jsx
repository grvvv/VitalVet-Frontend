import { useCattleContext } from "../hooks/useCattlesContext"
import { ACTIONS } from "../context/CattleContext"
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { useAuthContext } from "../hooks/useAuthContext"
import { Link } from "react-router-dom"
import { useState } from "react"

// component
import ConfirmationDialog from "./alerts/ConfirmationDialog"
import API_BASE_URL from "../apiConfig"

export const CattleDetails = function({ cattle }){
  const { dispatch } = useCattleContext()
  const { user } = useAuthContext()
  const [showConfirmation, setShowConfirmation] = useState(false); // State to control confirmation dialog visibility

  // const handleEdit = async () => {
  //   try {
  
  //     if (!user){
  //       return
  //     }
  //     const response = await fetch('/api/cattles/' + cattle._id, {
  //       method: 'PATCH',
  //       headers: {
  //         'Authorization': `Bearer ${user.token}`
  //       }
  //     })

  //     const json = await response.json()

  //     if (response.ok) {
  //       console.log(json);

  //     }
  //   } catch (error) {
  //     console.log("Error Updating cattle")
  //   }
  // }

  const handleConfirmDelete = async () => {
    try {
      if (!user){
        return
      }
      const response = await fetch(`${API_BASE_URL}/api/cattles/` + cattle._id, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })

      const json = await response.json()

      if (response.ok) {
        dispatch({type: ACTIONS.DELETE_CATTLE, payload: json});
      }
    } catch (error) {
      console.log("Error deleting cattle")
    } finally {
      console.log("Might be error!!")
      setShowConfirmation(false); // Hide the confirmation dialog after deleting or in case of error
    }
  }

  return (
    <>
      {showConfirmation && (
        <ConfirmationDialog 
          message="Are you sure you want to delete this cattle?" 
          onConfirm={handleConfirmDelete} 
          onCancel={() => setShowConfirmation(false)} 
        />
      )}
      <div className="details-component">
        <Link className="link-component" to={`/health?cattleId=${cattle._id}&tagNumber=${cattle.tagNumber}`} style={{ textDecoration: 'none' }}>
          <div className={`cattle-details`}>
            <h4>{cattle.petName}</h4>
            <p><strong>Breed: </strong>{cattle.breed}</p>
            <p><strong>Gender: </strong>{cattle.gender}</p>
            {
              cattle.healthStatus === 'Healthy' && 
              <div>
                <svg height="25" width="110" xmlns="http://www.w3.org/2000/svg">
                  <circle r="8" cx="10" cy="15" fill="limegreen"/>
                  <text x="25" y="20" fill="black">Healthy</text>
                </svg> 
              </div>
            }
            {
              cattle.healthStatus === 'Moderate' && 
              <div>
                <svg height="25" width="110" xmlns="http://www.w3.org/2000/svg">
                  <circle r="8" cx="10" cy="15" fill="gold"/>
                  <text x="25" y="20" fill="black">Moderate</text>
                </svg> 
              </div>
            }
            {
              cattle.healthStatus === 'Weak' && 
              <div>
                <svg height="25" width="110" xmlns="http://www.w3.org/2000/svg">
                  <circle r="8" cx="10" cy="15" fill="red"/>
                  <text x="25" y="20" fill="black">Weak</text>
                </svg> 
              </div>
            }
            {/* addSuffix adds _ days before to timestamp */}
            <p>{formatDistanceToNow(new Date(cattle.createdAt), { addSuffix: true })}</p>
          </div>
        </Link>
        <div className={`buttons-component`}>
          <button className='material-symbols-outlined' 
            onClick={(event) => {         
            event.stopPropagation(); // Prevent the click event from propagating
            setShowConfirmation(true)
            }}>delete
          </button>
          <Link to={`/edit/${cattle._id}`}>
          <button className='material-symbols-outlined'>
          edit
          </button>
          </Link>
          
        </div>
      </div>
      
      
    </>
    
  )
 }
