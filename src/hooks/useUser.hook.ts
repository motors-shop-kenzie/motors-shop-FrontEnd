import { UserContext } from "@/contexts/Users/userContext";
import { useContext } from "react";

export const useUser = () => useContext(UserContext);
