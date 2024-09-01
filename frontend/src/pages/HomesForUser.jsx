import React, { useState, useCallback } from 'react';
import UserDropdown from '../components/UserDropdown';
import HomeCard from '../components/HomeCard';
import EditUserModal from '../components/EditUserModal';
import { useSelector } from 'react-redux';
import { useFetchHomesByUserQuery } from '../features/homes/homesApi';

const HomesForUser = () => {
  const selectedUser = useSelector((state) => state.users.selectedUser);
  const [page, setPage] = useState(1);
  const limit = 50;
  const [editingHome, setEditingHome] = useState(null);
  const { data: response = {}, isLoading, refetch } = useFetchHomesByUserQuery(
    { userId: selectedUser, page, limit },
    { skip: !selectedUser }
  );

  // Extract homes array from the response
  const homes = response.homes || [];

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    if (page > 1) setPage((prevPage) => prevPage - 1);
  };

  const handleUpdate = useCallback(() => {
    refetch(); // Re-fetch homes after updating
  }, [refetch]);

  if (isLoading) return <p>Loading homes...</p>;

  return (
    <div className="p-4">
      <UserDropdown />
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.isArray(homes) && homes.length > 0 ? (
          homes.map((home) => (
            <HomeCard key={home.id} home={home} onEditClick={setEditingHome} />
          ))
        ) : (
          <p>No homes available</p>
        )}
      </div>
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={handlePreviousPage}
          disabled={page === 1}
          className="p-2 bg-gray-500 text-white rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>Page {page}</span>
        <button
          onClick={handleNextPage}
          className="p-2 bg-blue-500 text-white rounded"
        >
          Next
        </button>
      </div>
      {editingHome && (
        <EditUserModal
          home={editingHome}
          onClose={() => setEditingHome(null)}
          onUpdate={handleUpdate} // Pass the update handler
        />
      )}
    </div>
  );
};

export default HomesForUser;
