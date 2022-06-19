import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Stripe } from 'stripe';

@Injectable()
export class StripeService {
  client: Stripe;
  constructor(private configService: ConfigService) {
    this.client = new Stripe(
      this.configService.get<string>('STRIPE_SECRET_KEY') || '',
      {
        apiVersion: '2020-08-27',
        maxNetworkRetries: 3,
      },
    );
  }
}
