import { useState, useEffect } from "react";


const UserProfile = () => {

    const [user, setUser] = useState(null);
  
    useEffect(() => {
      const fetchUser = async () => {
        const response = await fetch('http://localhost:3000/user', {
          headers: {
          },
        });

        const data = await response.json();
        setUser(data);
      };
      fetchUser();
    }, [user]);
    return (
            <div className="relative streak w-10">
            

            <p className="absolute top-7 text-center  text-3xl w-28 h-28">{user?user[0].streak:''}</p>
            </div>

    );
  };
  export default UserProfile;