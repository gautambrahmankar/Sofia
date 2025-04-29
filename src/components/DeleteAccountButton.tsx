import auth from '@react-native-firebase/auth';
import { Alert, Text, TouchableOpacity } from 'react-native';
import { storage } from '../utils/storage';

function DeleteAccountButton({ navigation }) {
  const handleDeleteAccount = async () => {
    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete your account? This action cannot be undone.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              const user = auth().currentUser;
              if (user) {
                await user.delete();
                Alert.alert(
                  "Account Deleted", 
                  "Your account has been successfully deleted.",
                  [
                    {
                      text: "OK",
                      onPress: () => {
                        // Clear stored data
                        storage.delete('user_data');
                        storage.delete('onboarding_data');
                        storage.delete('scanResult');
                        
                        // Navigate to Login screen
                        navigation.reset({
                          index: 0,
                          routes: [{ name: 'Login' }],
                        });
                      }
                    }
                  ]
                );
              }
            } catch (error: any) {
              console.error('Delete account error:', error);
              if (error.code === 'auth/requires-recent-login') {
                Alert.alert(
                  "Session Expired",
                  "Please re-login and try deleting your account again."
                );
              } else {
                Alert.alert("Error", "Failed to delete account. Please try again later.");
              }
            }
          },
        },
      ]
    );
  };

  return (
    <TouchableOpacity onPress={handleDeleteAccount}>
      <Text style={{ fontSize: 16, color: 'red' }}>Delete My Account</Text>
    </TouchableOpacity>
  );
}

export default DeleteAccountButton;