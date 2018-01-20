--
-- PostgreSQL database dump
--

-- Dumped from database version 10.1
-- Dumped by pg_dump version 10.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: packages; Type: TABLE; Schema: public; Owner: youcao
--

CREATE TABLE packages (
    year integer,
    month integer,
    day integer,
    slast character(10),
    sfirst character(10),
    trackno character(30) NOT NULL,
    carrier integer NOT NULL,
    signed integer
);


ALTER TABLE packages OWNER TO youcao;

--
-- Name: students; Type: TABLE; Schema: public; Owner: youcao
--

CREATE TABLE students (
    sid character(10),
    slast character(10),
    sfirst character(10),
    phone character(10)
);


ALTER TABLE students OWNER TO youcao;

--
-- Data for Name: packages; Type: TABLE DATA; Schema: public; Owner: youcao
--

<<<<<<< HEAD
COPY packages (year, month, day, slast, sfirst, trackno, carrier, signed) FROM stdin;
\.


--
-- Data for Name: students; Type: TABLE DATA; Schema: public; Owner: youcao
--

COPY students (sid, slast, sfirst, phone) FROM stdin;
\.


--
-- Name: packages packages_pkey; Type: CONSTRAINT; Schema: public; Owner: youcao
--

ALTER TABLE ONLY packages
    ADD CONSTRAINT packages_pkey PRIMARY KEY (trackno);


--
-- PostgreSQL database dump complete
--

