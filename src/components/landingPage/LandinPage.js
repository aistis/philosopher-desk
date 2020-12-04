import React, { useState, useEffect } from "react";
import { useAuth } from "../../auth/useAuth";
import db from '../../services/db';
import Welcome from "./Welcome";

const LandingPage = () => {
  const auth = useAuth();
  const [name, setName] = useState('');
  const loadProfile = async () => {
    if (auth.user) {
      const data = await db.table('profile').where("id").equalsIgnoreCase(auth.user).toArray()
      setName(data[0].name)
    }
  }

  useEffect(() => {
    loadProfile()
  },[])

  return ( 
    <Welcome name={name}></Welcome>
  )
}
export default LandingPage