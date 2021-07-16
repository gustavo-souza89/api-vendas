import { Request, Response } from 'express';
import SendForgotPasswordEmaiLService from '../services/SendForgotPasswordEmaiLService';

export default class ForgotPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    const sendForgotPassawordEmail = new SendForgotPasswordEmaiLService();

    await sendForgotPassawordEmail.execute({
      email,
    });

    return response.status(204).json();
  }
}
