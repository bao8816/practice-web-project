import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToOne,
    JoinColumn,
} from 'typeorm';
import { Users } from '../users/users.entity';

export enum Gender {
    MALE = 'male',
    FEMALE = 'female',
    OTHER = 'other',
}

@Entity()
export class Profiles {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @OneToOne(() => Users, { onDelete: 'CASCADE' })
    @JoinColumn()
    user: Users;

    @Column({ nullable: true })
    fullName: string;

    @Column({ type: 'enum', enum: Gender, nullable: true })
    gender: Gender;

    @Column({ type: 'date', nullable: true })
    dateOfBirth: Date;

    @Column({ nullable: true, length: 20 })
    phoneNumber: string;

    @Column({ nullable: true, type: 'text' })
    avatarUrl: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
