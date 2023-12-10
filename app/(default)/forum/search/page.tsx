


export default function Search() {
    return (
        <div className='w-full md:w-3/4 items-center justify-center mx-auto px-3'>
            <div className='w-full shadow-md bg-white rounded-lg border mb-3'>
                <form className=" w-full p-4 flex space-x-4" onSubmit={undefined}>
                    <input
                    type="text"
                    name="text"
                    autoComplete="off"
                    className="border rounded-md p-2 flex-1 border-gray-300"
                    placeholder="Cari Sesuatu...."
                    required
                    />
                    <button type="submit" className="bg-[#00726B] text-white px-4 py-2 rounded-md text-sm">Search</button>
                </form>
            </div>
        {/* Hasil Seacrch Disini */}
    </div>
    
    )
}
