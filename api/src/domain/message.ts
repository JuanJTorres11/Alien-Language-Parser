import {
  Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Generated
} from 'typeorm';
import InvalidMessage from './invalid_message';
import Leader from './leader';
import Type from './type';

@Entity()
export default class Message {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Generated()
  @Column({
    type: 'timestamptz',
    name: 'created_at'
  })
  createdAt: Date;

  @Column({
    type: 'text',
    name: 'text'
  })
  text: string;

  @Column({
    type: 'bool',
    name: 'valid'
  })
  valid: boolean;

  @ManyToOne(() => Leader, (leader) => leader.messages, { nullable: true, cascade: true })
  @JoinColumn({
    name: 'leader_id'
  })
  leader: Leader;

  @ManyToOne(() => Type, (type) => type.messages, { nullable: true, cascade: true })
  @JoinColumn({
    name: 'type_id'
  })
  type: Type;

  @ManyToOne(() => InvalidMessage, (reason) => reason.messages, { nullable: true, cascade: true })
  @JoinColumn({
    name: 'invalid_reason_id'
  })
  invalidReason: InvalidMessage;

  constructor(text: string, valid: boolean) {
    this.text = text;
    this.valid = valid;
  }
}
