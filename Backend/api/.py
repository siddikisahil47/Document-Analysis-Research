from scholar_assistant.agent_setup.response import Agent
Agent = Agent()
query = "hello, find me research papers for LLMs and GenAI"
response = Agent.get_response(query = query)
print(response)
