import { defineConfig } from 'vite'


export default defineConfig ({
	build : {
		lib: {
			entry: {
				index: 'src/index.ts',
				react: 'src/react.ts'
			},
			name: 'Oni',
			formats: ['es', 'cjs'],
			fileName: (format) => format === 'es' ? '[name].js' : '[name].cjs.js'
		},
		rollupOptions: {
			external: ['react', 'react-dom']
		}
	}
})
