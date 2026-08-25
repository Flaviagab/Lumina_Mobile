import {
    Lato_400Regular,
    Lato_700Bold,
    Lato_900Black,
    useFonts,
} from '@expo-google-fonts/lato';

export function useAppFonts() {
  return useFonts({
    Lato_400Regular,
    Lato_700Bold,
    Lato_900Black,
  });
}