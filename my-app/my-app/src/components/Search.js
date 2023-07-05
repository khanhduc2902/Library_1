import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function StudentsWithSearch(props) {
  const [students, setStudents] = useState([]);
  const { keyword } = useParams();

  useEffect(() => {
    fetch(`http://localhost:8080/students/search/${keyword}`)
      .then((response) => response.json())
      .then((data) => {
        setStudents(data);
      })
      .catch((err) => console.log(err));
  }, [keyword]);

  const handleView = (e) => {
    e.preventDefault();
    const formSearch = document.getElementById('formSearch');
    formSearch.setAttribute('action',`/students/${e.target.dataset.id}`);
    formSearch.submit();
  };

  return (
    <div>
      <div className="row">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>DOB</th>
              <th>Major</th>
              <th>Vaccinated</th>
              <th>Action</th>
            </tr>
          </thead>
  
          <tbody>
            {students.map((student) => (
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StudentsWithSearch;