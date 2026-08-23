const { DARK, LIGHT } = require("./contexts/theme/theme");

module.exports = {
  darkMode: "class",
  content: ["./app/**/*.{js,jsx,ts,tsx}",, "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
                bodyBg: LIGHT.bodyBg,
                secondaryBg: LIGHT.secondaryBg,
                bodyColor: LIGHT.bodyColor,
                activeIcon: LIGHT.activeIcon,
                inactiveIcon: LIGHT.inactiveIcon,
                dark: {
                    bodyBg: DARK.bodyBg,
                    secondaryBg: DARK.secondaryBg,
                    bodyColor: DARK.bodyColor,
                    activeIcon: DARK.activeIcon,
                    inactiveIcon: DARK.inactiveIcon,
                },
            },
    },
  },
  plugins: [],
};