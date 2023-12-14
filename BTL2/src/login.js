import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LogIn = () => {
    const navigate = useNavigate();
    const handleLogin = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
        // check if empty
      };
    const handleSubmit = (e) => {}
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
            <section className="flex place-content-evenly justify-center h-screen">
        <form
          className="w-screen flex flex-col items-center"
          // onSubmit={handleSubmit}
        >
          <h1 className="font-bold text-3xl mt-6 text-center">Đăng nhập</h1>
          <div className="mt-12 w-1/4">
            <p className="text-base text-gray-500 font-semibold">
              Tên đăng nhập
            </p>
            <div className="relative">
              <input
                // type="email"
                // name="username"
                className="border border-gray-500 bg-white h-12 w-full px-4 pr-4 rounded-3xl text-sm focus:outline-none mt-2"
                // value={data.username}
                // onChange={handleLogin}
                // autoComplete="on"
              />
            </div>
          </div>
          <div className="mt-8 w-1/4">
            <p className="text-base text-gray-500 font-semibold">Mật khẩu</p>
            <div className="relative">
              <input
                // type="password"
                // name="password"
                className="border border-gray-500 bg-white h-12 w-full px-4 pr-4 rounded-3xl text-sm focus:outline-none mt-2"
                // value={data.password}
                // onChange={handleLogin}
                // autoComplete="on"
              />
            </div>
          </div>
          <div className="mt-8 w-1/4">
            <button
              className="relative bg-[#2991C2] border hover:bg-[#247ea8] active:bg-[#1b5f7e] hover:shadow-md border-gray-500 h-12 w-full px-4 pr-4 rounded-3xl text-base focus:outline-none mt-2 font-bold text-white"
              // type="submit"
              onClick={() => navigate("/shopPage")}
              // onSubmit={handleSubmit}
            >
              Đăng nhập
            </button>
          </div>

          <div className="mt-6 w-1/4 flex justify-center">
            <button
              className="font-bold"
              onClick={() => navigate("/register")}
            >
              Đăng ký
            </button>
            <span className="mx-4">|</span>
            <button
              className="font-bold"
              onClick={() => navigate("/forgotPassword")}
            >
              Quên mật khẩu?
            </button>
          </div>
        </form>
      </section>
        </>
    )
}
export default LogIn