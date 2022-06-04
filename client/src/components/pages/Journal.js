import React, {useContext, useEffect, useCallback} from 'react';
import DaySection from '../DaySection';
import './Journal.css'
import { UserContext } from "../../context/UserContext"


function Journal(){
    const [userContext, setUserContext] = useContext(UserContext)
    console.log(userContext.token)

    const verifyUser = useCallback(() => {
        fetch(process.env.REACT_APP_API_ENDPOINT + "users/refreshToken", {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        }).then(async response => {
          if (response.ok) {
            const data = await response.json()
            setUserContext(oldValues => {
              return { ...oldValues, token: data.token }
            })
          } else {
            setUserContext(oldValues => {
              return { ...oldValues, token: null }
            })
          }
          // call refreshToken every 5 minutes to renew the authentication token.
          setTimeout(verifyUser, 5 * 60 * 1000)
        })
      }, [setUserContext])
    
      useEffect(() => {
        verifyUser()
      }, [verifyUser])
    return (
        <div className='Journal-Container'>
            <DaySection appContext={userContext} />
        </div>
    );
}

export default Journal;