import AcademicDepartment from "../pages/admin/academicManagement/AcademicDepartment";
import AcademicFaculty from "../pages/admin/academicManagement/AcademicFaculty";
import AcademicSemester from "../pages/admin/academicManagement/AcademicSemester";
import CreateAcademicDepartment from "../pages/admin/academicManagement/CreateAcademicDepartment";
import CreateAcademicFaculty from "../pages/admin/academicManagement/CreateAcademicFaculty";
import CreateAcademicSemester from "../pages/admin/academicManagement/CreateAcademicSemester";
import AdminDashboard from "../pages/admin/AdminDashboard";
import Courses from "../pages/admin/courseManagement/Courses";
import CreateCourse from "../pages/admin/courseManagement/CreateCourse";
import CreateOfferedCourse from "../pages/admin/courseManagement/CreateOfferedCourse";
import OfferedCourses from "../pages/admin/courseManagement/OfferedCourses";
import RegisteredSemester from "../pages/admin/courseManagement/RegisteredSemester";
import SemesterRegistration from "../pages/admin/courseManagement/SemesterRegistration";
import AdminData from "../pages/admin/userManagement/AdminData";
import CreateAdmin from "../pages/admin/userManagement/CreateAdmin";
import CreateFaculty from "../pages/admin/userManagement/CreateFaculty";
import CreateStudent from "../pages/admin/userManagement/CreateStudent";
import FacultryData from "../pages/admin/userManagement/FacultryData";
import StudentData from "../pages/admin/userManagement/StudentData";
import StudentDetails from "../pages/admin/userManagement/StudentDetails";
import StudentUpdate from "../pages/admin/userManagement/StudentUpdate";
import { TUserPath } from "../types/sidebar.type";

export const adminPaths: TUserPath[] = [
    {
        name: 'Dashboard',
        path: 'dashboard',
        element: <AdminDashboard />,
    },
    {
        name: "Academic Management",
        children: [
            {
                name: 'Create A. Semester',
                path: 'create-academic-semester',
                element: <CreateAcademicSemester />,
            },
            {
                name: 'Academic Semester',
                path: 'academic-semester',
                element: <AcademicSemester />,
            },
            {
                name: 'Create A. Faculty',
                path: 'create-academic-faculty',
                element: <CreateAcademicFaculty />,
            },
            {
                name: 'Academic Faculty',
                path: 'academic-faculty',
                element: <AcademicFaculty />,
            },
            {
                name: 'Create A. Department',
                path: 'create-academic-department',
                element: <CreateAcademicDepartment />,
            },
            {
                name: 'Academic Department',
                path: 'academic-department',
                element: <AcademicDepartment />,
            },
        ]
    },
    {
        name: 'User Management',
        children: [
            {
                name: 'Create Admin',
                path: 'create-admin',
                element: <CreateAdmin />,
            },
            {
                name: 'Admins',
                path: 'admins',
                element: <AdminData />,
            },
            {
                name: 'Create Faculty',
                path: 'create-faculty',
                element: <CreateFaculty />,
            },
            {
                name: 'Faculties',
                path: 'faculties',
                element: <FacultryData />,
            },
            {
                name: 'Create Student',
                path: 'create-student',
                element: <CreateStudent />,
            },
            {
                name: 'Student Data',
                path: 'students',
                element: <StudentData />,
            },
            {
                // name: 'details',
                path: 'students/:studentId',
                element: <StudentDetails />,
            },
            {
                // name: 'update',
                path: 'student-update/:studentId',
                element: <StudentUpdate />
            }

        ],
    },
    {
        name: "Course Management",
        children: [
            {
                name: 'Registered Semester',
                path: 'registered-semester',
                element: <RegisteredSemester />
            },
            {
                name: 'Semester Registration',
                path: 'semester-registration',
                element: <SemesterRegistration />
            },
            {
                name: 'Courses',
                path: 'courses',
                element: <Courses />
            },
            {
                name: 'Create Course',
                path: 'create-course',
                element: <CreateCourse />
            },
            {
                name: 'Offered Course',
                path: 'offered-course',
                element: <OfferedCourses />
            },
            {
                name: 'Create Offered Course',
                path: 'create-offered-course',
                element: <CreateOfferedCourse />
            },
        ]
    },
];