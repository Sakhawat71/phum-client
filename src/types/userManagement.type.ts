
export interface IStudentData {
    password: string;
    student: IStudent;
};

export interface IStudent {
    id?: string;
    name: IName;
    gender: string;
    bloodGroup?: string;
    dateOfBirth: string;
    email: string;
    contactNo: string;
    emergencyContactNo: string;
    presentAddress: string;
    permanentAddress: string;
    guardian: IGuardian;
    localGuardian: ILocalGuardian;
    admissionSemester: string;
    academicDepartment: string;
    isDeleted: boolean;
};

export interface IName {
    firstName: string;
    middleName: string;
    lastName: string;
};

export interface IGuardian {
    fatherName: string;
    fatherOccupation: string;
    fatherContactNo: string;
    motherName: string;
    motherOccupation: string;
    motherContactNo: string;
};

export interface ILocalGuardian {
    name: string;
    occupation: string;
    contactNo: string;
    address: string;
};

export type TUser = {
    _id: string;
    id: string;
    email: string;
    needsPasswordChange: boolean;
    role: string;
    status: string;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
};


export interface IAdmin {
    _id: string;
    id: string;
    user: string;
    designation: string;
    name: IAdminName;
    gender: string;
    dateOfBirth: string;
    email: string;
    contactNo: string;
    emergencyContactNo: string;
    bloogGroup: string;
    presentAddress: string;
    permanentAddress: string;
    profileImg?: string;
    isDeleted?: boolean;
    fullName: string;
}

export interface IAdminName {
    firstName: string;
    middleName?: string;
    lastName: string;
    _id: string;
}
