import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';




@Module({
  imports: [
    // Load environment variables
    ConfigModule.forRoot({
      isGlobal: true, // Makes ConfigModule available globally
    }),
    // TypeORM configuration
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const databaseHost = configService.get<string>('DB_HOST');
        const databasePort = configService.get<number>('DB_PORT');
        const databaseUsername = configService.get<string>('DB_USER');
        const databasePassword = configService.get<string>('DB_PASS');
        const databaseName = configService.get<string>('DB_NAME');
        const synchronize = configService.get<boolean>('TYPEORM_SYNCHRONIZE');
        const logging = configService.get<boolean>('TYPEORM_LOGGING');

        // for debug only!
        // console.log('ENV_VALUE:', ENV_VALUE);

        return {
          type: 'postgres',
          host: databaseHost,
          port: databasePort,
          username: databaseUsername,
          password: databasePassword,
          database: databaseName,
          entities: [User],
          synchronize,
          logging,
        };
      },
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}