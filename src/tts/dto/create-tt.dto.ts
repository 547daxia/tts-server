export class GetAudio {
  Text: string /* 合成语音的源文本，按UTF-8编码统一计算。中文最大支持150个汉字（全角标点符号算一个汉字）；英文最大支持500个字母（半角标点符号算一个字母）。示例值：你好 */
  SessionId?: string /* 一次请求对应一个SessionId，会原样返回，建议传入类似于uuid的字符串防止重复。示例值：session-1234 */
  Volume?: number /* 音量大小，范围[0，10]，对应音量大小。默认为0，代表正常音量，值越大音量越高。示例值：1 */
  Speed?: number /* 语速，范围：[-2，6]，分别对应不同语速： -2代表0.6倍 -1代表0.8倍 0代表1.0倍（默认） 1代表1.2倍 2代表1.5倍 6代表2.5倍 */
  ProjectId?: number /* 项目id，用户自定义，默认为0。 */
  ModelType?: number /* 模型类型，1-默认模型。 */
  VoiceType?: number /* 音色 ID，包括标准音色与精品音色，精品音色拟真度更高，价格不同于标准音色 */
  PrimaryLanguage?: number /* 主语言类型： 1-中文（默认） 2-英文 3-日文 */
  SampleRate?: number /* 音频采样率：24000：24k（部分音色支持，请参见音色列表）16000：16k（默认）8000：8k */
  Codec?: 'wav' | 'mp3' | 'pcm' /* 返回音频格式，可取值：wav（默认），mp3，pcm */
  EnableSubtitle?: boolean /* 是否开启时间戳功能，默认为false。 */
  SegmentRate: 0 | 1 | 2 /* 断句敏感阈值，默认值为：0，取值范围：[0,1,2]。该值越大越不容易断句 */
  EmotionCategory?: string /* 控制合成音频的情感，仅支持多情感音色使用。取值: neutral(中性)、sad(悲伤)、happy(高兴)、angry(生气)、fear(恐惧)、news(新闻)、story(故事)、radio(广播)、poetry(诗歌)、call(客服)、撒娇(sajiao)、厌恶(disgusted)、震惊(amaze)、平静(peaceful)、兴奋(exciting)、傲娇(aojiao)、解说(jieshuo) */
  EmotionIntensity?: number /* 控制合成音频情感程度，取值范围为[50,200],默认为100；只有EmotionCategory不为空时生效； */
  Action?:string
}

export class AudioResult {
  Audio: string
  SessionId: string
  RequestId: string
  Subtitles: {
    Text: String
    BeginTime: number
    EndTime: number
    BeginIndex: number
    EndIndex: number
    Phoneme: String
  }[]
}



