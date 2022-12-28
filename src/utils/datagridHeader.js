import variable from "../utils/variable"

export const AccountHeaders = variable([
    "Id",
    "Username",
    "Full Name",
    "Email",
    "Role",
    "Option"
  ])

export const CourseHeaders = variable([
  "Id",
    "Course Code",
    "Course Name",
    "Lecturer Name",
    "Option"
])

export const LecturerHeaders = variable([
  "Username",
    "Full Name",
    "Email",
    "Role",
    "Option"
])

export const assignedStudentsHeader = variable([
  "Id",
  "Username",
  "Full Name",
  "Email",
])

export const studentsHeaders = variable([
  "Username",
  "Full Name",
  "Email",
  "Role"
])
