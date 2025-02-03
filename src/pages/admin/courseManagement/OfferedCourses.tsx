import { useGetOfferedCoursesQuery } from "../../../redux/features/admin/courseManagement.api";

const OfferedCourses = () => {

    const {data} = useGetOfferedCoursesQuery(undefined);
    console.log(data?.data?.result);
    console.log(data?.data?.meta);

    return (
        <div>
            {data?.data?.result?.length}
        </div>
    );
};

export default OfferedCourses;