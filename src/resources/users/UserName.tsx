import { Identifier, useGetOne } from "react-admin";

export const UserName = ({ id }: { id: Identifier }) => {
  const { data: user } = useGetOne("users", { id });
  if (!user) return null;
  return <>{user.fullName}</>;
};
