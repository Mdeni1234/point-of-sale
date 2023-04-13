import Guest from "@/Layouts/GuestLayout";
import axios from "axios";
import { createRef, useEffect, useRef, useState } from "react";

import Cart from "@/Components/Cart";
import Modal from "@/Components/Modal";
import Table from "@/Components/Table";
import FormModal from "@/Components/FormModal";

export default function Transaction({ auth, laravelVersion, phpVersion }) {
    const [products, setProducts] = useState(null);
    const [imageLink, setImageLink] = useState(null);
    const [cartItems, setCartItems] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [paymentAmount, setPaymentAmount] = useState(0);

    const initData = async () => {
        const itemProduct = await axios.get(`api/product`);
        setProducts(itemProduct.data.produk);
        setImageLink(itemProduct.data.imageUrl);
    };
    const addCart = (item) => {
        const itemId = cartItems.findIndex((res) => res.id === item.id);
        if (itemId >= 0) {
            const updateCartItems = [...cartItems];
            updateCartItems[itemId].qty = updateCartItems[itemId].qty + 1;
            setCartItems(updateCartItems);
        } else {
            setCartItems([...cartItems, { ...item, qty: 1 }]);
        }
    };

    useEffect(() => {
        initData();
    }, []);
    return (
        <>
            <Modal isShow={showModal} setModal={setShowModal}>
                <div class="container">
                    <div class="flex w-full flex-rows gap-3 p-10">
                        <div class="w-8/12">
                            <h1 class="mb-4 font-bold">Detail Pesanan</h1>
                            <Table
                                products={cartItems}
                                imageLink={imageLink}
                            ></Table>
                        </div>
                        <div class="flex justify-center flex-col w-4/12 ml-5">
                            <FormModal
                                paymentAmount={paymentAmount}
                                setCart={setCartItems}
                                setModal={setShowModal}
                            />
                        </div>
                    </div>
                </div>
            </Modal>
            <Guest>
                <div class="flex w-full">
                    <div class="w-8/12 h-[500px] overflow-y-auto overflow-x-hidden">
                        <div class="flex flex-wrap -mx-2">
                            {products !== null &&
                                products.map((item) => {
                                    return (
                                        <div
                                            onClick={() => addCart(item)}
                                            class="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 px-2 mb-4 cursor-pointer"
                                        >
                                            <div class="bg-white rounded-lg overflow-hidden shadow-md">
                                                <img
                                                    class="h-48 w-full object-cover"
                                                    src={`${imageLink}/${item.gambar}`}
                                                    alt="Product image"
                                                />
                                                <div class="flex flex-col items-center w-full p-4">
                                                    <h3 class="text-gray-800 font-medium mb-2">
                                                        {item.nama}
                                                    </h3>

                                                    <div>
                                                        <span class="text-blue-500 font-semibold">
                                                            RP.{item.harga}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                        </div>
                    </div>
                    <div class="w-4/12 flex justify-center">
                        <Cart
                            setCartItems={setCartItems}
                            imageLink={imageLink}
                            cartItems={cartItems}
                            setModal={setShowModal}
                            paymentAmount={paymentAmount}
                            setPaymentAmount={setPaymentAmount}
                        />
                    </div>
                </div>
            </Guest>
        </>
    );
}
