import { FieldValues, SubmitHandler } from "react-hook-form";

import { Card } from "antd";
import { toast } from "sonner";
import PHForm from "../components/form/PHform";
import PHInput from "../components/form/PHinput";
import { useChangePasswordMutation } from "../redux/features/admin/userManagement.api";
import { useAppDispatch } from "../redux/hooks";
import { logOut } from "../redux/features/auth/authSlice";
import {useNavigate } from "react-router";

const ChangePassword = () => {

    const [changePassword] = useChangePasswordMutation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const toastId = toast.loading('try to change password')
        // console.log(data);

        try {
            const res = await changePassword(data);
            console.log(res);

            if (res?.data?.success) {
                dispatch(logOut());
                toast.success("Password changed successfully!", { id: toastId });
                navigate('/login');
            }
            else {
                const errorMessage = (res?.error as any)?.data?.message || 'An error occurred';
                toast.error(errorMessage, { id: toastId });
            }
        } catch (error) {
            toast.error('can`t change password', { id: toastId })
        }
    };

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
            <Card style={{ width: 400, padding: "20px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)", borderRadius: "10px" }}>
                <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Change Password</h2>

                <PHForm onSubmit={onSubmit}>
                    <PHInput
                        name="oldPassword"
                        type="password"
                        label="Old Password"
                        placeholder="Enter Old Password"
                    />

                    <PHInput
                        name="newPassword"
                        type="password"
                        label="New Password"
                        placeholder="Enter new password"
                    />

                </PHForm>
            </Card>
        </div>
    );
};

export default ChangePassword;
