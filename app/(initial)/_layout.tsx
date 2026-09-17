import { useTheme } from "@/contexts/theme/themeContext"
import FontAwesome from "@expo/vector-icons/FontAwesome"
import { Tabs } from "expo-router"

export default function Layout() {
    const { theme } = useTheme()

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: theme.activeIcon,
                tabBarInactiveTintColor: theme.inactiveIcon,
                tabBarStyle: {
                    backgroundColor: theme.secondaryBg,
                    borderTopColor: theme.secondaryBg,
                },
            }}
        >
            <Tabs.Screen
                name="home"
                options={{
                    title: "Início",
                    tabBarIcon: ({ color }) => <FontAwesome size={18} name="home" color={color} />
                }}
            />

            <Tabs.Screen
                name="author"
                options={{
                    title: "Autores",
                    tabBarIcon: ({ color }) => <FontAwesome size={18} name="users" color={color} />
                }}
            />

            <Tabs.Screen
                name="library"
                options={{
                    title: "Biblioteca",
                    tabBarIcon: ({ color }) => <FontAwesome size={18} name="book" color={color} />
                }}
            />

            <Tabs.Screen
                name="profile"
                options={{
                    title: "Perfil",
                    tabBarIcon: ({ color }) => <FontAwesome size={18} name="user" color={color} />
                }}
            />

        </Tabs>
    )
}