import React, { useState } from "react";

const FindFriends = () => {
  const [search, setSearch] = useState("");
  const [friends, setFriends] = useState([
    { name: "Alice Johnson", id: 1 },
    { name: "Bob Williams", id: 2 },
    { name: "Catherine Lee", id: 3 },
  ]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Find Friends</h2>
      <input
        type="text"
        placeholder="Search friends..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500"
      />
      <ul className="space-y-4">
        {friends
          .filter((friend) =>
            friend.name.toLowerCase().includes(search.toLowerCase())
          )
          .map((friend) => (
            <li
              key={friend.id}
              className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md"
            >
              <div>{friend.name}</div>
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                Add Friend
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default FindFriends;
