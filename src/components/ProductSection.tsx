import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useCart } from "./CartContext";
import Image from "next/image";
import { Product } from "@/types/product";

function getProductById(id: string) {
  const products = JSON.parse(localStorage.getItem('products') || '[]');
  return products.find((product: Product) => product.id === parseInt(id));
}
function getSimilarProducts(currentProduct: Product) {
  const products = JSON.parse(localStorage.getItem('products') || '[]');
  return products.filter(
    (product: Product) => product.category === currentProduct.category && product.id !== currentProduct.id
  ).slice(0, 4);
}

function getRecommendedProducts(currentProduct: Product) {
  const products = JSON.parse(localStorage.getItem('products') || '[]');

  if (!currentProduct || !currentProduct.tags) {
    return [];
  }

  return products.filter(
    (product: Product) => 
      product.tags && product.tags.some(tag => currentProduct.tags.includes(tag)) && product.id !== currentProduct.id
  ).slice(0, 4);
}

const ProductDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState<Product | null>(null);
  const [similarProducts, setSimilarProducts] = useState<Product[]>([]);
  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([]);
  const [showContactForm, setShowContactForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const { addToCart } = useCart();
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Fetch product by ID when the component mounts
  useEffect(() => {
    if (id) {
      const fetchedProduct = getProductById(id as string);
      setProduct(fetchedProduct);

      if (fetchedProduct) {
        setSimilarProducts(getSimilarProducts(fetchedProduct));
        setRecommendedProducts(getRecommendedProducts(fetchedProduct));
      }
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

  const handleAddToCart = (product: Product) => {
    addToCart(product)
  }

  return(
    <>
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <div className="mx-auto mt-6 p-4 border rounded-lg bg-white">
        {product ? (
          <div>
            <div className="flex flex-col md:flex-row items-start">
              <div className="w-full md:w-1/3 p-8 rounded-lg shadow">
                <Image 
                  src={product.image} 
                  alt={product.productName} 
                  className="w-full h-auto object-cover rounded-md" 
                />
                <button 
                  onClick={() => handleAddToCart(product)}
                  className="bg-blue-600 text-white w-1/3 py-2 mt-4 rounded-md hover:bg-blue-700 mx-28">
                  Add to cart
                </button>
              </div>

              <div className="w-full md:w-2/3 p-8">
                <h1 className="text-xl font-semibold mb-2">{product.productName}</h1>
                <p className="text-gray-600 mb-1">{product.description}</p>
                <p className="text-gray-600 mb-1">Price: GNF{product.price}</p>
                <p className="text-gray-600 mb-1">Color: </p>
                <p className="text-gray-600 mb-1">Size: </p>
                <p className="text-gray-600 mb-4">Seller: {product.sellerName}</p>
                <p className="text-gray-500">Contact Details: {product.contactDetails}</p>

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
            </div>

            {/* Section produits similaires */}
            <div className="mt-8">
              <h2 className="text-xl font-bold mb-4">Similar Products</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {similarProducts.map((product) => (
                  <div key={product.id} className="border p-6 rounded-lg flex items-start">
                    <div>
                      <Image 
                        src={product.image} 
                        alt={product.productName}
                        className="h-32 w-full object-cover mb-2"
                      />
                    </div>
                    <div className="">
                      <p>{product.productName}</p>
                      <p>Price: GNF{product.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Section produits recommandés */}
            <div className="mt-8">
              <h2 className="text-xl font-bold mb-4">You might be interested in</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {recommendedProducts.map((product) => (
                  <div key={product.id} className="border p-2 rounded-lg text-center">
                    <Image 
                      src={product.image}
                      alt={product.productName}
                      className="h-32 w-full object-cover mb-2"
                    />
                    <p>{product.productName}</p>
                    <p>Price: GNF{product.price}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <p className="text-center">Product not found</p>
        )}
      </div>
      <Footer />
    </>
  );
}

export default ProductDetails;