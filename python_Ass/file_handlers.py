
import csv
import json
import os
from datetime import datetime



DATA_DIR = "data"
os.makedirs(DATA_DIR, exist_ok=True)

def export_completion_report_csv(data):
    filename = os.path.join(DATA_DIR, f"completion_report_{datetime.now().strftime('%Y%m%d_%H%M%S')}.csv")
    with open(filename, mode="w", newline="") as file:
        writer = csv.writer(file)
        writer.writerow(["User Name", "Course Title"])
        writer.writerows(data)
    return filename

def log_dropouts_txt(dropouts):
    filename = os.path.join(DATA_DIR, "dropouts.txt")
    with open(filename, mode="a") as file:
        for d in dropouts:
            file.write(f"{d['id']} - {d['name']} - Last Activity: {d['last_activity']}\n")
    return filename

def backup_progress_json(progress_data):
    filename = os.path.join(DATA_DIR, f"user_progress_backup_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json")
    with open(filename, "w") as file:
        json.dump(progress_data, file, indent=4, default=str)
    return filename
