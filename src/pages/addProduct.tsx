"use client";

import Navbar from "@/components/Navbar";
import { ChangeEvent, FormEvent, useState } from "react";

interface Product {
  id: number;
  productName: string;
  description: string;
  price: string;
  image: string;
  quantity: number;
  category: string;
  sellerName: string;
  contactDetails: string;
  condition: string;
  dimensions: string;
  brandModel: string;
  warranty: string;
  returnPolicy: string;
  negotiable: boolean;
  paymentOptions: string;
}

const ProductForm = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [products, setProducts] = useState<Product[]>(() => {
    if (typeof window !== "undefined") {
      return JSON.parse(localStorage.getItem("products") || "[]");
    }
    return [];
  });

  const [productName, setProductName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [id, setId] = useState<number>(
    products.length ? Math.max(...products.map((p) => p.id)) + 1 : 1
  );
  const [category, setCategory] = useState<string>("");
  const [sellerName, setSellerName] = useState<string>("");
  const [contactDetails, setContactDetails] = useState<string>("");
  const [condition, setCondition] = useState<string>("");
  const [dimensions, setDimensions] = useState<string>("");
  const [brandModel, setBrandModel] = useState<string>("");
  const [warranty, setWarranty] = useState<string>("");
  const [returnPolicy, setReturnPolicy] = useState<string>("");
  const [negotiable, setNegotiable] = useState<boolean>(false);
  const [paymentOptions, setPaymentOptions] = useState<string>("");

  const handleProductNameChange = (e: ChangeEvent<HTMLInputElement>) =>
    setProductName(e.target.value);
  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) =>
    setDescription(e.target.value);
  const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) =>
    setPrice(e.target.value);
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) =>
    setCategory(e.target.value);
  const handleSellerNameChange = (e: ChangeEvent<HTMLInputElement>) =>
    setSellerName(e.target.value);
  const handleContactDetailsChange = (e: ChangeEvent<HTMLInputElement>) =>
    setContactDetails(e.target.value);
  const handleConditionChange = (e: ChangeEvent<HTMLSelectElement>) =>
    setCondition(e.target.value);
  const handleDimensionsChange = (e: ChangeEvent<HTMLInputElement>) =>
    setDimensions(e.target.value);
  const handleBrandModelChange = (e: ChangeEvent<HTMLInputElement>) =>
    setBrandModel(e.target.value);
  const handleWarrantyChange = (e: ChangeEvent<HTMLInputElement>) =>
    setWarranty(e.target.value);
  const handleReturnPolicyChange = (e: ChangeEvent<HTMLTextAreaElement>) =>
    setReturnPolicy(e.target.value);
  const handleNegotiableChange = () =>
    setNegotiable((prev) => !prev);
  const handlePaymentOptionsChange = (e: ChangeEvent<HTMLInputElement>) =>
    setPaymentOptions(e.target.value);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!image) {
      alert("Please select an image.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Image = reader.result as string;

      const product: Product = {
        id,
        productName,
        description,
        price,
        image: base64Image,
        quantity: 1,
        category,
        sellerName,
        contactDetails,
        condition,
        dimensions,
        brandModel,
        warranty,
        returnPolicy,
        negotiable,
        paymentOptions,
      };

      const updatedProducts = [...products, product];
      localStorage.setItem("products", JSON.stringify(updatedProducts));
      setProducts(updatedProducts);

      setId(id + 1);

      // Reset form fields
      setProductName("");
      setDescription("");
      setPrice("");
      setImage(null);
      setCategory("");
      setSellerName("");
      setContactDetails("");
      setCondition("");
      setDimensions("");
      setBrandModel("");
      setWarranty("");
      setReturnPolicy("");
      setNegotiable(false);
      setPaymentOptions("");
    };

    
    reader.readAsDataURL(image);
  };
  console.log(productName);

  return (
    <>
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
      <div className="container max-auto p-4 w-3/4">
        <h2 className="text-2xl font-bold mb-6">Add Product</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-group">
            <label htmlFor="productName" className="block mb-2">Product Name:</label>
            <input 
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
              id="productName"
              value={productName}
              onChange={handleProductNameChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description" className="block mb-2">Description:</label>
            <textarea 
              className="w-full p-2 border border-gray-300 rounded"
              id="description"
              value={description}
              onChange={handleDescriptionChange}
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="price" className="block mb-2">Price:</label>
            <input 
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
              id="price"
              value={price}
              onChange={handlePriceChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="category" className="block mb-2">Category:</label>
            <select
              className="w-full p-2 border border-gray-300 rounded"
              id="category"
              value={category}
              onChange={handleCategoryChange}
            >
              <option value="">Select a category</option>
              <option value="clothes">Clothing</option>
              <option value="shoes">Shoes</option>
              <option value="electronique">Electronique</option>
              <option value="furniture">Furniture</option>
              <option value="Beauty">Beauty, Toys and More</option>
              <option value="Others">Divers</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="sellerName" className="block mb-2">Seller Name:</label>
            <input 
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
              id="sellerName"
              value={sellerName}
              onChange={handleSellerNameChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="contactDetails" className="block mb-2">Contact Details:</label>
            <input 
              type="text" 
              className="w-full p-2 border border-gray-300 rounded"
              id="contactDetails"
              value={contactDetails}
              onChange={handleContactDetailsChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="condition" className="block mb-2">Condition:</label>
            <select 
              className="w-full p-2 border border-gray-300 rounded"
              id="condition"
              value={condition}
              onChange={handleConditionChange}
            >
              <option value="">Select Condition</option>
              <option value="new">New</option>
              <option value="like-new">Like New</option>
              <option value="used">Used</option>
              <option value="refurbished">Refurbished</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="dimensions">Dimensions:</label>
            <input 
              type="text" 
              className="w-full p-2 border border-gray-300 rounded"
              id="dimensions"
              value={dimensions}
              onChange={handleDimensionsChange}
              />
          </div>
          <div className="form-group">
            <label htmlFor="brandModel" className="block mb-2">Brand/Model:</label>
            <input 
              type="text" 
              className="w-full p-2 border border-gray-300 rounded"
              id="brandModel"
              value={brandModel}
              onChange={handleBrandModelChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="warranty" className="block mb-2">Warranty:</label>
            <input 
              type="text" 
              className="w-full p-2 border border-gray-300 rounded"
              id="warranty"
              value={warranty}
              onChange={handleWarrantyChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="returnPolicy">Return Policy:</label>
            <textarea 
              className="w-full p-2 border border-gray-300 rounded"
              id="returnPolicy"
              value={returnPolicy}
              onChange={handleReturnPolicyChange}
            ></textarea>
          </div>
          <div className="form-group flex items-center">
            <input 
              type="checkbox"
              className="mr-2"
              id="negotiable" 
              checked={negotiable}
              onChange={handleNegotiableChange}
            />
            <label htmlFor="negotiable">Negotiable Price</label>
          </div>
          <div className="form-group">
            <label htmlFor="paymentOptions" className="block mb-2">Payment Options:</label>
            <input 
              type="text" 
              className="w-full p-2 border border-gray-300 rounded"
              id="paymentOptions"
              value={paymentOptions}
              onChange={handlePaymentOptionsChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="image" className="block mb-2">Image:</label>
            <input 
              type="file" 
              className="w-full p-2"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default ProductForm;
