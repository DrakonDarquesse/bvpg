# Generate Bibles Passages PowerPoint Slides 

## API

The APIs are served with FastAPI. It gets the bible verses from two sources, mongoDB (chinese simplified) and API.bible (english). 

### Setup

1. Setup python environment
    
    - use python 3.11

    - create virtual environment

    - install packages listed in requirements.txt

2. Create .env file and add the following variables
    
    - MONGODB_URI (points to database that stores bible verses)

    - API_KEY (used in calling APIs to retrieve bible verses)

3. Run the following command to start the server

    ```bash
    uvicorn main:app
    ```

## Frontend

The frontend is built with next.js.

### Setup

1. Uses pnpm to install packages

2. Create .env file and add the followig variable

    - PASSAGE_API (points to the server)