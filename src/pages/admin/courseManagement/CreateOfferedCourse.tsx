import { FieldValues, SubmitHandler } from "react-hook-form";
import { TimePicker } from "antd";
import dayjs from "dayjs";
import PHSelect from "../../../components/form/PHSelect";
import { useGetCoursesQuery } from "../../../redux/features/admin/courseManagement.api";
import { useGetFacultiesQuery } from "../../../redux/features/admin/userManagement.api";
import PHForm from "../../../components/form/PHform";
import PHInput from "../../../components/form/PHinput";
import { useGetAllSemestersQuery } from "../../../redux/features/admin/academicManagement.api";
import PHSelectWithWatch from "../../../components/form/PHSelectWithWatch";

const CreateOfferedCourse = () => {
    const { data: coursesData } = useGetCoursesQuery(undefined);
    const { data: facultyData } = useGetFacultiesQuery(undefined);
    const { data: semesterData } = useGetAllSemestersQuery(undefined);

    const courseOptions = coursesData?.data?.map((course) => ({
        value: course._id,
        label: `${course.prefix} ${course.code} - ${course.title}`,
    }));

    const facultyOptions = facultyData?.data?.map((faculty) => ({
        value: faculty._id,
        label: faculty.name,
    }));

    const semesterOptions = semesterData?.data?.map((semester) => ({
        value: semester._id,
        label: `${semester.name} ${semester.year}`,
    }));

    const daysOptions = [
        { value: "Mon", label: "Monday" },
        { value: "Tue", label: "Tuesday" },
        { value: "Wed", label: "Wednesday" },
        { value: "Thu", label: "Thursday" },
        { value: "Fri", label: "Friday" },
        { value: "Sat", label: "Saturday" },
        { value: "Sun", label: "Sunday" },
    ];

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
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
                <PHSelect
                    name="semesterRegistration"
                    label="Semester"
                    options={semesterOptions || []}
                    placeholder="Select Semester"
                />

                <PHSelectWithWatch
                    name="course"
                    label="Course"
                    options={courseOptions || []}
                    placeholder="Select Course"
                />

                <PHSelect
                    name="faculty"
                    label="Faculty"
                    options={facultyOptions || []}
                    placeholder="Assign Faculty"
                />

                <PHInput label="Section" name="section" type="number" placeholder="Enter Section Number" />

                <PHInput label="Max Capacity" name="maxCapacity" type="number" placeholder="Enter Maximum Capacity" />

                <PHSelect
                    name="days"
                    mode="multiple"
                    label="Days"
                    options={daysOptions}
                    placeholder="Select Days"
                />

                <TimePicker name="startTime" format="HH:mm" placeholder="Start Time" />
                <TimePicker name="endTime" format="HH:mm" placeholder="End Time" />

            </div>
        </PHForm>
    );
};

export default CreateOfferedCourse;