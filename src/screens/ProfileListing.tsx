import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

export const ProfileListing = () => {
    const navigate = useNavigate();

    const [userProfiles, setUserProfiles] = useState<any[]>();

  
    const handleAddUserProfile = () => {
      navigate("/create")
    };

    const handleEditProfile = (profileId:string) => {
      navigate(`/profiles/${profileId}/edit`);
    };

    const handleSubscription = (profileId:string) => {
      navigate(`/profiles/${profileId}/manage-subscription`);
    };

    const populateProfiles = () => {
      fetch("http://127.0.0.1:8083/api/business-profile")
      .then((response) => response.json())
      .then((data) => {
         console.log(data);
         setUserProfiles(data.data)
      })
      .catch((err) => {
         console.log(err.message);
      });
  }    
  useEffect(() => {
      populateProfiles();
  }, []);
    return (
        <div>
          <h1>User Profiles</h1>
          <button type="button" onClick={handleAddUserProfile}>
              Add User Profile
          </button>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Legal Name</th>
                <th>Company Name</th>
                <th>Legal Address</th>
                <th>Business Address</th>
                <th>Website</th>
                <th>Email</th>
                <th>Tax Identifiers</th>
                <th>Subscribed Product IDs</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {userProfiles && userProfiles.map((profile) => (
                <tr key={profile.id}>
                  <td>{profile.id}</td>
                  <td>{profile.legalName}</td>
                  <td>{profile.companyName}</td>
                  <td>{profile.legalAddress}</td>
                  <td>{profile.businessAddress}</td>
                  <td>{profile.website}</td>
                  <td>{profile.email}</td>
                  <td>
                    <ul>
                      {profile.taxIdentifiers.map((identifier, index) => (
                        <li key={index}>{identifier}</li>
                      ))}
                    </ul>
                  </td>
                  <td>
                    <ul>
                      {profile.subscribedBusiness.map((id:any, index:any) => (
                        <li key={index}>{id}</li>
                      ))}
                    </ul>
                  </td>
                  <td>
                  <button onClick={() => handleEditProfile(profile.id)}>
                    Edit Profile
                  </button>
                  <button onClick={() => handleSubscription(profile.id)}>
                    Subscribe/Unsubscribe
                  </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
        </div>
      );
}