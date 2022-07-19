import config from "../config";
import twilio from "twilio";
import { MessageListInstanceCreateOptions } from "twilio/lib/rest/api/v2010/account/message";
import { logger } from "./logger";

class Twilio {
  private twilio;

  constructor() {
    this.twilio = twilio(config.TWILIO_ACCOUNT_SID, config.TWILIO_TOKEN);
  }

  async sendMessage(cellphoneNumber: string, message: string) {
    try {
    } catch (err) {
      logger.error("twilio error: ", err);
    }
    const params = {
      body: message,
      from: config.TWILIO_PHONE_NUMBER,
      to: cellphoneNumber,
    };

    const response = await this.twilio.messages.create(params);
    return response;
  }

  async sendWhatsAppMessage(
    cellphoneNumber: string,
    message: string,
    picture?: string
  ) {
    try {
      const params: MessageListInstanceCreateOptions = {
        body: message,
        from: `whatsapp:${config.TWILIO_WHATSAPP_NUMBER}`,
        to: `whatsapp:${cellphoneNumber}`,
      };
      console.warn(cellphoneNumber, message, config.TWILIO_WHATSAPP_NUMBER);
      if (picture) params.mediaUrl = [picture];
      const response = await this.twilio.messages.create(params);
      return response;
    } catch (err) {
      logger.error("twilio error: ", err);
    }
  }
}

export const SmsService = new Twilio();
