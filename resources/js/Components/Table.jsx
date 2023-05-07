export default function Table(props) {
    const { products, imageLink } = props;
    return (
        <>
            <table class="table-fixed w-full">
                <thead class="font-semibold h-10 py-2 text-gray-900 bg-gray-200">
                    <tr>
                        <th>#</th>
                        <th>Nama</th>
                        <th>Gambar</th>
                        <th>Harga</th>
                    </tr>
                </thead>
                <tbody>
                    {products !== null &&
                        products.map((data, index) => {
                            return (
                                <tr key={data.id}>
                                    <td className="px-5">{index + 1}</td>
                                    <td>
                                        {data.nama} x{data.qty}
                                    </td>
                                    <td>
                                        <img
                                            src={`${imageLink}/${data.gambar}`}
                                            alt="My profile"
                                            class="m-auto object-cover w-16 h-16"
                                        />
                                    </td>
                                    <td className="px-5">
                                        Rp.{data.qty * data.harga}
                                    </td>
                                </tr>
                            );
                        })}
                </tbody>
            </table>
        </>
    );
}
