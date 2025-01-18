import React from "react";

const UserListPage: React.FC = () => {
  const users = [
    { id: 1, name: "Alice Johnson", email: "alice@example.com", role: "Admin" },
    { id: 2, name: "Bob Smith", email: "bob@example.com", role: "Editor" },
    { id: 3, name: "Charlie Brown", email: "charlie@example.com", role: "Viewer" },
  ];

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">All Users</h1>
      <div className="rounded-xl border border-muted bg-muted/50 p-4">
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-left">
              <th className="border-b p-2 text-sm font-medium text-muted-foreground">ID</th>
              <th className="border-b p-2 text-sm font-medium text-muted-foreground">Name</th>
              <th className="border-b p-2 text-sm font-medium text-muted-foreground">Email</th>
              <th className="border-b p-2 text-sm font-medium text-muted-foreground">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-muted/70">
                <td className="border-b p-2 text-sm">{user.id}</td>
                <td className="border-b p-2 text-sm">{user.name}</td>
                <td className="border-b p-2 text-sm">{user.email}</td>
                <td className="border-b p-2 text-sm">{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserListPage;
