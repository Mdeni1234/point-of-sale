import { FoodContext } from "@/Pages/Food";
import axios from "axios";
import { useContext, useEffect, useState } from "react";

export default function ListProducts() {
    const [products, setProducts] = useState(null);
    const [imageLink, setImageLink] = useState(null);
    const [initData, setInitData] = useState(true);
    const { formDataProduct, setFormDataProduct, formProduct, setFormProduct } =
        useContext(FoodContext);

    const getDataProducts = async () => {
        const res = await axios.get(`api/product`);
        console.log(res.data);
        setImageLink(res.data.imageUrl);
        setProducts(res.data.produk);
        setInitData(!initData);
    };
    const editForm = (formData, image) => {
        console.log(formData);
        setFormDataProduct({ ...formData, image });
        setFormProduct(!formProduct);
    };
    const deleteForm = (formData) => {
        axios
            .delete(`api/product/${formData.id}`, { data: { formData } })
            .then((res) => {
                console.log(res);
                setInitData(!initData);
            });
    };
    useEffect(() => {
        initData && getDataProducts();
    }, [initData]);
    return (
        <>
            <div class="w-full">
                <div class="bg-white bg-clip-border shadow-3xl shadow-shadow-500 flex flex-col w-full !p-4 3xl:p-![18px] bg-white">
                    <div class="mb-10">
                        <button
                            onClick={() => setFormProduct(!formProduct)}
                            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                            + Tambah Menu
                        </button>
                    </div>
                    <table class="table-fixed w-full">
                        <thead class="font-semibold h-10 py-2 text-gray-900 bg-gray-200">
                            <tr>
                                <th>#</th>
                                <th>Nama</th>
                                <th>Gambar</th>
                                <th>Harga</th>
                                <th>Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products !== null &&
                                products.map((data, index) => {
                                    return (
                                        <tr key={data.id}>
                                            <td>{index + 1}</td>
                                            <td>{data.nama}</td>
                                            <td>
                                                <img
                                                    src={`${imageLink}/${data.gambar}`}
                                                    alt="My profile"
                                                    class="m-auto object-cover w-16 h-16"
                                                />
                                            </td>
                                            <td>{data.harga}</td>
                                            <td>
                                                <div class="inline-flex">
                                                    <button
                                                        onClick={() =>
                                                            editForm(
                                                                data,
                                                                imageLink
                                                            )
                                                        }
                                                        class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            deleteForm(data)
                                                        }
                                                        class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-r"
                                                    >
                                                        Hapus
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
