import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AddBook from "./AddBook";
import Books from "./Books";

function BookDetailUser() {
    const [book, setBook] = useState({
        nhanxet: [], danhgia: []

    }

    );
    const { id } = useParams();
    const [nhanxet, setNhanxet] = useState('');
    const [nhanxetItems, setNhanxetItems] = useState([]);
    const [showNhanxet, setShowNhanxet] = useState(false);
    const [isNhanxetChanged, setIsNhanxetChanged] = useState(false);
    const [setCurrentUser] = useState();
    const navigate = useNavigate();

    const [danhgia, setDanhgia] = useState('');
    const [danhgiaItems, setDanhgiaItems] = useState([]);
    const [showNDanhgia, setShowDanhgia] = useState(false);
    const [isDanhgiaChanged, setIsDanhgiaChanged] = useState(false);
    // const [hasReviewed, setHasReviewed] = useState(false);



    const isReviewExist = (email) => {
        return book.danhgia.some((review) => review.startsWith(email));
    };




    useEffect(() => {
        fetch(`http://localhost:8080/book/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setBook({ ...data, nhanxet: JSON.parse(data.nhanxet), danhgia: JSON.parse(data.danhgia) });
            })
            .catch((err) => console.log(err));
    }, [id]);

    const handleAddNhanxet = (e) => {

        if (nhanxet !== '') {
            const changedNhanxet = book.nhanxet.push(window.localStorage.getItem('email') + ": " + nhanxet)
            setBook({ ...book, nhanxet: changedNhanxet })
            handleUpdateBook()
            alert("Bạn đã thêm nhận xét thành công!");
        } else {
            alert("Bạn chưa thêm nhận xét");
        }

    };

    const handleAddDanhgia = (e) => {

        if (danhgia !== '') {
            const email = window.localStorage.getItem('email');
            const isExist = isReviewExist(email);
            if (!isExist) {
                const changedDanhgia = book.danhgia.push(window.localStorage.getItem('email') + ": " + danhgia);
                setBook({ ...book, danhgia: changedDanhgia });
                handleUpdateBook();
                alert("Bạn đã thêm đánh giá thành công!");
            } else {
                alert("Bạn đã đánh giá trước đó, không thể thêm đánh giá");
            }

        } else {
            alert("Bạn chưa thêm đánh giá");
        }

    };


    const handleChangeNhanxet = (e) => {
        setNhanxet(e.target.value)
    };

    const handleChangeDanhgia = (e) => {
        setDanhgia(e.target.value)
    };





    const handleUpdateBook = () => {

        fetch(`http://localhost:8080/book/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...book, nhanxet: JSON.stringify(book.nhanxet), danhgia: JSON.stringify(book.danhgia) }),
        })
            .then((response) => {
                if (response.ok) {

                    return response.json();
                } else {
                    throw new Error("Error adding comment");
                }
            })
            .then((data) => {
                // Update the book state with the new comment

                setNhanxet("");
                setIsNhanxetChanged(true);
                setShowNhanxet(false);

                setDanhgia("");
                setIsDanhgiaChanged(true);
                setShowDanhgia(false);
            })
            .catch((error) => {
                console.log(error);
            });


    }

    return (
        <div >
            <header>
                <div>
                    <nav class="navbar navbar-dark bg-dark fixed-top navbar-expand-lg">
                        <div class="container-fluid">
                            <a class="navbar-brand" href="/homeuser">Home</a>

                            
                            

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

                                       
                                        <li>
{/* 
                                            <i class="bi bi-person-fill">TCN</i> */}

                                        </li>
                                        

                                    </ul>








                                </div>
                            </div>
                        </div>
                    </nav>
                </div>

            </header>
            
            
            <h1 class="hhh">Thông tin</h1>
            <form id="formUpdate" action="" method="PUT">

                <div className="row" >
                    <div className="col" >


                        <div className="d-flex" >

                            <div className="mb-4">
                                <label for="title" className="col-sm-2 col-form-label">
                                    Title
                                </label>
                                <div className="col-sm-10">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="title"
                                        value={book.title}

                                    />
                                </div>
                            </div>
                            <div className="mb-4">
                                <label for="author" className="col-sm-2 col-form-label">
                                    Author
                                </label>
                                <div className="col-sm-10">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="author"
                                        value={book.author}
                                    />
                                </div>
                            </div>
                        </div>



                        <div className="mb-4">
                            <label for="mota" className=" col-form-label">
                                Mô tả về sách
                            </label>
                            <div className="col-sm-10">
                                <textarea
                                    type="text"
                                    className="form-control"
                                    id="mota"
                                    value={book.mota}
                                />
                            </div>
                        </div>



                        <div className="d-flex">

                            <div className="mb-4">
                                <label for="date" className="col-sm-2 col-form-label">
                                    Date
                                </label>
                                <div className="col-sm-10">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="date"
                                        value={book.date}
                                    />
                                </div>
                            </div>
                            <div className="mb-4">
                                <label for="page" className="col-sm-2 col-form-label">
                                    Page
                                </label>
                                <div className="col-sm-10">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="page"
                                        value={book.page}
                                    />
                                </div>

                            </div>
                        </div>
                        <div className="mb-4">
                            <label for="genre" className="col-sm-2 col-form-label">
                                Genre
                            </label>
                            <div className="col-sm-10">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="genre"
                                    value={book.genre}
                                />
                            </div>
                        </div >

                        <div className="d-flex">


                            <div class="card" >
                                <div class="card-body">
                                    <h5 class="card-title" >Nhận xét</h5>

                                    <div class="spinner-border text-primary" role="status">
                                        <span class="visually-hidden">Loading...</span>

                                    </div>
                                    <div>
                                        {book.nhanxet.length > 0 && book.nhanxet.map((item, index) => (
                                            <tr key={index} className="btn btn-primary">
                                                <td>{item}</td>
                                            </tr>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div class="card" >
                                <div class="card-body">
                                    <h5 class="card-title">Đánh giá</h5>

                                    <div class="spinner-border text-primary" role="status">
                                        <span class="visually-hidden">Loading...</span>

                                    </div>
                                    <div >
                                        {book.danhgia.length > 0 && book.danhgia.map((item, index) => (
                                            <tr key={index} className="btn btn-primary">
                                                <td>{item}</td>
                                            </tr>
                                        ))}
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>

                    <div className="col">
                        <div className="mb-3">
                            <label for="anh" className="col-sm-2 col-form-label">
                                Bìa sách
                            </label>
                            <div className="col-sm-10">
                                <input
                                    type="string"
                                    className="form-control"
                                    id="anh"
                                    value={book.anh}
                                />
                                <div>

                                    <img src={`../hinhanh/${book.anh}`} style={{ width: '200px', height: 'auto' }} />
                                </div>
                            </div>


                        </div>
                        <div className="mb-3">
                            <label for="danhgia" className="col-sm-2 col-form-label">
                                Đánh giá
                            </label>
                            <div className="col-sm-10">
                                <select
                                    type="text"
                                    name="danhgia"
                                    id="danhgia"
                                    className="disabled:cursor-not-allowed bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
                                    placeholder="danhgia"
                                    value={danhgia}
                                    onChange={handleChangeDanhgia}


                                >

                                    <option value="" hidden>-- Chọn đánh giá --</option>
                                    <option value="1 sao">1 sao</option>
                                    <option value="2 sao">2 sao</option>
                                    <option value="3 sao">3 sao</option>
                                    <option value="4 sao">4 sao</option>
                                    <option value="5 sao">5 sao</option>


                                </select>
                                <button onClick={handleAddDanhgia} className="btn btn-primary">Thêm đánh giá</button>

                            </div>


                        </div>
                        <div className="mb-3">
                            <label htmlFor="nhanxet" className="col-sm-2 col-form-label">
                                Nhận xét
                            </label>
                            <div className="col-sm-10">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="nhanxet"
                                    name="nhanxet"
                                    value={nhanxet}
                                    onChange={handleChangeNhanxet}


                                />

                            </div>

                        </div>


                        <button onClick={handleAddNhanxet} className="btn btn-primary">Thêm nhận xét</button>




                    </div>



                </div>
            </form>




        </div>

    );

}

export default BookDetailUser;



