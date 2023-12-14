import React,{ useState, useEffect } from 'react';
import { useNavigate ,Link} from "react-router-dom";
import axios from "axios";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Cookies from 'universal-cookie';
import "./App.css"


const ShopPage = () => {

    const [data, setData] = useState([]);
    const cookies = new Cookies();
    const allCookies = cookies.getAll();
    const ID = cookies.get("userId");
    const name=cookies.get("name");
    
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get('http://localhost:5000/api/sanpham',{id:ID});
          const temp = [...new Set(response.data)];
          setData(temp);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, []);

    const handleLogout = (e) => {
      Object.keys(allCookies).forEach(cookieName => {
        cookies.remove(cookieName);
      });
    };

const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      slidesToSlide: 4 // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2 // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    }
  };

const navigate = useNavigate();
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
            <div className="flex items-center space-x-0 rtl:space-x-reverse mr-10">
            <button 
                className="font-semibold text-[#014464] text-xl"
                onClick={() => navigate("/report")}>
                  Doanh thu
                </button>
                <p className="px-2">|</p>
                <button 
                className="font-semibold text-[#014464] text-xl"
                onClick={() => navigate("/orderPageTotal")}>
                  Đơn hàng
                </button>
                <p className="px-2">|</p>
                <button 
                className="font-semibold text-[#014464] text-xl"
                handleLogout
                onClick={() => navigate("/login")}>
                  Đăng xuất
                </button>
            </div>
          </div>
        </nav>
      </section>
      <div className=" flex justify-end">
        <p className="mt-8 w-64 ml-12 text-left w-full font-bold text-2xl ">
          {name}'s shop
        </p>
        <div className="mt-8 w-64 mr-16">
                <button
                className="relative px-4 bg-[#2991C2]  hover:bg-[#247ea8] active:bg-[#1b5f7e] hover:shadow-md border-gray-500 h-12 p  rounded-xl text-base focus:outline-none mt-2 font-bold text-white"
                onClick={() => navigate("/addProduct")}
                >
                Thêm sản phẩm
                </button>
            </div>
        </div>
    <section className="flex place-content-evenly justify-center">    
    <Carousel
        swipeable={false}
        draggable={false}
        showDots={true}
        responsive={responsive}
        ssr={true} // means to render carousel on server-side.
        infinite={true}
        autoPlaySpeed={1000}
        keyBoardControl={true}
        customTransition="all .1"
        transitionDuration={500}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        deviceType="desktop"
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
        className=""
    >
        {data.map((item) => (
            <div key={item.Ma_san_pham}>
                <div className="relative my-10 ml-10  flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
                    <a className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl" href="#">
                        <img className="object-cover" src="item.jpg" alt="product image" />
                        <button  className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white"  
                        onClick={() => navigate(`/updateProduct/${item.Ma_san_pham}?param1=${item.Ma_san_pham}&param2=${item.Ten_san_pham}&param3=${item.Gia_ca}&param4=${item.Mo_ta_san_pham}&param5=${item.Tinh_trang}`)}>Edit</button>
                    </a>
                    <div className="mt-4 px-5 pb-5">
                        <a href="#">
                        <h5 className="text-xl tracking-tight text-slate-900">{item.Ten_san_pham}</h5  >
                        </a>
                        <div className="mt-2 mb-5 flex items-center justify-between">
                        <p>
                            <span className="text-2xl font-bold text-slate-900">${item.Gia_ca}</span>
                        </p>
                        <div className="flex items-center">
                        {Array.from({ length: Math.floor(item.So_sao) }, (_, index) => (
                                <svg
                                  key={index}
                                  aria-hidden="true"
                                  className="h-5 w-5 text-yellow-300"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                </svg>
                              ))}
                          {Array.from({ length:5- Math.floor(item.So_sao) }, (_, index) => (
                                <svg
                                  key={index}
                                  aria-hidden="true"
                                  className="h-5 w-5  text-black-600"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                </svg>
                              ))}      
                        <span className="mr-2 ml-3 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">{item.So_sao}</span>
                        </div>
                        
                        </div>
                        <a href="#" className="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        Add to cart</a
                        >
                    </div>
                </div>
            </div>
        ))}

  </Carousel>

    </section>
  </>
  );
}
export default ShopPage