
import { z } from "zod";

export const academicSemesterSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    year: z.string().min(1, { message: "Year is required" }),
    startMonth: z.string().min(1, { message: "Start month is required" }),
    endMonth: z.string().min(1, { message: "End month is required" }),
});

export const academicFacultySchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
});