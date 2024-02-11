from fastapi import FastAPI
import process
# Create an instance of the FastAPI class
app = FastAPI()

# Define a route
@app.get("/")
async def read_root():
    return {"message": "Hello, FastAPI!"}

@app.post("/")
async def read_community_fisherman_data():
    return process.read_community_fisherman_data()

