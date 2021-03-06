import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import moment from 'moment';
import { Usuario } from 'src/usuario/usuario.entity';
import { Like } from 'src/like/like.entity';
import { Comentario } from 'src/comentario/comentario.entity';
import { Chat } from 'src/chat/chat.entity';

@Entity('posts')
export class Posts {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  texto: string;

  @ManyToOne(type => Usuario, usuario => usuario.postsOwner, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'id_usuario' })
  usuario: Usuario;

  @OneToMany(type => Like, like => like.post)
  likes: Like[];

  @OneToMany(type => Comentario, comentario => comentario.post)
  comentarios: Comentario[];

  @OneToMany(type => Chat, chat => chat.post)
  chat: Chat[];
  
  @CreateDateColumn({
    transformer: {
      from: (date: Date) => {
        return moment(date).format('YYYY-MM-DD HH:mm:ss');
      },
      to: () => {
        return new Date();
      },
    },
  })
  created_at: string;

  @UpdateDateColumn({
    transformer: {
      from: (date: Date) => {
        return moment(date).format('YYYY-MM-DD HH:mm:ss');
      },
      to: () => {
        return new Date();
      },
    },
  })
  updated_at: string;
}
