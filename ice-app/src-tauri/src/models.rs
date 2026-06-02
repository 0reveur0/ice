use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug)]
pub struct Task {
    pub id: i64,
    pub title: String,
    pub description: Option<String>,
    pub status: String,
    pub due_date: Option<String>,
    pub priority: Option<i32>,
    pub created_at: String,
    pub updated_at: String,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct Tag {
    pub id: i64,
    pub name: String,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct TaskTag {
    pub task_id: i64,
    pub tag_id: i64,
}

// Structs for the Powerful Reminder System

#[derive(Serialize, Deserialize, Debug)]
pub struct Reminder {
    pub id: i64,
    pub task_id: i64,
    pub remind_at: String, // ISO 8601 format
    pub is_constant: bool,
    pub wifi_ssid_trigger: Option<String>,
    pub created_at: String, // ISO 8601 format
}

#[derive(Serialize, Deserialize, Debug)]
pub struct RecurrenceRule {
    pub id: i64,
    pub reminder_id: i64,
    pub recurrence_type: String, // e.g., 'DAILY', 'WEEKLY', 'MONTHLY', 'CRON'
    pub rule_definition: String,
    pub start_date: String, // ISO 8601 format
    pub end_date: Option<String>, // ISO 8601 format
}
