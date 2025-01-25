import { FormProvider, useForm } from "react-hook-form";

const PHForm = ({ onSubmit, children }) => {
    const method = useForm();

    return <FormProvider {...method}>
        <form onSubmit={method.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
};

export default PHForm;