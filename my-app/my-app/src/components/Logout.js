import React from 'react';
import { useHistory } from 'react-router-dom';

const Logout = () => {
  const history = useHistory();

  const handleLogout = () => {
    // Xóa dữ liệu Local Storage
    localStorage.removeItem('user');

    // Chuyển hướng về trang đăng nhập
    history.push('/login');
  };

  return (
    <div>
      <h1>Logout</h1>
      <button onClick={handleLogout}>Đăng xuất</button>
    </div>
  );
};

export default Logout;