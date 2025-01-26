import { Controller } from "react-hook-form";

type TInputProps = {
    type: string,
    name: string,
    label?: string
}

const PHInput = ({ type, name, label } : TInputProps) => {


    return (
        <div style={{ marginBottom: '8px' }}>
        {label && (
            <label
                htmlFor={name}
                style={{
                    display: 'block',
                    marginBottom: '8px',
                    fontWeight: '600',
                    fontSize: '14px',
                    color: '#333',
                }}
            >
                {label}
            </label>
        )}
        <Controller
            name={name}
            render={({ field }) => (
                <input
                    {...field}
                    type={type}
                    id={name}
                    placeholder={ ''}
                    style={{
                        width: '100%',
                        padding: '10px 12px',
                        border: '1px solid #d9d9d9',
                        borderRadius: '6px',
                        fontSize: '14px',
                        outline: 'none',
                        transition: 'border-color 0.3s ease',
                    }}
                    onFocus={(e) =>
                        (e.target.style.borderColor = '#1890ff')
                    }
                    onBlur={(e) =>
                        (e.target.style.borderColor = '#d9d9d9')
                    }
                />
            )}
        />
    </div>
    )
};

export default PHInput;