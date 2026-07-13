export default function BelajarJSX(){
    
    const nama = "React Developer";
    const hobi = ["ngoding","Tidur"];

    return(
        <div className="p-4 bg-gray-100 rounded-lg">
            <h1 className="text-2xl font-bold text-blue-600">Halo, {nama}!</h1>
            <p className="mt-2 text-gray-700">Hobi Pertama: {hobi[0]}</p>
            <p className="mt-2 text-gray-700">Hobi Kedua: {hobi[1]}</p>
        </div>
    )
}