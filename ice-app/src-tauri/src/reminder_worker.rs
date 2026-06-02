use std::thread;
use std::time::Duration;

pub fn start_reminder_worker() {
    thread::spawn(move || {
        loop {
            // This is the heart of the background worker.
            // It will run every minute.
            println!("Reminder worker running...");

            // Put the thread to sleep for 60 seconds to avoid high CPU usage.
            thread::sleep(Duration::from_secs(60));
        }
    });
}
