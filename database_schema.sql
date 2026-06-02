/*
-- ==================================================================
-- SCHEMA FOR THE ICE PRODUCTIVITY APP
-- ==================================================================
*/

-- Main table for tasks
CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    status TEXT NOT NULL DEFAULT 'pending', -- e.g., 'pending', 'in_progress', 'completed'
    due_date TEXT, -- ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ
    priority INTEGER, -- e.g., 1 (low) to 5 (high)
    created_at TEXT NOT NULL, -- ISO 8601 format
    updated_at TEXT NOT NULL -- ISO 8601 format
);

-- Table for tags
CREATE TABLE IF NOT EXISTS tags (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE
);

-- Junction table for many-to-many relationship between tasks and tags
CREATE TABLE IF NOT EXISTS task_tags (
    task_id INTEGER NOT NULL,
    tag_id INTEGER NOT NULL,
    PRIMARY KEY (task_id, tag_id),
    FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
);

-- ==================================================================
-- POWERFUL REMINDER SYSTEM SCHEMA
-- ==================================================================

-- Table to store individual reminders linked to a task
CREATE TABLE IF NOT EXISTS reminders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    task_id INTEGER NOT NULL,
    remind_at TEXT NOT NULL, -- Specific time for the reminder, e.g., '2024-08-15T09:00:00Z'
    is_constant BOOLEAN NOT NULL DEFAULT 0, -- If 1, use an "always-on-top" window instead of a simple notification
    wifi_ssid_trigger TEXT, -- Optional: Trigger only when connected to this specific Wifi SSID
    created_at TEXT NOT NULL, -- ISO 8601 format
    FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE CASCADE
);

-- Table to define recurrence rules for reminders
CREATE TABLE IF NOT EXISTS recurrence_rules (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    reminder_id INTEGER NOT NULL,
    recurrence_type TEXT NOT NULL, -- 'DAILY', 'WEEKLY', 'MONTHLY', 'CRON'
    rule_definition TEXT NOT NULL, -- For 'WEEKLY': 'MON,TUE', For 'MONTHLY': '1,15', For 'CRON': '0 9 * * *'
    start_date TEXT NOT NULL, -- ISO 8601 format
    end_date TEXT, -- Optional: ISO 8601 format
    FOREIGN KEY (reminder_id) REFERENCES reminders(id) ON DELETE CASCADE
);
