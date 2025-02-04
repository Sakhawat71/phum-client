import { useGetEnrolledCoursesQuery } from "../../redux/features/student/studentCourse.api";

const MyEnrolledCourses = () => {

    const {data} = useGetEnrolledCoursesQuery(undefined);
    console.log(data);

    return (
        <div>
            
        </div>
    );
};

export default MyEnrolledCourses;