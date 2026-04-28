from fastapi import FastAPI
from schemas import ChatRequest
from agent import app as agent_app
from db import Base, engine, SessionLocal
from models import Interaction
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
last_memory = {}

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # allow all (for development)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Create DB tables
Base.metadata.create_all(bind=engine)



@app.post("/chat")
def chat(req: ChatRequest):
    global last_memory

    result = agent_app.invoke({
        "input": req.message,
        "last_output": last_memory
    })

    # ✅ save memory
    last_memory = result.get("output", {})

    return result


@app.post("/save")
def save(data: dict):
    db = SessionLocal()

    interaction = Interaction(
        hcp_name=data.get("hcp_name"),
        interaction_type=data.get("interaction_type"),
        summary=data.get("summary"),
        sentiment=data.get("sentiment"),
        follow_up=data.get("follow_up"),
    )

    db.add(interaction)
    db.commit()
    db.refresh(interaction)

    return interaction



@app.get("/interactions")
def get_all():
    db = SessionLocal()
    interactions = db.query(Interaction).all()
    return interactions



@app.put("/edit/{id}")
def edit_interaction(id: int, data: dict):
    db = SessionLocal()

    interaction = db.query(Interaction).filter(Interaction.id == id).first()

    if not interaction:
        return {"error": "Interaction not found"}

    # update fields dynamically
    for key, value in data.items():
        setattr(interaction, key, value)

    db.commit()
    db.refresh(interaction)

    return interaction



@app.delete("/delete/{id}")
def delete_interaction(id: int):
    db = SessionLocal()

    interaction = db.query(Interaction).filter(Interaction.id == id).first()

    if not interaction:
        return {"error": "Interaction not found"}

    db.delete(interaction)
    db.commit()

    return {"message": "Deleted successfully"}