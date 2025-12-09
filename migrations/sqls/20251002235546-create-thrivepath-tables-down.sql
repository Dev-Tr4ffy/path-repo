-- Start transaction to ensure atomicity
BEGIN;

-- Dropping tables
DROP TABLE IF EXISTS thrivepath_audit_logs;
DROP TABLE IF EXISTS thrivepath_performance_results;
DROP TABLE IF EXISTS thrivepath_goals;
DROP TABLE IF EXISTS thrivepath_annual_step_cycle;

-- Dropping custom types
DROP TYPE IF EXISTS audit_action;

-- Commit the transaction to apply changes
COMMIT;