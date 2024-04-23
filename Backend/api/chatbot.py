import os
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.chains import ConversationChain
from langchain.memory import ConversationBufferMemory
from langchain.prompts import PromptTemplate
from dotenv import load_dotenv

load_dotenv()  

# Load the GEMINI_API_KEY from the .env file
google_api_key = os.getenv('GOOGLE_API_KEY')

llm = ChatGoogleGenerativeAI(
    model="gemini-1.5-pro-latest",
    api_key=google_api_key,
    temperature=0.3, 
)  

PROMPT_TEMPLATE = """The following is a friendly conversation between a human and an AI. The AI is talkative and provides lots of specific details from its context. If the AI does not know the answer to a question, it truthfully says it does not know.

Current conversation: {history}
Human: {input}
AI Assistant:
"""

PROMPT = PromptTemplate(
    input_variables=["history", "input"], template=PROMPT_TEMPLATE
)

conversation = ConversationChain(
    llm=llm,
    verbose=True,
    prompt=PROMPT,
    memory=ConversationBufferMemory(ai_prefix="AI Assistant")
)

def get_ai_response(input_text):
    response = conversation.predict(input=input_text)
    return response

