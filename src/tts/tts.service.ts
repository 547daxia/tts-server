import { Injectable } from '@nestjs/common'
import { GetAudio, AudioResult } from './dto/create-tt.dto'
import { client as ttsClient } from './utils'
import { writeFile } from 'fs'
import { join } from 'path'

const HOST_ORIGIN = process.env.HOST_ORIGIN
@Injectable()
export class TtsService {
  async create (createTtDto: GetAudio) {
    const { SessionId } = createTtDto
    const res: AudioResult = await ttsClient.TextToVoice(createTtDto)
    let fileName = SessionId + '.wav'
    let filePath = join(__dirname, '../../stadic/') + fileName

    const buffer = Buffer.from(res.Audio, 'base64')
    return new Promise((resole, reject) => {
      writeFile(filePath, buffer, (err: any) => {
        if (err) {
          reject(err)
        } else {
          resole(HOST_ORIGIN + '/file/' + fileName)
        }
      })
    })
  }
}
