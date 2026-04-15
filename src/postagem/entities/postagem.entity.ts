import { IsNotEmpty } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Tema } from "../../tema/entities/tema.entity";
import { Usuario } from "../../usuario/entities/usuario.entity";
import { ApiProperty } from "@nestjs/swagger";

// DDL (Data Definition Language) - Linguagem de Definição de Dados, ou seja, a classe que define a estrutura da tabela do banco de dados, onde cada propriedade da classe representa uma coluna da tabela.

// Objeto de domínio, ou seja, a classe que representa a tabela do banco de dados, onde cada instância dessa classe representa uma linha da tabela.
@Entity({name: 'tb_postagem'})
export class Postagem {
    @PrimaryGeneratedColumn() // Cria chave primária auto-incrementável | Generated = auto-incrementável
    @ApiProperty()  
    id!: number;

    @IsNotEmpty() //Not null
    @Column({length: 100, nullable: false}) // Cria uma coluna na tabela do banco de dados
    @ApiProperty()  
    titulo!: string;

    @IsNotEmpty()
    @Column({length: 1000, nullable: false})
    @ApiProperty()  
    texto!: string; 
    
    @UpdateDateColumn() // Cria uma coluna que armazena a data atualização da postagem
    @ApiProperty()  
    data!: Date;

    @ApiProperty({ type: () => Tema }) //Este parâmetro indica ao Swagger o tipo do Objeto que será armazenado no Atributo que está relacionado com outra Classe, que representa a Chave Estrangeira da Relação 
    @ManyToOne(() => Tema, (tema) => tema.postagens,{
        onDelete: "CASCADE" //Signifca que uma operação de exclusão realizado em um objeto da classe mãe (Tema) será realizado em todos os objetos da classe filha (Postagem) que estão relacionados a ele, ou seja, quando um tema for deletado, todas as postagens relacionadas a esse tema também serão deletadas.
    }) // Cria um relacionamento muitos para um entre a tabela de postagem e a tabela de tema, ou seja, uma postagem pode ter um tema, mas um tema pode ter várias postagens.
    tema!: Tema;

    @ApiProperty({ type: () => Usuario }) //Este parâmetro indica ao Swagger o tipo do Objeto que será armazenado no Atributo que está relacionado com outra Classe, que representa a Chave Estrangeira da Relação
    @ManyToOne(() => Usuario, (usuario) => usuario.postagem, {
        onDelete: "CASCADE"
    })
    usuario!: Usuario
}