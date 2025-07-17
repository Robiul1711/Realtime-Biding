import { CartContext } from "@/context";
import { useContext } from "react";

export const useCart = () => {
    return useContext(CartContext);
}