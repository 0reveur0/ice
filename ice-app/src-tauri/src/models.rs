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
