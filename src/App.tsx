import {Field, Form, Formik, FormikErrors, FormikValues} from 'formik';
import React, {ReactElement, useEffect} from 'react';
import Layout from "./Layout";


function toUpperCase(string: string): string {
    return string.trim().replace(/^\w/, (c: string) => c.toUpperCase())
}

const MyInput = ({field, form, description, ...props}: any) => {
    return <>

        <div className="field">
            <label className={`label ${(description ? "label--with-description" : "")}`} htmlFor={field.name}>
                {toUpperCase(field.name)}
            </label>
            {
                description &&
                <span id="description-hint" className="label__description  input--with-description">
                    {description}
                </span>
            }
            <input id={field.name}
                   className="input input--text input-type__input "
                   {...field}
                   {...props}/>
        </div>
    </>
};

function FormErrorSummary(isValid: boolean, errors: FormikErrors<FormikValues>) {
    let errorFocus: HTMLDivElement | null;

    useEffect(() => {
        errorFocus?.focus();
    }, [errors, isValid])

    return <>
        {
            !isValid &&
            <div aria-labelledby="error-summary-title" role="alert" tabIndex={-1}
                 ref={inputEl => (errorFocus = inputEl)}
                 className="panel panel--error">
                <div className="panel__header">
                    <h2 id="error-summary-title" data-qa="error-header"
                        className="panel__title u-fs-r--b">
                        {
                            (
                                Object.keys(errors).length === 1 ?
                                    `There is 1 problem with your answer`
                                    :
                                    `There are ${Object.keys(errors).length} problems with your answer`
                            )
                        }
                    </h2>
                </div>
                <div className="panel__body">
                    <ol className="list">
                        {Object.keys(errors).map((field, index) =>
                            <li key={index} className="list__item ">
                                <a href={`#${field}`} className="list__link js-inpagelink">
                                    {
                                        // @ts-ignore
                                        errors[field]
                                    }
                                </a>
                            </li>
                        )}

                    </ol>
                </div>
            </div>
        }
    </>;
}

function App() {
    function validateEmail(value: string) {
        let error;
        if (!value) {
            error = 'Enter a email';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
            error = 'Invalid email address';
        }
        return error;
    }


    function InputErrorPanel(fieldError: string, fieldName: string, field: ReactElement) {
        return (
            <div className="panel panel--error panel--no-title u-mb-s"
                 id={`${fieldName}-error`}>
                <span className="u-vh">Error: </span>
                <div className="panel__body">
                    <p className="panel__error">
                        <strong>{fieldError}</strong>
                    </p>
                    {field}
                </div>
            </div>
        );
    }

    return (
        <Layout>
            <>
                <header className="App-header">
                    <h1>Page title</h1>
                </header>

                <Formik
                    validateOnBlur={false}
                    validateOnChange={false}
                    initialValues={{name: '', lastName: '', email: '', password: ''}}
                    validate={values => {
                        const errors: any = {};
                        if (!values.name) {
                            errors.name = 'Enter a name';
                        } else if (
                            values.name.length < 3
                        ) {
                            errors.name = 'Enter a name longer than 2 characters';
                        }
                        if (!values.lastName) {
                            errors.lastName = 'Enter a last name';
                        }
                        return errors;
                    }}
                    onSubmit={(values, {setSubmitting}) => {
                        console.log("on submit")
                        setTimeout(() => {
                            // validateForm().then(() => console.log("Validated"))
                            alert(JSON.stringify(values, null, 2));
                            setSubmitting(false);
                        }, 400);
                    }}
                >
                    {({
                          errors,
                          touched,
                          isSubmitting,
                          isValid
                      }) => (
                        <Form>
                            {FormErrorSummary(isValid, errors)}

                            {
                                errors.name && touched.name ?
                                    InputErrorPanel(
                                        errors.name,
                                        "name",
                                        <Field name="name" component={MyInput}/>
                                    )
                                    :
                                    <Field name="name" component={MyInput}/>
                            }

                            {
                                errors.lastName && touched.lastName ?
                                    InputErrorPanel(
                                        errors.lastName,
                                        "lastName",
                                        <Field name="lastName" component={MyInput}/>
                                    )
                                    :
                                    <Field name="lastName" component={MyInput}/>
                            }


                            {
                                errors.email && touched.email ?
                                    InputErrorPanel(
                                        errors.email,
                                        "email",
                                        <Field name="email" component={MyInput} validate={validateEmail}/>
                                    )
                                    :
                                    <Field name="email"
                                           description="This will not be stored and only used once to send your confirmation"
                                           component={MyInput} validate={validateEmail}/>
                            }

                            {
                                errors.password && touched.password ?
                                    InputErrorPanel(
                                        errors.password,
                                        "password",
                                        <Field name="password" type="password" component={MyInput}/>
                                    )
                                    :
                                    <Field name="password" type="date" component={MyInput}/>
                            }


                            <br/>



                            <button type="submit" className="btn" disabled={isSubmitting}>
                                <span className="btn__inner">Save and continue</span>
                            </button>
                        </Form>
                    )}
                </Formik>
            </>
        </Layout>
    );
}

export default App;
