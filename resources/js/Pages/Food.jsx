import FormProduct from "@/Components/FormProduct";
import ListProducts from "@/Components/ListProducts";
import Guest from "@/Layouts/GuestLayout";
import { createContext, useState } from "react";
export const FoodContext = createContext();
export default function Food({ auth, laravelVersion, phpVersion }) {
    const [formProduct, setFormProduct] = useState(false);
    const [formDataProduct, setFormDataProduct] = useState(null);
    const contextValue = {
        formProduct,
        setFormProduct,
        formDataProduct,
        setFormDataProduct,
    };
    return (
        <>
            <FoodContext.Provider value={{ ...contextValue }}>
                <Guest>
                    {formProduct ? <FormProduct /> : <ListProducts />}
                </Guest>
            </FoodContext.Provider>
        </>
    );
}
