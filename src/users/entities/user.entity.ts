import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  nome: string;

  @Column()
  senha: string; // Hash da senha

  @Column({ default: new Date() })
  data_criacao: Date;

  @Column({ default: new Date() })
  data_atualizacao: Date;
}
