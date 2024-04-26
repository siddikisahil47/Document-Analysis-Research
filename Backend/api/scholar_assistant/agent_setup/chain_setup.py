from langchain.tools import DuckDuckGoSearchRun
from langchain.utilities.wikipedia import WikipediaAPIWrapper
from langchain.agents import initialize_agent, Tool
from langchain.agents import AgentType
from langchain.agents import AgentExecutor

from scholar_assistant.agent_setup.custom_tools.wrappers import GetScholarInfoTool
from scholar_assistant.agent_setup.memory import setup_memory
from scholar_assistant.agent_setup.config import Config


class Chain:
    def __init__(self):
        self.search = DuckDuckGoSearchRun()
        self.wikipedia = WikipediaAPIWrapper()
        self.cfg = Config()

    def setup_agent(self) -> AgentExecutor:
        agent_kwargs, memory = setup_memory()
        tools = [

            GetScholarInfoTool(),
        ]

        return initialize_agent(
            tools,
            self.cfg.llm,
            agent=AgentType.OPENAI_FUNCTIONS,
            prompt=self.cfg.prompt,
            verbose=True,
            agent_kwargs=agent_kwargs,
            memory=memory,
            handle_parsing_errors=True,
        )
