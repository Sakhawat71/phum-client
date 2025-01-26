import { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHform";
import PHInput from "../../../components/form/PHinput";
import PHSelect from "../../../components/form/PHSelect";

const CreateAcademicSemester = () => {

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        console.log(data);
    }

    return (
        <PHForm onSubmit={onSubmit} >
            <PHInput type="text" name="name" label="Semester Name:" />
            <PHInput type="text" name="code" label="Semester Code:" />
            <PHInput type="number" name="year" label="Year:" />

            <PHSelect
                name="startMonth"
                label="Start Month:"
                placeholder="Select end month"
                options={[
                    { label: "April", value: "April" },
                    { label: "August", value: "August" },
                    { label: "December", value: "December" },
                ]}
            />
            <PHSelect
                name="endMonth"
                label="End Month"
                placeholder="Select end month"
                options={[
                    { label: "April", value: "April" },
                    { label: "August", value: "August" },
                    { label: "December", value: "December" },
                ]}
            />
            {/* <Button htmlType="submit">Submit</Button> */}
        </PHForm>
    );
};

export default CreateAcademicSemester;