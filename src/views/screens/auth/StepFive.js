import {Box, Text, VStack} from "native-base";
import {observer} from "mobx-react";
import {Image, TouchableOpacity, StyleSheet} from "react-native";
import avatar from '../../../../assets/static/images/user.png'
import {useState} from "react";
import {PickImage} from "../../../core/helper";
import AuthStore from "../../../models/AuthStore";

const StepFive = () => {
    const [previewImage, setPreviewImage] = useState('')
    const pickImage = async () => {
        let img = await PickImage()
        if (img) {
            setPreviewImage(img)
            AuthStore.setAvatar(img)
        }
    }
    console.log(previewImage)
    return (
        <Box flex={1} px={4}>
            <VStack>
                <Text color={'white'} fontSize={40} fontWeight={'600'} textAlign={'center'}>Upload your avatar.</Text>
                <TouchableOpacity onPress={pickImage} style={{
                    marginTop: 100,
                    width: 200, height: 200, borderRadius: 100,
                    backgroundColor: 'white',
                    alignSelf: 'center'
                }}>
                    <Image source={previewImage !== '' ? {uri: previewImage} : avatar}
                           style={{
                               borderRadius: 100,
                               position: 'absolute',
                               top: 0,
                               left: 0,
                               width: '100%',
                               height: '100%'
                           }}/>
                </TouchableOpacity>
            </VStack>
        </Box>
    )
}

export default observer(StepFive)