from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Dict, Optional
import uuid
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")

class Question(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: int
    text: str
    category: str
    subcategory: str

class Answer(BaseModel):
    question_id: int
    value: int

class AssessmentSubmission(BaseModel):
    answers: List[Answer]
    user_info: Optional[Dict] = None

class CareerMatch(BaseModel):
    title: str
    match_score: int
    description: str
    traits: List[str]
    sample_careers: List[str]

class AssessmentResult(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str
    career_matches: List[CareerMatch]
    personality_type: str
    top_strengths: List[str]
    timestamp: datetime

QUESTIONS_DATA = [
    {"id": 1, "text": "I enjoy working with tools, machines, or equipment to build or fix things.", "category": "Realistic", "subcategory": "Interests"},
    {"id": 2, "text": "I prefer hands-on work over working at a desk with paperwork.", "category": "Realistic", "subcategory": "Interests"},
    {"id": 3, "text": "I like solving complex problems and conducting research.", "category": "Investigative", "subcategory": "Interests"},
    {"id": 4, "text": "I enjoy analyzing data and discovering patterns.", "category": "Investigative", "subcategory": "Interests"},
    {"id": 5, "text": "I express myself through creative activities like art, music, or writing.", "category": "Artistic", "subcategory": "Interests"},
    
    {"id": 6, "text": "I enjoy designing or creating original content.", "category": "Artistic", "subcategory": "Interests"},
    {"id": 7, "text": "I like helping people and making a positive impact on their lives.", "category": "Social", "subcategory": "Interests"},
    {"id": 8, "text": "I enjoy teaching, counseling, or working in teams.", "category": "Social", "subcategory": "Interests"},
    {"id": 9, "text": "I like leading projects and making important decisions.", "category": "Enterprising", "subcategory": "Interests"},
    {"id": 10, "text": "I am comfortable with persuading or influencing others.", "category": "Enterprising", "subcategory": "Interests"},
    
    {"id": 11, "text": "I prefer organized, structured work with clear procedures.", "category": "Conventional", "subcategory": "Work Style"},
    {"id": 12, "text": "I pay close attention to details and accuracy.", "category": "Conventional", "subcategory": "Work Style"},
    {"id": 13, "text": "I am energized by meeting new people and social interactions.", "category": "Extraversion", "subcategory": "Personality"},
    {"id": 14, "text": "I feel comfortable speaking in front of large groups.", "category": "Extraversion", "subcategory": "Personality"},
    {"id": 15, "text": "I prefer working independently rather than in groups.", "category": "Introversion", "subcategory": "Personality"},
    
    {"id": 16, "text": "I am comfortable working with uncertainty and adapting to change.", "category": "Openness", "subcategory": "Personality"},
    {"id": 17, "text": "I enjoy learning new technologies and methods.", "category": "Openness", "subcategory": "Skills"},
    {"id": 18, "text": "I am good at managing my time and staying organized.", "category": "Conscientiousness", "subcategory": "Skills"},
    {"id": 19, "text": "I remain calm under pressure and meet deadlines consistently.", "category": "Conscientiousness", "subcategory": "Skills"},
    {"id": 20, "text": "I value work-life balance and flexible working conditions.", "category": "Work Values", "subcategory": "Values"}
]

CAREER_PROFILES = {
    "The Innovator": {
        "title": "The Innovator",
        "description": "You thrive on creativity and problem-solving. You're drawn to cutting-edge technologies and original thinking.",
        "traits": ["Creative", "Analytical", "Open to Experience", "Independent"],
        "sample_careers": ["Software Developer", "Data Scientist", "Product Designer", "Research Scientist", "Entrepreneur"],
        "primary_categories": ["Investigative", "Artistic", "Openness"]
    },
    "The Builder": {
        "title": "The Builder",
        "description": "You excel at hands-on work and creating tangible results. You prefer practical solutions and working with tools or technology.",
        "traits": ["Practical", "Detail-oriented", "Technical", "Problem-solver"],
        "sample_careers": ["Engineer", "Architect", "Mechanic", "Electrician", "Construction Manager"],
        "primary_categories": ["Realistic", "Conventional"]
    },
    "The Helper": {
        "title": "The Helper",
        "description": "You're passionate about making a difference in people's lives. You excel in supportive, collaborative environments.",
        "traits": ["Empathetic", "Communicative", "Patient", "Team-oriented"],
        "sample_careers": ["Teacher", "Nurse", "Counselor", "Social Worker", "Human Resources Specialist"],
        "primary_categories": ["Social", "Extraversion"]
    },
    "The Leader": {
        "title": "The Leader",
        "description": "You have strong organizational and persuasive skills. You thrive in dynamic environments and enjoy taking charge.",
        "traits": ["Confident", "Decisive", "Strategic", "Influential"],
        "sample_careers": ["Business Manager", "Marketing Director", "Sales Executive", "Project Manager", "CEO"],
        "primary_categories": ["Enterprising", "Extraversion"]
    },
    "The Analyst": {
        "title": "The Analyst",
        "description": "You excel at working with data, systems, and structured processes. You value accuracy and logical thinking.",
        "traits": ["Logical", "Organized", "Methodical", "Precise"],
        "sample_careers": ["Accountant", "Financial Analyst", "Data Analyst", "Operations Manager", "Quality Assurance Specialist"],
        "primary_categories": ["Conventional", "Investigative", "Conscientiousness"]
    }
}

@api_router.get("/")
async def root():
    return {"message": "PathFinder API is running"}

@api_router.get("/questions", response_model=List[Question])
async def get_questions():
    return QUESTIONS_DATA

@api_router.post("/submit-assessment")
async def submit_assessment(submission: AssessmentSubmission):
    category_scores = {}
    
    for answer in submission.answers:
        question = next((q for q in QUESTIONS_DATA if q["id"] == answer.question_id), None)
        if question:
            category = question["category"]
            if category not in category_scores:
                category_scores[category] = 0
            category_scores[category] += answer.value
    
    sorted_categories = sorted(category_scores.items(), key=lambda x: x[1], reverse=True)
    
    career_matches = []
    matched_profiles = set()
    
    for profile_name, profile_data in CAREER_PROFILES.items():
        score = 0
        for category in profile_data["primary_categories"]:
            score += category_scores.get(category, 0)
        
        match_percentage = min(100, int((score / 15) * 100))
        
        if match_percentage >= 50:
            career_matches.append({
                "title": profile_data["title"],
                "match_score": match_percentage,
                "description": profile_data["description"],
                "traits": profile_data["traits"],
                "sample_careers": profile_data["sample_careers"]
            })
            matched_profiles.add(profile_name)
    
    if len(career_matches) < 3:
        for profile_name, profile_data in CAREER_PROFILES.items():
            if profile_name not in matched_profiles:
                score = sum(category_scores.get(cat, 0) for cat in profile_data["primary_categories"])
                match_percentage = min(100, int((score / 15) * 100))
                career_matches.append({
                    "title": profile_data["title"],
                    "match_score": max(40, match_percentage),
                    "description": profile_data["description"],
                    "traits": profile_data["traits"],
                    "sample_careers": profile_data["sample_careers"]
                })
                if len(career_matches) >= 3:
                    break
    
    career_matches.sort(key=lambda x: x["match_score"], reverse=True)
    career_matches = career_matches[:3]
    
    top_category = sorted_categories[0][0] if sorted_categories else "Balanced"
    
    top_strengths = []
    if sorted_categories:
        for cat, score in sorted_categories[:3]:
            if cat == "Realistic":
                top_strengths.append("Hands-on Problem Solving")
            elif cat == "Investigative":
                top_strengths.append("Analytical Thinking")
            elif cat == "Artistic":
                top_strengths.append("Creative Expression")
            elif cat == "Social":
                top_strengths.append("Interpersonal Skills")
            elif cat == "Enterprising":
                top_strengths.append("Leadership & Initiative")
            elif cat == "Conventional":
                top_strengths.append("Organization & Attention to Detail")
    
    result_id = str(uuid.uuid4())
    result = {
        "id": result_id,
        "career_matches": career_matches,
        "personality_type": career_matches[0]["title"] if career_matches else "Balanced Professional",
        "top_strengths": top_strengths[:3],
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "category_scores": category_scores
    }
    
    await db.assessment_results.insert_one(result)
    
    return {
        "result_id": result_id,
        "career_matches": career_matches,
        "personality_type": result["personality_type"],
        "top_strengths": top_strengths
    }

@api_router.get("/results/{result_id}")
async def get_result(result_id: str):
    result = await db.assessment_results.find_one({"id": result_id}, {"_id": 0})
    if not result:
        raise HTTPException(status_code=404, detail="Result not found")
    return result

app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()