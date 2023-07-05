import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function StudentDetail() {
  const [student, setStudent] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:8080/student/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setStudent(data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <div>
      <h1>student Details</h1>
      <form id="formUpdate" action="" method="PUT">
        <div className="mb-3 row">
          <label for="id" className="col-sm-2 col-form-label">
            ID
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              readOnly
              className="form-control-plaintext"
              id="id"
              value={student.id}
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label for="name" className="col-sm-2 col-form-label">
            Name
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="name"
              value={student.name}
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label for="dob" className="col-sm-2 col-form-label">
            DOB
          </label>
          <div className="col-sm-10">
            <input
              type="date"
              className="form-control"
              id="dob"
              value={student.dob}
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label for="major" className="col-sm-2 col-form-label">
            major
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="major"
              value={student.major}
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label for="vaccinated" className="col-sm-2 col-form-label">
          vaccinated
          </label>
          <div className="col-sm-10">
            <input
              type="checkbox"
              name="vaccinated"
              id="vaccinated"
              disabled
              defaultChecked={student.vaccinated}
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default StudentDetail;