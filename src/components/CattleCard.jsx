import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import Loader from './alerts/Loader';
import API_BASE_URL from '../apiConfig';

const CattleCard = (props) => {
  const [entityData, setEntityData] = useState(null);
  const [error, setError] = useState(null);
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchCattle = async function() {
    try {
      const response = await fetch(`${API_BASE_URL}/api/cattles/${props.currentCattle}`, {
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const json = await response.json()
    setEntityData(json)

    } catch (error) {
      setError(error)
      console.log("Error fetching the cattles")
    }
    }

    if (user){
      fetchCattle();
    }
  }, [props.currentCattle, user])

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  
  return (
    <>
    {
      entityData ? (
      <div className="card-details">
        <span id='name'>{entityData[0].petName}</span>
        <hr style={{
            color: 'black',
            backgroundColor: 'black',
            border: 'none',
            height: 3
        }} />
        <span>Age: <p>{entityData[0].age}</p></span>
        <span>Breed: <p>{entityData[0].breed}</p></span>
        <span>Gender: <p>{entityData[0].gender}</p></span>
        <span>Tag: <p>{entityData[0].tagNumber}</p></span>
        {entityData[0].identificationMark ? <span>Id: <p>{entityData[0].identificationMark}</p></span> : <></>}
      </div>
      ) : (
        <Loader />
      )
    }
    </>
  )
}

export default CattleCard