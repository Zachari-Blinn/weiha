import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

@Injectable()
export default class StripeService {
  private stripe: Stripe;

  constructor(private readonly configService: ConfigService) {
    this.stripe = new Stripe(this.configService.get<string>('STRIPE_SECRET_KEY'), {
      apiVersion: '2020-08-27',
    });
  }

  public createCustomer(username: string, email: string): Promise<any> {
    return this.stripe.customers.create({
      name: username,
      email,
    });
  }

  public charge(
    amount: number,
    paymentMethod: string,
    customerId: string,
    currency?: string,
  ): Promise<any> {
    return this.stripe.paymentIntents.create({
      amount,
      customer: customerId,
      payment_method: paymentMethod,
      currency: currency || this.configService.get<string>('STRIPE_CURRENCY'),
      confirm: true,
    });
  }
}
