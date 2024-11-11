"use client";

import { useState } from "react";

interface Filters {
  genre: string;
  size: string;
  lengthType: string;
  fabric: string;
  color: string;
}

interface FilterSectionProps {
  setFilters: React.Dispatch<
    React.SetStateAction<Filters>
  >;
}

const FilterSection: React.FC<FilterSectionProps> = ({ setFilters }) => {
  const [genre, setGenre] = useState("");
  const [size, setSize] = useState("");
  const [lengthType, setLengthType] = useState("");
  const [fabric, setFabric] = useState("");
  const [color, setColor] = useState("");

  const handleFilterChange = () => {
    setFilters({
      genre,
      size,
      lengthType,
      fabric,
      color,
    });
  };

  return (
    <div className="p-2 mb-6 bg-gray-100 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Filters</h3>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Genre</label>
        <select
          value={genre}
          onChange={(e) => { setGenre(e.target.value); handleFilterChange(); }}
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        >
          <option value="">Select a genre</option>
          <option value="male">Man</option>
          <option value="female">woman</option>
          <option value="children">Kid</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Size</label>
        <select 
          value={size}
          onChange={(e) => { setSize(e.target.value); handleFilterChange(); }}
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        >
          <option value="">Select a size</option>
          <option value="S">small</option>
          <option value="M">Average</option>
          <option value="L">Large</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Length type</label>
        <select 
          value={lengthType}
          onChange={(e) => { setLengthType(e.target.value); handleFilterChange(); }}
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        >
          <option value="">Select a length type</option>
          <option value="short">Short</option>
          <option value="long">Long</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Fabric</label>
        <select 
          value={fabric}
          onChange={(e) => { setFabric(e.target.value); handleFilterChange(); }}
          className="w-full p-2 border border-blue-300 rounded-lg focus:outline-none focus:border-blue-500"
        >
          <option value="">Select a fabric</option>
          <option value="cotton">Cotton</option>
          <option value="wool">Wool</option>
        </select>
      </div>

      <div>
        <label className="block mb-1 font-medium">Color</label>
        <select 
          value={color}
          onChange={(e) => { setColor(e.target.value); handleFilterChange(); }}
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        >
          <option value="">Select a color</option>
          <option value="red">Red</option>
          <option value="blue">Blue</option>
          <option value="white">White</option>
          <option value="gray">Grey</option>
          <option value="black">Black</option>
        </select>
      </div>
    </div>
  );
};

export default FilterSection;