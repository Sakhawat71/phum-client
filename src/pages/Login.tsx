import { useForm } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { verifytoken } from "../utils/verifyToken";

const Login = () => {

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const [login, { error }] = useLoginMutation();

    const onSubmit = async (data) => {

        const userInfo = {
            id: data.id,
            password: data.password,
        };
        const res = await login(userInfo).unwrap();
        console.log('redux data =>', res.data);
        
        const decoded = verifytoken(res.data.accessToken);
        console.log('decoded data => ', decoded);
    };

    if (error) {
        console.log('redux error =>', error);
    };

    return (
        <div style={{ maxWidth: "400px", margin: "50px auto", padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
            <h2>Login</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* ID Input */}
                <div style={{ marginBottom: "16px" }}>
                    <label htmlFor="id">Id:</label>
                    <input
                        id="id"
                        type="text"
                        {...register("id", { required: "Id is required" })}
                        style={{ display: "block", width: "100%", padding: "8px", marginTop: "4px" }}
                    />
                    {errors.id && <p style={{ color: "red" }}>{errors.id.message}</p>}
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