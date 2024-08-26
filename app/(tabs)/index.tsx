import React, { useEffect } from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing, interpolateColor } from 'react-native-reanimated';

export default function HomeScreen() {

  // Desde donde cae el texto
  const titlePosition = useSharedValue(-800);
  // Cuando el texto es visible
  const opacity = useSharedValue(1);
  // Cuando el fondo es el original
  const backgroundColor = useSharedValue(0);

  // Función de animación para la caida y opacidad del texto
  const animatedTitleStyle = useAnimatedStyle(() => {
    return {
      // Velocidad y manera con la que cae el texto
      transform: [{ translateY: withTiming(titlePosition.value, { duration: 6000, easing: Easing.bounce }) }],

      // Cuando el texto deja de verse
      opacity: withTiming(opacity.value, { duration: 1500 }),
    };
  });

  // Función de animación para cambiar el fondo
  const animatedBackgroundStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        backgroundColor.value,
        [0, 1],
        ['black', '#3f6']
      ),
    };
  });

  // Uso el useEffect para cargar la animación del texto cayendo
  useEffect(() => {
    titlePosition.value = 0;
  }, []);

  // Función para detectar cuando se presiona el botón, esto activa las animaciones de opacidad, el 0 para ocultar todo el texto y el 1 para mostrar el nuevo fondo
  const handlePress = () => {
    opacity.value = withTiming(0, { duration: 1500 });
    backgroundColor.value = withTiming(1, { duration: 1500 });
  };

  return (
    <Animated.View style={[styles.container, animatedBackgroundStyle]}>
      <Animated.Text style={[styles.title, animatedTitleStyle]}>Mi Aplicación Animada</Animated.Text>
      <TouchableOpacity onPress={handlePress} style={styles.buttonContainer}>
        <Text style={styles.buttonText}>
          Iniciar
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
    color: '#fff',
    marginBottom: 20,
  },
  buttonContainer: {
    backgroundColor: '#36f',
    padding: 10,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
  },
});
