import { TAcademicFaculty } from "./global.type"

export type TAcademicDepartment = {
    _id: string
    name: string
    academicFaculty: TAcademicFaculty
    createdAt: string
    updatedAt: string
    __v: number
};

export type TCreateADepartment = {
    name: string;
    academicFaculty: string;
};