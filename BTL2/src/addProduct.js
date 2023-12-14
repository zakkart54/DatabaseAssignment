import React,{useState} from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddProduct = () => {
const navigate = useNavigate();
const [successMessage, setSuccessMessage] = useState('');
const [formData, setFormData] = useState({
  Ten_san_pham: '',
  Gia_ca: '',
  Mo_ta_san_pham: '',
  Tinh_trang: '',
});

const handleChange = (e) => {
  setFormData({
    ...formData,  
    [e.target.name]: e.target.value,
  });
};

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await axios.post('http://localhost:5000/api/themsanpham', formData);
    console.log(response.data);
    setSuccessMessage('Thêm sản phẩm thành công!');
    setTimeout(() => {
      navigate('/shopPage');
    }, 1000);
  } catch (error) {
    console.error('Lỗi khi gửi biểu mẫu:', error);
  }
};

  return (
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
      <div className="flex justify-center mt-8">
        <h1 className="font-bold text-2xl">
          Thêm sản phẩm
        </h1>
      </div>
        <form class="max-w-sm mx-auto mt-7" onSubmit={handleSubmit}>
            <div class="mb-5">
                <label  class="text-left block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tên sản phẩm</label>
                <input  
                  name="Ten_san_pham"
                  type="text"
                  class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"  
                  required 
                  onChange={handleChange}/>
            </div>
            <div class="mb-5">
                <label  class="text-left block mb-2 text-sm font-medium text-gray-900 dark:text-white">Giá cả</label>
                <input   
                  class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" 
                  required
                  name="Gia_ca"
                  type="number"
                  onChange={handleChange}/>
            </div>
            <div class="mb-5">
                <label  class="text-left block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mô tả</label>
                <input  
                  class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" 
                  required
                  name="Mo_ta_san_pham"
                  type="text"
                  onChange={handleChange}/>
            </div>
            <div class="mb-5">
                <label  class="text-left block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tình trạng</label>
                <input  
                  class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" 
                  required
                  name="Tinh_trang"
                  type="text"
                  onChange={handleChange}/>
            </div>

            <button type="submit" class="text-white bg-[#2991C2] w-20 hover:bg-[#247ea8] active:bg-[#1b5f7e] hover:shadow-md focus:ring-4 focus:outline-none focus:ring-blue-300  rounded-lg text-base  py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 font-semibold">Add</button>

            <button
                className="ml-2 relative px-5 py-2.5 bg-[#2991C2] w-20 hover:bg-[#247ea8] active:bg-[#1b5f7e] hover:shadow-md border-gray-500  rounded-lg text-base focus:outline-none mt-2 font-semibold text-white"
                onClick={() => navigate("/shopPage")}
                >
                Back
                </button>
        </form>

        {successMessage && (
                <div className="text-red-600 ">{successMessage}</div>
                )}


  </>
  );
}
export default AddProduct