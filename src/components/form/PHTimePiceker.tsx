import { Controller, useFormContext } from "react-hook-form";
import { TimePicker } from "antd";
import dayjs from "dayjs";

type TTimePickerProps = {
    name: string;
    label?: string;
    placeholder?: string;
    disabled?: boolean;
};

const PHTimePicker = ({ name, label, placeholder, disabled }: TTimePickerProps) => {
    const { control, formState: { errors } } = useFormContext();

    return (
        <div style={{ marginBottom: "20px" }}>
            {label && (
                <label
                    htmlFor={name}
                    style={{
                        display: "block",
                        marginBottom: "8px",
                        fontSize: "14px",
                        fontWeight: "500",
                        color: "#333",
                    }}
                >
                    {label}
                </label>
            )}
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <TimePicker
                        {...field}
                        id={name}
                        format="HH:mm"
                        placeholder={placeholder || "Select Time"}
                        disabled={disabled}
                        style={{
                            width: "100%",
                            borderRadius: "6px",
                        }}
                        value={field.value ? dayjs(field.value, "HH:mm") : null} // Ensure correct value format
                        onChange={(time) => field.onChange(time ? time.format("HH:mm") : "")} // Convert selected time to string
                    />
                )}
            />

            {errors[name] && (
                <p style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
                    {(errors[name] as any).message}
                </p>
            )}
        </div>
    );
};

export default PHTimePicker;
