import { useGetAllSemestersQuery } from "../../../redux/features/academicSemester/academicSemester";

const AcademicSemester = () => {

    const { data } = useGetAllSemestersQuery(undefined);
    console.log(data);

    return (
        <div>
            <h1>this is Academic Semester</h1>
        </div>
    );
};

export default AcademicSemester;