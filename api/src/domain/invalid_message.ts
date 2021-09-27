import {
  Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany, VersionColumn, Generated
} from 'typeorm';
import Message from './message';

@Entity()
export default class InvalidMessage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'text',
    name: 'reason'
  })
  reason: string;

  @OneToMany(() => Message, (msg) => msg.leader)
  messages: Message[];

  constructor(reason?: string) {
    this.reason = reason;
  }
}
