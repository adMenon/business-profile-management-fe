import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const ProfileForm = () =>{
    const [userProfile, setUserProfile] = useState<any>();
    const [selectedTaxIdentifiers, setSelectedTaxIdentifiers] = useState(
        userProfile?.taxIdentifiers || []
      );
  const navigate = useNavigate();
  const { userId } = useParams();

  const fetchUser = () =>{
    fetch(`http://127.0.0.1:8083/api/business-profile/${userId}`)
      .then((response) => response.json())
      .then((data) => {
         console.log(data);
         setUserProfile(data.data)
      })
      .catch((err) => {
         console.log(err.message);
      });
  }
  useEffect(() => {
    fetchUser();
  }, [userId]);

  const handleSubmit = () => {
    // Handle form submission (create new or update existing user profile)
    // ...

    // Redirect to the user profile list page after submission
    navigate('/profiles');
  }

  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setUserProfile((prevProfile:any) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleBusinessAddressChange = (e) => {
    const { name, value } = e.target;
    setUserProfile((prevProfile: any) => ({
      ...prevProfile,
      businessAddress: {
        ...prevProfile.businessAddress,
        [name]: value,
      },
    }));
  };

  const handleLegalAddressChange = (e) => {
    const { name, value } = e.target;
    setUserProfile((prevProfile: any) => ({
      ...prevProfile,
      legalAddress: {
        ...prevProfile.legalAddress,
        [name]: value,
      },
    }));
  };

  const handleTaxIdentifierChange = (identifier:string) => {
    if (selectedTaxIdentifiers.includes(identifier)) {
      setSelectedTaxIdentifiers((prevIdentifiers:any) =>
        prevIdentifiers.filter((id:any) => id !== identifier)
      );
    } else {
      setSelectedTaxIdentifiers((prevIdentifiers:any) => [...prevIdentifiers, identifier]);
    }
    setUserProfile((prevProfile: any) => ({
        ...prevProfile,
        taxIdentifiers: selectedTaxIdentifiers
      }));
  };

  const handleSave = () => {
    console.log(userProfile)
    // You can also add logic to send the updated data to the server here
  };
  
  console.log(userProfile);

  return (
    userProfile && <div>
      <div>
      <h2>Edit User Profile</h2>
      <form>
        <label>
          Company Name:
          <input
            type="text"
            name="companyName"
            value={userProfile.companyName}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Legal Name:
          <input
            type="text"
            name="legalName"
            value={userProfile.legalName}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Business Address:
          <div>
            <input
              type="text"
              name="line1"
              placeholder="Line 1"
              value={userProfile.businessAddress.line1}
              onChange={handleBusinessAddressChange}
            />
            <input
              type="text"
              name="line2"
              placeholder="Line 2"
              value={userProfile.businessAddress.line2}
              onChange={handleBusinessAddressChange}
            />
            <input
              type="text"
              name="city"
              placeholder="City"
              value={userProfile.businessAddress.city}
              onChange={handleBusinessAddressChange}
            />
            <input
              type="text"
              name="state"
              placeholder="State"
              value={userProfile.businessAddress.state}
              onChange={handleBusinessAddressChange}
            />
            <input
              type="text"
              name="country"
              placeholder="Country"
              value={userProfile.businessAddress.country}
              onChange={handleBusinessAddressChange}
            />
            <input
              type="text"
              name="zip"
              placeholder="ZIP Code"
              value={userProfile.businessAddress.zip}
              onChange={handleBusinessAddressChange}
            />
          </div>
        </label>
        <label>
          Legal Address:
          <div>
            <input
              type="text"
              name="line1"
              placeholder="Line 1"
              value={userProfile.legalAddress.line1}
              onChange={handleLegalAddressChange}
            />
            <input
              type="text"
              name="line2"
              placeholder="Line 2"
              value={userProfile.legalAddress.line2}
              onChange={handleLegalAddressChange}
            />
            <input
              type="text"
              name="city"
              placeholder="City"
              value={userProfile.legalAddress.city}
              onChange={handleLegalAddressChange}
            />
            <input
              type="text"
              name="state"
              placeholder="State"
              value={userProfile.legalAddress.state}
              onChange={handleLegalAddressChange}
            />
            <input
              type="text"
              name="country"
              placeholder="Country"
              value={userProfile.legalAddress.country}
              onChange={handleLegalAddressChange}
            />
            <input
              type="text"
              name="zip"
              placeholder="ZIP Code"
              value={userProfile.legalAddress.zip}
              onChange={handleLegalAddressChange}
            />
          </div>
        </label>
        <label>
          Website:
          <input
            type="text"
            name="website"
            value={userProfile.website}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={userProfile.email}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Tax Identifiers:
          <div>
            <label>
              <input
                type="checkbox"
                name="EIN"
                checked={selectedTaxIdentifiers.includes('EIN')}
                onChange={() => handleTaxIdentifierChange('EIN')}
              />
              EIN
            </label>
            <label>
              <input
                type="checkbox"
                name="SSN"
                checked={selectedTaxIdentifiers.includes('SSN')}
                onChange={() => handleTaxIdentifierChange('SSN')}
              />
              SSN
            </label>
            </div>
        </label>
                <button type="button" onClick={handleSave}>
          Save Changes
        </button>
      </form>
    </div>
    </div>
  );

}