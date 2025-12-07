# CLAUDE.md - AI Assistant Guide for codex-

## Repository Overview

**Project Name:** codex-
**Purpose:** OpenAI Codex - Vibe coding publish-ready apps
**Status:** Early stage / Template repository
**Last Updated:** 2025-12-07

This repository is designed to facilitate rapid application development using AI-assisted coding to create production-ready applications.

---

## Repository Structure

### Current State
```
codex-/
├── .git/              # Git version control
├── README.md          # Project description
└── CLAUDE.md          # This file - AI assistant guide
```

### Expected Future Structure
As the project grows, expect the following organization:

```
codex-/
├── src/               # Source code
│   ├── components/    # Reusable components
│   ├── utils/         # Utility functions
│   ├── services/      # Business logic and API services
│   └── config/        # Configuration files
├── tests/             # Test files
├── docs/              # Documentation
├── scripts/           # Build and deployment scripts
├── public/            # Static assets (if web-based)
├── package.json       # Dependencies (if Node.js)
├── requirements.txt   # Dependencies (if Python)
└── README.md          # User-facing documentation
```

---

## Development Workflow

### Git Workflow

**Current Branch:** `claude/claude-md-miv3gb25qnirptpj-0191ctKGdhCyvAkXdcbGMZ5F`

#### Branch Naming Convention
- Feature branches: `claude/claude-<feature>-<session-id>`
- All Claude-created branches MUST start with `claude/` and end with the session ID
- Branch names should be descriptive and kebab-case

#### Commit Guidelines
1. **Descriptive commits**: Write clear, concise commit messages
2. **Atomic commits**: Each commit should represent a single logical change
3. **Conventional Commits** (recommended):
   - `feat:` - New features
   - `fix:` - Bug fixes
   - `docs:` - Documentation changes
   - `refactor:` - Code refactoring
   - `test:` - Adding or updating tests
   - `chore:` - Maintenance tasks

#### Push Strategy
- Always use: `git push -u origin <branch-name>`
- Branch must start with `claude/` and end with matching session ID
- Retry on network failures: up to 4 times with exponential backoff (2s, 4s, 8s, 16s)

### Development Practices

#### Code Quality Standards
1. **Write Clean Code**
   - Follow language-specific style guides
   - Use meaningful variable and function names
   - Keep functions small and focused (single responsibility)
   - Avoid deep nesting (max 3-4 levels)

2. **Security First**
   - NEVER commit secrets, API keys, or credentials
   - Validate user input at system boundaries
   - Avoid OWASP Top 10 vulnerabilities:
     - SQL Injection
     - XSS (Cross-Site Scripting)
     - Command Injection
     - Path Traversal
     - Insecure Deserialization

3. **Avoid Over-Engineering**
   - Only implement what's requested
   - Don't add features speculatively
   - Prefer simple solutions over complex abstractions
   - Don't create utilities for one-time operations

4. **Documentation**
   - Add comments only where logic isn't self-evident
   - Update documentation when making significant changes
   - Keep README.md current with setup instructions

#### Testing Strategy
When tests are implemented:
- Write tests for new features
- Ensure existing tests pass before committing
- Aim for meaningful test coverage, not 100%
- Test edge cases and error conditions

---

## File Organization Conventions

### Naming Conventions
- **Files**: `kebab-case.js`, `snake_case.py` (follow language conventions)
- **Directories**: `kebab-case/` or `snake_case/` (consistent within project)
- **Classes**: `PascalCase`
- **Functions/Variables**: `camelCase` (JavaScript/TypeScript) or `snake_case` (Python)
- **Constants**: `UPPER_SNAKE_CASE`

### File Structure Patterns

#### For JavaScript/TypeScript Projects
```javascript
// Component example
import { dependency } from 'library';

// Constants
const CONFIG = {};

// Types/Interfaces (TypeScript)
interface DataType {}

// Main implementation
export function mainFunction() {}

// Helper functions (if needed)
function helperFunction() {}

// Exports
export default mainFunction;
```

#### For Python Projects
```python
"""Module docstring describing purpose."""

# Standard library imports
import os

# Third-party imports
import requests

# Local imports
from .utils import helper

# Constants
CONFIG = {}

# Classes
class MainClass:
    """Class docstring."""
    pass

# Functions
def main_function():
    """Function docstring."""
    pass
```

---

## AI Assistant Specific Guidelines

### Before Making Changes
1. **Read before modifying**: ALWAYS read files before editing them
2. **Understand context**: Review related files to understand the system
3. **Check for existing patterns**: Follow established conventions in the codebase
4. **Verify dependencies**: Ensure required libraries/modules are available

### Task Management
Use TodoWrite tool for:
- Tasks with 3+ distinct steps
- Complex or non-trivial operations
- Multiple related tasks
- Tracking progress on long-running work

**Task States:**
- `pending` - Not started
- `in_progress` - Currently working (limit to ONE at a time)
- `completed` - Finished successfully

### Tool Usage Preferences
1. **File Operations**
   - Use `Read` tool instead of `cat`
   - Use `Edit` tool instead of `sed/awk`
   - Use `Write` tool for new files instead of `echo >`

2. **Search Operations**
   - Use `Grep` for content search instead of bash `grep`
   - Use `Glob` for file pattern matching instead of `find`
   - Use `Task` tool with `subagent_type=Explore` for complex codebase exploration

3. **Parallel Operations**
   - Run independent operations in parallel when possible
   - Use sequential operations only when dependencies exist

### Communication Style
- Be concise and direct
- Focus on technical accuracy
- No emojis unless explicitly requested
- Use markdown for formatting
- Include file references as `file_path:line_number`

---

## Project-Specific Conventions

### Vibe Coding Philosophy
This project embraces "vibe coding" - rapid, AI-assisted development focused on:
- **Speed**: Quick iterations and prototyping
- **Quality**: Production-ready code from the start
- **Simplicity**: Minimal complexity, maximum clarity
- **Pragmatism**: Practical solutions over theoretical perfection

### Publish-Ready Standards
All code should be:
- **Functional**: Works correctly for intended use cases
- **Maintainable**: Easy to understand and modify
- **Secure**: Free from common vulnerabilities
- **Documented**: Clear purpose and usage instructions
- **Tested**: Verified to work as expected (when applicable)

---

## Common Tasks Reference

### Starting a New Feature
```bash
# Ensure you're on the correct branch
git status

# Create necessary directories
mkdir -p src/components

# Implement feature
# (use appropriate tools: Write, Edit, etc.)

# Test changes
# (run tests if available)

# Commit changes
git add .
git commit -m "feat: add new feature description"

# Push to remote
git push -u origin <branch-name>
```

### Adding Dependencies

#### Node.js/npm
```bash
npm install <package-name>
# or
npm install --save-dev <package-name>  # for dev dependencies
```

#### Python/pip
```bash
pip install <package-name>
# Update requirements.txt
pip freeze > requirements.txt
```

### Running Tests
```bash
# Node.js
npm test

# Python
pytest
# or
python -m pytest

# With coverage
npm run test:coverage  # or pytest --cov
```

---

## Error Handling Guidelines

### General Principles
1. **Fail fast**: Catch errors early
2. **Be specific**: Use appropriate error types
3. **Provide context**: Include helpful error messages
4. **Clean up**: Release resources in finally blocks or using context managers

### Don't Over-Handle
- Trust internal code and framework guarantees
- Only validate at system boundaries (user input, external APIs)
- Don't add error handling for impossible scenarios

---

## Configuration Management

### Environment Variables
- Store in `.env` file (NEVER commit to git)
- Add `.env` to `.gitignore`
- Provide `.env.example` with dummy values
- Load early in application startup

### Configuration Files
- Use JSON, YAML, or TOML for structured config
- Separate dev, staging, and production configs
- Document all configuration options

---

## Security Checklist

Before committing code, verify:
- [ ] No hardcoded credentials or API keys
- [ ] User input is validated and sanitized
- [ ] SQL queries use parameterization
- [ ] File paths are validated (no path traversal)
- [ ] Sensitive data is not logged
- [ ] Dependencies are up-to-date (no known vulnerabilities)
- [ ] HTTPS is used for external communications
- [ ] Authentication and authorization are implemented correctly

---

## Resources & References

### Documentation
- README.md - Project overview and setup
- CLAUDE.md - This file (AI assistant guide)
- Additional docs should go in `docs/` directory

### Git History
- Initial commit: `624800b` - Project initialization
- See `git log` for complete history

### Useful Commands
```bash
# Check repository status
git status

# View recent commits
git log --oneline -10

# Search for code patterns
# (use Grep tool instead of direct bash)

# Find files by pattern
# (use Glob tool instead of direct bash)

# View file structure
tree -L 3 -I 'node_modules|.git'
```

---

## Contributing Guidelines

### For AI Assistants
1. Always read existing code before making changes
2. Follow established patterns and conventions
3. Keep changes focused and minimal
4. Test changes when possible
5. Update documentation when adding features
6. Commit with clear, descriptive messages
7. Push to the correct branch

### For Humans Collaborating
(To be defined as project grows)

---

## Troubleshooting

### Git Push Failures
- **403 Error**: Branch name doesn't match required pattern (must start with `claude/` and end with session ID)
- **Network Error**: Retry with exponential backoff (up to 4 attempts)

### Common Issues
- **File not found**: Verify path is absolute, not relative
- **Permission denied**: Check file permissions with `ls -la`
- **Merge conflicts**: Review changes carefully, resolve conflicts, then commit

---

## Changelog

### 2025-12-07
- Created CLAUDE.md with initial guidelines
- Documented repository structure and conventions
- Established development workflow standards
- Added AI assistant-specific guidelines

---

## Notes for Future Updates

This document should be updated when:
- Project structure changes significantly
- New conventions or standards are adopted
- Development workflow evolves
- New tools or frameworks are integrated
- Security requirements change
- Team grows or collaboration patterns shift

**Keep this document current!** It's the source of truth for AI assistants working on this codebase.
