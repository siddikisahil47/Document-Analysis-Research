from langchain.memory import ConversationBufferMemory
from langchain.prompts.chat import MessagesPlaceholder
from typing import Tuple, Dict

SYSTEM_PROMPT_MESSAGE = """

The first query is:
Hello, who are you?
"""


def setup_memory() -> Tuple[Dict, ConversationBufferMemory]:
    agent_kwargs = {
        "extra_prompt_messages": [MessagesPlaceholder(variable_name="chat_history")],
    }
    memory = ConversationBufferMemory(memory_key="chat_history", return_messages=True)
    memory.chat_memory.add_user_message(SYSTEM_PROMPT_MESSAGE)

    return agent_kwargs, memory
