import React, { useEffect, useState } from "react";

function Students(props) {
  const [students, setStudents] = useState([]);
  const [studentsOnSearch, setStudentsOnSearch] = useState([]);

  const handleChange = (e) => {
    if (e.target.value) {
      e.preventDefault();
      setStudentsOnSearch(
        students.filter((student) => student.name.includes(e.target.value) || student.major.includes(e.target.value) )
      );
    } else {
      setStudentsOnSearch(students);
    }
  };

  const handleSubmit = () => {
    const formSearch = document.getElementById('formSearch');
    const inputSearch = document.getElementById('inputSearch');
    formSearch.setAttribute('action', `/students/search/${inputSearch.value}`);
    formSearch.submit();
  };

  const handleView = (e) => {
    e.preventDefault();
    const formSearch = document.getElementById('formSearch');
    formSearch.setAttribute('action',`/student/${e.target.dataset.id}`);
    formSearch.submit();
  };


  useEffect(() => {
    fetch("http://localhost:8080/students")
      .then((response) => response.json())
      .then((data) => {
        setStudents(data);
        setStudentsOnSearch(data);
        
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      {/* Search filter */}
      <div>
        <form id="formSearch" className="d-flex" role="search" action="" method="GET">
          <input
            id="inputSearch"
            onChange={handleChange}
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button className="btn btn-outline-success" type="submit" onClick={handleSubmit}>
            Search
          </button>
        </form>
      </div>
      {/* Employees List filtered */}
      <div>
        <h2 className="text-center">Student List</h2>
        <div className="row">
          <button className="btn btn-primary">Add Student</button>
        </div>
        <div className="row">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>DoB</th>
                <th>Major</th>
                <th>Vaccinated</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {studentsOnSearch.map((student) => (
                <tr key={student.id}>
                  <td>{student.id}</td>
                  <td>{student.name}</td>
                  <td>{student.dob}</td>
                  <td>{student.major}</td>
                  <td>
                    <input type="checkbox" defaultChecked={student.vaccinated} disabled />
                  </td>
                  <td>
                    <button data-id={student.id} onClick={handleView} className="btn btn-primary">View</button>
                    <button data-id={student.id} onClick={handleView} className="btn btn-primary">Delete</button>
                  </td>
</tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Form action */}
      <form id="formAction" method="GET" action=""></form>
    </div>
  );
}

export default Students;