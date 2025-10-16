from fastapi import FastAPI, HTTPException
import httpx
import asyncio
from dotenv import load_dotenv
import os
import random
import asyncio
from datetime import datetime



load_dotenv()
RANDOMMER_API_KEY = os.getenv("RANDOMMER_API_KEY")
print("✅ RANDOMMER_API_KEY:", RANDOMMER_API_KEY)
HEADERS = {"X-Api-Key": RANDOMMER_API_KEY}

app = FastAPI(title="API Pipeline v2")

# --- Fonctions pour Randommer et RandomUser ---
async def get_random_user():
    async with httpx.AsyncClient() as client:
        res = await client.get("https://randomuser.me/api/")
        res.raise_for_status()
        user = res.json()["results"][0]
        return {
            "name": f"{user['name']['first']} {user['name']['last']}",
            "email": user["email"],
            "gender": user["gender"],
            "location": f"{user['location']['city']}, {user['location']['country']}",
            "picture": user["picture"]["large"]
        }

async def get_phone():
    async with httpx.AsyncClient() as client:
        res = await client.get("https://randommer.io/api/Phone/Generate?CountryCode=FR&Quantity=1", headers=HEADERS)
        res.raise_for_status()
        return res.json()[0]

async def get_iban():
    async with httpx.AsyncClient() as client:
        res = await client.get("https://randommer.io/api/Finance/Iban/FR", headers=HEADERS)
        res.raise_for_status()
        return res.json()


async def get_credit_card():
    async with httpx.AsyncClient() as client:
        res = await client.get("https://randommer.io/api/Card?type=VISA", headers=HEADERS)
        res.raise_for_status()
        card = res.json()
        
        date_str = card.get("date")
        expiration_date = None
        
        if date_str:
            parts = date_str.split('-')
            if len(parts) >= 2:
                year = parts[0]
                month = parts[1]
                expiration_date = f"{month}/{year}"
        
        return {
            "card_number": card.get("cardNumber"),
            "card_type": card.get("type"),
            "expiration_date": expiration_date,
            "cvv": card.get("cvv")
        }


async def get_random_name():
    async with httpx.AsyncClient() as client:
        res = await client.get("https://randommer.io/api/Name?nameType=firstname&quantity=1", headers=HEADERS)
        res.raise_for_status()
        return res.json()[0]

async def get_pet():
    return random.choice(["Cat", "Dog", "Rabbit", "Parrot"])

async def get_quote():
    quotes = [
        {"content": "The only way to do great work is to love what you do.", "author": "Steve Jobs"},
        {"content": "Code is like humor. When you have to explain it, it’s bad.", "author": "Cory House"}
    ]
    return random.choice(quotes)

async def get_joke():
    jokes = [
        {"type": "Programming", "content": "Why do programmers prefer dark mode? Because light attracts bugs."},
        {"type": "Programming", "content": "I told my computer I needed a break, and it said 'No problem – I’ll go to sleep.'"}
    ]
    return random.choice(jokes)

# --- Endpoint principal ---
@app.get("/pipeline")
async def pipeline():
    try:
        user, phone, iban, card, random_name, pet, quote, joke = await asyncio.gather(
            get_random_user(),
            get_phone(),
            get_iban(),
            get_credit_card(),
            get_random_name(),
            get_pet(),
            get_quote(),
            get_joke()
        )

        return {
            "user": user,
            "phone_number": phone,
            "iban": iban,
            "credit_card": card,
            "random_name": random_name,
            "pet": pet,
            "quote": quote,
            "joke": joke
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erreur lors de la récupération des données : {e}")
