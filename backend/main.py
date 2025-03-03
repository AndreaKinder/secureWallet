from typing import Union
from fastapi import FastAPI, HTTPException
import requests

app = FastAPI()


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.post("/verifyUserStatus")
def verify_user_status(phone_number: str):
    # SIM Swap API
    sim_swap_url = "https://sim-swap.p-eu.rapidapi.com/sim-swap/sim-swap/v0/retrieve-date"
    sim_swap_payload = {"phoneNumber": phone_number}
    sim_swap_headers = {
        "x-rapidapi-key": "9aa0d99e05mshc02abfd119c26e5p12e750jsn383bfb5df36c",
        "x-rapidapi-host": "sim-swap.nokia.rapidapi.com",
        "Content-Type": "application/json"
    }

    sim_swap_response = requests.post(sim_swap_url, json=sim_swap_payload, headers=sim_swap_headers)
    sim_swap_result = sim_swap_response.json()

    # Location Verification API
    location_verification_url = "https://location-verification.p-eu.rapidapi.com/verify"
    location_verification_payload = {
        "device": {"phoneNumber": phone_number},
        "area": {
            "areaType": "CIRCLE",
            "center": {
                "latitude": -90, # data from user 
                "longitude": -180 # data from user
            },
            "radius": 3000 # Default radius if not provided
        },
        "maxAge": 3600 # Default max age if not provided
    }
    location_verification_headers = {
        "x-rapidapi-key": "9aa0d99e05mshc02abfd119c26e5p12e750jsn383bfb5df36c",
        "x-rapidapi-host": "location-verification.nokia.rapidapi.com",
        "Content-Type": "application/json"
    }

    location_verification_response = requests.post(location_verification_url, json=location_verification_payload, headers=location_verification_headers)
    location_verification_result = location_verification_response.json()

    return {
        "sim_swap": sim_swap_result,
        "location_verification": location_verification_result
    }