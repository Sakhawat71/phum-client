import { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHform";
import PHInput from "../../../components/form/PHinput";
import PHSelect from "../../../components/form/PHSelect";
import { toast } from "sonner";
import { useAddCourseMutation, useGetCoursesQuery } from "../../../redux/features/admin/courseManagement.api";
import { ICourse } from "../../../types/courseManagement.type";



const CreateCourse = () => {
    const { data: coursesData } = useGetCoursesQuery(undefined);
    const [addCourse] = useAddCourseMutation();

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const courseData = {
            title: data.title,
            prefix: data.prefix,
            code: Number(data.code),
            credits: Number(data.credits),
            preRequisiteCourses: data.preRequisiteCourses.map((courseId: string) => ({
                course: courseId,
            })),
        };

        console.log(courseData);

        // const toastId = toast.loading("Creating course...");
        // try {
        //     await addCourse(courseData);
        //     toast.success("Course created successfully!", { id: toastId });
        // } catch (error) {
        //     toast.error("Failed to create course!", { id: toastId });
        // }
    };

    const courseOptions = coursesData?.data?.map((course: ICourse) => ({
        value: course._id,
        label: `${course.prefix}-${course.code} ${course.title}`,
    }));

    return (
        <PHForm onSubmit={onSubmit} key={"create-course"}>
            <h1 style={{ textAlign: "center" }}>Create Course</h1>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>

                <PHInput
                    name="title"
                    type="text"
                    label="Course Title:"
                    placeholder="Enter Course Title"
                />

                <PHInput
                    name="prefix"
                    type='text'
                    label="Course Prefix:"
                    placeholder="Enter Course Prefix"
                />

                <PHInput
                    name="code"
                    type="number"
                    label="Course Code:"
                    placeholder="Enter Course Code"
                />

                <PHInput
                    name="credits"
                    type="number"
                    label="Credits:"
                    placeholder="Enter Course Credits"
                />

                <PHSelect
                    name="preRequisiteCourses"
                    label="Pre-Requisite Courses:"
                    options={courseOptions || []}
                    placeholder="Select Pre-Requisite Courses"
                    mode="multiple"
                />

            </div>
        </PHForm>
    );
};

export default CreateCourse;
