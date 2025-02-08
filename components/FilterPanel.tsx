"use client";

import { useState } from "react";

interface FilterPanelProps {
  collections: { id: string; name: string }[];
  setFilteredCollections: (collections: { id: string; name: string }[]) => void;
}

export default function FilterPanel({ collections, setFilteredCollections }: FilterPanelProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = collections.filter((collection) =>
      collection.name.toLowerCase().includes(term)
    );
    setFilteredCollections(filtered);
  };

  return (
    <div className="mb-4 w-full max-w-md">
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Koleksiyonları filtrele..."
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>
  );
}
