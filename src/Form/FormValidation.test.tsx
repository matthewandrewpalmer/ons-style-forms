import React from "react";
import {validateEmail, validateName, validatePassword} from "./FormValidation";

test('name length validation', async () => {
    let errorMessage = validateName("Ma");

    expect(errorMessage).toEqual("Enter a name longer than 2 characters")

    errorMessage = validateName("Matthew");

    expect(errorMessage).toEqual(undefined)
});

test('password length validation', async () => {
    let errorMessage = validatePassword("Passw");

    expect(errorMessage).toEqual("Enter a password longer than 6 characters")

    errorMessage = validatePassword("Password");

    expect(errorMessage).toEqual(undefined)
});

test('email validation', async () => {
    const invalidEmailMessage = "Enter an email address in the correct format, such as name@example.com"

    let errorMessage = validateEmail("matthew");
    expect(errorMessage).toEqual(invalidEmailMessage)

    errorMessage = validateEmail("matthew@email");
    expect(errorMessage).toEqual(invalidEmailMessage)

    errorMessage = validateEmail("matthew@email");
    expect(errorMessage).toEqual(invalidEmailMessage)

    errorMessage = validateEmail("matthew@email.");
    expect(errorMessage).toEqual(invalidEmailMessage)

    errorMessage = validateEmail("matthew@email.com");
    expect(errorMessage).toEqual(undefined)
});