import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AddBook from "./AddBook";
import Home from "./Home";






function BookDetail() {
    const [book, setBook] = useState([]);
    const { id } = useParams();
    const [isEditing, setIsEditing] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {
        fetch(`http://localhost:8080/book/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setBook(data);

            })
            .catch((err) => console.log(err));
    }, [id]);
    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleChange = (e) => {
        setBook({ ...book, [e.target.name]: e.target.value });
    };
    const handleImageChange = (e) => {
        const file = e.target.files[0];

        setBook({
            ...book,
            [e.target.id]: file.name
        });




    };
    const handleSave = () => {
        const shouldSave = window.confirm("Bạn có chắc chắn muốn lưu không?");

        if (shouldSave) {
            // Thực hiện lưu dữ liệu cập nhật vào cơ sở dữ liệu
            fetch(`http://localhost:8080/book/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },

                body: JSON.stringify(book),
            })
                .then((response) => {
                    if (response.ok) {
                        alert("Lưu thành công");
                        navigate("/home");
                        return response.json();

                    }
                })
                .then((data) => {
                    console.log(data);
                    setBook(data);
                    setIsEditing(false);



                })

                .catch((error) => {
                    console.log(error);
                });

        }
    };
    return (
        <div>

<header>
        <div>
          <nav class="navbar navbar-dark bg-dark fixed-top navbar-expand-lg">
            <div class="container-fluid">
              <a class="navbar-brand" href="/home">Home</a>
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
                      <a class="nav-link active" aria-current="page" href="/books">Bookslist</a>
                    </li>
                  

                  </ul>

                  
               


                </div>
              </div>
            </div>
          </nav>
        </div>

      </header>

            
            <h1 className="hhh">Book Details</h1>
            <form id="formUpdate" action="" method="PUT">

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
                                        name="title"
                                        value={book.title}
                                        readOnly={!isEditing}
                                        onChange={handleChange}
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
                                        name="author"
                                        value={book.author}
                                        readOnly={!isEditing}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>



                        <div className="mb-3">
                            <label for="mota" className=" col-form-label">
                                Mô tả về sách
                            </label>
                            <div className="col-sm-10">
                                <textarea
                                    type="text"
                                    className="form-control"
                                    id="mota"
                                    name="mota"
                                    value={book.mota}
                                    readOnly={!isEditing}
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
                                        name="date"
                                        value={book.date}
                                        readOnly={!isEditing}
                                        onChange={handleChange}
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
                                         min={1}
                                         max={100}
                                         step={1}
                                        className="form-control"
                                        id="page"
                                        name="page"
                                        value={book.page}
                                        readOnly={!isEditing}
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
                                    name="genre"
                                    id="genre"
                                    className="disabled:cursor-not-allowed bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
                                    placeholder="genre"

                                    value={book.genre}
                                    onChange={handleChange}
                                >

                                    <option value="" hidden>-- Chọn thể loại --</option>
                                    <option value="Tieu Thuyet">Tieu Thuyet</option>
                                    <option value="Co Tich">Co Tich</option>
                                    <option value="Hai Huoc">Hai Huoc</option>
                                    <option value="Rung ron">Rung Ron</option>

                                    readOnly={!isEditing}
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
                                    disabled={!isEditing}
                                    onChange={handleImageChange}
                                />
                                <div>
                                    <img src={`../hinhanh/${book.anh}`} style={{ width: '200px', height: 'auto' }} />

                                </div>
                            </div>


                        </div>
                    </div>
                </div>


            </form>
            {isEditing ? (
                <button onClick={handleSave} className="btn btn-primary">Save</button>
            ) : (
                <button onClick={handleEdit} className="btn btn-primary">Edit</button>
            )}
           
        </div>
    );
}

export default BookDetail;
