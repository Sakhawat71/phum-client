import { useGetAllOfferedCoursesQuery } from "../../redux/features/student/studentCourse.api";

const OfferedCourse = () => {

    const {data } = useGetAllOfferedCoursesQuery(undefined);
    console.log(data?.meta);
    console.log(data?.data);


    return (
        <div>
            Offered Course
        </div>
    );
};

export default OfferedCourse;