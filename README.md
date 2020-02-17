# cellular-automata-cli

Run the command:

`node ca-cli <rulestring> <neighborhood> <starting pattern txt file>`

- Rulestring format: b___s___
- neighborhood:
  - `m`: Moore neighborhood
  - `v`: von Neumann neighborhood
  - `h`: hexagonal neighborhood

Example:

`node ca-cli b3s23 m gg.txt` (Life rule, Moore neighborhood, gosper glider gun)