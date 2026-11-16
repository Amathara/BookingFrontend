import { View, Text, Button } from 'react-native'
import React from 'react'
import { useAuthStore } from '@/utils/authStore';

const AdminScreen = () => {
  const { logOut } = useAuthStore();
  return (
    <View>
      <Text>Admin screen!</Text>
      <Button
                title="Log out"
                onPress={logOut}
            />
    </View>
  )
}

export default AdminScreen