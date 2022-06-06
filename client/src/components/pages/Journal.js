import React, {useContext, useEffect, useCallback} from 'react';
import DaySection from '../DaySection';
import './Journal.css'
import { UserContext } from "../../context/UserContext"
import Loader from '../../Loader';


function Journal(){
    const [userContext, setUserContext] = useContext(UserContext)

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
      console.log(userContext.token)

      const fetchUserDetails = useCallback(() => {
        fetch(process.env.REACT_APP_API_ENDPOINT + "users/me", {
          method: "GET",
          credentials: "include",
          // Pass authentication token as bearer token in header
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userContext.token}`,
          },
        }).then(async response => {
          if (response.ok) {
            const data = await response.json()
            setUserContext(oldValues => {
              return { ...oldValues, details: data }
            })
          } else {
            if (response.status === 401) {
              // Edge case: when the token has expired.
              // This could happen if the refreshToken calls have failed due to network error or
              // User has had the tab open from previous day and tries to click on the Fetch button
              window.location.reload()
            } else {
              setUserContext(oldValues => {
                return { ...oldValues, details: null }
              })
            }
          }
        })
        console.log(userContext.token)
      }, [setUserContext, userContext.token])
    
      useEffect(() => {
        // fetch only when token is available
        if(userContext.token){
            // fetch only when user details are not present
            if (!userContext.details) {
            fetchUserDetails()
            }
        }
      }, [userContext.details, fetchUserDetails])
    return userContext.token === null ? (
        <div className='Journal-Container'>
            <DaySection userLoggedin={false} appContext={userContext} details={userContext.details}/>
        </div>
    ) : !userContext.details ? (
    <Loader />
    ) : (
        <div className='Journal-Container'>
            <DaySection userLoggedin={true} appContext={userContext} details={userContext.details}/>
        </div>
    );
}

export default Journal;