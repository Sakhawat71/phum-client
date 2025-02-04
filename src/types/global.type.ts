import { BaseQueryApi } from "@reduxjs/toolkit/query";

export type TError = {
    data: {
        message: string;
        stack: string;
        success: boolean;
    };
    status: number;
};

export type TAcademicSemester = {
    _id: string; 
    name: string;
    code: string;
    year: string;
    startMonth: string;
    endMonth: string;
};

export type TAcademicFaculty = {
    _id: string
    name: string
    createdAt?: string
    updatedAt?: string
    __v?: number
};



export type TMeta = {
    limit: number;
    page: number;
    total: number;
    totalPage: number;
};

export type TResponse<T> = {
    data?: {
        result: T;
        meta: TMeta;
    };
    error?: TError;
    meta?: TMeta;
    success: boolean;
    message: string;
};

export type TStudentRes<T> = {
    result : T;
    meta : TMeta;
}

export type TResponseRedux<T> = TResponse<T> & BaseQueryApi;

// export interface FacultyType {
//     _id: string;
//     name: string;
//     department: string;
// }
