import { Addresses } from 'src/addresses/addresses.entity';
import { Profiles } from 'src/profiles/profiles.entity';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    OneToOne,
} from 'typeorm';

@Entity()
export class Users {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    username: string;

    @Column()
    password: string;

    @Column({ default: 'user' })
    role: string;

    @Column({ type: 'varchar', length: 255, nullable: true, default: null })
    email: string | null;

    @OneToOne(() => Profiles, (profile) => profile.user)
    profile: Profiles;

    @OneToMany(() => Addresses, (address) => address.user)
    addresses: Addresses[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
