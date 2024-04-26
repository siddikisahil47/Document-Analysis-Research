from  scholar_assistant.agent_setup.chain_setup import Chain
from langchain.agents import AgentExecutor

Chain = Chain()
class Agent:
    def __init__(self):
        self.agent = Chain.setup_agent()

    def get_response(self, query: str) -> str:
        return self.agent.run(query)
