import { SubmitHandler } from "react-hook-form";
import dayjs from "dayjs";
import PHSelect from "../../../components/form/PHSelect";
import PHForm from "../../../components/form/PHform";
import PHInput from "../../../components/form/PHinput";
import PHSelectWithWatch from "../../../components/form/PHSelectWithWatch";
import { useState } from "react";
import {
    useGetAcademicDepartmentQuery,
    useGetAcademicFacultiesQuery,
} from "../../../redux/features/admin/academicManagement.api";
import { ICourse, IOfferedCourse } from "../../../types/courseManagement.type";
import { useGetCoursesQuery, useGetRegisterSemesterQuery } from "../../../redux/features/admin/courseManagement.api";
import PHTimePicker from "../../../components/form/PHTimePiceker";
import { useGetFacultiesQuery } from "../../../redux/features/admin/userManagement.api";





const CreateOfferedCourse = () => {
    const [courseId, setCourseId] = useState("");

    const { data: registeredSemesterData } = useGetRegisterSemesterQuery([
        { name: 'sort', value: 'year' },
        { name: 'status', value: 'UPCOMING' },
      ]);
    const { data: academicDepartmentData } = useGetAcademicDepartmentQuery(undefined);
    const { data: academicFacultyData } = useGetAcademicFacultiesQuery(undefined);
    const { data: coursesData } = useGetCoursesQuery(undefined);
    const {data : facultyData} = useGetFacultiesQuery(undefined)


    console.log(facultyData?.data);








    // Semester Options
    const registerdSemesterOptions = registeredSemesterData?.data?.map((semester) => (
        {
            value: semester._id,
            label: `${semester.academicSemester.name} ${semester.academicSemester.year}`,
        }
    ));

    // Filtered Department Options
    const departmentOptions = academicDepartmentData?.data?.map((dept) => ({
        value: dept._id,
        label: dept.name,
    }));

    // Faculty Options
    const facultyOptions = academicFacultyData?.data?.map((faculty) => ({
        value: faculty._id,
        label: faculty.name,
    }));

    // Filtered Course Options
    const courseOptions = coursesData?.data?.map((course : ICourse) => (
        {
            value: course._id,
            label: `${course.prefix}-${course.code} ${course.title}`,
        }
    ));



    console.log(courseId);
    console.log(courseOptions);














    // Days Options
    const daysOptions = [
        { value: "Mon", label: "Monday" },
        { value: "Tue", label: "Tuesday" },
        { value: "Wed", label: "Wednesday" },
        { value: "Thu", label: "Thursday" },
        { value: "Fri", label: "Friday" },
        { value: "Sat", label: "Saturday" },
        { value: "Sun", label: "Sunday" },
    ];












    // Form Submission
    const onSubmit: SubmitHandler<IOfferedCourse> = async (data) => {
        const formattedData = {
            ...data,
            startTime: dayjs(data.startTime).format("HH:mm"),
            endTime: dayjs(data.endTime).format("HH:mm"),
        };
        console.log("Submitted Data:", formattedData);
    };



    return (
        <PHForm onSubmit={onSubmit}>
            <h1 style={{ textAlign: "center" }}>Create Offered Course</h1>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>


                {/* Semester Selection */}
                <PHSelect
                    name="semesterRegistration"
                    label="Registered Semester"
                    options={registerdSemesterOptions || []}
                    placeholder="Select Semester"
                />


                {/* Department Selection (Filtered by Faculty) */}
                <PHSelect
                    name="academicDepartment"
                    label="Academic Department"
                    options={departmentOptions || []}
                    placeholder="Select Department"
                />


                {/* Faculty Selection (Watch Changes) */}
                <PHSelect
                    name="academicFaculty"
                    label="Academic Faculty"
                    options={facultyOptions || []}
                    placeholder="Select Faculty"
                />



                {/* Course Selection (Filtered by Department) */}
                <PHSelectWithWatch
                    onValueChange={setCourseId}
                    name="course"
                    label="Course"
                    options={courseOptions || []}
                    placeholder="Select Course"
                />

                <PHSelect
                disabled={!courseId}
                name="faculty"
                label="Faculty"
                placeholder="Select Faculty"
                />

                {/* Section & Capacity */}
                <PHInput
                    label="Section"
                    name="section"
                    type="number"
                    placeholder="Enter Section Number"
                />

                <PHInput
                    label="Max Capacity"
                    name="maxCapacity"
                    type="number"
                    placeholder="Enter Maximum Capacity"
                />

                {/* Days Selection */}
                <PHSelect
                    name="days"
                    mode="multiple"
                    label="Days"
                    options={daysOptions}
                    placeholder="Select Days"
                />

                {/* Time Selection (Start & End Time) */}
                <PHTimePicker
                    name="startTime"
                    label="Start Time"
                    placeholder="Start Time"
                />

                <PHTimePicker
                    name="endTime"
                    label="End Time"
                    placeholder="End Time"
                />

            </div>
        </PHForm>
    );
};

export default CreateOfferedCourse;













// import { FieldValues, SubmitHandler } from "react-hook-form";
// import { TimePicker } from "antd";
// import dayjs from "dayjs";
// import PHSelect from "../../../components/form/PHSelect";
// import { useGetCoursesQuery } from "../../../redux/features/admin/courseManagement.api";
// import PHForm from "../../../components/form/PHform";
// import PHInput from "../../../components/form/PHinput";
// import { useGetAcademicFacultiesQuery, useGetAllSemestersQuery } from "../../../redux/features/admin/academicManagement.api";
// import PHSelectWithWatch from "../../../components/form/PHSelectWithWatch";
// import { useState } from "react";
// import { ICourse, IOfferedCourse } from "../../../types/courseManagement.type";



// const CreateOfferedCourse = () => {

//     const [id, setId] = useState('');
//     const { data: coursesData } = useGetCoursesQuery(undefined);
//     const { data: academicFacultyData } = useGetAcademicFacultiesQuery(undefined);
//     const { data: semesterData } = useGetAllSemestersQuery(undefined);

//     const courseOptions = coursesData?.data?.map((course : ICourse) => ({
//         value: course._id,
//         label: `${course.prefix} ${course.code} - ${course.title}`,
//     }));

//     const facultyOptions = academicFacultyData?.data?.map((faculty ) => ({
//         value: faculty._id,
//         label: faculty.name,
//     }));

//     const semesterOptions = semesterData?.data?.map((semester) => ({
//         value: semester._id,
//         label: `${semester.name} ${semester.year}`,
//     }));

//     const daysOptions = [
//         { value: "Mon", label: "Monday" },
//         { value: "Tue", label: "Tuesday" },
//         { value: "Wed", label: "Wednesday" },
//         { value: "Thu", label: "Thursday" },
//         { value: "Fri", label: "Friday" },
//         { value: "Sat", label: "Saturday" },
//         { value: "Sun", label: "Sunday" },
//     ];

//     const onSubmit: SubmitHandler<IOfferedCourse> = async (data) => {
//         const formattedData = {
//             ...data,
//             startTime: dayjs(data.startTime).format("HH:mm"),
//             endTime: dayjs(data.endTime).format("HH:mm"),
//         };
//         console.log("Submitted Data:", formattedData);
//     };

//     console.log(id);

//     return (
//         <PHForm onSubmit={onSubmit}>
//             <h1 style={{ textAlign: "center" }}>Create Offered Course</h1>
//             <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
//                 <PHSelect
//                     name="semesterRegistration"
//                     label="Semester"
//                     options={semesterOptions || []}
//                     placeholder="Select Semester"
//                 />

//                 <PHSelectWithWatch
//                     onValueChange={setId}
//                     name="course"
//                     label="Course"
//                     options={courseOptions || []}
//                     placeholder="Select Course"
//                 />

//                 <PHSelect
//                     name="academicFaculty"
//                     label="Academic Faculty"
//                     options={facultyOptions || []}
//                     placeholder="Assign Faculty"
//                 />

//                 <PHInput label="Section" name="section" type="number" placeholder="Enter Section Number" />

//                 <PHInput label="Max Capacity" name="maxCapacity" type="number" placeholder="Enter Maximum Capacity" />

//                 <PHSelect
//                     name="days"
//                     mode="multiple"
//                     label="Days"
//                     options={daysOptions}
//                     placeholder="Select Days"
//                 />

//                 <TimePicker name="startTime" format="HH:mm" placeholder="Start Time" />
//                 <TimePicker name="endTime" format="HH:mm" placeholder="End Time" />

//             </div>
//         </PHForm>
//     );
// };

// export default CreateOfferedCourse;