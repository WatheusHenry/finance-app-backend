// src/transaction/dto/update-transaction.dto.ts
import { IsNumber, IsOptional, IsString, IsIn } from 'class-validator';

export class UpdateTransactionDto {
    @IsOptional()
    @IsString()
    @IsIn(['receita', 'despesa'])
    tipo?: 'receita' | 'despesa'; // Tipo da transação

    @IsOptional()
    @IsNumber()
    valor?: number; // Valor da transação

    @IsOptional()
    @IsString()
    descricao?: string; // Descrição da transação
}
