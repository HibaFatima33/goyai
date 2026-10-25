# Goyai

An LLM-accelerated Augmentative and Alternative Communication (AAC) tile board for Urdu-speaking users with severe motor-speech impairment.

## About

People who cannot speak intelligibly often use AAC boards, where every word takes a separate physical selection. English-language studies show that large language models can cut that effort a lot by predicting the full sentence a user is building. No published system does this for Urdu or any other South Asian language.

Goyai is a tablet-based tile board that:

- lets users pick one to three icon or word tiles (needs, people, feelings, actions)
- suggests a short ranked list of complete Urdu sentences, including Urdu-English code-mixed ones
- speaks a sentence with Urdu text-to-speech only after the user taps to confirm it

The research question is whether the motor-action savings reported for English AAC users carry over to Urdu, including code-mixed input, and whether users still feel the messages are in their own words.

See [proposal.pdf](proposal.pdf) for the full proposal.

## Project structure

- [backend/](backend/): a FastAPI service that turns a tile selection into ranked Urdu sentences
  using a language model served locally by Ollama. See [backend/README.md](backend/README.md)
  for setup, the API and configuration.
- [frontend/](frontend/): the tablet interface, a Next.js app.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).
