import {
  Entity, PrimaryGeneratedColumn, Column, OneToMany
} from 'typeorm';
import Message from './message';

@Entity()
export default class Type {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'text',
    unique: true,
    name: 'value'
  })
  value: string;

  @OneToMany(() => Message, (msg) => msg.type)
  messages: Message[];

  constructor(value?: string) {
    this.value = value;
  }
}
