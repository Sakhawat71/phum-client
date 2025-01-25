import { useGetAllSemestersQuery } from "../../../redux/features/academicSemester/academicSemester";

const AcademicSemester = () => {

    const { data } = useGetAllSemestersQuery(undefined);
    console.log(data?.data);

    return (
        <div>
            <h1>this is Academic Semester {data?.data?.length}</h1>
        </div>
    );
};

export default AcademicSemester;