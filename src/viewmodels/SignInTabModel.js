import SignInTab from "../views/components/SignInTab";
import {useEffect, useState} from "react";
import AuthStore from "../models/AuthStore";
import {observer} from "mobx-react";

const SignInTabModel = ({route, setActive}) => {
    const [emailIsValid, setEmailIsValid] = useState(AuthStore.authInfo.username !== "")
    const [passwordIsValid, setPasswordIsValid] = useState(AuthStore.authInfo.password !== "")

    const handleValidEmail = () => {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(AuthStore.authInfo.username)) {
            setEmailIsValid(true)
        } else {
            setEmailIsValid(false)
        }
    }
    const handleValidPassword = () => {
        if (AuthStore.authInfo.password.length <= 6) {
            setPasswordIsValid(false)
        } else {
            setPasswordIsValid(true)
        }
    }

    useEffect(() => {
        handleValidEmail()
    }, [AuthStore.authInfo.username])

    useEffect(() => {
        handleValidPassword()
    }, [AuthStore.authInfo.password])

    useEffect(() => {
        if (emailIsValid === true && passwordIsValid === true) {
            AuthStore.setSignInValid(true)
        } else {
            AuthStore.setSignInValid(false)
        }
    }, [emailIsValid, passwordIsValid])

    return (
        <SignInTab
            setActive={setActive}
            emailIsValid={emailIsValid}
            passwordIsValid={passwordIsValid}
        />
    )
}
export default observer(SignInTabModel)