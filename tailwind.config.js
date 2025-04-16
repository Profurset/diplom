/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html", // Указываем, что будем искать классы в index.html
        "./src/**/*.{js,ts,jsx,tsx}", // И также в файлах внутри src
    ],
    theme: {
        extend: {},
    },
    plugins: [],
}
