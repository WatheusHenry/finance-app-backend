// src/transaction/entities/transaction.entity.ts
import { User } from 'src/users/entities/user.entity';
import { Category } from 'src/categories/entities/category.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity('transaction')
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.transactions)
  user: User;

  @ManyToOne(() => Category, (category) => category.transactions)
  category: Category;

  @Column({ type: 'enum', enum: ['receita', 'despesa'] })
  tipo: 'receita' | 'despesa';

  @Column('decimal')
  valor: number;

  @Column()
  descricao: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  data_criacao: Date;
}
