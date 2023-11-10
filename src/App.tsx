import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ProductListing } from './screens/ProductListing';
import { ProfileListing } from './screens/ProfileListing';
import { ProfileForm } from './screens/ProfileForm';

function App() {
  return (<>
    <BrowserRouter>
      <Routes>
        <Route path='/products' element={<ProductListing />} />
        <Route path='/profiles' element={<ProfileListing />} />
        <Route path='/profiles/:userId/edit' element={<ProfileForm />} />
        {/* <Route path="*" element={<Home />} /> */}
      </Routes>
    </BrowserRouter>
  </>);
}

export default App
