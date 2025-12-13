-- ============================================================================
-- DSP Observer Evaluation System - PostgreSQL Schema
-- ============================================================================
-- This is the raw SQL equivalent of the Prisma schema.
-- Use Prisma migrations (`npx prisma migrate dev`) instead of running this directly.
-- This file is provided for reference and documentation purposes.
-- ============================================================================

-- Enable UUID extension (if not already enabled)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- QUESTION RESPONSES TABLE
-- Stores the 33 numeric answers for each form submission
-- ============================================================================
CREATE TABLE question_responses (
    question_response_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    
    -- 33 question responses (nullable to allow partial submissions)
    q1  INTEGER,
    q2  INTEGER,
    q3  INTEGER,
    q4  INTEGER,
    q5  INTEGER,
    q6  INTEGER,
    q7  INTEGER,
    q8  INTEGER,
    q9  INTEGER,
    q10 INTEGER,
    q11 INTEGER,
    q12 INTEGER,
    q13 INTEGER,
    q14 INTEGER,
    q15 INTEGER,
    q16 INTEGER,
    q17 INTEGER,
    q18 INTEGER,
    q19 INTEGER,
    q20 INTEGER,
    q21 INTEGER,
    q22 INTEGER,
    q23 INTEGER,
    q24 INTEGER,
    q25 INTEGER,
    q26 INTEGER,
    q27 INTEGER,
    q28 INTEGER,
    q29 INTEGER,
    q30 INTEGER,
    q31 INTEGER,
    q32 INTEGER,
    q33 INTEGER,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- OBSERVERS TABLE
-- Stores observer information (people who evaluate DSPs)
-- ============================================================================
CREATE TABLE observers (
    observer_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email       VARCHAR(255) UNIQUE NOT NULL,
    name        VARCHAR(255) NOT NULL,
    created_at  TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- DSPS TABLE
-- Stores DSP information (each DSP has exactly one row)
-- ============================================================================
CREATE TABLE dsps (
    dsp_id     UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email      VARCHAR(255) UNIQUE NOT NULL,
    name       VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- OBSERVER SUBMISSIONS TABLE
-- Junction table: tracks which observer evaluated which DSP
-- Unique constraint on (observer_id, dsp_id) ensures one submission per pair
-- ============================================================================
CREATE TABLE observer_submissions (
    submission_id        UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    observer_id          UUID NOT NULL REFERENCES observers(observer_id) ON DELETE CASCADE,
    dsp_id               UUID NOT NULL REFERENCES dsps(dsp_id) ON DELETE CASCADE,
    question_response_id UUID UNIQUE NOT NULL REFERENCES question_responses(question_response_id) ON DELETE CASCADE,
    created_at           TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at           TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    -- One submission per (observer, dsp) pair
    UNIQUE(observer_id, dsp_id)
);

-- ============================================================================
-- DSP SUBMISSIONS TABLE
-- DSP self-evaluation submissions
-- Each DSP can have only ONE self-evaluation (dsp_id is unique)
-- ============================================================================
CREATE TABLE dsp_submissions (
    submission_id        UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    dsp_id               UUID UNIQUE NOT NULL REFERENCES dsps(dsp_id) ON DELETE CASCADE,
    question_response_id UUID UNIQUE NOT NULL REFERENCES question_responses(question_response_id) ON DELETE CASCADE,
    created_at           TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at           TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- INDEXES for better query performance
-- ============================================================================
CREATE INDEX idx_observer_submissions_observer_id ON observer_submissions(observer_id);
CREATE INDEX idx_observer_submissions_dsp_id ON observer_submissions(dsp_id);
CREATE INDEX idx_dsp_submissions_dsp_id ON dsp_submissions(dsp_id);

-- ============================================================================
-- TRIGGER: Auto-update updated_at timestamp
-- ============================================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_question_responses_updated_at
    BEFORE UPDATE ON question_responses
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_observer_submissions_updated_at
    BEFORE UPDATE ON observer_submissions
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_dsp_submissions_updated_at
    BEFORE UPDATE ON dsp_submissions
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

