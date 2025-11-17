from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_crisis_override():
    resp = client.post("/chat", json={"message": "I want to die"})
    assert resp.status_code == 200
    data = resp.json()
    assert data["intent"] == "crisis_override"
