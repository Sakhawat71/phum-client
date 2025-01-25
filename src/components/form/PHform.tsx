import { ReactNode } from "react";
import { FieldValues, FormProvider, SubmitHandler, useForm } from "react-hook-form";

type TFormProps = {
    onSubmit: SubmitHandler<FieldValues>,
    children: ReactNode
}


const PHForm = (
    { onSubmit, children }: TFormProps
) => {
    const method = useForm();

    return (
        <FormProvider {...method}>
            <form onSubmit={method.handleSubmit(onSubmit)}>{children}</form>
        </FormProvider>
    );
};

export default PHForm;