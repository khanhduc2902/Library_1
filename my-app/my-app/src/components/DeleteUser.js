import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

function DeleteUser() {
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:8080/api/users/delete/${id}`, {
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
      <p>Ban da xoa thanh cong User {id}</p>
      <a href="/users">Back to Users list</a>
    </div>
  );
}

export default DeleteUser;
