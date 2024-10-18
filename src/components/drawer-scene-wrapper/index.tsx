import { ReactNode } from "react";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { useDrawerProgress } from "@react-navigation/drawer";

export function DrawerSceneWrapper({ children }: { children: ReactNode }) {
  const progress = useDrawerProgress();

  const animatedStyled = useAnimatedStyle(() => ({
    transform: [
      {
        scale: interpolate(
          progress.value,
          [0, 1],
          [1, 0.8],
          Extrapolation.CLAMP
        ),
      },
      {
        translateX: interpolate(
          progress.value,
          [0, 1],
          [0, 200], // index 0 = menu fechado, index 1 = menu aberto
          Extrapolation.CLAMP
        ),
      },
      {
        rotateY:
          interpolate(progress.value, [0, 1], [0, -40], Extrapolation.CLAMP) +
          "deg",
      },
    ],
    borderRadius: 4,
    overflow: "hidden",
  }));

  return (
    <Animated.View style={[{ flex: 1 }, animatedStyled]}>
      {children}
    </Animated.View>
  );
}
