import React, { useEffect } from "react";
import { useParams } from "react-router-dom";


function DeleteBook() {
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:8080/books/delete/${id}`, {
        method: 'DELETE'
    })
      .then((response) => response.json())
      .then((data) => {

      })
      .catch((error) => {
        
      })
  }, [id])
  


  return (
    <div>
      <p>Ban da xoa thanh cong Book {id}</p>
      <a href="/books">Back to students list</a>
    </div>
  );
}

export default DeleteBook;
