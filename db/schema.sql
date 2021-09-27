-- Table: public.leader

-- DROP TABLE public.leader;

CREATE TABLE public.leader
(
    id uuid NOT NULL,
    name "char" NOT NULL,
    CONSTRAINT leader_pkey PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.leader
    OWNER to postgres;

-- Table: public.invalid_message

-- DROP TABLE public.invalid_message;

CREATE TABLE public.invalid_message
(
    id uuid NOT NULL,
    message text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT invalid_message_pkey PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.invalid_message
    OWNER to postgres;

-- Table: public.type

-- DROP TABLE public.type;

CREATE TABLE public.type
(
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    value text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT type_pkey PRIMARY KEY (id),
    CONSTRAINT type_value_key UNIQUE (value)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.type
    OWNER to postgres;

-- Table: public.message

-- DROP TABLE public.message;

CREATE TABLE public.message
(
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    text text COLLATE pg_catalog."default" NOT NULL,
    type uuid,
    leader uuid,
    valid boolean,
    invalid_reason uuid,
    CONSTRAINT message_pkey PRIMARY KEY (id),
    CONSTRAINT invalid_fk FOREIGN KEY (invalid_reason)
        REFERENCES public.invalid_message (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT leader_fk FOREIGN KEY (leader)
        REFERENCES public.leader (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT type_fk FOREIGN KEY (type)
        REFERENCES public.type (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.message
    OWNER to postgres;