import { Button, Callout, FormGroup, InputGroup, Card } from "@blueprintjs/core"
import React, { useState } from "react"

const ForgotPassword = () => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState("")
    const [email, setEmail] = useState("")
    const [submitted, setSubmitted] = useState(false)
    const formSubmitHandler = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)
        setError("")
    
        const genericErrorMessage = "Something went wrong! Please try again later."
    
    
        fetch(process.env.REACT_APP_API_ENDPOINT + "users/emailUser", {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: email }),
        })
          .then(async response => {
            setIsSubmitting(false)
            if (!response.ok) {
              if (response.status === 400) {
                setError("Please fill all the fields correctly!")
              } else if (response.status === 401) {
                setError("Invalid email and password combination.")
              } else if (response.status === 500) {
                console.log(response)
                const data = await response.json()
                if (data.message) {
                  if (data.message.includes("already")) {
                    setError(`${data.message}<br>${<a href="/user/forgot">Forget your password?</a>}` || genericErrorMessage)
                    }else{
                      setError(data.message || genericErrorMessage)
                    } 
                }
              } else {
                setError(genericErrorMessage)
              }
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
              <p>Check your email for a link to reset your password.</p>
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
          <h1>Forget your password?</h1>
            {error && <Callout intent="danger">{error}</Callout>}
            <form onSubmit={formSubmitHandler} className="auth-form">
                <FormGroup label="Email" labelFor="email">
                    <InputGroup
                        id="email"
                        placeholder="Email"
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </FormGroup>
                <Button
                    intent="primary"
                    disabled={isSubmitting}
                    text={`${isSubmitting ? "Submitting" : "Submit"}`}
                    fill
                    type="submit"
                />
            </form>
        </Card>
      )
}

export default ForgotPassword;