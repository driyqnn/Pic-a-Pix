import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				sans: ['Inter', 'sans-serif'],
				display: ['Playfair Display', 'serif'],
				playfair: ['Playfair Display', 'serif'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				picapix: {
					50: '#f5f7fa',
					100: '#ebeef3',
					200: '#dbe0e9',
					300: '#c0c9d9',
					400: '#9faabf',
					500: '#7d8ba6',
					600: '#64708a',
					700: '#525a71',
					800: '#454c5f',
					900: '#3b4150',
					950: '#262831',
				},
				coquette: {
					50: '#FFF5F7',
					100: '#FFDEE2',
					200: '#FFC5CF',
					300: '#FFA8B7',
					400: '#FF8A9E',
					500: '#FF6B85',
					600: '#FF4D6D',
					700: '#E63E5C',
					800: '#CC304B',
					900: '#B3233A',
					950: '#99163A',
				},
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			typography: {
				DEFAULT: {
					css: {
						color: 'inherit',
						a: { color: 'inherit' },
						strong: { color: 'inherit' },
						h1: { color: 'inherit' },
						h2: { color: 'inherit' },
						h3: { color: 'inherit' },
						h4: { color: 'inherit' },
					},
				},
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' }
				},
				'fade-out': {
					'0%': { opacity: '1' },
					'100%': { opacity: '0' }
				},
				'scale-in': {
					'0%': { transform: 'scale(0.95)', opacity: '0' },
					'100%': { transform: 'scale(1)', opacity: '1' }
				},
				'scale-out': {
					'0%': { transform: 'scale(1)', opacity: '1' },
					'100%': { transform: 'scale(0.95)', opacity: '0' }
				},
				'flash': {
					'0%': { backgroundColor: 'rgba(255, 255, 255, 0)' },
					'50%': { backgroundColor: 'rgba(255, 255, 255, 0.8)' },
					'100%': { backgroundColor: 'rgba(255, 255, 255, 0)' }
				},
				'countdown': {
					'0%': { transform: 'scale(1.5)', opacity: '0' },
					'20%': { transform: 'scale(1)', opacity: '1' },
					'80%': { transform: 'scale(1)', opacity: '1' },
					'100%': { transform: 'scale(0.5)', opacity: '0' }
				},
				'pulse': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.5' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.3s ease-out',
				'fade-out': 'fade-out 0.3s ease-out',
				'scale-in': 'scale-in 0.3s ease-out',
				'scale-out': 'scale-out 0.3s ease-out',
				'flash': 'flash 0.6s ease-out',
				'countdown': 'countdown 1s ease-out',
				'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
			},
			backdropFilter: {
				'none': 'none',
				'blur': 'blur(8px)',
			},
			boxShadow: {
				'glass': '0 4px 30px rgba(0, 0, 0, 0.1)',
				'neumorph': '5px 5px 10px #d1d1d1, -5px -5px 10px #ffffff',
				'soft': '0 4px 20px rgba(0, 0, 0, 0.08)',
			}
		}
	},
	plugins: [
		require("tailwindcss-animate"),
		require('@tailwindcss/typography')
	],
} satisfies Config;
