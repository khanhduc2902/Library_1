import React, { useEffect, useState } from 'react';
import axios from 'axios';




const Home = () => {
  const [books, setBooks] = useState([]);
  const [booksOnFilter, setBooksOnFilter] = useState([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:8080/books');
      setBooks(response.data);
      setBooksOnFilter(response.data);

    } catch (error) {
      console.error(error);
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

  const handleLogout = () => {
    // // Xóa các giá trị trong localStorage

    
    // localStorage.removeItem('email');
    // localStorage.removeItem('matkhau');
    // localStorage.removeItem('name');
    // localStorage.removeItem('doituong');
    // localStorage.removeItem('isLogin');

    // // Chuyển hướng về trang đăng nhập
    // window.location.href = '/dangnhap';
    const confirmed = window.confirm('Bạn có chắc chắn muốn đăng xuất?');
    if (confirmed) {
      // Xóa các giá trị trong localStorage
      localStorage.removeItem('email');
      localStorage.removeItem('matkhau');
      localStorage.removeItem('name');
      localStorage.removeItem('doituong');
      localStorage.removeItem('isLogin');
  
      // Chuyển hướng về trang đăng nhập
      window.location.href = '/dangnhap';
    }
   
};
  return (
    <div class="home-admin" >
      <h1>Home</h1>

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
                    <li class="nav-item">
                      <a class="nav-link" href="/users">UsersList</a>
                    </li>

                  </ul>

                  <form className="d-flex" role="search">
                    <input
                      onChange={handleChange}
                      className="form-control me-2"
                      type="search"
                      placeholder="Search"
                      aria-label="Search"
                    />
                    <button className="btn btn-outline-success" type="submit">
                      Search
                    </button>
                  </form>
                  <button className="nav-item" onClick={handleLogout}>
                    <a className="nav-link" href="/dangnhap">Đăng xuất</a>
                  </button>


                </div>
              </div>
            </div>
          </nav>
        </div>

      </header>

      <div>
        <form className="d-flex" role="search">
          <input
            onChange={handleChange}
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button className="btn btn-outline-success" type="submit">
            Search
          </button>
        </form>
      </div>
      {/* Books List filtered */}
      <div>
        <h2 className="text-center">Books List</h2>
        <div className="row">
          <a href="/books/add" className="btn btn-primary">Add Book</a>
        </div>
        <div className="row">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Anh</th>
                <th>Title</th>
                <th>Author</th>

                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {booksOnFilter.map((book) => (
                <tr key={book.id}>
                  <td>
                    <img src={`../hinhanh/${book.anh}`} style={{ width: '100px', height: 'aotu' }} />
                  </td>

                  <td>{book.title}</td>
                  <td>{book.author}</td>



                  <td>

                    <a data-id={book.id} href={`/book/${book.id}`} className="btn btn-primary">View</a>




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

export default Home;