const usernameRegex = new RegExp(/^[A-Za-z]+[0-9]*$/)
const studentIdRegex = new RegExp(/^[1|3][0-9]{8}$/)

export function validateUsername(username: string): boolean {
    return usernameRegex.test(username);
}

export function validateStudentId(studentId: string): boolean {
    return studentIdRegex.test(studentId);
}
