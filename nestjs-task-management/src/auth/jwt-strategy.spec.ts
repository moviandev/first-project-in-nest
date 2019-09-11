import { JwtStrategy } from './jwt.strategy';
import { Test } from '@nestjs/testing';
import { UserRepository } from './user.repository';
import { User } from './user.entity';
import { UnauthorizedException } from '@nestjs/common';

const mockUserRepository = () => ({
  findOne: jest.fn(),
});

describe('JwtStrategy', () => {
  let jwtStrategy: JwtStrategy;
  let userRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        JwtStrategy,
        { provide: UserRepository, useFactory: mockUserRepository },
      ],
    }).compile();
    jwtStrategy = await module.get<JwtStrategy>(JwtStrategy);
    userRepository = await module.get<UserRepository>(UserRepository);
  });

  describe('validate', () => {
    it('validates and returns the user based on JWT payLoad', async () => {
      const user = new User();
      user.username = 'testUsername';

      userRepository.findOne.mockReturnValue(user);

      const result = await jwtStrategy.validate({ username: 'testUsername' });
      expect(userRepository.findOne).toHaveBeenCalledWith({ username: 'testUsername' });
      expect(result).toEqual(user);

    });

    it('throws an unauthorized exception the user cannot be found', () => {
      userRepository.findOne.mockReturnValue(null);
      expect(jwtStrategy.validate({ username: 'testUsername' })).rejects.toThrow(UnauthorizedException);
    });

  });
});
