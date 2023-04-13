import Checkbox from "@/Components/Checkbox";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { FoodContext } from "@/Pages/Food";

export default function FormProduct() {
    const { formProduct, setFormProduct, formDataProduct, setFormDataProduct } =
        useContext(FoodContext);
    const { data, setData, processing, errors, reset } = useForm({
        id: formDataProduct ? formDataProduct.id : "",
        nama: formDataProduct ? formDataProduct.nama : "",
        harga: formDataProduct ? formDataProduct.harga : "",
        gambar: formDataProduct ? `${formDataProduct.gambar}` : "",
    });

    const submit = (e) => {
        e.preventDefault();
        const head = data.gambar.name
            ? {
                  headers: {
                      "Content-Type": "multipart/form-data",
                  },
              }
            : "";
        console.log(head);
        if (data.id) {
            const formData = new FormData();
            formData.append("gambar", data.gambar);
            formData.append("nama", data.nama);
            formData.append("harga", data.harga);
            formData.append("_method", "PATCH");
            axios
                .post(`api/product/${data.id}`, formData, { ...head })
                .then((res) => {
                    setFormProduct(!formProduct);
                    setFormDataProduct(null);
                });
        } else {
            axios
                .post(`api/product`, data, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((res) => {
                    console.log(res);
                    setFormProduct(!formProduct);
                });
        }
    };

    return (
        <>
            <form encType="multipart/form-data" method="post" onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="nama" value="Nama" />

                    <TextInput
                        id="nama"
                        type="string"
                        name="nama"
                        value={data.nama}
                        className="mt-1 block h-10 w-full border-gray-300"
                        autoComplete="nama"
                        isFocused={true}
                        onChange={(e) => setData("nama", e.target.value)}
                    />

                    <InputError message={errors.nama} className="mt-2" />
                </div>
                <div className="mt-4">
                    <div class="flex items-center justify-center w-full">
                        <label
                            htmlFor="dropzone-file"
                            class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                        >
                            <div class="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg
                                    aria-hidden="true"
                                    class="w-10 h-10 mb-3 text-gray-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                    ></path>
                                </svg>
                                <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                    <span class="font-semibold">
                                        Click to upload
                                    </span>{" "}
                                    or drag and drop
                                </p>
                                <p class="text-xs text-gray-500 dark:text-gray-400">
                                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                                </p>
                            </div>
                            <input
                                id="dropzone-file"
                                type="file"
                                class="hidden"
                                onChange={(e) =>
                                    setData("gambar", e.target.files[0])
                                }
                            />
                        </label>
                    </div>
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="harga" value="harga" />
                    <div class="flex flex-column items-center">
                        <div class="flex items-center justify-center w-10 mt-1 h-11 bg-blue-500 text-white">
                            RP
                        </div>
                        <TextInput
                            id="harga"
                            type="number"
                            name="harga"
                            value={data.harga}
                            className="mt-1 block w-full"
                            autoComplete="current-harga"
                            onChange={(e) => setData("harga", e.target.value)}
                        />
                    </div>
                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="flex justify-end mt-4">
                    <PrimaryButton className="ml-4" disabled={processing}>
                        {formDataProduct !== null ? "Update" : "Tambah Produk"}
                    </PrimaryButton>
                </div>
            </form>
        </>
    );
}
