import { Controller, useFormContext } from "react-hook-form";
import { DatePicker } from "antd";
import dayjs from "dayjs";

const dateFormat = "YYYY/MM/DD";

type TDatePickerProps = {
    name: string;
    label?: string;
    placeholder?: string;
    disabled?: boolean;
};

const PHDatePicker = ({ name, label, placeholder, disabled }: TDatePickerProps) => {
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
                render={({ field: { onChange, value } }) => (
                    <DatePicker
                        id={name}
                        value={value ? dayjs(value, dateFormat) : null}
                        format={dateFormat}
                        onChange={(date) => onChange(date ? date.toISOString() : null)}
                        style={{ width: '100%' }}
                        placeholder={placeholder || "Select date"}
                        disabled={disabled}
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

export default PHDatePicker;
