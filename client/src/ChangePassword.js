import { Button, Callout, FormGroup, InputGroup, Card } from "@blueprintjs/core"
import React, { useState } from "react"

const ChangePassword = () => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState("")
    const [password, setPassword] = useState("")
    const [submitted, setSubmitted] = useState(false)
    var token = document.location.href.split('token=')[1];
    var username = document.location.href.split('email=')[1];

    console.log(token)
    console.log(username)
    const formSubmitHandler = e => {
        e.preventDefault()
        setIsSubmitting(true)
        setError("")

        const genericErrorMessage = "Something went wrong! Please try again later."

        fetch(process.env.REACT_APP_API_ENDPOINT + 'users/updatePassword', {
            method: 'POST',
            credentials: 'include',
            headers: { 
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ password: password, username: username })
        })
        .then(async response => {
            setIsSubmitting(false)
            if (!response.ok) {
                setError(genericErrorMessage)
            } else {
                setSubmitted(true)
            }
        })
        .catch(error => {
            setIsSubmitting(false)
            setError(genericErrorMessage)
        })
    }
    return submitted === true ? (
        <Card className="account-card" elevation="0">
          <Callout title="Email sent" icon="tick-circle" intent="success">
              <p>Password changed. You can now use your new password.</p>
          </Callout>
          <a href="/user">
              <Button 
                  intent="primary"
                  text="Back to Login"
                  icon="log-in"
                  fill
              />
          </a>
        </Card>
    ) : (
        <Card className="account-card" elevation="0">
            <h1>Change Password</h1>
            {error && <Callout intent="danger">{error}</Callout>}
            {submitted && <Callout intent="success">Password changed successfully!</Callout>}
            <form onSubmit={formSubmitHandler} className="auth-form">
                <FormGroup label="Password" labelFor="password">
                    <InputGroup
                        id="password"
                        placeholder="Password"
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </FormGroup>
                <Button type="submit" intent="primary" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Submit"}
                </Button>
            </form>
        </Card>
        )
}

export default ChangePassword