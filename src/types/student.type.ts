export interface IOfferedCourse {
    _id: string
    semesterRegistration: string
    academicSemester: string
    academicFaculty: string
    academicDepartment: string
    course: ICourse
    faculty: string
    maxCapacity: number
    section: number
    days: string[]
    startTime: string
    endTime: string
    createdAt: string
    updatedAt: string
    __v: number
    enrolledCourses: IEnrolledCourse[]
    completedCourses: ICompletedCourse[]
    completedCourseIds: string[]
    isPreRequisitesFulFilled: boolean
    isAlreadyEnrolled: boolean
}

export interface ICourse {
    _id: string
    title: string
    prefix: string
    code: number
    credits: number
    isDeleted: boolean
    preRequisiteCourses: IPreRequisiteCourse[]
    createdAt: string
    updatedAt: string
    __v: number
}

export interface IPreRequisiteCourse {
    course: string
    isDeleted: boolean
    _id: string
}

export interface IEnrolledCourse {
    _id: string
    semesterRegistration: string
    academicSemester: string
    academicFaculty: string
    academicDepartment: string
    offeredCourse: string
    course: string
    student: string
    faculty: string
    isEnrolled: boolean
    courseMarks: ICourseMarks
    grade: string
    gradePoints: number
    isCompleted: boolean
    __v: number
    updatedAt: string
}

export interface ICourseMarks {
    classTest1: number
    midTerm: number
    classTest2: number
    finalTerm: number
}

export interface ICompletedCourse {
    _id: string
    semesterRegistration: string
    academicSemester: string
    academicFaculty: string
    academicDepartment: string
    offeredCourse: string
    course: string
    student: string
    faculty: string
    isEnrolled: boolean
    courseMarks: ICourseMarks
    grade: string
    gradePoints: number
    isCompleted: boolean
    __v: number
    updatedAt: string
}

