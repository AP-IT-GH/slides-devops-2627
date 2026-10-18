CREATE TABLE IF NOT EXISTS todos (
    id varchar(255) primary key,
    title varchar(255) not null,
    status varchar(255) not null
);

insert into todos (id, title, status) values (UUID(), 'mijn eerste taak', 'TODO');
