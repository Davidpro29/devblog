import React, {useEffect, useState, useLayoutEffect} from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView, TouchableOpacity, ScrollView, Share, Modal} from 'react-native';

import { useNavigation, useRoute } from '@react-navigation/native';
import api from '../../services/api';
import LinkWeb from '../../components/LinkWeb';

import {Feather, Entypo} from '@expo/vector-icons';

export default function Detail(){
    const route = useRoute();
    const navigation = useNavigation();

    const [post, setPost] = useState([]);
    const [links, setLinks] = useState([]);

    const [modalVivible, setModalVisible] = useState(false)
    const [openLink, setOpenLink] = useState({})

    useEffect(() => {
        async function getPost(){
            const response = await api.get(`api/posts/${route.params?.id}?populate=cover, category,Opcoes`)
            setPost(response.data.data)
            setLinks(response.data?.data?.attributes?.Opcoes)
        }

        getPost();
    }, [])

    useLayoutEffect(()=> {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={handleShare}>
                    <Entypo name="share" size={25} color="#fff" />
                </TouchableOpacity>
            )
        })
    }, [navigation, post])

    async function handleShare(){
        try{
            const result = await Share.share({
                message: `
                    Olha só esse post: ${post?.attributes?.title}
                    ${post?.attributes?.description}

                    Vi lá no app DevBlog do David!
                `
            })

            if(result.action === Share.sharedAction){
                if(result.activityType){
                    console.log("Activity type")
                }else{
                    console.log('Conpartilhado com sucesso')
                }
            }else if(result.action === Share.dismissedAction){
                console.log('Modal fechado')
            }
        }catch(error){
             console.log('error')
        }       
    }

    function handleOpenLink(link){
        setModalVisible(true)
        setOpenLink(link)
    }

    return(
        <SafeAreaView style={styles.container}>
            <Image 
                style={styles.cover}
                source={{ uri: `http://192.168.0.102:1337${post?.attributes?.cover?.data?.attributes?.url}`}}
            />

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                <Text style={styles.title}>
                    {post?.attributes?.title}
                </Text>

                <Text style={styles.description}>
                    {post?.attributes?.description}
                </Text>

                {links.length > 0 && (
                    <Text style={styles.subTitle}>Links disponíveis</Text>
                )}

                {links.map(link =>(
                    <TouchableOpacity
                        key={link.id}
                        style={styles.linkButton}
                        onPress={() => handleOpenLink(link) }
                    >
                        <Feather name="link" color="#1e4687" size={14} />
                        <Text style={styles.linkText}>{link.name}</Text>
                    </TouchableOpacity>
                ))}

            </ScrollView>

            <Modal visible={modalVivible} transparent={true}>
                <LinkWeb 
                    link={openLink?.url}
                    title={openLink?.name}
                    closeModal={ () => setModalVisible(false)}
                />
            </Modal>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#fff',
    },

    cover:{
        width: '100%',
        height: 230
    },

    title:{
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 14,
        marginTop: 14,
    },

    content:{
        paddingHorizontal: 12
    },

    description:{
        lineHeight: 18,
    },

    subTitle:{
        fontWeight: 'bold',
        marginTop: 14,
        marginBottom: 6,
        fontSize: 18,    
    },

    linkButton:{
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },

    linkText:{
        color: '#1e4687',
        fontSize: 16,
        marginLeft: 6
    }
})
