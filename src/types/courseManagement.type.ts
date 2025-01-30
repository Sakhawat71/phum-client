export interface ISemesterRegistration {
    academicSemester: string;
    status: string;
    startDate: string;
    endDate: string;
    minCredit: number;
    maxCredit: number;
};

export interface ICourse {
    _id: string;
    title: string;
    prefix: string;
    code: number;
    credits: number;
    isDeleted: boolean;
    preRequisiteCourses: IPreRequisiteCourse[];
    createdAt: string;
    updatedAt: string;
}

export interface IPreRequisiteCourse {
    course: ICourse;
    isDeleted: boolean;
    _id: string;
}