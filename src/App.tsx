import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ProductListing } from './screens/ProductListing';
import { ProfileListing } from './screens/ProfileListing';
import { EditProfileForm } from './screens/EditProfileForm';
import { CreateProfileForm } from './screens/CreateProfileForm';
import Subscription from './screens/Subscription';

function App() {
  return (<>
    <BrowserRouter>
      <Routes>
        <Route path='/products' element={<ProductListing add={true}/>} />
        <Route path='/profiles' element={<ProfileListing />} />
        <Route path='/profiles/create' element={<CreateProfileForm />} />
        <Route path='/profiles/:userId/edit' element={<EditProfileForm />} />
        <Route path='/profiles/:userId/subscription' element={<Subscription />}/>
        {/* <Route path="*" element={<Home />} /> */}
      </Routes>
    </BrowserRouter>
  </>);
}

export default App
