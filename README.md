# Fine-Tuning Dataset Formatter

This repository contains a script for converting a CSV file into a JSON Lines (JSONL) dataset for fine-tuning language models. The dataset is formatted to be compatible with [OpenAI's fine-tuning specification](https://platform.openai.com/docs/guides/fine-tuning), but this format is a standard that could be applied to other platforms like [autotrain on hugging face](https://huggingface.co/autotrain).

### Example CSV

```csv
hot take
Hotdogs are not sandwiches they are tacos.
Tuesday is worse than Monday.
Butterflies are gross, centipedes with wings.
```

## Output Format

The output JSONL file (`output.jsonl`) is formatted with the typical structure of a conversation. Each line in the output file is a JSON object that represents a conversation sequence involving a system message, a user prompt, and an assistant response.

### Example JSONL

```jsonl
{"messages": [{"role": "system", "content": "You are a hot take generator."}, {"role": "user", "content": "Give me a hot take."}, {"role": "assistant", "content": "Pineapple belongs on every pizza, and it's the superior topping."}]}
```