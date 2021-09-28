import {
  Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany, VersionColumn, Generated
} from 'typeorm';
import Message from './message';

@Entity()
export default class Leader {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'char',
    unique: true,
    name: 'name'
  })
  name: string;

  @OneToMany(() => Message, (msg) => msg.leader)
  messages: Message[];

  constructor(name?: string) {
    this.name = name;
  }
}
