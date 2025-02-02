import { Controller, useFormContext, useWatch } from "react-hook-form";
import { Select } from "antd";
import { useEffect } from "react";

type TSelectProps = {
    name: string;
    label?: string;
    options: { label: string; value: string | number }[];
    placeholder?: string;
    disabled?: boolean;
    mode?: "multiple" | "tags";
    onValueChange: React.Dispatch<React.SetStateAction<string>>;
};

const PHSelectWithWatch = ({
    name,
    label,
    options,
    placeholder,
    disabled,
    mode,
    onValueChange,
}: TSelectProps) => {

    const { control, formState: { errors } } = useFormContext();
    const selectedValue = useWatch({
        control,
        name
    });

    useEffect(() => {
        onValueChange(selectedValue)
    }, [selectedValue])


    // console.log(`Selected value for ${name}:`, selectedValue); // Debugging

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
                        disabled={disabled}
                        options={options}
                        mode={mode}
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

export default PHSelectWithWatch;
