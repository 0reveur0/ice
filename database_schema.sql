
-- =================================================================
-- Schema for Ice Application - Version 1.0.0
-- Designed for Scalability and Offline-First Performance.
-- =================================================================

-- Settings Table: A key-value store for application settings like themes.
CREATE TABLE settings (
    key TEXT PRIMARY KEY NOT NULL,
    value TEXT
);

-- Tasks Table: The core of the productivity features.
CREATE TABLE tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    status TEXT NOT NULL DEFAULT 'todo', -- e.g., 'todo', 'inprogress', 'done', 'kanban_column_name'
    priority INTEGER NOT NULL DEFAULT 3, -- Eisenhower Matrix: 1 (Urgent & Important), 2 (Important), 3 (Urgent), 4 (Neither)
    start_date TEXT, -- ISO 8601 format: YYYY-MM-DD
    end_date TEXT,   -- ISO 8601 format: YYYY-MM-DD
    pomodoro_sessions_completed INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Tags Table: For organizing tasks.
CREATE TABLE tags (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE
);

-- Task_Tags Junction Table: Many-to-many relationship between tasks and tags.
CREATE TABLE task_tags (
    task_id INTEGER NOT NULL,
    tag_id INTEGER NOT NULL,
    PRIMARY KEY (task_id, tag_id),
    FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
);

-- Habits Table: Definitions of habits to track.
CREATE TABLE habits (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Habit Completions Table: Log of daily habit completions.
CREATE TABLE habit_completions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    habit_id INTEGER NOT NULL,
    completion_date TEXT NOT NULL, -- ISO 8601 format: YYYY-MM-DD
    UNIQUE(habit_id, completion_date),
    FOREIGN KEY (habit_id) REFERENCES habits(id) ON DELETE CASCADE
);

-- Music Tracks Table: For the study music player.
CREATE TABLE music_tracks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    youtube_id TEXT NOT NULL UNIQUE,
    channel_name TEXT
);

-- Countdown Events Table: For user-defined events and holidays.
CREATE TABLE countdown_events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    event_date TEXT NOT NULL, -- ISO 8601 format: YYYY-MM-DD
    is_holiday INTEGER NOT NULL DEFAULT 0 -- Boolean: 0 for user event, 1 for fixed holiday
);

-- Sticky Notes Table: For on-screen notes.
CREATE TABLE sticky_notes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    content TEXT,
    color TEXT DEFAULT '#ffeb3b', -- Default yellow color
    pos_x REAL NOT NULL DEFAULT 0,
    pos_y REAL NOT NULL DEFAULT 0,
    width REAL NOT NULL DEFAULT 250,
    height REAL NOT NULL DEFAULT 250,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- =================================================================
-- Seeding default data
-- =================================================================

-- Default theme setting
INSERT INTO settings (key, value) VALUES ('theme', 'default_dark');
