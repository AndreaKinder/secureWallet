from typing import Union
from fastapi import FastAPI, HTTPException
from network_as_code.models import DeviceIpv4Addr
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
    swap_recent: bool
    error: str | None = None


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
        user_phone = None
        print(response.user)
         # Get user's phone number from Supabase user metadata
        if response.user and response.user.phone:
            user_phone = response.user.phone
        return {
            "success": response.user is not None,
            "swap_recent": is_swim_swap_recent(user_phone)
        }
    except Exception as e:
        return {
            "success": False,
            "error": str(e)
        }
   
   

def verify_device_location(device: str):
    my_device = client.devices.get(
        phone_number=device
    )
    return my_device.verify_location(latitude=41.390205, longitude=2.154007, radius=5000)



if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)