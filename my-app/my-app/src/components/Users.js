import React, { useEffect, useState } from "react";

function Users(props) {
  const [users, setUsers] = useState([]);
  const [usersOnFilter, setUsersOnFilter] = useState([]);

  const handleChange = (e) => {
    if (e.target.value) {
      e.preventDefault();
      setUsersOnFilter(
        // UserssOnFilter.filter((user) => user.name.includes(e.target.value))
      );
    } else {
      setUsersOnFilter(users);
    }
  };


  useEffect(() => {
    fetch("http://localhost:8080/api/users")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
        setUsersOnFilter(data);
      })
      .catch((err) => console.log(err));
  }, []);

 
  
  return (
    <div>
     
      <div>
        <a className="btn btn-primary"href="/home">Back</a>
      </div>
      <div>
        <h2 className="text-center">users List</h2>
        <div className="row">
          <a href="/users/add" className="btn btn-primary">Add users</a>
        </div>
        <div className="row">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>id</th>
                <th>name</th>
                <th>email</th>
                <th>matkhau</th>
                <th>doituong</th>
              </tr>
            </thead>

            <tbody>
              {usersOnFilter.map((user) => (
                <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.matkhau}</td>
                    <td>{user.doituong}</td>
                  
                 
                  <td>
                 
                   <a data-id={user.id} href={`/user/${user.id}`} className="btn btn-primary">View</a>
                
                    

                    <a data-id={users.id} href={`/users/delete/${user.id}`} className="btn btn-danger"  >Delete</a>
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

export default Users;