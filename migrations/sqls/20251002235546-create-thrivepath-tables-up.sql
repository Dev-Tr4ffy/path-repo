CREATE TABLE thrivepath_annual_step_cycle (
    id SERIAL PRIMARY KEY,
    month VARCHAR(100) NOT NULL,
    step VARCHAR(255) NOT NULL,
    start_date VARCHAR(5),
    end_date VARCHAR(5),
    description TEXT,
    ordering SMALLINT,
    visibility_level VARCHAR(2)[] CHECK (
        visibility_level <@ ARRAY['E', 'S1', 'S2', 'S3']::VARCHAR(2)[] AND 
        array_length(visibility_level, 1) > 0
    ),
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_by INTEGER NOT NULL,
    created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW(),
    updated_by INTEGER NOT NULL,
    updated_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE TABLE thrivepath_goals (
    id SERIAL PRIMARY KEY,
    review_year INTEGER,
    goal VARCHAR(255) NOT NULL,
    weight_percentage NUMERIC(5, 2),
    created_by INTEGER NOT NULL,
    created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW(),
    updated_by INTEGER NOT NULL,
    updated_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE TABLE thrivepath_performance_results (
    id SERIAL PRIMARY KEY,
    review_year INTEGER,
    employee_eid INTEGER NOT NULL,
    category VARCHAR(255) NOT NULL,
    subcategory VARCHAR(255),
    periods VARCHAR(10) CHECK(periods IN ('Q1', 'Q2', 'Q3', 'MID-YEAR', 'YEAR-END') OR periods IS NULL),
    employee_rating INTEGER,
    employee_comment TEXT,
    manager_rating INTEGER,
    manager_comment TEXT,
    manager_eid INTEGER NOT NULL,
    created_by INTEGER NOT NULL,
    created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW(),
    updated_by INTEGER NOT NULL,
    updated_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE TYPE audit_action AS ENUM ('CREATE', 'UPDATE');

CREATE TABLE thrivepath_audit_logs (
    id SERIAL PRIMARY KEY,
    action audit_action NOT NULL,
    table_name VARCHAR(100) NOT NULL,
    table_id INTEGER NOT NULL,
    changes JSONB,
    created_by INTEGER NOT NULL,
    created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW()
);

INSERT INTO thrivepath_annual_step_cycle (month, step, start_date, end_date, description, visibility_level, ordering, created_by, updated_by) VALUES ('Jan', 'Annual Goal Setting', '01-06', '01-31', 'Managers and employees set clear, measurable goals to anchor performance and growth for the year.',ARRAY['S1']::VARCHAR(2)[], 1, 139172, 139172);
INSERT INTO thrivepath_annual_step_cycle (month, step, start_date, end_date, description, visibility_level, ordering, created_by, updated_by) VALUES ('Mar–Apr', 'Quarterly Check-In 1', '04-07', '04-18', 'Reflect on Q1: celebrate wins, review progress, discuss challenges, share feedback, and set next-quarter priorities.',ARRAY['E']::VARCHAR(2)[], 2, 139172, 139172);
INSERT INTO thrivepath_annual_step_cycle (month, step, start_date, end_date, description, visibility_level, ordering, created_by, updated_by) VALUES ('Jun–Jul', 'Quarterly Check-In 2', '07-07', '07-18', 'Check mid-year progress: align on goals, surface challenges, and ensure development gets timely attention.', ARRAY['E']::VARCHAR(2)[], 3, 139172, 139172);
INSERT INTO thrivepath_annual_step_cycle (month, step, start_date, end_date, description, visibility_level, ordering, created_by, updated_by) VALUES ('Jul', 'Mid-Year Leadership Potential Assessment', '07-21', '07-31', 'Leaders assess the 9-Box category of their people managers to guide coaching and early development.', ARRAY['S1','S2','S3']::VARCHAR(2)[], 4, 139172, 139172);
INSERT INTO thrivepath_annual_step_cycle (month, step, start_date, end_date, description, visibility_level, ordering, created_by, updated_by) VALUES ('Sep', 'Quarterly Check-In 3', '09-08', '09-19', 'Review Q3 progress, recognize contributions, discuss barriers, and set final-quarter priorities.', ARRAY['E']::VARCHAR(2)[], 5, 139172, 139172);
INSERT INTO thrivepath_annual_step_cycle (month, step, start_date, end_date, description, visibility_level, ordering, created_by, updated_by) VALUES ('Nov', 'Year-End Self-Assessment', '11-03', '11-14', 'Employees reflect on annual achievements, challenges, and growth to provide perspective for managers.', ARRAY['E']::VARCHAR(2)[], 6, 139172, 139172);
INSERT INTO thrivepath_annual_step_cycle (month, step, start_date, end_date, description, visibility_level, ordering, created_by, updated_by) VALUES ('Nov', 'Year-End Manager Assessment', '11-17', '11-28', 'Managers evaluate annual performance, strengths, and development areas to prepare for the year-end discussion.', ARRAY['S1']::VARCHAR(2)[], 7, 139172, 139172);
INSERT INTO thrivepath_annual_step_cycle (month, step, start_date, end_date, description, visibility_level, ordering, created_by, updated_by) VALUES ('Dec', 'Year-End Performance Score Discussion', '12-01', '12-12', 'Manager and employee align on results, celebrate achievements, and agree on growth priorities for the next cycle.', ARRAY['E','S1','S2','S3']::VARCHAR(2)[], 8, 139172, 139172);
INSERT INTO thrivepath_annual_step_cycle (month, step, start_date, end_date, description, visibility_level, ordering, created_by, updated_by) VALUES ('Dec', 'Year-End Leadership Potential Assessment', '12-15', '12-19', 'Leaders confirm 9-Box categories of their people managers to inform succession planning and talent development.', ARRAY['S1','S2','S3']::VARCHAR(2)[], 9, 139172, 139172);
