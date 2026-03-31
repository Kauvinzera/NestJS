import { IsNotEmpty } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

// Objeto de domínio, ou seja, a classe que representa a tabela do banco de dados, onde cada instância dessa classe representa uma linha da tabela.
@Entity({name: 'tb_postagem'})
export class Postagem {
    @PrimaryGeneratedColumn() // Cria chave primária auto-incrementável | Generated = auto-incrementável
    id: number;

    @IsNotEmpty() //Not null
    @Column({length: 100, nullable: false}) // Cria uma coluna na tabela do banco de dados
    titulo: string;

    @IsNotEmpty()
    @Column({length: 1000, nullable: false})
    texto: string; 
    
    @UpdateDateColumn() // Cria uma coluna que armazena a data atualização da postagem
    data: Date;


}