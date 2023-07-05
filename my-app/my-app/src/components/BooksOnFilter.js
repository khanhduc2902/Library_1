import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function BooksOnFilter(props) {
  const [books, setbooks] = useState([]);
  const { slug } = useParams();

  useEffect(() => {
    fetch(`http://localhost:8080/books/search/${slug}`)
      .then((response) => response.json())
      .then((data) => {
        setBooks(data);
      })
      .catch((err) => console.log(err));
  }, [slug]);

  const handleView = (e) => {
    e.preventDefault();
    const formSearch = document.getElementById('formSearch');
    formSearch.setAttribute('action',`/book/${e.target.dataset.id}`);
    formSearch.submit();
  };

  return (
    <div>
      <h1 className="text-center">Books List Suitable</h1>
      <div className="row">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Author</th>
              <th>Genre</th>
              <th>Date</th>
              <th>Page</th>
              <th>Sold</th>
              <th>Anh</th>
              <th>Action</th>
            </tr>
          </thead>
  
          <tbody>
            {books.map((book) => (
              <tr key={book.id}>
                <td>{book.id}</td>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.genre}</td>
                <td>{book.date}</td>
                <td>{book.page}</td>
                <td>
                  <input type="checkbox" defaultChecked={book.sold} disabled />
                </td>
                <td>{book.anh}</td>
                <td>
                  <button data-id={book.id} onClick={handleView} className="btn btn-primary">View</button>  
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <form id="formSearch" action="" method="GET"></form>
    </div>
  );
}

export default BooksOnFilter;