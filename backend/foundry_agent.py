from openai import OpenAI
import json

class FoundryAgent:
    def __init__(self, openai_client):
        self.client = openai_client
        self.model_id = "llama-3.3-70b-versatile" # Using the fast Groq model

    def chat_architect(self, user_message, current_code, project_context, language="english", spoken_language="english"):
        """
        The Architect: A helpful Senior Mentor.
        """
        base_prompt = f"""
        You are "The Architect", a helpful and encouraging Senior Tech Lead. 
        The student is working on:
        Project: {project_context.get('title')}
        Phase: {project_context.get('phase_title')}
        Objective: {project_context.get('phase_description')}
        
        Current Code (Language: {language}):
        ```
        {current_code}
        ```

        GUIDELINES:
        1. Be a helpful mentor. If they are stuck, PROVIDE THE CODE SOLUTION.
        2. Explain *why* the code works, but don't be afraid to give snippets or full functions to help them move forward.
        3. Use clear, neat formatting.
        4. Keep responses concise (max 2-3 paragraphs) but informative.
        5. Your goal is to help them learn by DOING, even if that means showing them the path.
        """

        if spoken_language == "tamil":
            base_prompt += """
            IMPORTANT: The user prefers Tamil. 
            Speak in "Tanglish" (Tamil + English mixed).
            - Explain concepts in Tamil/Tanglish.
            - Keep technical terms in English (e.g. "function", "array", "loop").
            - Example: "Indha code la loop use pannanum because..."
            """

        try:
            response = self.client.chat.completions.create(
                model=self.model_id,
                messages=[
                    {"role": "system", "content": base_prompt},
                    {"role": "user", "content": user_message}
                ]
            )
            return response.choices[0].message.content
        except Exception as e:
            return f"The Architect is offline temporarily. ({str(e)})"

    def validate_code(self, user_code, phase_objective, language="python"):
        """
        The Interpreter: Simulates code execution and provides feedback.
        Returns JSON: { 'output': '...', 'review': '...' }
        """
        system_prompt = f"""
        Act as a {language} Interpreter ("The Interpreter").
        Phase Objective: {phase_objective}
        
        CODE TO ANALYZE:
        ```{language}
        {user_code}
        ```
        
        MISSION:
        1. SIMULATE the execution of this code. What would the terminal output be?
        2. If there are syntax errors, output the error message.
        3. Provide a very short (1 sentence) technical review.
        
        CRITICAL: Return ONLY a JSON object:
        {{
            "output": "The exact terminal output (or error)...",
            "review": "Short critique..."
        }}
        """

        try:
            response = self.client.chat.completions.create(
                model=self.model_id,
                messages=[
                    {"role": "system", "content": "You are a code simulator. Return JSON only."},
                    {"role": "user", "content": system_prompt}
                ],
                response_format={"type": "json_object"} 
            )
            content = response.choices[0].message.content
            return json.loads(content)
        except Exception as e:
            print(f"Interpreter Error: {e}")
            return {
                "output": "Execution Error: Simulation failed.",
                "review": "Could not verify code at this time."
            }

    def verify_screenshot(self, image_url, phase_objective, spoken_language="english"):
        """
        The Auditor: Verifies visual proof of work using Vision model.
        Returns JSON: { 'approved': bool, 'feedback': 'string' }
        """
        try:
            print("Auditing Screenshot with Vision Model...")

            # Construct the prompt dynamically
            auditor_prompt = f"""
            You are a STRICT Technical Auditor.
            Your job is to verify if this screenshot proves the user completed the objective: '{phase_objective}'.

            STRICT RULES:
            1. You are an expert in {spoken_language}. Provide {spoken_language} code snippets.
            2. Verify if the code is valid {spoken_language}.
            3. If the user is stuck, provide a specific hint.
            """

            if spoken_language == "tamil":
                auditor_prompt += """
            IMPORTANT: The user prefers Tamil. 
            Speak in "Tanglish" (Tamil + English mixed).
            - Explain concepts in Tamil/Tanglish.
            - Keep technical terms in English (e.g. "function", "array", "loop").
            - Example: "Indha code la loop use pannanum because..."
            """

            auditor_prompt += """
            4. The image MUST contain CODE, TERMINAL OUTPUT, or a UI that matches the objective.
            5. If the image is unrelated (e.g. a selfie, desktop wallpaper, random meme, or blank screen), REJECT it immediately.
            6. If the image is a screenshot of the 'EKALAVYA' or 'The Architect' chat interface itself (re-uploading the instructions), REJECT it. The proof must be from an EXTERNAL platform (VS Code, Terminal, Browser, etc.).
            7. If the image is blurry or unreadable, REJECT it.
            8. If the proof is weak or ambiguous, REJECT it.
            
            Return JSON:
            {{
                "approved": true/false,
                "feedback": "Short, strict reason for approval or rejection."
            }}
            """

            response = self.client.chat.completions.create(
                # Use Llama 4 Maverick (Multimodal)
                model="meta-llama/llama-4-maverick-17b-128e-instruct", 
                messages=[
                    {
                        "role": "user",
                        "content": [
                            {"type": "text", "text": auditor_prompt},
                            {
                                "type": "image_url",
                                "image_url": {
                                    "url": image_url,
                                },
                            },
                        ],
                    }
                ],
                response_format={"type": "json_object"}
            )
            return json.loads(response.choices[0].message.content)
        except Exception as e:
            print(f"Auditor Verification Failed: {e}")
            # STRICT Fallback: Deny if we can't verify
            return {"approved": False, "feedback": "Verification Check Failed. Please upload a clear screenshot of your code or output."}
