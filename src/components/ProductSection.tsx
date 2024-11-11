import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

type Product = {
  id: number;
  productName: string;
  description: string;
  price: number;
  sellerName: string;
  contactDetails: string;
  image: string;
}

function getProductById(id: string) {
  const products = JSON.parse(localStorage.getItem('products') || '[]');
  return products.find((product: Product) => product.id === parseInt(id));
}

const ProductDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState<Product | null>(null);
  const [showContactForm, setShowContactForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  // Fetch product by ID when the component mounts
  useEffect(() => {
    if (id) {
      const fetchedProduct = getProductById(id as string);
      setProduct(fetchedProduct);
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormData({ name: '', email: '', message: '' });
  };

  return(
    <div className="max-w-4xl mx-auto mt-6 p-4 border rounded-lg shadow-lg">
      {product ? (
        <div>
          <img src={product.image} alt={product.productName} 
               className="w-2/3 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">{product.productName}</h1>
          <p className="text-lg mb-2">{product.description}</p>
          <p className="text-lg mb-2">Price: GNF{product.price}</p>
          <p className="text-lg mb-2">Seller: {product.sellerName}</p>
          <p className="text-lg mb-2">Contact Details: {product.contactDetails}</p>

          {!showContactForm && (
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={() => setShowContactForm(true)}>
              Contact Seller
            </button>
          )}

          {showContactForm && (
            <div className="mt-4">
              <h2 className="text-xl font-bold mb-2">Contact Seller</h2>
              <form onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">Name:</label>
                  <input type="text"
                         className="w-full p-2 border rounded-md"
                         id="name"
                         value={formData.name}
                         onChange={handleChange} />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium mb-1">Email:</label>
                  <input type="email"
                         className="w-full p-2 border rounded-md"
                         id="email"
                         name="email"
                         value={formData.email}
                         onChange={handleChange}/>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1">Message:</label>
                  <textarea className="w-full p-2 border rounded-md"
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}>
                    
                  </textarea>
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                  Send Message
                </button>
              </form>
            </div>
          )}
        </div>
      ) : (
        <p className="text-center">Product not found</p>
      )}
    </div>
  );
}

export default ProductDetails;