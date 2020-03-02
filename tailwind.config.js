const { colors } = require('tailwindcss/defaultTheme')

module.exports = {
    theme: {
        fontFamily: {
            narrow: ['PT Sans Narrow', 'sans-serif'],
            sans: ['PT Sans', 'sans-serif'],
        },
        colors: {
            black: colors.black,
            white: colors.white,
            gray: colors.gray,
            blue: colors.blue,
        },
        extend: {
            colors: {
                black: '#333'
            }
        }
    },
    variants: {},
    plugins: [],
}
