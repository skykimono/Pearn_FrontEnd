import variable from "../utils/variable"

export const AccountHeaders = variable([
    "Id",
    "Username",
    "FullName",
    "Email",
    "Role",
    "Option"
  ])

export const CourseHeaders = variable([
    "Id",
    "Code",
    "Name",
    "Lecturer",
    "Option"
])

export const LecturerHeaders = variable([
    "Username",
    "FullName",
    "Email",
    "Role",
    "Option"
])

export const assignedStudentsHeader = variable([
  "Id",
  "Username",
  "FullName",
  'Email',
  'Role'
])

export const studentsHeaders = variable([
  "Username",
  "FullName",
  "Email",
  "Role"
])
