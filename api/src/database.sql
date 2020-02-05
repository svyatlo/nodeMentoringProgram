CREATE TABLE users (
    id uuid NOT NULL,
    login varchar(255) NOT NULL,
    password varchar(255) NOT NULL,
    age smallint NOT NULL,
    "isDeleted" boolean NOT NULL,
    "createdAt" date,
    "updatedAt" date,
    CONSTRAINT users_pkey PRIMARY KEY (id)
);

INSERT INTO users VALUES ('1982c440-8318-48ed-955e-7d7b193eaf09','svetlo2','temno2',17,false,'2020-01-24','2020-01-24');
INSERT INTO users VALUES ('cb76f90e-6378-402c-84a2-e3b3051bba62','svetlo1','temno1',27,false,'2020-01-24','2020-01-24');
INSERT INTO users VALUES ('55df56dc-47af-4e53-b9f1-1f65d013ca66','svetlo3','temno3',37,false,'2020-01-24','2020-01-24');
INSERT INTO users VALUES ('7654c440-8318-48ed-955e-7d7b193eaf09','svetlo6','temno6',47,false,'2020-01-24','2020-01-24');
INSERT INTO users VALUES ('4569c440-8318-48ed-955e-7d7b193eaf09','oltevs4','onmet4',57,false,'2020-01-24','2020-01-24');
INSERT INTO users VALUES ('3452c440-8318-48ed-955e-7d7b193eaf09','oltevs5','onmet5',67,false,'2020-01-24','2020-01-24');

CREATE TABLE groups (
    id uuid NOT NULL,
    name character varying(255) NOT NULL,
    permissions character varying[] NOT NULL,
    "createdAt" date,
    "updatedAt" date,
    CONSTRAINT groups_pkey PRIMARY KEY (id)
);

INSERT INTO groups VALUES ('1982c440-8318-48ed-955e-7d7b193eaf09','Node.js mentoring program','{"READ", "WRITE", "DELETE", "SHARE", "UPLOAD_FILES"}','2020-01-24','2020-01-24');
INSERT INTO groups VALUES ('cb76f90e-6378-402c-84a2-e3b3051bba62','Angular mentoring program','{"READ", "WRITE", "DELETE", "SHARE", "UPLOAD_FILES"}','2020-01-24','2020-01-24');
INSERT INTO groups VALUES ('55df56dc-47af-4e53-b9f1-1f65d013ca66','React mentoring program','{"READ", "WRITE", "DELETE", "SHARE", "UPLOAD_FILES"}','2020-01-24','2020-01-24');
INSERT INTO groups VALUES ('7654c440-8318-48ed-955e-7d7b193eaf09','C# mentoring program','{"READ", "WRITE", "DELETE", "SHARE", "UPLOAD_FILES"}','2020-01-24','2020-01-24');
INSERT INTO groups VALUES ('4569c440-8318-48ed-955e-7d7b193eaf09','Java mentoring program','{"READ", "WRITE", "DELETE", "SHARE", "UPLOAD_FILES"}','2020-01-24','2020-01-24');