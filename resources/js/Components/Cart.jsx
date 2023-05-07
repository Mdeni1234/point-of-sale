import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Cart(props) {
    const {
        setCartItems,
        imageLink,
        cartItems,
        setModal,
        paymentAmount,
        setPaymentAmount,
    } = props;
    const now = new Date();
    const currentTime = now.toLocaleTimeString();
    const clearCart = () => {
        setCartItems([]);
    };
    const priceCalculation = () => {
        let price = 0;
        cartItems.map((item) => {
            price = price + item.qty * item.harga;
        });
        setPaymentAmount(price);
    };
    const generatePdf = () => {
        console.log("asd");
        const doc = new jsPDF();
        doc.text("Invoice", 14, 20);
        doc.text(`Order Number: 12xx`, 14, 30);
        doc.text(`Date: ${currentTime}`, 150, 30, { align: "right" });
        doc.text("Customer Information", 14, 40);
        doc.text(`Name: Alans'customer`, 14, 50);
        doc.text(`Email: Alans'customer@mail.com`, 14, 60);
        doc.text(`Phone: 089xxx xxxx xxx}`, 14, 70);
        doc.autoTable({
            startY: 80,
            head: [["No", "Nama", "QTY", "Harga", "Total"]],
            body: cartItems.map((item, index) => [
                index + 1,
                item.nama,
                item.qty,
                "Rp. " + item.harga.toLocaleString("id-ID"),
                (item.qty * item.harga).toLocaleString("id-ID"),
            ]),
            foot: [["", "", "Total:", paymentAmount]],
        });
        doc.save("invoice.pdf");
    };
    const saveBills = () => {
        toast.success("Bill Berhasil Disave!", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        setCartItems([]);
    };
    useEffect(() => {
        priceCalculation();
    }, [cartItems]);
    return (
        <>
            <div class="pointer-events-auto w-96 h-[600px]">
                <div class="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div class="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                        <div class="flex items-start justify-center">
                            <h2
                                class="text-lg font-medium text-gray-900"
                                id="slide-over-title"
                            >
                                Shopping cart
                            </h2>
                        </div>

                        <div class="mt-8  h-[400px]">
                            <div class="flow-root">
                                <ul
                                    role="list"
                                    class="-my-6 divide-y divide-gray-200"
                                >
                                    {cartItems.length ? (
                                        cartItems.map((cart) => {
                                            return (
                                                <li class="flex py-6">
                                                    <div class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                        <img
                                                            src={`${imageLink}/${cart.gambar}`}
                                                            alt="Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch."
                                                            class="h-full w-full object-cover object-center"
                                                        />
                                                    </div>

                                                    <div class="ml-4 flex flex-1 flex-col">
                                                        <div>
                                                            <div class="flex justify-end text-gray-900">
                                                                <h3>
                                                                    <a href="#">
                                                                        {
                                                                            cart.nama
                                                                        }
                                                                    </a>
                                                                </h3>
                                                                <p class="ml-4">
                                                                    x{cart.qty}
                                                                </p>
                                                                <p class="ml-4">
                                                                    Rp.
                                                                    {cart.harga.toLocaleString(
                                                                        "id-ID"
                                                                    )}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            );
                                        })
                                    ) : (
                                        <li className="flex justify-center mt-40 text-bold text-red-400">
                                            Item Kosong
                                        </li>
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div class="border-t border-gray-200 px-4 py-6 sm:px-6">
                        <div onClick={() => clearCart()} class="mb-2">
                            <a
                                href="#"
                                class="flex items-center justify-center h-[35px] rounded-md border border border-red-500 px-6 py-3 text-base font-medium text-red-500 shadow-sm hover:bg-red-700 hover:text-white"
                            >
                                Clear Cart
                            </a>
                        </div>
                        <div
                            onClick={() => saveBills()}
                            class="flex flex-row w-full gap-2 justify-between"
                        >
                            <div class="w-1/2">
                                <a
                                    href="#"
                                    class="flex items-center justify-center rounded-md border h-[35px] border-transparent bg-green-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-green-700"
                                >
                                    Save Bill
                                </a>
                            </div>

                            <div onClick={() => generatePdf()} class="w-1/2">
                                <a
                                    href="#"
                                    class="flex items-center justify-center rounded-md h-[35px] border border-transparent bg-green-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                                >
                                    Print Bill
                                </a>
                            </div>
                        </div>
                        <div onClick={() => setModal(true)} class="mt-2">
                            <a
                                href="#"
                                class="flex items-center justify-center h-[40px] rounded-md border border-transparent bg-blue-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                            >
                                Charge
                                {paymentAmount ? " Rp. " + paymentAmount : ""}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
