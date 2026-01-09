-- Enter migration here
drop table posts;

create table if not exists posts (
	id serial primary key,
	title VARCHAR(50) not null,
	content TEXT not null,
	author VARCHAR(50) not null,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

insert into posts (title, content, author) values (
    'Learning Postgres and migrations',
    'This is such a task, lets go',
    'Lucas Alves'
);

insert into posts (title, content, author) values (
    'Learning REST APIs',
    'This is such a great task, lets go',
    'Lucas Alves'
);