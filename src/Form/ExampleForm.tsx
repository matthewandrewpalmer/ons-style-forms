import React, {useState} from 'react';
import StyledForm, {FormField} from "../StyledForm";
import {validateEmail, validateName, validatePassword} from "./FormValidation";

function ExampleForm() {

    const [formStatus, setFormStatus] = useState<string>("");

    /** List of fields in order for form generation */
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

    /**
     * Function is called after submit of form and all field validation is valid
     *
     * @param formValues Object with all field values
     * @param setSubmitting Function to set isSubmitting attribute which disables submit button while processing the form
     */
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