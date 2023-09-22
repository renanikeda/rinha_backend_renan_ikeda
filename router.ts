import { Router } from 'express'
import * as glob from 'glob'
import { relative, dirname } from 'path'

const router = Router()

glob(`${__dirname}/**/*.route.{ts,js}`, (err: Error, files: string[]) => {
	if (!err) {
		files.forEach(file => {
      const endpoint = file.split('/').splice(-1)[0].replace('.route.js', '')
			console.log(`Iniciando rotas /${endpoint}`)
			// eslint-disable-next-line @typescript-eslint/no-var-requires
			router.use(`/${endpoint}`, require(file))
		})
	}
})


export default router