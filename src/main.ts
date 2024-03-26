/* 引入环境变量 */
import 'dotenv/config'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { NestExpressApplication } from '@nestjs/platform-express'
import { join } from 'path'

async function bootstrap () {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  /* 设置前缀 */
  app.setGlobalPrefix(process.env.API_VESION, {
    exclude: [],
  })

  /* 静态文件 */
  app.useStaticAssets(join(__dirname, '../stadic'), {
    prefix: '/file',
  })
  await app.listen(3008)
}
bootstrap()
