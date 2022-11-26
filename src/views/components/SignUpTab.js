import {StepZero} from "../screens/auth/StepZero";
import StepOne from "../screens/auth/StepOne";
import StepTwo from "../screens/auth/StepTwo";
import StepThree from "../screens/auth/StepThree";
import StepFour from "../screens/auth/StepFour";
import StepFive from "../screens/auth/StepFive";
import SignUpTabViewLayout from "../screens/auth/SignUpTabViewLayout";

export const SignUpTab = ({
                              backHandleStepFive,
                              nextHandleStepFive,
                              nextHandleStepFour,
                              backHandleStepFour,
                              nextHandleStepThree,
                              backHandleStepThree,
                              confirmPassword,
                              setConfirmPassword,
                              backHandleStepTwo,
                              loading,
                              backHandleStepOne,
                              nextHandleStepOne,
                              step,
                              setStep
                          }) => {

    const limitStep = 5
    return (
        <>
            {step === 0 ? <StepZero setStep={setStep}/> :
                step === 1 ?
                    <SignUpTabViewLayout loading={loading} handleBack={backHandleStepOne} handleNext={nextHandleStepOne}
                                         step={step}
                                         limit={limitStep}><StepOne/></SignUpTabViewLayout> :
                    step === 2 ?
                        <SignUpTabViewLayout handleBack={backHandleStepTwo} loading={loading} step={step}
                                             limit={limitStep}><StepTwo nextStep={() => {
                            setStep(c => c + 1)
                        }}/></SignUpTabViewLayout> :
                        step === 3 ?
                            <SignUpTabViewLayout handleBack={backHandleStepThree} handleNext={nextHandleStepThree}
                                                 loading={loading}
                                                 step={step} limit={limitStep}><StepThree
                                confirmPassword={confirmPassword}
                                setConfirmPassword={setConfirmPassword}/></SignUpTabViewLayout> :
                            step === 4 ?
                                <SignUpTabViewLayout handleBack={backHandleStepFour} handleNext={nextHandleStepFour}
                                                     loading={loading}
                                                     step={step} limit={limitStep}><StepFour/></SignUpTabViewLayout> :
                                <SignUpTabViewLayout handleBack={backHandleStepFive} handleNext={nextHandleStepFive}
                                                     loading={loading}
                                                     step={step} limit={limitStep}><StepFive/></SignUpTabViewLayout>}
        </>
    )
}