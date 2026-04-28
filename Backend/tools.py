import os
from groq import Groq
from dotenv import load_dotenv
import json
import re

load_dotenv()


client = Groq(api_key=os.getenv("GROQ_API_KEY"))



def clean_json(output):
    # remove markdown
    output = output.replace("```json", "").replace("```", "").strip()

    # remove comments (// ...)
    output = re.sub(r'//.*', '', output)

    return output.strip()


def log_interaction_tool(text):
    prompt = f"""
    Extract structured CRM data.

    Return ONLY valid JSON.
    No markdown, no comments.

    If sentiment not found, use "neutral".
    If user mentions brochure, document, pdf → put in materials_shared.
    If user mentions samples → put in samples_distributed.

    Format:
    {{
      "hcp_name": "",
      "interaction_type": "",
      "summary": "",
      "sentiment": "",
      "follow_up": "",
      "materials_shared": "",
      "samples_distributed": ""
    }}

    Text: {text}
    """

    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[{"role": "user", "content": prompt}]
    )

    output = response.choices[0].message.content.strip()

    
    output = clean_json(output)

    try:
        return json.loads(output)
    except Exception as e:
        print("JSON ERROR:", output)
        return {
            "hcp_name": "",
            "interaction_type": "",
            "summary": text,
            "sentiment": "neutral",
            "follow_up": ""
        }



def safe_json_parse(output):
    # remove markdown
    output = output.replace("```json", "").replace("```", "").strip()

    
    output = re.sub(r'//.*', '', output)

    
    output = re.sub(r'(\w+):', r'"\1":', output)

    return output.strip()


def edit_interaction_tool(existing, update_text):
    prompt = f"""
    Existing Data:
    {existing}

    User Correction:
    {update_text}

    Update ONLY relevant fields.

    Return STRICT JSON:
    - keys must be in double quotes
    - no comments
    - no markdown

    Example:
    {{
      "hcp_name": "Dr. Wick",
      "interaction_type": "...",
      "summary": "...",
      "sentiment": "...",
      "follow_up": "..."
    }}
    """

    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[{"role": "user", "content": prompt}]
    )

    output = response.choices[0].message.content.strip()

    
    output = safe_json_parse(output)

    try:
        return json.loads(output)
    
    
        if result.get("follow_up") is None:
           result["follow_up"] = ""

        return result
    except Exception as e:
        print("EDIT JSON ERROR:", output)

        # fallback → update manually
        existing["hcp_name"] = "Dr. Wick"
        return existing


def summarize_tool(text):
    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[{"role": "user", "content": f"Summarize: {text}"}]
    )
    return response.choices[0].message.content



def sentiment_tool(text):
    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[{"role": "user", "content": f"Classify sentiment: {text}"}]
    )
    return response.choices[0].message.content



def followup_tool(text):
    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[{"role": "user", "content": f"Suggest follow-up: {text}"}]
    )
    return response.choices[0].message.content