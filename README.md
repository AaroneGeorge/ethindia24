Memecoin Marketplace
====================

Memecoin Marketplace is a platform for interacting with, buying, and selling memecoins through a personalized AI chatbot experience. The marketplace is designed to be fun, seamless, and beginner-friendly, with wallet functionalities powered by Okto.

Steps to Run the Project Locally
--------------------------------

### Prerequisites

*   **Node.js**: Ensure you have Node.js installed (version 16+ recommended).
    
*   **NPM/Yarn**: Install npm (comes with Node.js) or Yarn for package management.
    

### 1\. Setup the Frontend
```bash
cd ui
yarn install    
yarn dev
```
Open your browser and go to http://localhost:3000 to view the frontend.
    

### 2\. Setup the Backend

1. Navigate to the backend folder:
```bash
cd ai-backend
```
2. Create and activate a virtual environment:
```bash
python3 -m venv venv
# On Windows:
.\venv\Scripts\activate
# On Mac/Linux:
source venv/bin/activate
```
3. Install dependencies:
```bash
pip3 install -r requirements.txt
```
4. Start the FastAPI server:
```bash
uvicorn main:app --reload
```
5. The backend will be available at http://127.0.0.1:8000.
