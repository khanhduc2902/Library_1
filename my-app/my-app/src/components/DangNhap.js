import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';

function DangNhap({ getIsLogin, handleSetLogin }) {
    const [email, setEmail] = useState('');
    const [matkhau, setMaukhau] = useState('');

    const navigation = useNavigate()

    const handleemailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlematkhauChange = (e) => {
        setMaukhau(e.target.value);
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8080/api/dangnhap ', {
                email,
                matkhau
            });

            // Xử lý thành công đăng nhập

            console.log(response.data);

            window.localStorage.setItem('email', response.data.email);
            window.localStorage.setItem('matkhau', response.data.matkhau);
            window.localStorage.setItem('name', response.data.name);
            window.localStorage.setItem('doituong', response.data.doituong);
            window.localStorage.setItem('isLogin', true);
            window.localStorage.setItem('giohang', response.data.giohang);
            


            alert("Đăng nhập thành công")
            if (window.localStorage.getItem("isLogin") === 'true' && window.localStorage.getItem("doituong") === 'admin') {
                navigation("/home")
            }
            else if (window.localStorage.getItem("isLogin") === 'true' && window.localStorage.getItem("doituong") === 'user') {
                navigation("/homeuser")
            }
            // navigation("/home", { replace: true });
        } catch (error) {
            // Xử lý lỗi đăng nhập
            console.error(error);
            window.localStorage.setItem('email', '');
            window.localStorage.setItem('matkhau', '');
            window.localStorage.setItem('name', '');
            window.localStorage.setItem('doituong', '');
            window.localStorage.setItem('giohang', '');
            window.localStorage.setItem('isLogin', false);
            

            alert("Sai mật khẩu hoặc tài khoản")
        }
    };
    useEffect(() => {
        if (window.localStorage.getItem("isLogin") === 'true' && window.localStorage.getItem("doituong") === 'admin') {
            navigation("/home")
        }
        else if (window.localStorage.getItem("isLogin") === 'true' && window.localStorage.getItem("doituong") === 'user') {
            navigation("/homeuser")
        }
        else {
            window.localStorage.setItem('name', '')
            window.localStorage.setItem('email', '')
            window.localStorage.setItem('matkhau', '')
            window.localStorage.setItem('doituong', '');
            window.localStorage.setItem('giohang', '');
            window.localStorage.setItem('isLogin', false)
        }
    }, [])
    return (
        <div className="dangnhap" class="dangnhap">

            <h2 >Đăng nhập</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor="email"></label>
                    <input type="email" id="email" placeholder="name@gmail.com" value="test@gmail.com" value={email} onChange={handleemailChange} />
                </div>
                <div>
                    <label htmlFor="matkhau" ></label>
                    <input type="password" id="matkhau" placeholder="*****" value={matkhau} onChange={handlematkhauChange} />
                </div>
                <button type="submit">Đăng nhập</button>
                <a href="/users/add">Đăng ký</a>
            </form>


        </div>


    );


}
export default DangNhap;