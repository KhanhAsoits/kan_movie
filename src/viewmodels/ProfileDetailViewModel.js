import {useNavigation} from "@react-navigation/native";
import UserStore from "../models/UserStore";
import {useEffect, useState} from "react";
import {Alert} from "react-native";
import {PickImage} from "../core/helper";
import ProfileDetailScreen from "../views/screens/profile/ProfileDetailScreen";
import {observer} from "mobx-react";

const ProfileDetailViewModel = ({route}) => {

    const nav = useNavigation()
    const listInput = [
        {
            title: 'username',
            icon: 'person',
            size: 20,
            value: UserStore.user.username,
            handle: UserStore.setUserUpdateName
        },
        {title: 'email', icon: 'mail', size: 20, value: UserStore.user.email, handle: UserStore.setUserUpdateEmail},
        {
            title: 'phone',
            icon: 'phone-portrait',
            size: 20,
            value: UserStore.user.phone,
            handle: UserStore.setUserUpdatePhone
        },
    ]
    const [loading, setLoading] = useState(false)

    const handleChangeBirthday = (event, date) => {
        const {type, nativeEvent: {timestamp}} = event
        UserStore.setUserUpdateTime(timestamp)
        UserStore.setUserUpdateBirthday(new Date(timestamp).toString())
    }
    const handleBack = () => {
        if (loading) {
            return;
        }
        nav.goBack()
    }
    useEffect(() => {
        nav.addListener('beforeRemove', (e) => {
            if (!UserStore.onCheckChange()) {
                return;
            }
            e.preventDefault()
            if (UserStore.onCheckChange()) {
                Alert.alert('Discard Change?', 'If you back,all change will loss.', [
                    {
                        text: 'Discard', style: 'destructive', onPress: () => {
                            UserStore.clearUserUpdateState(),
                                nav.dispatch(e.data.action)
                        }
                    },
                    {
                        text: 'No', style: 'cancel', onPress: () => {
                        }
                    }
                ])
            }
        })
    }, [nav])
    useEffect(() => {
        UserStore.clearUserUpdateState()
    }, [])
    const handlePickImage = async () => {
        let result = await PickImage()
        console.log(result)
        if (result) {
            UserStore.setUserUpdateAvatar(result)
        }
    }
    const handleValid = () => {
        if (UserStore.userUpdate.email !== '') {
            if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(UserStore.userUpdate.email))) {
                Alert.alert('Warning', 'Please,fill email correct format!')
                return false
            }
        }


        if (UserStore.userUpdate.username !== '' && UserStore.userUpdate.username.length === 0) {
            Alert.alert('Warning', 'Name not empty!')
            return false
        }

        if (UserStore.userUpdate.phone !== '' && UserStore.userUpdate.phone.length !== 10) {
            Alert.alert('Warning', 'Phone length must equal 10!')
            return false
        }
        return true
    }
    const handleSaveChange = async () => {
        if (handleValid()) {
            setLoading(true)
            setTimeout(async () => {
                await UserStore.onUpdate()
                setLoading(false)
            }, 2000)
        }
    }
    return (
        <ProfileDetailScreen handleSaveChange={handleSaveChange} handlePickImage={handlePickImage}
                             handleBack={handleBack} loading={loading} handleChangeBirthday={handleChangeBirthday}
                             listInput={listInput}/>
    )
}
export default observer(ProfileDetailViewModel)