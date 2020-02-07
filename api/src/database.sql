CREATE TABLE users (
    user_id uuid NOT NULL,
    user_login varchar(255) NOT NULL,
    user_password varchar(255) NOT NULL,
    user_age smallint NOT NULL,
    "user_isDeleted" boolean NOT NULL,
    "createdAt" date NOT NULL DEFAULT CURRENT_DATE,
    "updatedAt" date NOT NULL DEFAULT CURRENT_DATE,
    CONSTRAINT users_pkey PRIMARY KEY (user_id)
);

INSERT INTO users VALUES ('1982c440-8318-48ed-955e-7d7b193eaf09','svetlo2','temno2',17,false,'2020-01-24','2020-01-24');
INSERT INTO users VALUES ('cb76f90e-6378-402c-84a2-e3b3051bba62','svetlo1','temno1',27,false,'2020-01-24','2020-01-24');
INSERT INTO users VALUES ('55df56dc-47af-4e53-b9f1-1f65d013ca66','svetlo3','temno3',37,false,'2020-01-24','2020-01-24');
INSERT INTO users VALUES ('7654c440-8318-48ed-955e-7d7b193eaf09','svetlo6','temno6',47,false,'2020-01-24','2020-01-24');
INSERT INTO users VALUES ('4569c440-8318-48ed-955e-7d7b193eaf09','oltevs4','onmet4',57,false,'2020-01-24','2020-01-24');
INSERT INTO users VALUES ('3452c440-8318-48ed-955e-7d7b193eaf09','oltevs5','onmet5',67,false,'2020-01-24','2020-01-24');

CREATE TABLE groups (
    group_id uuid NOT NULL,
    group_name character varying(255) NOT NULL,
    group_permissions character varying[] NOT NULL,
    "createdAt" date NOT NULL DEFAULT CURRENT_DATE,
    "updatedAt" date NOT NULL DEFAULT CURRENT_DATE,
    CONSTRAINT groups_pkey PRIMARY KEY (group_id)
);

INSERT INTO groups VALUES ('1982c440-8318-48ed-955e-7d7b193eaf09','Node.js mentoring program','{"READ", "WRITE", "DELETE", "SHARE", "UPLOAD_FILES"}','2020-01-24','2020-01-24');
INSERT INTO groups VALUES ('cb76f90e-6378-402c-84a2-e3b3051bba62','Angular mentoring program','{"READ", "WRITE", "DELETE", "SHARE", "UPLOAD_FILES"}','2020-01-24','2020-01-24');
INSERT INTO groups VALUES ('55df56dc-47af-4e53-b9f1-1f65d013ca66','React mentoring program','{"READ", "WRITE", "DELETE", "SHARE", "UPLOAD_FILES"}','2020-01-24','2020-01-24');
INSERT INTO groups VALUES ('7654c440-8318-48ed-955e-7d7b193eaf09','C# mentoring program','{"READ", "WRITE", "DELETE", "SHARE", "UPLOAD_FILES"}','2020-01-24','2020-01-24');
INSERT INTO groups VALUES ('4569c440-8318-48ed-955e-7d7b193eaf09','Java mentoring program','{"READ", "WRITE", "DELETE", "SHARE", "UPLOAD_FILES"}','2020-01-24','2020-01-24');

CREATE TABLE user_groups (
  groupGroupId uuid REFERENCES groups (group_id) ON UPDATE CASCADE
, userUserId uuid REFERENCES users (user_id) ON UPDATE CASCADE
, CONSTRAINT user_group_pkey PRIMARY KEY (groupGroupId, userUserId)
);
