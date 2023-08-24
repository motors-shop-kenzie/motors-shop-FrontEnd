import { AuthContext } from "@/contexts/Auth/authContext";
import { useContext } from "react";

export const useAuth = () => useContext(AuthContext);
