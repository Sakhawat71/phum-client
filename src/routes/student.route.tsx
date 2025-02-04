import MyEnrolledCourses from "../pages/student/MyEnrolledCourses";
import OfferedCourse from "../pages/student/OfferedCourse";
import StudentDashboard from "../pages/student/StudentDashboard";

export const studentPaths = [
    {
        name: 'Dashboard',
        path: 'dashboard',
        element: <StudentDashboard />,
    },
    {
        name: 'Offered Course',
        path: 'offered-course',
        element: <OfferedCourse />,
    },
    {
        name: 'My Enrolled Courses',
        path: 'my-enrolled-courses',
        element: <MyEnrolledCourses />,
    },
];