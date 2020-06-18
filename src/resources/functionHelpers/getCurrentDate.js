export const getCurrentDate = () => {
    return new Date().toLocaleDateString().split('.').reverse().join('-');
}