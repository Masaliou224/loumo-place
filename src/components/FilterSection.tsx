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
          <option value="">Sélectionnez un genre</option>
          <option value="male">Home</option>
          <option value="female">Femme</option>
          <option value="children">Enfant</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Taille</label>
        <select 
          value={size}
          onChange={(e) => { setSize(e.target.value); handleFilterChange(); }}
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        >
          <option value="">Sélectionnez une taille</option>
          <option value="S">Petit</option>
          <option value="M">Moyen</option>
          <option value="L">Grand</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Type de longueur</label>
        <select 
          value={lengthType}
          onChange={(e) => { setLengthType(e.target.value); handleFilterChange(); }}
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        >
          <option value="">Sélectionnez un type de longueur</option>
          <option value="short">Court</option>
          <option value="long">Long</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Tissu</label>
        <select 
          value={fabric}
          onChange={(e) => { setFabric(e.target.value); handleFilterChange(); }}
          className="w-full p-2 border border-blue-300 rounded-lg focus:outline-none focus:border-blue-500"
        >
          <option value="">Sélectionnez un tissu</option>
          <option value="cotton">Coton</option>
          <option value="wool">Laine</option>
        </select>
      </div>

      <div>
        <label className="block mb-1 font-medium">Couleur</label>
        <select 
          value={color}
          onChange={(e) => { setColor(e.target.value); handleFilterChange(); }}
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        >
          <option value="">Sélectionnez une couleur</option>
          <option value="red">Rouge</option>
          <option value="blue">Bleu</option>
          <option value="white">Blanc</option>
          <option value="gray">Gris</option>
          <option value="black">Noir</option>
        </select>
      </div>
    </div>
  );
};

export default FilterSection;