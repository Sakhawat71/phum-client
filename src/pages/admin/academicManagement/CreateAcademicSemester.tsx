import { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHform";
import PHInput from "../../../components/form/PHinput";
import PHSelect from "../../../components/form/PHSelect";


const nameOptions = [
    {
        label: "Autumn",
        value: "01"
    },
    {
        label: "Summer",
        value: "02"
    },
    {
        label: "Fall",
        value: "03"
    },
];

const monthOptions = [
    {
        label: "April",
        value: "April"
    },
    {
        label: "August",
        value: "August"
    },
    {
        label: "December",
        value: "December"
    },
];

const currentYear = new Date().getFullYear();
const yearOptions = [0, 1, 2, 3, 4, 5].map((number) => ({
    label: String(currentYear + number),
    value: String(currentYear + number)
}))

const CreateAcademicSemester = () => {

    const onSubmit: SubmitHandler<FieldValues> = (data) => {

        const name = nameOptions[Number(data.name) - 1]?.label;
        const semmesterData = {
            name,
            code: data.name,
            year: data.year,
            // startMonth:,
            // endMonth: 
        }
        console.log(semmesterData);

    }

    return (
        <PHForm onSubmit={onSubmit} >

            <PHSelect
                name="name"
                label="Semester Name:"
                placeholder="Select Semester"
                options={nameOptions}
            />
            <PHSelect
                name="year"
                label="Semester Year:"
                placeholder="Select Year"
                options={yearOptions}
            />


            <PHSelect
                name="startMonth"
                label="Start Month:"
                placeholder="Select start month"
                options={monthOptions}
            />
            <PHSelect
                name="endMonth"
                label="End Month"
                placeholder="Select end month"
                options={monthOptions}
            />
        </PHForm>
    );
};

export default CreateAcademicSemester;