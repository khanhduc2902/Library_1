import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function AddUser() {
    const [user, setUser] = useState({
        name: "",
        email: "",
        matkhau: "",
        doituong: ""

    });
    const { id } = useParams();
    const navigation = useNavigate()

    const handleChange = (e) => {

        setUser({
            ...user,
            [e.target.id]: e.target.value,
        });
    }

    const handleSumbitForm = (e) => {
        e.preventDefault();
        fetch("http://localhost:8080/api/users/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user)
        })
            .then(response => response.text())
            .then(data => {
                if (data.includes("da ton tai")) {
                    alert(data);
                  } else {
                    alert("Tài khoản đã được thêm thành công!");
                    navigation("/dangnhap");
                  }
            })
            .catch(err => alert(err))

    }


    return (



        <div>
            <h1>Add User</h1>
            <form id="formUpdate" onSubmit={handleSumbitForm} method="POST">
                <div className="row">
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">
                                Email
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="email"
                                value={user.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="matkhau" className="form-label">
                                Mat Khau
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="matkhau"
                                value={user.matkhau}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">
                                Name
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                value={user.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="doituong" className="form-label">
                                Doi Tuong
                            </label>
                            <select
                                className="form-select"
                                id="doituong"
                                value={user.doituong}
                                onChange={handleChange}
                                required
                            >
                                <option value="" hidden>
                                    -- Chọn thể loại --
                                </option>
                                {/* <option value="admin">Admin</option> */}
                                <option value="user">User</option>
                            </select>
                        </div>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">Đăng Ký</button>
            </form>
        </div>
        // <div>
        //     <h1>Add User</h1>
        //     <form id="formUpdate" onSubmit={handleSumbitForm} method="POST">



        //                 <div className="d-flex">

        //                     <div className="mb-3">
        //                         <label for="email" className="col-sm-2 col-form-label">
        //                            Email
        //                         </label>
        //                         <div className="col-sm-10">
        //                             <input
        //                                 type="text"
        //                                 className="form-control"
        //                                 id="email"
        //                                 value={user.email}
        //                                 onChange={handleChange}
        //                                 required
        //                             />
        //                         </div>
        //                     </div>
        //                     <div className="mb-3">
        //                         <label for="matkhau" className="col-sm-2 col-form-label">
        //                             Mat Khau
        //                         </label>
        //                         <div className="col-sm-10">
        //                             <input
        //                                 type="text"
        //                                 className="form-control"
        //                                 id="matkhau"
        //                                 value={user.matkhau}
        //                                 onChange={handleChange}
        //                                 required
        //                             />
        //                         </div>
        //                     </div>
        //                 </div>



        //                 <div className="mb-3">
        //                     <label for="name" className=" col-form-label">
        //                         Name
        //                     </label>
        //                     <div className="col-sm-10">
        //                         <input
        //                             type="text"
        //                             className="form-control"
        //                             id="name"
        //                             value={user.name}
        //                             onChange={handleChange}
        //                         />
        //                     </div>

        //                 </div>



        //                 <div className="mb-3">
        //                     <label for="doituong" className="col-sm-2 col-form-label">
        //                         Doi Tuong
        //                     </label>
        //                     <div className="col-sm-10">
        //                         <select
        //                             type="text"
        //                             className="form-control"
        //                             id="doituong"
        //                             value={user.doituong}
        //                             onChange={handleChange}
        //                             required
        //                         >
        //                             <option value="" hidden>-- Chọn thể loại --</option>
        //                             <option value="admin">Admin</option>
        //                             <option value="user">User</option>

        //                         </select>
        //                     </div>
        //                 </div >




        //         <button type="submit" className="btn btn-primary">ADD</button>
        //     </form>
        // </div>
    );
}

export default AddUser;