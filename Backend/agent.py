from langgraph.graph import StateGraph

from tools import log_interaction_tool, edit_interaction_tool


class State(dict):
    input: str
    last_output: dict
    output: dict


def agent_node(state: State):
    
   
    user_input = state.get("input")

    if not user_input:
        return {"output": {"error": "No input provided"}}

    
    if any(word in user_input.lower() for word in ["sorry", "change", "update"]):
        
        previous = state.get("last_output", {})

        updated = edit_interaction_tool(previous, user_input)

        return {
            "output": updated,
            "last_output": updated
        }

    
    result = log_interaction_tool(user_input)

    return {
        "output": result,
        "last_output": result
    }



graph = StateGraph(State)

graph.add_node("agent", agent_node)

graph.set_entry_point("agent")

app = graph.compile()