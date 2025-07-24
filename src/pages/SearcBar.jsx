import React, { useState } from 'react';
import { FiSearch, FiMoreHorizontal } from 'react-icons/fi';


export const SearchBar = ({ value, onChange }) => (
  <div className="relative w-full md:max-w-sm  mb-1">
    <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
    <input
      type="text"
      placeholder="Search"
      value={value}
      onChange={onChange}
      className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    />
    <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
      <FiMoreHorizontal className="text-gray-400 w-4 h-4" />
    </button>
  </div>
);