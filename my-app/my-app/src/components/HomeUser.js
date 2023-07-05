import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useParams, useNavigate } from "react-router-dom";
import { upload } from '@testing-library/user-event/dist/upload';




const HomeUser = () => {
    const { id } = useParams();
    const [books, setBooks] = useState([]);
    const [booksOnFilter, setBooksOnFilter] = useState([]);
    const [giohangItems, setGiohangItems] = useState([]);
    const [showGiohang, setShowGiohang] = useState(false);
    const [isGiohangChanged, setIsGiohangChanged] = useState(false);
    const [setCurrentUser] = useState();
    const [item, setItem] = useState({
        id: Number(id),
        sold: 1,
    });
    const navigate = useNavigate();
    const [BooksWithSearch, setBooksWithSearch] = useState(books);









    useEffect(() => {
        fetchBooks();
        const giohang = getGiohang();
        setGiohangItems(giohang);
    }, []);


    const handleRemoveFromGiohang = (bookId) => {
        const confirmed = window.confirm('Bạn có chắc chắn muốn xóa sách này khỏi giỏ hàng?');
        if (confirmed) {
            const updatedGiohangItems = giohangItems.filter((item) => item.id !== bookId);
            setGiohangItems(updatedGiohangItems);
            try {
                const response = axios.put('http://localhost:8080/api/save/cart', {
                    email: localStorage.getItem('email'),
                    giohang: JSON.stringify(updatedGiohangItems)
                });
                console.log(response.data); // Log the response from the backend
                // You can perform any additional logic here, such as displaying a success message.

                window.localStorage.setItem('giohang', JSON.stringify(updatedGiohangItems))
                alert("Xóa khỏi giỏ hàng thành công!")
                navigate("/homeuser");

            } catch (error) {
                console.error(error);
                // Handle the error, such as displaying an error message.
            }
        }
    };

    const handleChange = (e) => {
        if (e.target.value) {
            e.preventDefault();

            setBooksOnFilter(
                booksOnFilter.filter((book) => book.title.includes(e.target.value))
            );
        } else {
            setBooksOnFilter(books);
        }
    };





    const handleThanhToan = async () => {


        try {
            const giohangItems = JSON.parse(localStorage.getItem('giohang')); // Lấy dữ liệu từ Local Storage
            // const book = await axios.get(`http://localhost:8080/book/${book.id}`);
            // const updatedSold = book.data.sold + item.sold;
            // console.log(updatedSold)
            // Cập nhật trạng thái 'sold' cho từng cuốn sách trong giohangItems
            for (const item of giohangItems) {
                const bookId = item.id;
                const book = await axios.get(`http://localhost:8080/book/${bookId}`); // Lấy thông tin cuốn sách từ backend
                // const updatedSold = book.data.sold + item.sold; // Tính toán giá trị mới cho sold
                const updatedSold = parseInt(book.data.sold) + parseInt(item.sold);

                await axios.put(`http://localhost:8080/book/sold/${bookId}`, {
                    sold: updatedSold,
                });
            }

            // Tiếp tục xử lý thanh toán và các logic khác...

            // Reset giỏ hàng và lưu vào Local Storage
            const updatedGiohangItems = [];
            setGiohangItems(updatedGiohangItems);
            window.localStorage.setItem('giohang', JSON.stringify(updatedGiohangItems));
            
            alert("Bạn đã thanh toán thành công!");
            window.location.reload();
            
        } catch (error) {
            console.error(error);
            // Handle the error, such as displaying an error message.
            alert("Thanh toán thất bại!");
        }

    };


    useEffect(() => {
        if (isGiohangChanged) {
            // Lưu trữ giỏ hàng mới vào Local Storage
            localStorage.setItem('giohang', JSON.stringify(giohangItems));

            // Đánh dấu là giỏ hàng không còn thay đổi
            setIsGiohangChanged(false);
        }
    }, [isGiohangChanged, giohangItems]);

    useEffect(() => {

    }, [isGiohangChanged]);
    const fetchBooks = async () => {
        try {
            const response = await axios.get('http://localhost:8080/books');
            setBooks(response.data);
            setBooksOnFilter(response.data);
        } catch (error) {
            console.error(error);
        }
    };
    const handleLogout = () => {

        const confirmed = window.confirm('Bạn có chắc chắn muốn đăng xuất?');
        if (confirmed) {
            // Xóa các giá trị trong localStorage
            localStorage.removeItem('email');
            localStorage.removeItem('matkhau');
            localStorage.removeItem('name');
            localStorage.removeItem('doituong');
            localStorage.removeItem('giohang');
            localStorage.removeItem('isLogin');


            // Chuyển hướng về trang đăng nhập
            window.location.href = '/dangnhap';
        }

    };







    const handleAddToGiohang = async (bookId) => {
        let isSameId = false
        const flag = giohangItems.map(item => {
            if (item.id === bookId) {
                isSameId = true
            }
            return item
        });
        console.log(isSameId)
        if (isSameId) {
            const giohangItemsChanged = giohangItems.map(item => {
                if (item.id === bookId) {
                    item.sold += 1
                }
                return item
            })
            console.log(giohangItemsChanged)
            setGiohangItems(giohangItemsChanged);
            try {
                const response = await axios.put('http://localhost:8080/api/save/cart', {
                    email: localStorage.getItem('email'),
                    giohang: JSON.stringify(giohangItemsChanged)
                });
                console.log(response.data); // Log the response from the backend
                // You can perform any additional logic here, such as displaying a success message.

                setGiohangItems(giohangItemsChanged);
                window.localStorage.setItem('giohangItems', JSON.stringify(giohangItemsChanged))
                alert("Thêm vào giỏ hàng thành công!")
                navigate("/homeuser");

            } catch (error) {
                console.error(error);
                // Handle the error, such as displaying an error message.
            }
        } else {

            const getItemToCart = {
                id: bookId,
                sold: 1,
            }


            try {
                const response = await axios.put('http://localhost:8080/api/save/cart', {
                    email: localStorage.getItem('email'),
                    giohang: JSON.stringify([...giohangItems, getItemToCart])
                });
                console.log(response.data); // Log the response from the backend
                // You can perform any additional logic here, such as displaying a success message.
                const updatedGiohangItems = [...giohangItems, getItemToCart];
                setGiohangItems(updatedGiohangItems);
                addToGiohang(getItemToCart);
                alert("Thêm vào giỏ hàng thành công!")
                navigate("/homeuser");

            } catch (error) {
                console.error(error);
                // Handle the error, such as displaying an error message.
            }
        }

    };

    const handleToggleGiohang = () => {
        setShowGiohang(!showGiohang);
    };



    // Hàm để lưu trữ thông tin giỏ hàng vào Local Storage
    function addToGiohang(item) {
        // Kiểm tra xem giỏ hàng đã tồn tại trong Local Storage chưa
        let giohang = localStorage.getItem('giohang');
        if (!giohang) {
            // Nếu chưa tồn tại, tạo giỏ hàng mới
            giohang = [];
        } else {
            // Nếu đã tồn tại, chuyển đổi chuỗi JSON thành đối tượng JavaScript
            giohang = JSON.parse(giohang);
        }

        // Thêm mục vào giỏ hàng
        giohang.push(item);

        // Lưu trữ lại giỏ hàng vào Local Storage
        localStorage.setItem('giohang', JSON.stringify(giohang));
    }

    // Hàm để lấy thông tin giỏ hàng từ Local Storage
    function getGiohang() {
        // Kiểm tra xem giỏ hàng có tồn tại trong Local Storage không
        let giohang = localStorage.getItem('giohang');
        if (!giohang) {
            // Nếu không tồn tại, trả về một mảng rỗng
            return [];
        }

        // Chuyển đổi chuỗi JSON thành đối tượng JavaScript và trả về
        return JSON.parse(giohang);
    }

    const handleSearch = (e) => {
        if (e.target.value === "") {
            setBooksWithSearch(books);
        } else {
            setBooksWithSearch(
                books.filter(
                    (book) =>
                        book.title.toLowerCase().includes(e.target.value.toLowerCase()) ||
                        book.author.toLowerCase().includes(e.target.value.toLowerCase())
                )
            );
        }
    };

    const handleChangeSoldItemCart = (e) => {
        console.log(e.target.dataset.id)
        const itemId = Number(e.target.dataset.id);
        console.log(giohangItems)
        const itemCart = giohangItems.find(item => item.id === itemId);
        itemCart.sold = e.target.value
        const giohangItemsChanged = giohangItems.map(item => {
            if (item.id === itemId) {
                return itemCart
            }
            return item
        })

        setGiohangItems(giohangItemsChanged)
        try {
            const response = axios.put('http://localhost:8080/api/save/cart', {
                email: localStorage.getItem('email'),
                giohang: JSON.stringify(giohangItemsChanged)
            });
            console.log(response.data); // Log the response from the backend
            // You can perform any additional logic here, such as displaying a success message.
            setGiohangItems(giohangItemsChanged);
            localStorage.setItem('giohang', JSON.stringify(giohangItemsChanged));
            navigate("/homeuser");

        } catch (error) {
            console.error(error);
            // Handle the error, such as displaying an error message.
        }
    }


    return (
        <div >



            <header>
                <div>
                    <nav class="navbar navbar-dark bg-dark absolute-top navbar-expand-lg">
                        <div class="container-fluid">
                            <a class="navbar-brand" href="/home">Home</a>

                            <form className="d-flex" role="search">
                                <input
                                    onChange={handleChange}
                                    className="form-control me-2"
                                    type="text"
                                    placeholder="Search"
                                    aria-label="Search"

                                />
                                <button className="btn btn-outline-success" type="submit">
                                    Search
                                </button>
                            </form>

                            <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar" aria-label="Toggle navigation">
                                <span class="navbar-toggler-icon"></span>
                            </button>
                            <div class="offcanvas offcanvas-end text-bg-dark" tabindex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
                                <div class="offcanvas-header">
                                    <h5 class="offcanvas-title" id="offcanvasDarkNavbarLabel">Dark offcanvas</h5>
                                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                                </div>
                                <div class="offcanvas-body">
                                    <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">

                                        <li class="nav-item">
                                            <i class="bi bi-cart" onClick={handleToggleGiohang} >Giở hàng</i>
                                            {showGiohang && (
                                                <div className="cart-overlay transparentBcg">
                                                    <div className="cart">
                                                        <span className="close-cart" onClick={handleToggleGiohang}>
                                                            <i className="bi bi-x"></i>
                                                        </span>
                                                        <h2>Giỏ Hàng</h2>
                                                        <div className="cart-content">
                                                            {giohangItems.length > 0 ? giohangItems.map((item) => {
                                                                const b = books.find(book => book.id === item.id) || { anh: '', title: '', author: '', }
                                                                if (b.anh === '') {
                                                                    return (<></>)
                                                                }
                                                                return (
                                                                    //books.find(book => book.id === item.id)
                                                                    <div key={item.id} className="cart-item">
                                                                        <img src={`../hinhanh/${b.anh}`} style={{ width: '100px', height: 'auto' }} alt={item.title} />
                                                                        <div>
                                                                            <h4>{b.title}</h4>
                                                                            <h5>{b.author}</h5>
                                                                            <input
                                                                                type="number"
                                                                                data-id={item.id}
                                                                                className="form-control"
                                                                                id="sold"
                                                                                name="sold"
                                                                                value={item.sold}
                                                                                min={1}
                                                                                max={999}
                                                                                step={1}
                                                                                onChange={handleChangeSoldItemCart}
                                                                            />

                                                                        </div>

                                                                        <button className="btn btn-danger" onClick={() => handleRemoveFromGiohang(item.id)}>
                                                                            Xóa
                                                                        </button>



                                                                    </div>


                                                                )
                                                            }) : (<></>)}
                                                            <div>
                                                                <button className="btn btn-primary" onClick={handleThanhToan}>
                                                                    {/* <button className="btn btn-primary" onClick={() => handleAddToGiohang(book.id)}></button> */}
                                                                    Thanh Toán
                                                                </button>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            )}

                                            <div className="cart-btn" onClick={handleToggleGiohang}>
                                                <i className="bi bi-cart"></i>
                                            </div>
                                        </li>
                                        <li>

                                            <i class="bi bi-person-fill">TCN</i>

                                        </li>
                                        <li>

                                            <button className="nav-item" onClick={handleLogout}>
                                                <a className="nav-link" href="/dangnhap">Đăng xuất</a>
                                            </button>
                                        </li>

                                    </ul>








                                </div>
                            </div>
                        </div>
                    </nav>
                </div>

            </header>




            <div>
                <h2 className="text-center">Books List</h2>

                <div className="row">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Anh</th>
                                <th>Title</th>
                                <th>Author</th>
                                <th>Sold</th>

                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {booksOnFilter.map((book) => (
                                <tr key={book.id}>
                                    <td>
                                        <img src={`../hinhanh/${book.anh}`} style={{ width: '100px', height: 'auto' }} />
                                    </td>

                                    <td>{book.title}</td>
                                    <td>{book.author}</td>
                                    <td>{book.sold}</td>



                                    <td>

                                        <a href={`/bookss/${book.id}`} className="btn btn-primary">View</a>

                                        <button className="btn btn-primary" onClick={() => handleAddToGiohang(book.id)}>
                                            Mua
                                        </button>




                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

           
                
        </div>
    );
};

export default HomeUser;


