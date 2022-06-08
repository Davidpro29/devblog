
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './pages/Home';
import Search from './pages/Search';
import CategoryPosts from './pages/CategoryPosts';
import Detail from './pages/Detail';

const Stack = createNativeStackNavigator();

function Routes(){
    return(
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={Home}
                options={{
                    headerShown: false
                }}
            />

             <Stack.Screen
                name="Category"
                component={CategoryPosts}
                options={{
                    headerTintColor: "#fff",
                    headerStyle:{
                        backgroundColor: '#232630',
                    },
                    title: 'Categoria',
                    headerShown: false
                }}
            />

            <Stack.Screen
                name="Detail"
                component={Detail}
                options={{
                    title: 'Detalhes',
                    headerTintColor: '#fff',
                    headerStyle:{
                        backgroundColor: '#232630',
                    },
                    headerShown: false
                }}
            />

            <Stack.Screen
                name="Search"
                component={Search}
                options={{
                    headerShown: false,
                    title: 'Procurando algo?',
                    headerTintColor: '#fff',
                    headerStyle:{
                        backgroundColor: '#232630',
                    },
                }}
            />
        </Stack.Navigator>
    )
}

export default Routes;