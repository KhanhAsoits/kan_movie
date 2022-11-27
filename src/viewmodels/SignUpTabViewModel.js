import {observer} from "mobx-react";
import {SignUpTab} from "../views/components/SignUpTab";
import {useEffect, useState} from "react";
import AuthStore from "../models/AuthStore";
import {Alert} from "react-native";
import alert from "native-base/src/components/composites/Alert/Alert";
import User from "../core/types/User";
import UserStore from "../models/UserStore";

const SignUpTabViewModel = () => {

    const [step, setStep] = useState(0)

    const [stepLoading, setStepLoading] = useState(false)
    const [confirmPassword, setConfirmPassword] = useState('')

    const alertBack = (handleSet, step = 1) => {
        console.log('discount step : ', step)
        Alert.alert('Warning', 'Do you want back ? ', [
            {
                style: 'destructive', text: 'I sure', onPress: () => {
                    handleSet()
                    setStep(c => c - step)
                }
            },
            {
                style: 'default', text: 'No ', onPress: () => {
                }
            }
        ])
    }

    const alertNext = (message) => {
        Alert.alert('Warning', message)
    }

    const backHandleStepTwo = () => {
        if (AuthStore.emailValidCode !== '') {
            const handleSet = () => {
            }
            alertBack(handleSet)
        }
    }
    const backHandleStepOne = async () => {
        if (AuthStore.userSignUp.email !== '') {
            const handleSet = () => {
                AuthStore.setUserEmail('')
            }
            alertBack(handleSet)
        } else {
            backStep(1)
        }
    }

    const backHandleStepThree = () => {
        if (confirmPassword !== '' || AuthStore.userSignUp.password !== '') {
            const handleSet = () => {
                AuthStore.setUserPassword('')
                setConfirmPassword('')
            }
            alertBack(handleSet, 2)
        } else {
            backStep(2)
        }
    }
    const backHandleStepFive = () => {
        if (AuthStore.userSignUp.avatar !== '') {
            const handleSet = () => {
                AuthStore.setAvatar('')
            }
            alertBack(handleSet)
        }
    }
    const nextHandleStepFive = async () => {
        console.log('here')
        if (AuthStore.userSignUp.avatar === '') {
            alertNext('Avatar not empty.')
        } else {
            //    sign Up
            setStepLoading(true)
            setTimeout(async () => {
                await AuthStore.onSignUp()
                setStepLoading(false)
            }, 500)
        }
    }
    const backHandleStepFour = () => {
        if (AuthStore.userSignUp.username !== '' || AuthStore.userSignUp.phone !== '' || AuthStore.userSignUp.time !== '') {
            const handleSet = () => {
                AuthStore.setUserName('')
                AuthStore.setPhone('')
                AuthStore.setTime('')
                AuthStore.setUserSignUpBirthDay('')
            }
            alertBack(handleSet)
        }
    }
    const nextHandleStepFour = async () => {
        setStepLoading(true)
        setTimeout(async () => {
            if (AuthStore.userSignUp.username.trim().length < 6) {
                alertNext('Username can not be less than 6 character.')
                setStepLoading(false)
                return;
            }
            if (AuthStore.userSignUp.phone.trim().length < 10) {
                alertNext('Phone can not be less than 10 character.')
                setStepLoading(false)

                return;
            }
            if (AuthStore.userSignUp.time === '') {
                let time = new Date(new Date().getFullYear() - 10, 1, 0).getTime()
                AuthStore.setTime(time)
                AuthStore.setUserSignUpBirthDay(new Date(time).toString())
            }
            //    if valid
            if (await AuthStore.onCheckNameAndPhone()) {
                setStep(c => c + 1)
            }
            setStepLoading(false)
        }, 500)
    }

    const nextHandleStepThree = () => {
        let valid = true
        if (AuthStore.userSignUp.password !== '' && confirmPassword !== '') {
            if (AuthStore.userSignUp.password.trim().length >= 8 && confirmPassword.trim().length >= 8) {
                if (AuthStore.userSignUp.password !== confirmPassword) {
                    Alert.alert('Waning', 'Confirm password not match.')
                    valid = false
                }
            } else {
                valid = false
                Alert.alert('Waning', 'Password can not less than 8 character.')
            }
        } else {
            valid = false
            Alert.alert('Waning', 'Password can not be empty.')
        }
        if (valid) {
            setStepLoading(true)
            setTimeout(() => {
                setStepLoading(false)
                nextStep(1)
            }, 500)
        }
    }
    const nextHandleStepOne = async () => {
        if (AuthStore.userSignUp.email === '') {
            alertNext('Email not empty.')
        } else {
            if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(AuthStore.userSignUp.email))) {
                alertNext('Email not incorrect format.')
            } else {
                setStepLoading(true)
                if (await AuthStore.onCheckEmailExit()) {
                    setTimeout(async () => {
                        await AuthStore.onGetEmailValidCode()
                        nextStep(1)
                        setStepLoading(false)
                    }, 500)
                } else {
                    alertNext('Email has taken.')
                    setStepLoading(false)
                }

            }
        }
    }

    const nextStep = (step) => {
        setStep(c => c + step)
    }
    const backStep = (step) => {
        setStep(c => c - step)
    }


    useEffect(() => {

    }, [step])
    return (
        <SignUpTab
            nextHandleStepFive={nextHandleStepFive}
            backHandleStepFive={backHandleStepFive}
            nextHandleStepFour={nextHandleStepFour}
            backHandleStepFour={backHandleStepFour}
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
            loading={stepLoading}
            backHandleStepThree={backHandleStepThree}
            nextHandleStepThree={nextHandleStepThree}
            backHandleStepOne={backHandleStepOne}
            nextHandleStepOne={nextHandleStepOne}
            backHandleStepTwo={backHandleStepTwo}
            step={step}
            setStep={setStep}/>
    )
}

export default observer(SignUpTabViewModel)