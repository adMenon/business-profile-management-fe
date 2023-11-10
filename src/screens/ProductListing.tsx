import './ProductList.css';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

export const ProductListing = () => {
    const [products, setProducts] = useState<any[]>();
    const [newProduct, setNewProduct] = useState<any>();

    const populateProducts = () => {
        console.log("here")
        fetch("http://127.0.0.1:8083/api/product")
        .then((response) => response.json())
        .then((data) => {
           console.log(data);
           setProducts(data.data)
        })
        .catch((err) => {
           console.log(err.message);
        });
    }    
    useEffect(() => {
        populateProducts();
    }, []);

    const handleAddProduct = () => {
        console.log(newProduct);
        fetch("http://127.0.0.1:8083/api/product/add",
         {method:'POST',
        headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(newProduct)})
        .then((response) => response.json())
        .then((data) => {
           console.log(data);
           populateProducts();
        })
        .catch((err) => {
           console.log(err.message);
        });
    };

    const handleDeleteProduct = (productId:string) => {
        fetch("http://127.0.0.1:8083/api/product/remove/"+productId,
         {method:'DELETE',
        headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(newProduct)})
        .then((response) => response.json())
        .then((data) => {
           console.log(data);
           populateProducts();
        })
        .catch((err) => {
           console.log(err.message);
        });
      };

    console.log(products);

    

    return (<>
    <div className="add-product">
        <input
          type="text"
          placeholder="Name"
          value={newProduct?.productId}
          onChange={(e) => setNewProduct({ ...newProduct, productId: e.target.value })}
        />
        <input
          type="string"
          placeholder="http://www.example.com"
          value={newProduct?.url}
          onChange={(e) => setNewProduct({ ...newProduct, url: e.target.value })}
        />
        <button onClick={handleAddProduct}>Add Product</button>
      </div>
    <div className='product-list'>
        <h1>Product List</h1>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products && products.map((product:any) => (
              <tr key={product.productId}>
                <td>{product.productId}</td>
                <td>{product.url}</td>
                <td>
                <button onClick={() => handleDeleteProduct(product.productId)}>
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div></>);
}