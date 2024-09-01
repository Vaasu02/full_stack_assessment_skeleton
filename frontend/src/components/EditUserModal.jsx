import React, { useState, useEffect } from 'react';
import { useFetchAllUsersQuery } from '../features/users/usersApi';
import { useFetchUsersByHomeQuery } from '../features/homes/homesApi';
import { useUpdateHomeUsersMutation } from '../features/homes/homesApi';

const EditUserModal = ({ home, onClose, onUpdate }) => {
  const { data: users = [], isLoading: usersLoading } = useFetchAllUsersQuery();
  const { data: homeUsers = [], isLoading: homeUsersLoading } = useFetchUsersByHomeQuery({ homeId: home.id });
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [updateHomeUsers] = useUpdateHomeUsersMutation();

  useEffect(() => {
    if (homeUsers && homeUsers.length > 0) {
      const associatedUserIds = homeUsers.map(user => user.id);
      setSelectedUsers(associatedUserIds);
    }
  }, [homeUsers]);

  const toggleUserSelection = (userId) => {
    setSelectedUsers((prev) =>
      prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]
    );
  };

  const handleSave = async () => {
    await updateHomeUsers({ homeId: home.id, userIds: selectedUsers });
    onUpdate(); // Trigger an update on the HomesForUser page
    onClose();
  };

  const isSaveDisabled = selectedUsers.length === 0;

  if (usersLoading || homeUsersLoading) return <p>Loading...</p>;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded">
        <h2>Edit Users for {home.street_address}</h2>
        <div className="mt-4">
          {users.map((user) => (
            <label
              key={user.id}
              className={`block ${selectedUsers.includes(user.id) ? 'font-bold' : ''}`}
            >
              <input
                type="checkbox"
                checked={selectedUsers.includes(user.id)}
                onChange={() => toggleUserSelection(user.id)}
              />
              {user.username}
            </label>
          ))}
        </div>
        <div className="mt-4">
          <button
            onClick={handleSave}
            disabled={isSaveDisabled}
            className="mr-2 p-2 bg-green-500 text-white rounded disabled:opacity-50"
          >
            Save
          </button>
          <button onClick={onClose} className="p-2 bg-red-500 text-white rounded">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditUserModal;
