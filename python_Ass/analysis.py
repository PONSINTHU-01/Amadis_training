
import pandas as pd
from database import SessionLocal
from models import ModuleProgress

def analyze_data():
    session = SessionLocal()
    progress = session.query(ModuleProgress).all()

    # Convert to DataFrame
    df = pd.DataFrame([{
        "user_id": p.user_id,
        "module_id": p.module_id,
        "completion_status": p.completion_status,
        "quiz_score": p.quiz_score
    } for p in progress])

    if df.empty:
        return {"message": "No progress data to analyze"}

    completion_rate = df["completion_status"].mean() * 100
    avg_quiz_score = df["quiz_score"].mean()
    engagement = df.groupby("user_id").size().mean()

    return {
        "completion_rate_percent": round(completion_rate, 2),
        "average_quiz_score": round(avg_quiz_score, 2),
        "average_modules_per_user": round(engagement, 2)
    }
