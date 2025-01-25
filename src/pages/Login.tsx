import { FieldValues, useForm } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { verifytoken } from "../utils/verifyToken";
import { useAppDispatch } from "../redux/hooks";
import { setUser, TUser } from "../redux/features/auth/authSlice";
import { useNavigate } from "react-router";
import { toast } from "sonner";


const Login = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const [login] = useLoginMutation();

    const onSubmit = async (data : FieldValues) => {

        const toastId = toast.loading('logged in...');

        try {
            const userInfo = {
                id: data.id,
                password: data.password,
            };
            const res = await login(userInfo).unwrap();
            // console.log('redux data =>', res.data);

            const userData = verifytoken(res.data.accessToken) as TUser;
            dispatch(setUser({
                user: userData,
                token: res.data.accessToken
            }));
            navigate(`/${userData.role}/dashboard`);
            toast.success('login successful', { id: toastId, duration: 2000})
        } catch (error) {
            toast.error('Something went wrong', { id: toastId, duration: 2000 });
        }
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