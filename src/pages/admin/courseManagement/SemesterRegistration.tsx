import { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHform";
import PHInput from "../../../components/form/PHinput";
import PHSelect from "../../../components/form/PHSelect";
import { toast } from "sonner";
import { useGetAllSemestersQuery } from "../../../redux/features/admin/academicManagement.api";
import { useAddRegisterSemesterMutation } from "../../../redux/features/admin/courseManagement.api";
import PHDatePicker from "../../../components/form/PHDatePicker";
import { ISemesterRegistration } from "../../../types/courseManagement.type";

const SemesterRegistration = () => {

    const { data: semestersData } = useGetAllSemestersQuery(undefined);
    const [addRegisterSemester, { data }] = useAddRegisterSemesterMutation();
    console.log(data);


    const onSubmit: SubmitHandler<FieldValues> = async (data) => {

        // console.log(data);

        const semesterData: ISemesterRegistration = {
            academicSemester: data.academicSemester,
            startDate : data.startDate,
            endDate : data.endDate,
            status : data.status,
            maxCredit : Number(data.maxCredit),
            minCredit : Number(data.minCredit),
        };
        // console.log(semesterData);

        const toastId = toast.loading("Creating academic schedule...");
        try {
            await addRegisterSemester(semesterData);
            toast.success("Academic schedule created successfully!", { id: toastId });
        } catch (error) {
            toast.error("Failed to create academic schedule!", { id: toastId });
        }
    };

    const semestersOptions = semestersData?.data?.map((sems) => ({
        value: sems._id,
        label: `${sems.name} ${sems.year}`
    }));


    return (
        <PHForm onSubmit={onSubmit} key={'semester-registration'}>
            <h1 style={{ textAlign: "center" }}>Create Academic Schedule</h1>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <PHSelect
                    name="academicSemester"
                    label="Academic Semester"
                    placeholder="Select Academic Semester"
                    options={semestersOptions || []}
                />

                <PHSelect
                    name="status"
                    label="Status:"
                    options={[
                        { value: "UPCOMING", label: "Upcoming" },
                        { value: "ONGOING", label: "Ongoing" },
                        { value: "ENDED", label: "Ended" },
                    ]}
                    placeholder="Select Status"
                />


                <PHDatePicker
                    name="startDate"
                    label="Start Date:"
                    placeholder="Select Start Date"
                />
                <PHDatePicker
                    name="endDate"
                    label="End Date:"
                    placeholder="Select End Date"
                />

                <PHInput
                    name="minCredit"
                    type="number"
                    label="Minimum Credit:"
                    placeholder="Enter Min Credit"
                />

                <PHInput
                    name="maxCredit"
                    type="number"
                    label="Maximum Credit:"
                    placeholder="Enter Max Credit"
                />

            </div>
        </PHForm>
    );
};

export default SemesterRegistration;