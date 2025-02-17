import React from "react";

const ChatList = () => {
  const users = ["Alice", "Bob", "Charlie", "Dave"];

  return (
    <div className="w-1/3 bg-white shadow-lg">
      <div className="p-4 border-b">
        <h2 className="text-xl font-bold">Conversations</h2>
        <input
          type="text"
          placeholder="Search..."
          className="mt-2 w-full p-2 rounded-lg border"
        />
      </div>
      <div className="overflow-y-auto h-full">
        {users.map((user, index) => (
          <div key={index} className="p-4 hover:bg-gray-100">
            <h3 className="font-bold">{user}</h3>
            <p className="text-sm text-gray-500">Last message...</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatList;
