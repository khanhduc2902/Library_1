import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AddUser from "./AddUser";
import Home from "./Home";



function UserDetail() {
    const [user, setUser] = useState([]);
    const { id } = useParams();
    const [isEditing, setIsEditing] = useState(false);
    const navigate = useNavigate();



    useEffect(() => {
        fetch(`http://localhost:8080/api/user/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setUser(data);

            })
            .catch((err) => console.log(err));
    }, [id]);
    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };



    const handleSave = () => {


        // Thực hiện lưu dữ liệu cập nhật vào cơ sở dữ liệu
        fetch(`http://localhost:8080/api/user/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },

            body: JSON.stringify(user),
        })
            .then((response) => {
                if (response.ok) {
                    alert("Lưu thành công")
                    navigate("/users")
                    return response.json();
                } else {
                    throw new Error('Error updating user');
                }
            })
            .then((data) => {
                console.log(data); // Log the response from the server
                // Do something with the response, such as displaying a success message
                setUser(data);
                setIsEditing(false);
            })
            .catch((error) => {
                console.log(error); // Log any error that occurs during the request
                // Handle the error, such as displaying an error message
            });


    };
    return (
        <div>
            <h1>User Details</h1>
            <form id="formUpdate" action="" method="PUT">

                <div className="row">
                    <div className="col">

                        <div className="d-flex">

                            <div className="mb-3">
                                <label for="email" className="col-sm-2 col-form-label">
                                    Email
                                </label>
                                <div className="col-sm-10">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="email"
                                        name="email"
                                        value={user.email}
                                        readOnly={!isEditing}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="mb-3">
                                <label for="matkhau" className="col-sm-2 col-form-label">
                                    Mat Khau
                                </label>
                                <div className="col-sm-10">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="matkhau"
                                        name="matkhau"
                                        value={user.matkhau}
                                        readOnly={!isEditing}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>



                        <div className="mb-3">
                            <label for="name" className=" col-form-label">
                                Name
                            </label>
                            <div className="col-sm-10">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    name="name"
                                    value={user.name}
                                    readOnly={!isEditing}
                                    onChange={handleChange}
                                />
                            </div>

                        </div>




                        <div className="mb-3">
                            <label for="doituong" className="col-sm-2 col-form-label">
                                Doi Tuong
                            </label>
                            <div className="col-sm-10">

                                <select
                                    type="text"
                                    name="doituong"
                                    id="doituong"
                                    className="disabled:cursor-not-allowed bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
                                    placeholder="doituong"

                                    value={user.doituong}
                                    onChange={handleChange}


                                // disabled={id !== "0" ? true : false}
                                >

                                    <option value="" hidden>-- Chọn đối tượng --</option>
                                    <option value="admin">admin</option>
                                    <option value="user">user</option>


                                    readOnly={!isEditing}
                                </select>
                            </div>
                        </div >

                    </div>

                </div>


            </form>
            {isEditing ? (
                <button onClick={handleSave} className="btn btn-primary">Save</button>
            ) : (
                <button onClick={handleEdit} className="btn btn-primary">Edit</button>
            )}
            <a href="/users/add" className="btn btn-primary">AddUser</a>

            <div>
            <tr key={user.id}>
                 
                    <td>{user.giohang}</td>
                  
                 
            </tr>

            </div>
        </div>

    );
}

export default UserDetail;
