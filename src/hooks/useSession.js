import { useContext } from "react";
import userContext from "../context/userContext";

const useSession = () => {
  const { user } = useContext(userContext);
  return user;
};

export default useSession;
