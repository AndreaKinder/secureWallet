from asyncio.log import logger
from typing import Union
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import requests
import network_as_code
import os
from dotenv import load_dotenv
from supabase import create_client, Client


app = FastAPI(
    title="SecureWallet API",
    description="API for secure wallet verification services",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

load_dotenv()
client = network_as_code.NetworkAsCodeClient(token=os.getenv("NAC_API_TOKEN"))


url: str = os.environ.get("SUPABASE_URL")
key: str = os.environ.get("SUPABASE_KEY")
supabase: Client = create_client(url, key)




class SimSwapResponse(BaseModel):
    phoneNumber: str
    lastSimChange: str
    status: str

class LocationPoint(BaseModel):
    latitude: float
    longitude: float

class LocationVerificationResponse(BaseModel):
    verified: bool
    accuracy: float
    timestamp: str
    location: LocationPoint

class VerifyUserStatusResponse(BaseModel):
    sim_swap: SimSwapResponse
    location_verification: LocationVerificationResponse

class VerifyUserStatusRequest(BaseModel):
    phone_number: str

@app.get("/", response_model=dict[str, str])
def read_root():
    return {"Hello": "World"}

@app.post("/verifyUserStatus", response_model=VerifyUserStatusResponse)
def verify_user_status(request: VerifyUserStatusRequest):
    # Then, create a device object for the phone number you want to check
    my_device = client.devices.get(
        # The phone number does not accept spaces or parentheses
        phone_number=request.phone_number
    )

    # The date of the last SIM Swap can be retrieved like so:
    # The output may be null, if no SIM Swap has occurred.
    # Or it may also return the SIM activation date.
    sim_swap_date = my_device.get_sim_swap_date()

    # You can also test if the SIM swap happened recently:
    if my_device.verify_sim_swap(max_age=900):
        print("A SIM swap occurred within the past fifteen minutes!")

    return {
        "sim_swap": sim_swap_date,
        "location_verification": True
    }


class LoginRequest(BaseModel):
    username: str
    password: str

class LoginResponse(BaseModel):
    success: bool
    swap_recent: bool | None = None
    error: str | None = None
    username: str | None = None
    latitude: float | None = None
    longitude: float | None = None


def is_swim_swap_recent(device: str):
    my_device = client.devices.get(
        # The phone number does not accept spaces or parentheses
        phone_number=device
    )
    return my_device.verify_sim_swap(max_age=900)

@app.post("/login", response_model=LoginResponse)
def login(request: LoginRequest):

    try:
        response = supabase.auth.sign_in_with_password(
        {
            "email": request.username, 
            "password": request.password,
        }
        )
        user = response.user
        user_phone = None
         # Get user's phone number from Supabase user metadata
        if user:
            user_phone = user.phone
        print("user_phone: ", user_phone)
        print("response: ", user.user_metadata)
        # Get latitude and longitude from Supabase
        response_location = get_user_location(request.username)
        # Parse response
        if response_location:
            print(f"Longitude: {response_location['longitude']}, Latitude: {response_location['latitude']}")
        else:
            print(f"No location data found for the user with email: {request.username}")
        return {
            "success": True,
            "username": user.user_metadata['display_name'],
            "latitude": response_location['longitude'],
            "longitude": response_location['latitude'],
            "swap_recent": is_swim_swap_recent(user_phone)
        }
    except Exception as e:
        return {
            "success": False,
            "error": str(e)
        }
   
   

def get_user_location(email):
    # Call the get_user_location function with the email parameter
    response = supabase.rpc("get_user_location", {"email_input": email}).execute()
    
    if response.data:
        # Extract longitude and latitude from the response
        location = response.data[0]
        print("location: ", location)
        return {
            "longitude": location["longitude"],
            "latitude": location["latitude"]
        }

    else:
        return None

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)