import { useMemo } from "react";
import type { User } from "../../lib/mock-data";
import { List, type RowComponentProps } from "react-window";

type UserPropsType = {
  users: User[];
  filter: string;
  height: number;
  itemHeight: number;
};

type RowProps = {
  users: User[];
};

const Row = ({ index, style, users }: RowComponentProps<RowProps>) => {
  const user = users[index];

  return (
    <div style={style} className="px-3 py-2 border">
      {user.name} {user.role === "admin" && "Admin"}
    </div>
  );
};

const Users = ({ users, filter, height, itemHeight }: UserPropsType) => {
  const filteredUsers = useMemo(() => {
    console.log("Heavy filtering in users component");
    return users.filter((user) =>
      user.name.toLowerCase().includes(filter.toLowerCase()),
    );
  }, [users, filter]);

  return (
    <div className="border border-brand p-5">
      <List
        style={{
          height,
          width: "100%",
          padding: "10px",
        }}
        rowComponent={Row}
        rowCount={filteredUsers.length}
        rowHeight={itemHeight}
        rowProps={{ users: filteredUsers }}
        overscanCount={5}
      />
    </div>
  );
};

export default Users;
