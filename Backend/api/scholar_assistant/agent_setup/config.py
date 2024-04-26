from langchain_google_genai import ChatGoogleGenerativeAI
from langchain import PromptTemplate
from dotenv import load_dotenv

load_dotenv()
import os

google_api_key = os.environ["GOOGLE_API_KEY"]


TEMPLATE = """
You are a helpful and respectful assistant.
Your goal is to provide help users with legal and research based tasks.
Use the tools available to you to provide the best possible answer.
Always provide links in the final response to the user.
Check the chat history for more context.

History:
{chat_history}

User: {user_input}
"""


class Config:
    llm = ChatGoogleGenerativeAI(
        model="gemini-1.5-pro-latest",
        convert_system_message_to_human=True,
    )
    system_prompt = TEMPLATE
    prompt = PromptTemplate(
        input_variables=["chat_history", "user_input"], template=system_prompt
    )
