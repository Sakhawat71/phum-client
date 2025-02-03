import { SubmitHandler } from "react-hook-form";
import PHSelect from "../../../components/form/PHSelect";
import PHForm from "../../../components/form/PHform";
import PHInput from "../../../components/form/PHinput";
import PHSelectWithWatch from "../../../components/form/PHSelectWithWatch";
import { useState } from "react";
import PHTimePicker from "../../../components/form/PHTimePiceker";
import {
    useGetAcademicDepartmentQuery,
    useGetAcademicFacultiesQuery,
} from "../../../redux/features/admin/academicManagement.api";
import {
    ICourse,
    IOfferedCourse
} from "../../../types/courseManagement.type";
import {
    useCreateOfferedCourseMutation,
    useGetAssignFacultiesQuery,
    useGetCoursesQuery,
    useGetRegisterSemesterQuery
} from "../../../redux/features/admin/courseManagement.api";
import { toast } from "sonner";





const CreateOfferedCourse = () => {
    const [courseId, setCourseId] = useState("");

    const { data: registeredSemesterData } = useGetRegisterSemesterQuery([
        { name: 'sort', value: 'year' },
        { name: 'status', value: 'UPCOMING' },
    ]);
    const { data: academicDepartmentData } = useGetAcademicDepartmentQuery(undefined);
    const { data: academicFacultyData } = useGetAcademicFacultiesQuery(undefined);
    const { data: coursesData } = useGetCoursesQuery(undefined);
    const {
        data: assignedFacultyData,
        isFetching: assignedfacultyFetching,
    } = useGetAssignFacultiesQuery({ course: courseId }, { skip: !courseId });

    const [addOfferedCourse] = useCreateOfferedCourseMutation();

    // console.log(assignedFacultyData?.data[0]?.faculties);




    // Semester Options
    const registerdSemesterOptions = registeredSemesterData?.data?.map((semester: { _id: string; academicSemester: { name: string; year: number; }; }) => (
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
    const academicFacultyOptions = academicFacultyData?.data?.map((faculty) => ({
        value: faculty._id,
        label: faculty.name,
    }));

    // Filtered Course Options
    const courseOptions = coursesData?.data?.map((course: ICourse) => (
        {
            value: course._id,
            label: `${course.prefix}-${course.code} ${course.title}`,
        }
    ));

    // faculty Options
    const facultyOptions = assignedFacultyData?.data[0]?.faculties?.map((faculty: { _id: string; fullName: string; }) => ({
        value: faculty._id,
        label: faculty?.fullName
    }));


    // console.log(courseId);
    // console.log(facultyOptions);

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
            section: Number(data.section),
            maxCapacity: Number(data.maxCapacity),
        };
        // console.log("Submitted Data:", formattedData);


        const toastId = toast.loading("Creating academic schedule...");
        try {
            await addOfferedCourse(formattedData);
            // console.log(res);
            toast.success("Academic schedule created successfully!", { id: toastId });
        } catch (error) {
            toast.error("Failed to create academic schedule!", { id: toastId });
        }
    };



    return (
        <PHForm onSubmit={onSubmit} key={'Create-Offered-Course'}>
            <h1 style={{ textAlign: "center" }}>Create Offered Course</h1>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>


                {/* Semester Selection */}
                <PHSelect
                    name="semesterRegistration"
                    label="Registered Semester"
                    options={registerdSemesterOptions || []}
                    placeholder="Select Semester"
                />


                {/* Department Selection */}
                <PHSelect
                    name="academicDepartment"
                    label="Academic Department"
                    options={departmentOptions || []}
                    placeholder="Select Department"
                />


                {/* Faculty Selection */}
                <PHSelect
                    name="academicFaculty"
                    label="Academic Faculty"
                    options={academicFacultyOptions || []}
                    placeholder="Select Faculty"
                />


                {/* Course Selection*/}
                <PHSelectWithWatch
                    onValueChange={setCourseId}
                    name="course"
                    label="Course"
                    options={courseOptions || []}
                    placeholder="Select Course"
                />

                <PHSelect
                    disabled={!courseId || assignedfacultyFetching}
                    options={facultyOptions || []}
                    name="faculty"
                    label="Faculty"
                    placeholder="Select Faculty"
                />

                {/* Section*/}
                <PHInput
                    label="Section"
                    name="section"
                    type="number"
                    placeholder="Enter Section Number"
                />

                {/*  Capacity  */}
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