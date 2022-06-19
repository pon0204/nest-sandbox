import { Client, Message } from '@line/bot-sdk';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class LineService {
  client: Client;
  constructor(private configService: ConfigService) {
    this.client = new Client({
      channelAccessToken:
        this.configService.get<string>('LINE_CHANNEL_ACCESS_TOKEN') || '',
      channelSecret:
        this.configService.get<string>('LINE_CHANNEL_SECRET_TOKEN') || '',
    });
  }

  async pushMessage({ userId, message }: { userId: string; message: Message }) {
    if (message.type === 'text') {
      const { type, text } = message;
      await this.client.pushMessage(userId, { type, text });
    }
  }
}
