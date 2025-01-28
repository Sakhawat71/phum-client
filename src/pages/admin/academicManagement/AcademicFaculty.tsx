import { useGetAllFacultyQuery } from "../../../redux/features/admin/academicManagement.api";

const AcademicFaculty = () => {

    const { data, isError, isLoading, error } = useGetAllFacultyQuery(undefined);
    console.log(data, isError, isLoading);
    console.log('error =>', error);
    

    return (
        <div>
            Academic Faculty
        </div>
    );
};

export default AcademicFaculty;