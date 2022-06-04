import { Client, Message } from '@line/bot-sdk';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LineService {
  client: Client;
  constructor() {
    // TODO: configServiceから呼び出す。現状だと初期化できずにエラーが起きる。(直接値を指定すれば動く。)
    this.client = new Client({
      channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN || '',
      channelSecret: process.env.CHANNEL_SECRET_TOKEN || '',
    });
  }

  async pushMessage({ userId, message }: { userId: string; message: Message }) {
    if (message.type === 'text') {
      const { type, text } = message;
      await this.client.pushMessage(userId, { type, text });
    }
  }
}
