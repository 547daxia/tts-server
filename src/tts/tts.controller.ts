import { Controller, Post, Body } from '@nestjs/common'
import { TtsService } from './tts.service'
import { GetAudio } from './dto/create-tt.dto'

@Controller('/tts')
export class TtsController {
  constructor (private readonly ttsService: TtsService) {}

  @Post()
  create (@Body() createTtDto: GetAudio) {
    const { SessionId } = createTtDto
    if (SessionId) {
      createTtDto.SessionId = Date.now().toString()
    }
    return this.ttsService.create(createTtDto)
  }
}
