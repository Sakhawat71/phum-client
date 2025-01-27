import { BaseQueryApi } from "@reduxjs/toolkit/query";

export type TError = {
    data: {
        message: string;
        stack: string;
        success: boolean;
    };
    status: number;
};

type TSemester = {
    name: string;
    code: string;
    year: string;
    startMonth: string;
    endMonth: string;
}

export type TData = {
    data: TSemester;
    message: string;
    success: boolean;
};

export type TMeta = {
    limit: number;
    page: number;
    total: number;
    totalPage: number;
};

export type TResponse = {
    data?: TData;
    error?: TError;
    mete?: TMeta;
    success: boolean;
    message: string;
};

export type TResponseRedux = TResponse & BaseQueryApi;