from langchain.tools import StructuredTool
from langchain.pydantic_v1 import BaseModel, Field
from langchain.tools import BaseTool, StructuredTool, tool
from typing import Optional, Type
import scholar_assistant.agent_setup.custom_tools.search_tool as SearchTool


class GetScholarInput(BaseModel):
    query: str = Field(..., description="The query to find research papers for")


class GetScholarInfoTool(BaseTool):

    name = "get_research_scholar_info"
    description = "Use this tool search for research papers for a given topic"

    def _run(self, query: str):

        return SearchTool.custom_scholar_search(query)

    def _arun(self, query: str):
        raise NotImplementedError("This tool does not support async")

    args_schema: Optional[Type[BaseModel]] = GetScholarInput

