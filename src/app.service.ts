import { Connection, EntityManager, Repository } from 'typeorm';
import { InjectConnection, InjectEntityManager, InjectRepository } from '@nestjs/typeorm';

import { Injectable } from '@nestjs/common';
import { User } from 'shared/entity/User';
import { UserDTO } from './shared/DTOs/userDTO';

export class AppService {
  
}
