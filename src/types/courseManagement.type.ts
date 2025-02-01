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
};

export interface IPreRequisiteCourse {
    course: ICourse;
    isDeleted: boolean;
    _id: string;
};

export interface IOfferedCourse {
    semesterRegistration: string;
    academicDepartment: string;
    academicFaculty: string;
    course: string;
    faculty: string;
    maxCapacity: number;
    section: number;
    days: string[];
    startTime: string;
    endTime: string;
};