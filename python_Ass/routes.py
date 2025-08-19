
from flask import Blueprint, request, jsonify
from database import SessionLocal
from models import User, Course, Module, ModuleProgress
from analysis import analyze_data
from file_handlers import export_completion_report_csv, log_dropouts_txt, backup_progress_json
from datetime import datetime, timedelta

routes = Blueprint("routes", __name__)

@routes.route("/add_user", methods=["POST"])
def add_user():
    session = SessionLocal()
    data = request.json
    user = User(name=data["name"], email=data["email"])
    session.add(user)
    session.commit()
    return jsonify({"message": "User added"}), 201

@routes.route("/add_course", methods=["POST"])
def add_course():
    session = SessionLocal()
    data = request.json
    course = Course(title=data["title"], description=data.get("description"))
    session.add(course)
    session.commit()
    return jsonify({"message": "Course added"}), 201

@routes.route("/add_module", methods=["POST"])
def add_module():
    session = SessionLocal()
    data = request.json
    module = Module(course_id=data["course_id"], title=data["title"], description=data.get("description"))
    session.add(module)
    session.commit()
    return jsonify({"message": "Module added"}), 201

@routes.route("/update_progress", methods=["POST"])
def update_progress():
    session = SessionLocal()
    data = request.json
    progress = ModuleProgress(
        user_id=data["user_id"],
        module_id=data["module_id"],
        completion_status=data["completion_status"],
        quiz_score=data["quiz_score"]
    )
    session.add(progress)
    session.commit()
    return jsonify({"message": "Progress updated"}), 200

@routes.route("/analytics", methods=["GET"])
def get_analytics():
    return jsonify(analyze_data())

@routes.route("/export_csv", methods=["GET"])
def export_csv():
    session = SessionLocal()
    
    courses = session.query(Course).all()
    completion_records = []

    for course in courses:
      
        modules = session.query(Module).filter(Module.course_id == course.id).all()
        module_ids = [m.id for m in modules]

        users = session.query(User).all()
        for user in users:
            
            completed_modules = session.query(ModuleProgress)\
                .filter(ModuleProgress.user_id == user.id,
                        ModuleProgress.module_id.in_(module_ids),
                        ModuleProgress.completion_status == True).all()
            
            if len(completed_modules) == len(module_ids) and len(module_ids) > 0:
             
                completion_records.append((user.name, course.title))

    # Export CSV
    filepath = export_completion_report_csv(completion_records)
    return jsonify({"message": "Completion certificates exported", "file": filepath})

@routes.route("/backup_json", methods=["GET"])
def backup_json():
    session = SessionLocal()
    progress_data = session.query(ModuleProgress).all()
    data = [p.__dict__ for p in progress_data]
    for d in data:
        d.pop("_sa_instance_state", None)
    filepath = backup_progress_json(data)
    return jsonify({"message": "Backup completed", "file": filepath})

def get_dropouts():
    session = SessionLocal()
    threshold_date = datetime.now() - timedelta(days=30)

    # Query users who have been inactive for more than 30 days
    dropouts_query = session.query(User, Course).join(
        ModuleProgress, User.id == ModuleProgress.user_id, isouter=True
    ).join(
        Module, Module.id == ModuleProgress.module_id, isouter=True
    ).join(
        Course, Course.id == Module.course_id, isouter=True
    ).filter(
        # Handle both cases: user has incomplete progress OR no progress at all
        ((ModuleProgress.completion_status == False) | (ModuleProgress.id == None)),
        # Ensure last_activity is not NULL before comparing
        (User.last_activity != None),
        (User.last_activity < threshold_date)
    ).all()

    dropouts = []
    for user, course in dropouts_query:
        dropouts.append({
            "user_id": user.id,
            "name": user.name,
            "course": course.title if course else "Unknown",
            "last_activity": user.last_activity.strftime("%Y-%m-%d %H:%M:%S") if user.last_activity else None
        })

    return dropouts


@routes.route("/log_dropouts", methods=["GET"])
def log_dropouts():
    dropouts = get_dropouts()
    if not dropouts:
        return jsonify({"message": "No dropouts found"}), 200

    filepath = log_dropouts_txt(dropouts)
    return jsonify({"message": f"{len(dropouts)} dropouts logged", "file": filepath})
def get_dropouts():
    session = SessionLocal()
    threshold_date = datetime.now() - timedelta(days=30)

    # Query users who have been inactive for more than 30 days
    dropouts_query = session.query(User, Course).join(
        ModuleProgress, User.id == ModuleProgress.user_id, isouter=True
    ).join(
        Module, Module.id == ModuleProgress.module_id, isouter=True
    ).join(
        Course, Course.id == Module.course_id, isouter=True
    ).filter(
        # Handle both cases: user has incomplete progress OR no progress at all
        ((ModuleProgress.completion_status == False) | (ModuleProgress.id == None)),
        # Ensure last_activity is not NULL before comparing
        (User.last_activity != None),
        (User.last_activity < threshold_date)
    ).all()

    dropouts = []
    for user, course in dropouts_query:
        dropouts.append({
            "user_id": user.id,
            "name": user.name,
            "course": course.title if course else "Unknown",
            "last_activity": user.last_activity.strftime("%Y-%m-%d %H:%M:%S") if user.last_activity else None
        })

    return dropouts


@routes.route("/log_dropouts", methods=["GET"], endpoint="log_dropouts_api")
def log_dropouts():
    dropouts = get_dropouts()
    if not dropouts:
        return jsonify({"message": "No dropouts found"}), 200

    filepath = log_dropouts_txt(dropouts)
    return jsonify({"message": f"{len(dropouts)} dropouts logged", "file": filepath})
