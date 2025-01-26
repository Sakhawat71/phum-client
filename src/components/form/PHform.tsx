import { ReactNode } from "react";
import { FieldValues, FormProvider, SubmitHandler, useForm } from "react-hook-form";

type TFormProps = {
    onSubmit: SubmitHandler<FieldValues>,
    children: ReactNode
}


const PHForm = (
    { onSubmit, children }: TFormProps
) => {
    const methods = useForm();

    return (
        <div
            style={{
                maxWidth: '500px',
                margin: '0 auto',
                padding: '20px',
                border: '1px solid #e5e5e5',
                borderRadius: '8px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                backgroundColor: '#E8F0FE'
            }}
        >

            <FormProvider {...methods}>
                <form
                    onSubmit={methods.handleSubmit(onSubmit)}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '16px',
                    }}
                >
                    {children}
                    <button
                        type="submit"
                        style={{
                            padding: '10px 16px',
                            backgroundColor: '#1890ff',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '6px',
                            fontSize: '14px',
                            fontWeight: '500',
                            cursor: 'pointer',
                            transition: 'background-color 0.3s ease',
                        }}
                        onMouseOver={(e) =>
                            (e.currentTarget.style.backgroundColor = '#40a9ff')
                        }
                        onMouseOut={(e) =>
                            (e.currentTarget.style.backgroundColor = '#1890ff')
                        }
                    >
                        Submit
                    </button>
                </form>
            </FormProvider>
        </div>
    );
};

export default PHForm;