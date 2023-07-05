import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function AddBook() {
    const [book, setBook] = useState({
        title: "",
        author: "",
        genre: "",
        date: "",
        page: 0,
        sold: 0,
        anh: "",
        mota: ""

    });
    const { id } = useParams();
    const navigation = useNavigate()

    const handleChange = (e) => {

        setBook({
            ...book,
            [e.target.id]: e.target.value,
        });
    }

    const handleSumbitForm = (e) => {


        e.preventDefault();
        const shouldSubmit = window.confirm("Bạn có chắc chắn muốn gửi form không?");
        if (shouldSubmit) {
            fetch("http://localhost:8080/books/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(book)
            })
                .then(response => response.text())
                .then(data => {
                    alert(data)
                    navigation("/books")
                })
                .catch(err => alert(err))

        }
    }



    const handleImageChange = (e) => {
        const file = e.target.files[0];

        setBook({
            ...book,
            [e.target.id]: file.name
        });




    };
    return (
        <div>
            <a className="btn btn-primary" href="/home">Back</a>
            <h1>Add Book</h1>
            <form id="formUpdate" onSubmit={handleSumbitForm} method="POST">

                <div className="row">
                    <div className="col">

                        <div className="d-flex">

                            <div className="mb-3">
                                <label for="title" className="col-sm-2 col-form-label">
                                    Title
                                </label>
                                <div className="col-sm-10">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="title"
                                        value={book.title}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="mb-3">
                                <label for="author" className="col-sm-2 col-form-label">
                                    Author
                                </label>
                                <div className="col-sm-10">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="author"
                                        value={book.author}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                        </div>



                        <div className="mb-3">
                            <label for="mota" className=" col-form-label">
                                Mô tả về sách
                            </label>
                            <div className="col-sm-10">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="mota"
                                    value={book.mota}
                                    onChange={handleChange}
                                />
                            </div>

                        </div>



                        <div className="d-flex">

                            <div className="mb-3">
                                <label for="date" className="col-sm-2 col-form-label">
                                    Date
                                </label>
                                <div className="col-sm-10">
                                    <input
                                        type="date"
                                        className="form-control"
                                        id="date"
                                        value={book.date}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="mb-3">
                                <label for="page" className="col-sm-2 col-form-label">
                                    Page
                                </label>
                                <div className="col-sm-10">
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="page"
                                        value={book.page}
                                        onChange={handleChange}
                                    />
                                </div>

                            </div>
                        </div>
                        <div className="mb-3">
                            <label for="genre" className="col-sm-2 col-form-label">
                                Genre
                            </label>
                            <div className="col-sm-10">
                                <select
                                    type="text"
                                    className="form-control"
                                    id="genre"
                                    value={book.genre}
                                    onChange={handleChange}

                                >
                                    <option value="" hidden>-- Chọn thể loại --</option>
                                    <option value="Tieu Thuyet">Tieu Thuyet</option>
                                    <option value="Co Tich">Co Tich</option>
                                    <option value="Hai Huoc">Hai Huoc</option>
                                    <option value="Rung ron">Rung Ron</option>
                                </select>
                            </div>
                        </div >

                    </div>
                    <div className="col">
                        <div className="mb-3">
                            <label for="anh" className="col-sm-2 col-form-label">
                                Anh
                            </label>
                            <div className="col-sm-10">
                                <input
                                    type="file"
                                    className="form-control"
                                    id="anh"
                                    onChange={handleImageChange}
                                />

                            </div>

                            <img src={`../hinhanh/${book.anh}`} style={{ width: '200px', height: 'auto' }} />
                        </div>
                    </div>
                </div>


                <button type="submit" className="btn btn-primary">ADD</button>
                <a href="/home" className="btn btn-primary">Exit</a>
            </form>
        </div>
    );
}

export default AddBook;