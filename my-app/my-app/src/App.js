import "./App.css";

import { Route, Routes } from "react-router-dom";
import Books from "./components/Books";
import BookDetail from "./components/BookDetail";
import AddBook from "./components/AddBook";
import DeleteBook from "./components/DeleteBook";
import DangNhap from "./components/DangNhap";
import Home from "./components/Home";
import Users from "./components/Users";
import AddUser from "./components/AddUser";
import UserDetail from "./components/UserDetail";
import DeleteUser from "./components/DeleteUser";
import HomeUser from "./components/HomeUser";
import BooksUser from "./components/BooksUser";
import BookDetailUser from "./components/BookDetailUser";



function App() {
  return (
    <div className="App">
      {/* <LoginHeader /> */}
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/books" element={<Books />} />
        <Route path="/book/:id" element={<BookDetail />} />
        <Route path="/books/add" element={<AddBook />} />
        <Route path="/books/delete/:id" element={<DeleteBook />} />
        <Route path="/dangnhap" element={<DangNhap  />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/add" element={<AddUser />} />
        <Route path="/user/:id" element={<UserDetail />} />
        <Route path="/users/delete/:id" element={<DeleteUser />} />
        <Route path="/homeuser" element={<HomeUser />} />
        <Route path="/booksuser" element={<BooksUser />}  />
        <Route path="/bookss/:id" element={<BookDetailUser />} />
        {/* <Route path="/books/search/:keyword" element={<LaptopsSearch />} /> */}
  
      </Routes>

      {/* <Routes>
        <Route path="/students" element={<Students />} />
        <Route path="/students/search/:keyword" element={<StudentsSearch/>} />
        <Route path="/student/:id" element={<StudentDetail/>} />
      </Routes> */}

      {/* <Index />
      <Routes>
        <Route path="/" element={<Hello />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/tickets" element={<Tickets />} />
        <Route path="/employee/:id" element={<EmployeeDetail />} />
        <Route path="/customer/:id" element={<CustomersDetail />} />
        <Route path="/ticket/:id" element={<TicketDetail />} />
      </Routes> */}
    </div>
  );
}

export default App;