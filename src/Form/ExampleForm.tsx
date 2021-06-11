import React, {useState} from 'react';
import StyledForm, {FormField} from "../StyledForm";
import {validateEmail, validateName, validatePassword} from "./FormValidation";

function ExampleForm() {

    const [formStatus, setFormStatus] = useState<string>("");

    const formElements: FormField[] = [
        {
            name: "name",
            description: "Name must be longer than 2 characters",
            type: "text",
            validate: validateName
        },
        {
            name: "Email",
            description: "This will not be stored and only used once to send your confirmation",
            type: "email",
            validate: validateEmail
        },
        {
            name: "Password",
            description: "Password must be longer than 6 characters",
            type: "password",
            validate: validatePassword
        }
    ]

    function onFormSubmission(formValues: any, setSubmitting: (isSubmitting: boolean) => void): void {
        console.warn(formValues);
        setFormStatus(`Form submitted for user ${formValues.name}`)
        setSubmitting(false);
    }


    return (
        <>
            <p>{formStatus}</p>

            <StyledForm fields={formElements} onSubmitFunction={onFormSubmission}/>
        </>
    )
}


export default ExampleForm;