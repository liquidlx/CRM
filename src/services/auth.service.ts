import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Console } from 'console';
import { comparePassword } from 'src/utils/password-hash';
import { UsersService } from './users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne({ email });
    if (user && (await comparePassword(pass, user.password || ''))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const { id, email, role } = user;
    const payload = { id, email, role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
