const validateInput = (input, regexStr) => {
    const regex = new RegExp(regexStr);
    return regex.test(input);
}
export default validateInput;