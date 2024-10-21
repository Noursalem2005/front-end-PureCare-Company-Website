from fastapi import FastAPI, Request, Form
from fastapi.middleware.cors import CORSMiddleware
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import json
import os

app = FastAPI()

# Allow CORS for local development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define the path for the JSON files
DATA_FILE_PATH = "form_data.json"
CONTACT_FILE_PATH = "contact_form_data.json"

@app.get("/")
async def read_root():
    return {"message": "Welcome to the FastAPI server!"}

@app.post("/submit-form")
async def submit_form(request: Request):
    data = await request.json()
    name = data.get("name")
    email = data.get("email")
    phone = data.get("phone")
    message = data.get("message")
    medical_issue = data.get("medical_issue")
    preferred_contact = data.get("preferred_contact")

    print(f"Received data: name={name}, email={email}, phone={phone}, message={message}, medical_issue={medical_issue}, preferred_contact={preferred_contact}")
    
    # Create a dictionary with the form data
    form_data = {
        "name": name,
        "email": email,
        "phone": phone,
        "message": message,
        "medical_issue": medical_issue,
        "preferred_contact": preferred_contact
    }

    # Load existing data from the JSON file
    if os.path.exists(DATA_FILE_PATH):
        with open(DATA_FILE_PATH, "r") as file:
            data = json.load(file)
    else:
        data = []

    # Append the new form data
    data.append(form_data)

    # Save the updated data back to the JSON file
    with open(DATA_FILE_PATH, "w") as file:
        json.dump(data, file, indent=4)

    # Email configuration using Gmail with App Password
    sender_email = "noursalem741@gmail.com"  # Your Gmail address
    receiver_email = "noursalem741@gmail.com"  # The email where you want to receive messages
    password = "kxra osie zlgk cjza"  # Your App Password from Google

    # SMTP server settings for Gmail
    smtp_server = "smtp.gmail.com"
    smtp_port = 587

    # Create the email content
    msg = MIMEMultipart()
    msg["From"] = sender_email
    msg["To"] = receiver_email
    msg["Subject"] = "New Contact Form Submission"

    body = f"""
    Name: {name}
    Email: {email}
    Phone: {phone}
    Message: {message}
    Medical Issue: {medical_issue}
    Preferred Contact Method: {preferred_contact}
    """
    msg.attach(MIMEText(body, "plain"))

    # Send the email
    try:
        with smtplib.SMTP(smtp_server, smtp_port) as server:
            server.starttls()
            server.login(sender_email, password)
            server.sendmail(sender_email, receiver_email, msg.as_string())
        return {"message": "Form submitted successfully!"}
    except Exception as e:
        return {"error": str(e)}

@app.post("/submit-contact-form")
async def submit_contact_form(request: Request):
    data = await request.json()
    name = data.get("name")
    email = data.get("email")
    message = data.get("message")
    date = data.get("date")

    print(f"Received contact form data: name={name}, email={email}, message={message}, date={date}")
    
    # Create a dictionary with the contact form data
    contact_form_data = {
        "name": name,
        "email": email,
        "message": message,
        "date": date
    }

    # Load existing data from the contact JSON file
    if os.path.exists(CONTACT_FILE_PATH):
        with open(CONTACT_FILE_PATH, "r") as file:
            data = json.load(file)
    else:
        data = []

    # Append the new contact form data
    data.append(contact_form_data)

    # Save the updated data back to the contact JSON file
    with open(CONTACT_FILE_PATH, "w") as file:
        json.dump(data, file, indent=4)

    # Email configuration using Gmail with App Password
    sender_email = "noursalem741@gmail.com"  # Your Gmail address
    receiver_email = "noursalem741@gmail.com"  # The email where you want to receive messages
    password = "kxra osie zlgk cjza"  # Your App Password from Google

    # SMTP server settings for Gmail
    smtp_server = "smtp.gmail.com"
    smtp_port = 587

    # Create the email content
    msg = MIMEMultipart()
    msg["From"] = sender_email
    msg["To"] = receiver_email
    msg["Subject"] = "New Contact Form Submission"

    body = f"""
    Name: {name}
    Email: {email}
    Message: {message}
    Date: {date}
    """
    msg.attach(MIMEText(body, "plain"))

    # Send the email
    try:
        with smtplib.SMTP(smtp_server, smtp_port) as server:
            server.starttls()
            server.login(sender_email, password)
            server.sendmail(sender_email, receiver_email, msg.as_string())
        return {"message": "Contact form submitted successfully!"}  # Ensure JSON response with message
    except Exception as e:
        return {"error": str(e)}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)