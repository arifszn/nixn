import { FC } from 'react';
import UsersTable from '@/components/tables/users.table';

const UserListPage: FC = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">All Users</h1>
      <UsersTable />
    </div>
  );
};

export default UserListPage;
