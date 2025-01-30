import { useGetRegisterSemesterQuery } from "../../../redux/features/admin/courseManagement.api";

const RegisteredSemester = () => {

    const {data} = useGetRegisterSemesterQuery(undefined);
    console.log(data);

    
    return (
        <div>
            
        </div>
    );
};

export default RegisteredSemester;