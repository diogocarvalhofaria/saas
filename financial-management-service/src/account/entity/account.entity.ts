import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AccountTable {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50 })
  title: string;

  @Column({ type: 'varchar', length: 50 })
  subtitle: string;

  @Column("decimal", {precision: 9, scale: 2, nullable: true})
  value: number;

}
