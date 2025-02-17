import React, { useState } from "react";

const CreateGroup = () => {
  const [groupName, setGroupName] = useState("");
  const [friends, setFriends] = useState([
    { name: "Alice Johnson", id: 1, selected: false },
    { name: "Bob Williams", id: 2, selected: false },
    { name: "Catherine Lee", id: 3, selected: false },
  ]);

  const toggleFriendSelection = (id) => {
    setFriends((prev) =>
      prev.map((friend) =>
        friend.id === id
          ? { ...friend, selected: !friend.selected }
          : friend
      )
    );
  };

  const createGroup = () => {
    const selectedFriends = friends.filter((friend) => friend.selected);
    if (groupName && selectedFriends.length > 0) {
      alert(`Group "${groupName}" created with ${selectedFriends.length} members!`);
      setGroupName("");
      setFriends((prev) =>
        prev.map((friend) => ({ ...friend, selected: false }))
      );
    } else {
      alert("Please provide a group name and select members.");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Create Group</h2>
      <input
        type="text"
        placeholder="Group Name"
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
        className="w-full p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500"
      />
      <h3 className="text-lg font-semibold mb-2">Select Friends</h3>
      <ul className="space-y-4">
        {friends.map((friend) => (
          <li
            key={friend.id}
            className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md"
          >
            <div>{friend.name}</div>
            <input
              type="checkbox"
              checked={friend.selected}
              onChange={() => toggleFriendSelection(friend.id)}
              className="w-5 h-5"
            />
          </li>
        ))}
      </ul>
      <button
        onClick={createGroup}
        className="mt-4 px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
      >
        Create Group
      </button>
    </div>
  );
};

export default CreateGroup;
