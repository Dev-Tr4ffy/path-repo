
ALTER TABLE thrivepath_goals
ADD COLUMN employee_eid VARCHAR(50);

ALTER TABLE thrivepath_goals
ADD COLUMN status INT NOT NULL DEFAULT 0;


CREATE TABLE thrivepath_goal_details
(
    id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    goal_header_id integer NOT NULL,
    goal character varying(255) NOT NULL,
    weight_percentage numeric(5,2),
    created_by integer NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_by integer NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    status integer NOT NULL
);


ALTER TABLE thrivepath_goal_details
ADD COLUMN goal_title character varying(255) NOT NULL,
ADD COLUMN target_date timestamp without time zone NOT NULL;


CREATE TABLE thrivepath_goal_header
(
    id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    review_year integer,
    weight_percentage numeric(5,2),
    created_by integer NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_by integer NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    status integer NOT NULL
);

CREATE TABLE thrivepath_goal_employee
(
    id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    goal_header_id integer NOT NULL,
	employee_eid character varying(50),
    created_by integer NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_by integer NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    status integer NOT NULL
);

ALTER TABLE thrivepath_goal_employee
ADD COLUMN target_date timestamp without time zone NOT NULL;




CREATE TABLE thrivepath_goal_category
(
    id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	description character varying(200),
    created_by integer NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_by integer NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    status integer NOT NULL
);
