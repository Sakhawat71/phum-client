import { useParams } from "react-router";

const StudentDetails = () => {
    
    const {studentId} = useParams();
    console.log(studentId);

    return (
        <div>
            <h1>Student Details {studentId}</h1>
        </div>
    );
};

export default StudentDetails;