CREATE TABLE `cpx_role` (
	`user_id` bigint AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	CONSTRAINT `cpx_role_user_id` PRIMARY KEY(`user_id`)
);
--> statement-breakpoint
ALTER TABLE `cpx_post` MODIFY COLUMN `id` bigint AUTO_INCREMENT NOT NULL;--> statement-breakpoint
ALTER TABLE `cpx_user` MODIFY COLUMN `id` bigint AUTO_INCREMENT NOT NULL;--> statement-breakpoint
ALTER TABLE `cpx_post` ADD PRIMARY KEY(`id`);--> statement-breakpoint
ALTER TABLE `cpx_user` ADD PRIMARY KEY(`id`);--> statement-breakpoint
ALTER TABLE `cpx_user` ADD `role_id` bigint;--> statement-breakpoint
ALTER TABLE `cpx_user` ADD CONSTRAINT `cpx_user_role_id_cpx_role_user_id_fk` FOREIGN KEY (`role_id`) REFERENCES `cpx_role`(`user_id`) ON DELETE no action ON UPDATE no action;