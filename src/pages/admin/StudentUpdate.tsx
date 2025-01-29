import { useParams } from "react-router";

const StudentUpdate = () => {

    const {studentId} = useParams();
    console.log(studentId);

    return (
        <div>
            <h2>Update Student {studentId}</h2>
        </div>
    );
};

export default StudentUpdate;