//validate email (RegEx pattern)
export const email_Pattern = /^[\w-\.]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

//access user from localStorage
export const user = JSON.parse(localStorage.getItem('user'))

//handle api calls using projectID
export const getHeaderWithProjectId = () => {
    return {
        headers: {
            projectID: "m4j7rg2gyz80"
        }
    }
}