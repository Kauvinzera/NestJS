import { IsNotEmpty } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Postagem } from "../../postagem/entities/postagem.entity";

@Entity({name: 'tb_tema'}) // Cria uma tabela no banco de dados com o nome "tb_tema"
export class Tema {

    @PrimaryGeneratedColumn() // Cria chave primária auto-incrementável | Generated = auto-incrementável
    id: number;

    @IsNotEmpty() //Not null
    @Column({length: 255, nullable: false}) // Cria uma coluna na tabela do banco de dados
    descricao: string; // Cria uma coluna na tabela do banco de dados

    @OneToMany(() => Postagem, (postagem) => postagem.tema) // Cria um relacionamento um para muitos entre a tabela de tema e a tabela de postagem, ou seja, um tema pode ter várias postagens, mas uma postagem só pode ter um tema.
    postagens: Postagem[]; // Cria uma propriedade que representa a lista de postagens relacionadas a um tema, ou seja, um tema pode ter várias postagens.
}