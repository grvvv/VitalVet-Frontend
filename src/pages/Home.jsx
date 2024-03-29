import { useEffect } from "react";
import { useCattleContext } from "../hooks/useCattlesContext";
import { ACTIONS } from "../context/CattleContext";
import { useAuthContext } from "../hooks/useAuthContext";
import addbutton from "../images/addbutton.png"

// components
import { CattleDetails } from "../components/CattleDetails";
import StatusCard from "../components/cards/StatusCard";
import SensorStatus from "../components/cards/SensorStatus";
import { Link } from "react-router-dom";

function Home() {
  const {cattles, dispatch} = useCattleContext()
  const { user } = useAuthContext()

  useEffect(() => {
    const fetchCattles = async function() {
      try {
        const response = await fetch('/api/cattles', {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
      const json = await response.json()

      if (response.ok) {
      dispatch({type: ACTIONS.SET_CATTLE, payload: json})
      }
      } catch (error) {
        console.log("Error fetching the cattles")
      }
      }

    if (user){
      fetchCattles();
    }

}, [dispatch, user]);

  return (
    <div className="home">
      <div className="cattles">
        { Array.isArray(cattles) && cattles.length > 0 ? 
        cattles.map((cattle) => {
          return <CattleDetails key={cattle._id} cattle={cattle}/>
        }) : 
        <div className="empty-container">
          <span className="material-symbols-outlined">add_ad</span>
          <h2>No Cattles Added</h2>
          <h3>To add cattle click 
            <img src={addbutton} alt="" />
          </h3>
        </div>
        }
      </div>
      
      <div className="status-card">
        {
          Array.isArray(cattles) && cattles.length > 0 ? 
          <StatusCard 
          totalCattles = {cattles.length}
          cattles = {cattles}
          /> : 
          <div className="empty-container cattle-status">
            <span className="material-symbols-outlined">add_ad</span>
            <h2>No Cattles Added</h2>
          </div>
        }
        
      </div>

      <div className="status-card sensor-status">
        <SensorStatus />
      </div>

      <Link to={"/news"} style={{ textDecoration: 'none' }}>
      <div className="news-component">
        <span className="material-symbols-outlined">newspaper</span>
        News
      </div>
      </Link>
      
    </div>
  )
}

export default Home;
