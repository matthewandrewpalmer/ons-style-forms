import React, {useState} from 'react';
import Layout from "./Layout";
import SimpleForm, {FormField} from "./SimpleForm";

function App() {

    const [formStatus, setFormStatus] = useState<string>("");

    function validateName(value: string) {
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

    function validatePassword(value: string) {
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

    function validateEmail(value: string) {
        let error;
        if (!value) {
            error = 'Enter a email';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
            error = 'Invalid email address';
        }
        return error;
    }

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
        },
        {
            name: "Date",
            type: "date"
        }
    ]

    function onFormSubmission(formValues: any) {
        console.warn(formValues);
        setFormStatus(`Form submitted for user ${formValues.name}`)
    }

    return (
        <Layout>
            <>
                <header className="App-header">
                    <h1>Page title</h1>
                </header>

                <p>{formStatus}</p>

                <SimpleForm fields={formElements} onSubmitFunction={onFormSubmission}/>


            </>
        </Layout>
    );
}

export default App;
