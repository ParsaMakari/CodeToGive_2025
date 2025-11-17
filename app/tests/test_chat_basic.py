from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_chat_basic_structure():
    resp = client.post("/chat", json={"message": "I want to donate"})
    assert resp.status_code == 200
    data = resp.json()
    for key in ("response", "suggestions", "intent", "confidence", "session_id", "language"):
        assert key in data
    assert isinstance(data["suggestions"], list)
