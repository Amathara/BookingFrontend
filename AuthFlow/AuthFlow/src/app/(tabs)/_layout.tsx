import { useAuthStore } from "@/utils/authStore";
import { Tabs } from "expo-router";

export default function TabsLayout() {
    const {isVip} = useAuthStore();
  return <Tabs>
    <Tabs.Screen name="index" options={{title: 'Home'}} />
    <Tabs.Protected guard={isVip} >
    <Tabs.Screen name="vip" options={{title: 'VIP'}}/>
    </Tabs.Protected>
    <Tabs.Screen name="settings" options={{title: 'Settings'}}/>
    </Tabs>;
}
