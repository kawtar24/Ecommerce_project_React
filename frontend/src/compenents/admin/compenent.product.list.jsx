import { useEffect, useState } from "react";

import { deleteProductByID, getProduct } from "../../sevices/product.services";
import { Link } from "react-router-dom";


export function ProductsList() {
  
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");

  // après l'affichage du composant
  useEffect(() => {
    fetchProducts();
  }, [query]);

  async function fetchProducts() {
    try {
      const res = await getProduct(query); // Note the function call here
      setProducts(res.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  async function deleteProduct(id) {
    try {
      const res = await deleteProductByID(id);
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  }


  return (<>
   <h1>Liste des produits</h1>
   <form>
        <input type="search" onChange={e=>setQuery(e.target.value)} placeholder="Entrez un mot clé"/>
      </form>
<Link to={"/admin/products/new"} class=" btn btn-ajouter" > <i class="fas fa-plus"></i> Nouveau produit</Link>
    <div class="table-wrapper">
      <table class="fl-table">
        <tr>
          <th class="text-center">Name</th>
          <th class="text-center">Price</th>
          <th class="text-center">Categorie</th>
          <th>Image</th>
          <th class="text-center">Action</th>

        </tr>
        <tbody id="tbody">
          {products.map((elem, index) => (
            <tr key={index}>
              <td class="text-center">{elem.name}</td>
              <td class="text-center">{elem.price}</td>
              <td class="text-center">{elem.category.name}</td>
              <td><img height={100} width={100} src={`http://localhost:5000${elem.image}`}/></td>

              <td class="text-center">
                
                <button class="btn btn-supprimer" onClick={() => deleteProduct(elem._id)}>
                  <i class="fas fa-trash icon-rouge"></i> Supprimer
                </button>

              
                <Link to={`/admin/products/edit/${elem._id}`} class="btn btn-modifier" >
                  <i class="fas fa-pencil-alt icon-bleue"></i> Modifier
               </Link>
              </td>
            </tr>
          ))}
        </tbody>

        

      </table>
      
    </div>

  </>);

}