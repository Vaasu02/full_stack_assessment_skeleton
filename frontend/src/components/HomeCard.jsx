import React from 'react';

const HomeCard = ({ home, onEditClick }) => {
  return (
    <div className="border p-4 rounded">
      <h3 className="text-lg font-bold">{home.street_address}</h3>
      <p>List Price: {home.list_price}</p>
      <p>State: {home.state}</p>
      <p>zip: {home.zip}</p>
      <p>sqft: {home.sqft}</p>
      <p>Beds: {home.beds}</p>
      <p>Baths: {home.baths}</p>
      <button
        onClick={() => onEditClick(home)}
        className="mt-2 p-2 bg-blue-500 text-white rounded"
      >
        Edit User
      </button>
    </div>
  );
};

export default HomeCard;
