import axios from "axios";
import { useNavigate ,useLocation  } from "react-router-dom";
import React,{useState,useEffect } from 'react';
import Pagination from "./Pagination";
import Cookies from 'universal-cookie';

// const data=[
//     { Ma_san_pham: 1, Ten_san_pham: "SP1", So_luong: 2, Gia_ca: 20 },
//     { Ma_san_pham: 2, Ten_san_pham: "SP2", So_luong: 3, Gia_ca: 30 },
//     { Ma_san_pham: 3, Ten_san_pham: "SP3", So_luong: 4, Gia_ca: 40 },
//     { Ma_san_pham: 4, Ten_san_pham: "SP4", So_luong: 1, Gia_ca: 10 },
//     { Ma_san_pham: 5, Ten_san_pham: "SP5", So_luong: 2, Gia_ca: 25 },
//     { Ma_san_pham: 6, Ten_san_pham: "SP6", So_luong: 3, Gia_ca: 15 },
//     { Ma_san_pham: 7, Ten_san_pham: "SP7", So_luong: 2, Gia_ca: 22 },
//     { Ma_san_pham: 8, Ten_san_pham: "SP8", So_luong: 4, Gia_ca: 35 },
//     { Ma_san_pham: 9, Ten_san_pham: "SP9", So_luong: 1, Gia_ca: 18 },
//     { Ma_san_pham: 10, Ten_san_pham: "SP10", So_luong: 3, Gia_ca: 30 },
// ]



const OrderPage = () => {
    const cookies = new Cookies();
    const ID = cookies.get("userId");
    const [data, setData] = useState([]);
    const navigate=useNavigate();
    const PageSize = 5;
    const [currentPage, setCurrentPage] = useState(1);
    const [currentTableData, setCurrentTableData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("")
    const [filterData, setFilterData] = useState([]);
    const [action, setAction] = useState(false);
    const params = new URLSearchParams(location.search);
    const orderId=parseInt(params.get('param1'), 10);


useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/donhang', { id: ID.toString() });  
            setData(response.data);
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu:', error);
        }
    };

fetchData();

if (action === true) {
    setAction(false);
} else {
    setCurrentPage(1);
}
}, [ID, action]);
useEffect(() => {
const keys = ["Ma_san_pham", "Ten_san_pham", "So_luong_san_pham", "Gia_ca"]
setFilterData(data.filter((item) =>
    item.Ma_don === orderId &&
    keys.some((key) => item[key] && item[key].toString().toLowerCase().includes(searchQuery.toLowerCase())) === true
));
}, [searchQuery, data]);
useEffect(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    setCurrentTableData(filterData.slice(firstPageIndex, lastPageIndex));
}, [currentPage, filterData]);

const handleEnter = (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
    }
};

const searchBar = () => {
    return (
        <section>
            <div className="flex justify-between m-10 "> 
                <div className="text-center flex w-full"></div>
                <div className="justify-self-center text-4xl font-bold text-center flex w-full justify-center lg:max-xl:text-3xl md:max-lg:text-2xl">Đơn hàng</div>
                <div className="flex w-full justify-center" >
                <form>   
                    <div class="relative">
                        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                            </svg>
                        </div>
                        <input type="search" id="default-search" class="italic block p-2 ps-10  text-smt text-black border border-black rounded-full lg:max-xl:text-xs md:max-lg:text-xs" placeholder="Tìm kiếm..." onKeyDown={handleEnter} value={searchQuery} onChange={(e)=> setSearchQuery(e.target.value)} />
                    </div> 
                </form>
                </div>
            </div>
        </section>
    )
};

const table = () => {
    return (
        <section>
            <table className="relative overflow-x-auto mx-auto text-2xl w-10/12 lg:max-xl:text-lg sm:max-lg:text-base mt-10">
                <tr className="bg-[#AADEF6]">
                    <th className="w-3/12 h-14">Tên sản phẩm</th>
                    <th className="w-2/12">Số lượng</th>
                    <th className="w-2/12">Đơn giá</th>
                    <th className="w-2/12">Tổng</th>
                </tr>
                {currentTableData.map((val, key) => {
                        return (
                            <tr className="text-center text-xl bg-[#E8F6FD] lg:max-xl:text-lg md:max-lg:text-sm" key={key} >
                                <td className="h-14 lg:max-xl:h-10 md:max-lg:h-10">{val.Ten_san_pham}</td>
                                <td className="">{val.So_luong_san_pham}</td>
                                <td className="">{val.Gia_ca}</td>
                                <td className="">{val.Gia_ca*val.So_luong_san_pham}</td>
                            </tr>
                        )
                })}
            </table>
            <section >
                <Pagination
                    className="pagination-bar"
                    currentPage={currentPage}
                    totalCount={filterData.length}
                    pageSize={PageSize}
                    onPageChange={page => setCurrentPage(page)}
                />


            </section>
        </section>
        )
    };
    return(
        <>
            <section className="App-header">
                <nav className="border-blue-200 text-lg bg-[#C4E4F3] w-full">
                    <div className="flex flex-wrap justify-between">
                        <div className="flex items-center space-x-0 rtl:space-x-reverse ml-3">
                        <img src="/hcmut-logo.png" className="h-20" alt="HCMUT logo" />
                        <span className="self-center text-[#014464] text-xl font-semibold whitespace-nowrap">
                            BKEco
                        </span>
                        </div>
                    </div>
                </nav>
            </section>
            <div>
            {searchBar()}
            {table()} 
            </div>
            <div className="flex justify-end mt-2 mr-32">
                <button
                    className="ml-2 relative px-5 py-2.5 bg-[#2991C2] w-20 hover:bg-[#247ea8] active:bg-[#1b5f7e] hover:shadow-md border-gray-500  rounded-lg text-base focus:outline-none mt-2 font-semibold text-white items-start"
                    onClick={() => navigate("/orderPageTotal")}
                    >
                    Back
                </button>
            </div>
        </>
    )
}
export default OrderPage