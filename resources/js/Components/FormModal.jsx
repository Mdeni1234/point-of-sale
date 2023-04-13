import { useForm } from "@inertiajs/react";
import TextInput from "./TextInput";
import InputError from "./InputError";
import { useEffect, useState } from "react";

export default function FormModal(props) {
    const { setModal, setCart, paymentAmount } = props;
    const [changePayment, setChangePayment] = useState(null);
    const { data, setData, processing, errors, reset } = useForm({
        payment: "",
    });

    const closeModal = () => {
        setModal(false);
        setChangePayment(null);
    };
    const payment = () => {
        setModal(false);
        setChangePayment(null);
        setCart([]);
    };
    useEffect(() => {
        if (data.payment > paymentAmount) {
            let pay = data.payment - paymentAmount;
            setChangePayment(pay);
        } else {
            setChangePayment([]);
        }
    }, [data]);
    return (
        <>
            <div className="flex justify-center my-3 font-bold">
                <h1>Uang Kembalian (Rp)</h1>
            </div>
            <div>
                <div>
                    <TextInput
                        id="payment"
                        type="number"
                        name="payment"
                        value={data.payment}
                        className="mt-1 block h-10 w-full border-gray-300"
                        autoComplete="payment"
                        isFocused={true}
                        onChange={(e) => setData("payment", e.target.value)}
                    />

                    <InputError message={errors.nama} className="mt-2" />
                </div>
                <div class="flex flex-row w-full gap-2 mt-4 justify-between">
                    <div onClick={() => closeModal()} class="w-1/2">
                        <a
                            href="#"
                            class="flex items-center justify-center rounded-md border h-[30px] border-gray-500 bg-transparet px-6 py-3 text-base font-medium text-gray shadow-sm hover:bg-gray-700 hover:text-white"
                        >
                            Clear
                        </a>
                    </div>

                    <div class="w-1/2">
                        <button
                            onClick={() => payment()}
                            disabled={data.payment < paymentAmount}
                            class={`flex items-center disabled:opacity-25 justify-center  rounded-md h-[30px] w-full border border-transparent bg-blue-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700`}
                        >
                            Pay
                        </button>
                    </div>
                </div>
            </div>
            <div class="mt-4">
                <h3 class="text-red-500">
                    {" "}
                    Kembalian :
                    <span className="text-black"> Rp.{changePayment}</span>
                </h3>
            </div>
        </>
    );
}
