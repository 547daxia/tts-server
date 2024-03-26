const tencentcloud = require('tencentcloud-sdk-nodejs-tts')
const TtsClient = tencentcloud.tts.v20190823.Client
import wav from 'wav'
import { readFile, writeFile } from 'fs'
import { join } from 'path'
// 实例化一个认证对象，入参需要传入腾讯云账户 SecretId 和 SecretKey，此处还需注意密钥对的保密
// 代码泄露可能会导致 SecretId 和 SecretKey 泄露，并威胁账号下所有资源的安全性。以下代码示例仅供参考，建议采用更安全的方式来使用密钥，请参见：https://cloud.tencent.com/document/product/1278/85305
// 密钥可前往官网控制台 https://console.cloud.tencent.com/cam/capi 进行获取

const clientConfig = {
  credential: {
    secretId: process.env.SecretId,
    secretKey: process.env.SecretKey,
  },
  region: 'ap-guangzhou',
  profile: {
    httpProfile: {
      endpoint: 'tts.tencentcloudapi.com',
    },
  },
}

// 实例化要请求产品的client对象,clientProfile是可选的
const client = new TtsClient(clientConfig)

export async function readMuteAudio (num: number): Promise<any> {
  const path = join(__dirname, `../../stadic/mute-${num}s.wav`)
  const result = await _readFile(path)
  if (result === false) {
    await _writeFile(path, Buffer.from([0x00, 0x00]))
    createMuteAudio(num)
  }
  const res = await _readFile(path)
  return res
}

/* 创建静音文件 */
function createMuteAudio (num: number) {
  if (num > 10 || num < 1) {
    return new Error('num should take values between 1 and 10')
  }
  const path = join(__dirname, `./tmp/mute-${num}s.wav`)
  const writer = new wav.FileWriter(path, {
    channels: 1, // 单声道
    sampleRate: 16000,
    bitDepth: 16, // 16 bits 深度
  })

  // 计算要生成的采样点数（每秒采样率乘以持续时间）
  const sampleRate = 16000
  const totalSamples = num * sampleRate

  // 写入静音数据（所有采样值设置为0）
  for (let i = 0; i < totalSamples; i++) {
    writer.write(Buffer.from([0x00, 0x00])) // 对于单声道，每个采样点是2字节
  }
  writer.end()
}

/* 读取文件 */
function _readFile (path: string): Promise<Buffer | boolean> {
  return new Promise(resolve => {
    readFile(path, (err, data) => {
      if (err) {
        resolve(false)
      }
      resolve(data)
    })
  })
}

function _writeFile (path: string, data: Buffer): Promise<any> {
  return new Promise((resolve, reject) => {
    writeFile(path, data, err => {
      if (err) {
        reject(err)
      }
      resolve(true)
    })
  })
}

export { client }
