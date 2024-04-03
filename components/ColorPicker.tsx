import { ColorValue, NativeModules, processColor } from "react-native";

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

const { ColorPickerModule } = NativeModules as {
  ColorPickerModule: ColorPickerMethods;
};

const ColorPicker = {
  showColorPicker: (options?: ColorPickerInputOptions, callback?: (color: string) => void) => {
    const convertedOptions = {
      ...options,
      initialColor: options?.initialColor ? processColor(options.initialColor) : undefined,
    };

    ColorPickerModule.showColorPicker(convertedOptions, callback ? callback : () => {});
  },
};

export default ColorPicker;
