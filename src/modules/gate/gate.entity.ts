import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Gate {

	@PrimaryGeneratedColumn()
	public id: number;

	@Column({ unique: true })
	public name: string;

	@CreateDateColumn()
	public created_at: Date;

	@UpdateDateColumn()
	public updated_at: Date;

	@Column()
	public created_by_id: number;

	@Column()
	public updated_by_id: number;

	@Column()
	public deleted_by_id: number;
}