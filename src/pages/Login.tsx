
const Login = () => {

    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();

    const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
        console.log("Login Data: ", data);
    }

    return (
        <div style={{ maxWidth: "400px", margin: "50px auto", padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
            <h2>Login</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* Email Input */}
                <div style={{ marginBottom: "16px" }}>
                    <label htmlFor="email">Email:</label>
                    <input
                        id="email"
                        type="email"
                        {...register("email", { required: "Email is required" })}
                        style={{ display: "block", width: "100%", padding: "8px", marginTop: "4px" }}
                    />
                    {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}
                </div>

                {/* Password Input */}
                <div style={{ marginBottom: "16px" }}>
                    <label htmlFor="password">Password:</label>
                    <input
                        id="password"
                        type="password"
                        {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters long" } })}
                        style={{ display: "block", width: "100%", padding: "8px", marginTop: "4px" }}
                    />
                    {errors.password && <p style={{ color: "red" }}>{errors.password.message}</p>}
                </div>

                {/* Submit Button */}
                <button type="submit" style={{ padding: "10px 20px", background: "#1890ff", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}>
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;