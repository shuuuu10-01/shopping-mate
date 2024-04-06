import { useEffect } from "react";
import { ColorValue, NativeEventEmitter, NativeModules, processColor } from "react-native";

type ColorPickerInputOptions = {
  supportsAlpha?: boolean;
  initialColor?: ColorValue;
};

type ColorPickerNativeOptions = {
  supportsAlpha?: boolean;
  initialColor?: number | symbol | null;
};

type ColorPickerMethods = {
  showColorPicker: (options?: ColorPickerNativeOptions, callback?: (color: string) => void) => void;
};

function useColorPicker(options?: ColorPickerInputOptions, callback?: (color: string) => void) {
  const { ColorPickerModule } = NativeModules as {
    ColorPickerModule: ColorPickerMethods;
  };

  function showColorPicker() {
    const convertedOptions = {
      ...options,
      initialColor: options?.initialColor ? processColor(options.initialColor) : undefined,
    };

    ColorPickerModule.showColorPicker(convertedOptions, callback ? callback : () => {});
  }

  const colorPickerEvents = new NativeEventEmitter(NativeModules.ColorPickerModule);

  useEffect(() => {
    const subscription = colorPickerEvents.addListener(
      "onColorChange",
      ({ color }: { color: string }) => {
        callback?.(color);
      },
    );

    return () => {
      subscription.remove();
    };
  }, []);

  return {
    showColorPicker,
  };
}

export default useColorPicker;
