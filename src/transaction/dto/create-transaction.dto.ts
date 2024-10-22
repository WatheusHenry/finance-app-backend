// src/transaction/dto/create-transaction.dto.ts
import { IsNumber, IsString, IsIn } from 'class-validator';

export class CreateTransactionDto {
    @IsNumber()
    userId: number; // ID do usuário

    @IsString()
    @IsIn(['receita', 'despesa'])
    tipo: 'receita' | 'despesa'; // Tipo da transação

    @IsNumber()
    valor: number; // Valor da transação

    @IsString()
    descricao?: string; // Descrição da transação
}
