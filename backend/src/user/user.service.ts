import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User) 
    private readonly userRepository: Repository<User>
  ){}

  createUser(createUserDto: CreateUserDto) {
    const user: User = new User()
    const { age, email, gender, name, password, username  } = createUserDto
    user.name = name
    user.age = age
    user.email = email
    user.username = username
    user.password = password
    user.gender = gender

    return this.userRepository.save(user)
  }

  findAllUser(): Promise<User[]> {
    return this.userRepository.find();
  }

  viewUser(id: number): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }

  updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user: User = new User();
    const { age, email, name, username, password } = updateUserDto
    user.id = id;
    user.name = name;
    user.age = age;
    user.email = email
    user.username = username;
    user.password = password;
    return this.userRepository.save(user);
  }

  removeUser(id: number): Promise<{ affected?: number }> {
    return this.userRepository.delete(id);
  }
}
