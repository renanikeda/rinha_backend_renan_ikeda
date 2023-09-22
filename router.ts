import { Router } from 'express'
import * as glob from 'glob'
import { relative, dirname } from 'path'

const router = Router()

glob(`${__dirname}/**/*.route.{ts,js}`, (err: Error, files: string[]) => {
	if (!err) {
		files.forEach(file => {
			const endpoint = relative(__dirname, dirname(file))
			console.log(`Iniciando rotas ${file}`)
			// eslint-disable-next-line @typescript-eslint/no-var-requires
			router.use('/', require(file))
		})
	}
})


export default router