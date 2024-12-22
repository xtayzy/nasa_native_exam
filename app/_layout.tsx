import { Tabs } from "expo-router";
import { AuthProvider } from "./components/AuthProvider";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Foundation from 'react-native-vector-icons/Foundation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function RootLayout() {
    return (
        <AuthProvider>
            <Tabs
                screenOptions={{
                    tabBarActiveTintColor: '#f0f6fc',
                    tabBarInactiveTintColor: '#8b949e',
                    tabBarStyle: {
                        backgroundColor: '#0d1117',
                        borderTopWidth: 1,
                        borderTopColor: '#8b949e',
                        height: 60,
                        paddingBottom: 10,
                        paddingTop: 10,
                    },
                    headerShown: false,
                }}
                initialRouteName="index"
            >
                <Tabs.Screen
                    name="index"
                    options={{
                        title: "",
                        tabBarIcon: ({ color }) => (
                            <Ionicons name="today-outline" size={25} color={color} />
                        ),
                    }}
                />

                <Tabs.Screen
                    name="screens/ImageByDate"
                    options={{
                        title: "",
                        tabBarIcon: ({ color }) => (
                            <Fontisto name="date" size={25} color={color} />
                        ),
                    }}
                />

                <Tabs.Screen
                    name="screens/ImagesByDate"
                    options={{
                        title: "",
                        tabBarIcon: ({ color }) => (
                            <MaterialIcons name="date-range" size={25} color={color} />
                        ),
                    }}
                />

                <Tabs.Screen
                    name="screens/ImagesRandom"
                    options={{
                        title: "",
                        tabBarIcon: ({ color }) => (
                            <Foundation name="die-three" size={25} color={color} />
                        ),
                    }}
                />

                <Tabs.Screen
                    name="screens/Profile"
                    options={{
                        title: "",
                        tabBarIcon: ({ color }) => (
                            <Ionicons name="person-outline" size={25} color={color} />
                        ),
                    }}
                />
            </Tabs>
        </AuthProvider>
    );
}
