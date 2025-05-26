export type TApiValidationErrorsResponse = {
    violations: { propertyPath: string; message: string }[];
};

export type TFormError = {
    [key: string]: string;
};
export default (err: TApiValidationErrorsResponse) => {
    if (err.violations) {
        const errObj: TFormError = {};
        err.violations.forEach((error) => {
            errObj[error.propertyPath] = error.message;
        });
        return errObj;
    }

    return false;
};
