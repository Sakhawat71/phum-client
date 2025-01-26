import { Controller, useFormContext } from "react-hook-form";
import { Select } from "antd";

type TSelectProps = {
    name: string;
    label?: string;
    options: { label: string; value: string | number }[];
    placeholder?: string;
};

const PHSelect = ({ name, label, options, placeholder }: TSelectProps) => {
    const { control, formState: { errors } } = useFormContext();

    return (
        <div style={{ marginBottom: '20px' }}>
            {label && (
                <label
                    htmlFor={name}
                    style={{
                        display: 'block',
                        marginBottom: '8px',
                        fontSize: '14px',
                        fontWeight: '500',
                        color: '#333',
                    }}
                >
                    {label}
                </label>
            )}
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <Select
                        {...field}
                        id={name}
                        style={{
                            width: '100%',
                            borderRadius: '6px',
                        }}
                        placeholder={placeholder || "Please select"}
                        options={options}
                    />
                )}
            />

            {errors[name] && (
                <p style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>
                    {(errors[name] as any).message}
                </p>
            )}
        </div>
    );
};

export default PHSelect;
