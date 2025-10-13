tailwind.config = {
    theme: {
        extend: {
            colors: {
                'primary-dark': '#000000',      
                'card-bg': '#100d1c',           
                'accent-blue': '#38bdf8',       
                'accent-dark': '#0ea5e9',       
                'accent-secondary': '#c084fc',  
                'text-faint': '#94a3b8' ,
                // New colors for navigation buttons
                'bg-button-active': '#38bdf8',  
                'text-button-inactive': '#94a3b8' 
            },
            fontFamily: {
                sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif']
            },
            boxShadow: {
                'hero-glow': '0 0 40px rgba(56, 189, 248, 0.4), 0 0 100px rgba(56, 189, 248, 0.15)',
            },
            animation: {
                'slide-up-fade': 'slideUpFade 0.7s ease-out forwards',
                'slow-fade': 'fadeIn 2s ease-in-out forwards',
            },
            keyframes: {
                slideUpFade: {
                    '0%': { transform: 'translateY(20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                }
            }
        }
    }
};
