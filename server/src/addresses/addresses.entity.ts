import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { Users } from '../users/users.entity';

@Entity()
export class Addresses {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @ManyToOne(() => Users, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'userId' })
    user: Users;

    @Column({ nullable: true })
    name: string;

    @Column()
    recipientName: string;

    @Column()
    streetAddress: string;

    @Column()
    city: string;

    @Column({ nullable: true })
    state: string;

    @Column()
    postalCode: string;

    @Column()
    country: string;

    @Column({ nullable: true })
    phoneNumber: string;

    @Column({ default: false })
    isDefaultShipping: boolean;

    @Column({ default: false })
    isDefaultBilling: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
