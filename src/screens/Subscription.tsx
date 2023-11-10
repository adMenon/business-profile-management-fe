import React, { useState } from 'react';
import { ProductListing } from './ProductListing';
import { useNavigate, useParams } from 'react-router-dom';

const Subscription = () => {
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const [newSubscription, setNewSubscription] = useState<any>('');

  const { userId } = useParams();
  const navigate = useNavigate()

  console.log(subscriptions, newSubscription)

  const handleAddSubscription = () => {
    if (newSubscription.trim() !== '') {
      setSubscriptions([...subscriptions, newSubscription]);
      fetch("http://127.0.0.1:8083/api/business-profile/"+userId+"/subscribe/"+newSubscription,
         {method:'POST',
        headers: { 'Content-Type': 'application/json' }})
        .then((response) => response.json())
        .then((data) => {
           console.log(data);
           navigate("/profiles");
        })
        .catch((err) => {
           console.log(err.message);
        });
      setNewSubscription('');
    }
  };

  return (
    <div>
      <h2>Subscription Management</h2>
      <div>
        <label htmlFor="subscriptionInput">Add Subscription:</label>
        <input
          type="text"
          id="subscriptionInput"
          value={newSubscription}
          onChange={(e) => setNewSubscription(e.target.value)}
        />
        <button onClick={handleAddSubscription}>Add</button>
      </div>
      <ProductListing add={false}/>
    </div>
  );
};

export default Subscription;
