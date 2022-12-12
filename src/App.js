import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminLayout from "./layout/AdminLayout";
import AuthLayout from "./layout/AuthLayout";
import UserLayout from "./layout/UserLayout";
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from "./pages/Admin/Dashboard"
import PageNotFound from "./pages/PageNotFound";
import Accounts from "./pages/Admin/Accounts";
import Courses from "./pages/User/Courses";
import Course from "./pages/User/Course";
import Profile from "./pages/User/Profile";
import Landing from "./pages/Landing";
import Class from "./pages/User/Class";
import Classes from "./pages/User/Classes";
import ClassDetail from "./pages/User/ClassDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<Landing />} />
        <Route element={<UserLayout />} >
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:id" element={<Course />} />
          <Route path="/profile/" element={<Profile />} />
          <Route path="/admin" element={<Accounts />} />
          <Route path="/classes" element={<Classes />} />
          <Route path="/classes/:id" element={<Class />} />
          <Route path="/classes/:id/:id" element={<ClassDetail/>} />
        </Route>
        <Route element={<AuthLayout />} >
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>

        <Route path="*" element={<PageNotFound />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
