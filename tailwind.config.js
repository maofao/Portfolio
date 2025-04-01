/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          'primary-black': '#1a1a1a',    
          'primary-orange': '#f97316',   
          'primary-white': '#ffffff',   
          'dark-gray': '#333333',        
          'light-gray': '#f5f5f5',       
        },
      },
    },
    plugins: [],
  };