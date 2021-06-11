/**
 * Validate Name field
 *
 * @param {string} value Field value to validate
 */
export function validateName(value: string) {
    let error;
    if (!value) {
        error = 'Enter a name';
    } else if (
        value.length < 3
    ) {
        error = 'Enter a name longer than 2 characters';
    }
    return error
}

/**
 * Validate Password field
 *
 * @param {string} value Field value to validate
 */
export function validatePassword(value: string) {
    let error;
    if (!value) {
        error = 'Enter a password';
    } else if (
        value.length < 6
    ) {
        error = 'Enter a password longer than 6 characters';
    }
    return error
}

/**
 * Validate Email field
 *
 * @param {string} value Field value to validate
 */
export function validateEmail(value: string) {
    let error;
    if (!value) {
        error = 'Enter a email';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
        error = 'Enter an email address in the correct format, such as name@example.com';
    }
    return error;
}