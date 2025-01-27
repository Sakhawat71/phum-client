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

export type TResponse = {
    data?: TData;
    error?: TError;
}