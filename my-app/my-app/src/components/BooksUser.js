import React, { useEffect, useState } from "react";

function BooksUser(props) {
  const [books, setBooks] = useState([]);
  const [booksOnFilter, setBooksOnFilter] = useState([]);

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


  useEffect(() => {
    fetch("http://localhost:8080/books")
      .then((response) => response.json())
      .then((data) => {
        setBooks(data);
        setBooksOnFilter(data);
      })
      .catch((err) => console.log(err));
  }, []);

 
  
  return (
    <div>
      {/* Search filter */}
     
      <div class="dau">
        <a className="btn btn-primary"href="/homeuser">Back</a>
        
      </div>
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
                <th>Genre</th>
                <th>Date</th>
                <th>Page</th>
                <th>Sold</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {booksOnFilter.map((book) => (
                <tr key={book.id}>
                  <td>
                    <img src={`../hinhanh/${book.anh}`} style={{ width: '100px', height: 'auto' }}/>
                  </td>
                  
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.genre}</td>
                  <td>{book.date}</td>
                  <td>{book.page}</td>
                  
                  <td>
                   {book.sold}
                  </td>
                 
                  <td>
                 
                   <a data-id={book.id} href={`/book/${book.id}`} className="btn btn-primary">View</a>
                
                    

                    <a data-id={book.id} href={`/books/delete/${book.id}`} className="btn btn-danger"  >Delete</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default BooksUser;