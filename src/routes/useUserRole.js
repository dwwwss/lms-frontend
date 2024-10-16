import { useSelector } from 'react-redux';

const useUserRole = () => {
  const roleId = useSelector((state) => state.user.roleId);
  return roleId === null ? "2" : roleId;
};

export default useUserRole;
